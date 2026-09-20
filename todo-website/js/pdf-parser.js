/**
 * PDF Routine Parser & Importer
 * Uses Mozilla PDF.js to extract text from schedule PDFs,
 * parses time slots, activities, and goals into interactive AuraRoutine items.
 */
class PDFRoutineParser {
  constructor() {
    this.pdfjsLib = typeof window !== 'undefined' ? (window.pdfjsLib || window['pdfjs-dist/build/pdf'] || null) : null;
    this.initPdfJs();
  }

  initPdfJs() {
    if (typeof window !== 'undefined') {
      const lib = window.pdfjsLib || window['pdfjs-dist/build/pdf'] || this.pdfjsLib;
      if (lib) {
        this.pdfjsLib = lib;
        if (this.pdfjsLib.GlobalWorkerOptions && !this.pdfjsLib.GlobalWorkerOptions.workerSrc) {
          // Prefer local worker script to avoid CDN latency and cross-origin worker restrictions
          try {
            this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.min.js';
          } catch (e) {
            this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          }
        }
      }
    } else if (typeof require !== 'undefined') {
      // Node.js environment support for automated testing
      try {
        const path = require('path');
        if (!this.pdfjsLib) {
          this.pdfjsLib = require('./pdf.min.js');
        }
        if (this.pdfjsLib && this.pdfjsLib.GlobalWorkerOptions) {
          this.pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, 'pdf.worker.min.js');
        }
      } catch (err) {
        // Fallback for tests
      }
    }
  }

  /**
   * Main PDF parsing entrypoint (camelCase alias for app.js)
   */
  async parsePdfFile(file) {
    return this.parsePDFFile(file);
  }

  /**
   * Extract schedule tasks from a File or Blob or ArrayBuffer
   */
  async parsePDFFile(file) {
    if (!this.pdfjsLib) {
      this.initPdfJs();
    }

    let arrayBuffer;
    if (file instanceof ArrayBuffer) {
      arrayBuffer = file;
    } else if (file && typeof file.arrayBuffer === 'function') {
      arrayBuffer = await file.arrayBuffer();
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(file)) {
      arrayBuffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
    } else if (file && file.buffer instanceof ArrayBuffer) {
      arrayBuffer = file.buffer;
    } else if (file instanceof Uint8Array) {
      arrayBuffer = file.buffer;
    } else {
      throw new Error("Invalid file input: unable to read binary data");
    }

    let fullText = "";

    try {
      if (this.pdfjsLib && typeof this.pdfjsLib.getDocument === 'function') {
        const loadingTask = this.pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
          cMapPacked: true
        });
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageLines = this.extractLinesFromTextContent(textContent);
          if (pageLines.length > 0) {
            fullText += "\n" + pageLines.join("\n");
          }
        }
      } else {
        throw new Error("PDF.js library not loaded yet.");
      }
    } catch (e) {
      console.warn("PDF.js extraction warning, applying fallback text parsing:", e);
      fullText = this.fallbackExtractText(arrayBuffer);
    }

    return this.parseScheduleText(fullText);
  }

  /**
   * Reconstruct lines from individual PDF text tokens by grouping along Y-baseline
   * and ordering left-to-right along X-axis.
   */
  extractLinesFromTextContent(textContent) {
    if (!textContent || !textContent.items || textContent.items.length === 0) {
      return [];
    }

    const items = textContent.items.filter(item => typeof item.str === 'string' && item.str.length > 0);
    if (items.length === 0) return [];

    // Group items by vertical position (Y baseline).
    // In PDF coordinates, larger Y is higher up on page. Items within 4px belong to same line.
    const lineGroups = [];
    for (const item of items) {
      const y = item.transform ? item.transform[5] : 0;
      const x = item.transform ? item.transform[4] : 0;

      let group = lineGroups.find(g => Math.abs(g.y - y) <= 4);
      if (!group) {
        group = { y, items: [] };
        lineGroups.push(group);
      }
      group.items.push({ text: item.str, x, width: item.width || 0 });
    }

    // Sort lines top to bottom (Y descending)
    lineGroups.sort((a, b) => b.y - a.y);

    const resultLines = [];
    for (const group of lineGroups) {
      // Sort items within line from left to right (X ascending)
      group.items.sort((a, b) => a.x - b.x);

      let lineStr = "";
      for (let j = 0; j < group.items.length; j++) {
        const curr = group.items[j];
        if (j > 0) {
          const prev = group.items[j - 1];
          const gap = curr.x - (prev.x + prev.width);
          // Insert column separator if there's a substantial gap between OCR/table cells
          if (gap > 22) {
            lineStr += " | ";
          } else if (!lineStr.endsWith(" ") && !curr.text.startsWith(" ")) {
            lineStr += " ";
          }
        }
        lineStr += curr.text;
      }

      const trimmed = lineStr.trim();
      if (trimmed.length > 0) {
        resultLines.push(trimmed);
      }
    }

    return resultLines;
  }

  /**
   * Fallback text extraction for uncompressed streams or text files
   */
  fallbackExtractText(arrayBuffer) {
    try {
      const textDecoder = new TextDecoder('utf-8');
      const raw = textDecoder.decode(arrayBuffer);
      // Attempt to extract PDF text parentheses e.g. (text) Tj
      const tjMatches = [];
      const regex = /\(([^)]+)\)\s*Tj/g;
      let match;
      while ((match = regex.exec(raw)) !== null) {
        tjMatches.push(match[1]);
      }
      if (tjMatches.length > 5) {
        return tjMatches.join('\n');
      }
      return raw;
    } catch (e) {
      return "";
    }
  }

  /**
   * Parse extracted schedule text into structured todo tasks
   */
  parseScheduleText(text) {
    if (!text || typeof text !== 'string') return [];

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const parsedTasks = [];

    // Comprehensive time range regex:
    // Matches 06:00 AM – 06:15 AM, 6:00 - 7:00 PM, 06:00 - 07:00, 6am-7am, 06.00 - 07.00
    const timeRangeRegex = /(?:^|\s)(?:(?:slot\s*\d+|step\s*\d+|task\s*\d+)[.:\s-]*)?(\d{1,2}(?:[:.]\d{2})?\s*(?:AM|PM|am|pm)?)\s*(?:–|—|‒|-|~|to|through)\s*(\d{1,2}(?:[:.]\d{2})?\s*(?:AM|PM|am|pm)?)/i;
    const singleTimeRegex = /(?:^|\s)(\d{1,2}[:.]\d{2}\s*(?:AM|PM|am|pm)?|\d{1,2}\s*(?:AM|PM|am|pm))/i;

    let taskIdCounter = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/[■•\t]/g, ' ').trim();
      const matchRange = line.match(timeRangeRegex);

      if (matchRange) {
        const startRaw = matchRange[1].trim();
        const endRaw = matchRange[2].trim();
        const matchedPortion = matchRange[0];

        // Clean rest of line
        const restOfLine = line.replace(matchedPortion, '').trim();
        const taskInfo = this.extractActivityAndGoal(restOfLine);
        const category = this.detectCategory(taskInfo.activity);
        const timePair = this.normalizeTimePair(startRaw, endRaw);

        parsedTasks.push({
          id: `custom-pdf-${Date.now()}-${taskIdCounter++}`,
          startTime: timePair.startTime,
          endTime: timePair.endTime,
          timeDisplay: timePair.timeDisplay,
          activity: taskInfo.activity || 'Focused Study Session',
          goal: taskInfo.goal || this.getDefaultGoalForCategory(category),
          category: category,
          priority: this.detectPriority(taskInfo.activity),
          xp: this.calculateXp(taskInfo.activity),
          completed: false
        });
      } else {
        const matchSingle = line.match(singleTimeRegex);
        if (matchSingle && (line.toLowerCase().includes('am') || line.toLowerCase().includes('pm') || matchSingle[1].includes(':'))) {
          const timeRaw = matchSingle[1].trim();
          const restOfLine = line.replace(matchSingle[0], '').trim();
          if (restOfLine.length > 2) {
            const taskInfo = this.extractActivityAndGoal(restOfLine);
            const category = this.detectCategory(taskInfo.activity);
            const start24 = this.normalizeTo24h(timeRaw);

            parsedTasks.push({
              id: `custom-pdf-${Date.now()}-${taskIdCounter++}`,
              startTime: start24,
              endTime: this.addMinutesToTime(start24, 30),
              timeDisplay: timeRaw,
              activity: taskInfo.activity || 'Execution Block',
              goal: taskInfo.goal || this.getDefaultGoalForCategory(category),
              category: category,
              priority: this.detectPriority(taskInfo.activity),
              xp: 25,
              completed: false
            });
          }
        }
      }
    }

    return parsedTasks;
  }

  /**
   * Smartly normalize a pair of start and end times, inheriting AM/PM when implicit
   */
  normalizeTimePair(startRaw, endRaw) {
    let start = startRaw.trim();
    let end = endRaw.trim();

    const endHasPM = /pm/i.test(end);
    const endHasAM = /am/i.test(end);
    const startHasMeridiem = /am|pm/i.test(start);

    // If end is PM and start has no meridiem, inherit PM if start <= end hour
    if (!startHasMeridiem && endHasPM) {
      const sHour = parseInt(start.replace(/[^0-9]/g, '').slice(0, 2), 10);
      const eHour = parseInt(end.replace(/[^0-9]/g, '').slice(0, 2), 10);
      if (sHour <= eHour || eHour === 12) {
        start += " PM";
      } else {
        start += " AM";
      }
    } else if (!startHasMeridiem && endHasAM) {
      start += " AM";
    }

    const startTime = this.normalizeTo24h(start);
    const endTime = this.normalizeTo24h(end);

    return {
      startTime,
      endTime,
      timeDisplay: `${startRaw} – ${endRaw}`
    };
  }

  /**
   * Cleans rest of line, strips leading punctuation, and extracts activity & goal
   */
  extractActivityAndGoal(text) {
    let cleaned = (text || '')
      .replace(/^[\s|:\-–—\t.]+/, '')
      .replace(/[\s|:\-–—\t.]+$/, '')
      .trim();

    if (!cleaned) {
      return { activity: 'Routine Block', goal: '' };
    }

    // Check for explicit Goal / Target tag
    const goalMatch = cleaned.match(/(?:goal|target|objective|notes?)\s*[:=-]\s*(.*)$/i);
    if (goalMatch) {
      const goal = goalMatch[1].trim();
      const activity = cleaned.replace(goalMatch[0], '').replace(/[\s|:\-–—\t()]+$/, '').trim();
      return {
        activity: activity || 'Study Block',
        goal: goal
      };
    }

    // Split on pipe (|)
    if (cleaned.includes('|')) {
      const parts = cleaned.split('|').map(p => p.trim()).filter(p => p.length > 0);
      if (parts.length >= 2) {
        return { activity: parts[0], goal: parts.slice(1).join(' • ') };
      } else if (parts.length === 1) {
        return { activity: parts[0], goal: '' };
      }
    }

    // Split on semicolon (;)
    if (cleaned.includes(';')) {
      const parts = cleaned.split(';').map(p => p.trim()).filter(p => p.length > 0);
      if (parts.length >= 2) {
        return { activity: parts[0], goal: parts.slice(1).join(' • ') };
      }
    }

    // Split on multiple spaces (columnar OCR)
    const spacedCols = cleaned.split(/\s{3,}/).map(p => p.trim()).filter(p => p.length > 0);
    if (spacedCols.length >= 2) {
      return { activity: spacedCols[0], goal: spacedCols.slice(1).join(' • ') };
    }

    // Split on dash with surrounding spaces e.g. "DSA - Solve 2 LeetCode problems"
    if (/\s+[-–—]\s+/.test(cleaned)) {
      const parts = cleaned.split(/\s+[-–—]\s+/).map(p => p.trim()).filter(p => p.length > 0);
      if (parts.length >= 2) {
        return { activity: parts[0], goal: parts.slice(1).join(' • ') };
      }
    }

    return { activity: cleaned, goal: '' };
  }

  detectCategory(activity) {
    const act = (activity || '').toLowerCase();
    if (act.includes('english') || act.includes('shadowing') || act.includes('speaking') || act.includes('pronunciation') || act.includes('articulation') || act.includes('vocab') || act.includes('fluency') || act.includes('reading')) {
      return 'English';
    }
    if (act.includes('ai') || act.includes('ml') || act.includes('machine learning') || act.includes('deep learning') || act.includes('neural') || act.includes('pytorch') || act.includes('python')) {
      return 'AI/ML';
    }
    if (act.includes('code') || act.includes('coding') || act.includes('sql') || act.includes('dsa') || act.includes('leetcode') || act.includes('project') || act.includes('dev') || act.includes('frontend') || act.includes('backend')) {
      return 'Coding';
    }
    if (act.includes('workout') || act.includes('walk') || act.includes('fitness') || act.includes('breathing') || act.includes('stretching') || act.includes('gym') || act.includes('cardio') || act.includes('exercise')) {
      return 'Fitness';
    }
    if (act.includes('college') || act.includes('study') || act.includes('assignment') || act.includes('exam') || act.includes('lecture') || act.includes('semester') || act.includes('syllabus')) {
      return 'College';
    }
    if (act.includes('wake') || act.includes('bed') || act.includes('journal') || act.includes('phone') || act.includes('plan') || act.includes('discipline') || act.includes('review') || act.includes('night routine')) {
      return 'Discipline';
    }
    return 'Wellness';
  }

  getDefaultGoalForCategory(category) {
    switch (category) {
      case 'English':
        return 'Daily fluency, pronunciation & vocabulary expansion';
      case 'AI/ML':
        return 'Deep conceptual mastery & neural architecture study';
      case 'Coding':
        return 'Problem solving, DSA patterns & clean code execution';
      case 'Fitness':
        return 'Physical vitality, posture & cardiovascular stamina';
      case 'College':
        return 'Academic excellence & syllabus mastery';
      case 'Discipline':
        return 'Habit consistency, zero phone distraction & deep focus';
      case 'Wellness':
      default:
        return 'Mental clarity, personal care & physical restoration';
    }
  }

  detectPriority(activity) {
    const act = (activity || '').toLowerCase();
    if (act.includes('deep') || act.includes('ai') || act.includes('ml') || act.includes('coding') || act.includes('dsa') || act.includes('wake up') || act.includes('speaking')) {
      return 'high';
    }
    if (act.includes('break') || act.includes('dinner') || act.includes('lunch') || act.includes('snack') || act.includes('wash')) {
      return 'low';
    }
    return 'medium';
  }

  calculateXp(activity) {
    const priority = this.detectPriority(activity);
    if (priority === 'high') return 35;
    if (priority === 'medium') return 25;
    return 15;
  }

  normalizeTo24h(timeStr) {
    const cleaned = timeStr.trim().toUpperCase();
    const isPM = cleaned.includes('PM');
    const isAM = cleaned.includes('AM');

    let numeric = cleaned.replace(/[A-Z\s]/g, '').replace('.', ':');
    let [hours, mins] = numeric.split(':').map(Number);
    if (isNaN(hours)) hours = 8;
    if (isNaN(mins)) mins = 0;

    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    const hh = hours < 10 ? `0${hours}` : `${hours}`;
    const mm = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hh}:${mm}`;
  }

  addMinutesToTime(time24, minutesToAdd) {
    let [hours, mins] = time24.split(':').map(Number);
    mins += minutesToAdd;
    while (mins >= 60) {
      mins -= 60;
      hours = (hours + 1) % 24;
    }
    const hh = hours < 10 ? `0${hours}` : `${hours}`;
    const mm = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hh}:${mm}`;
  }
}

if (typeof window !== 'undefined') {
  window.pdfRoutineParser = new PDFRoutineParser();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PDFRoutineParser };
}
