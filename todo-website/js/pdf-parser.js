/**
 * PDF Routine Parser & Importer
 * Uses Mozilla PDF.js to extract text from schedule PDFs,
 * parses time slots, activities, and goals into interactive todo items.
 */
class PDFRoutineParser {
  constructor() {
    this.pdfjsLib = typeof window !== 'undefined' ? (window.pdfjsLib || null) : null;
    this.initPdfJs();
  }

  initPdfJs() {
    if (typeof window !== 'undefined' && window['pdfjs-dist/build/pdf']) {
      this.pdfjsLib = window['pdfjs-dist/build/pdf'];
      this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }

  async parsePDFFile(file) {
    if (!this.pdfjsLib) {
      this.initPdfJs();
    }

    const arrayBuffer = await file.arrayBuffer();
    let fullText = "";

    try {
      if (this.pdfjsLib) {
        const loadingTask = this.pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(" \n ");
          fullText += "\n" + pageText;
        }
      } else {
        throw new Error("PDF.js library not loaded yet.");
      }
    } catch (e) {
      console.warn("PDF.js direct extraction fallback", e);
      // Raw string fallback for simple text files or mock
      const textDecoder = new TextDecoder('utf-8');
      fullText = textDecoder.decode(arrayBuffer);
    }

    return this.parseScheduleText(fullText);
  }

  parseScheduleText(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const parsedTasks = [];

    // Regex for time intervals e.g. 6:00 AM, 6:15–6:30, 9:00 - 10:30, 10:30 PM
    const timeRangeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)\s*(?:–|-|to)\s*(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/i;
    const singleTimeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/i;

    let taskIdCounter = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/[■•\t]/g, ' ').trim();
      const matchRange = line.match(timeRangeRegex);

      if (matchRange) {
        const startTimeRaw = matchRange[1].trim();
        const endTimeRaw = matchRange[2].trim();
        const restOfLine = line.replace(matchRange[0], '').trim();

        const taskInfo = this.extractActivityAndGoal(restOfLine);
        const category = this.detectCategory(taskInfo.activity);

        parsedTasks.push({
          id: `custom-pdf-${Date.now()}-${taskIdCounter++}`,
          startTime: this.normalizeTo24h(startTimeRaw),
          endTime: this.normalizeTo24h(endTimeRaw),
          timeDisplay: `${startTimeRaw} – ${endTimeRaw}`,
          activity: taskInfo.activity,
          goal: taskInfo.goal || 'Focused study and discipline execution',
          category: category,
          priority: this.detectPriority(taskInfo.activity),
          xp: 30,
          completed: false
        });
      } else {
        const matchSingle = line.match(singleTimeRegex);
        if (matchSingle && (line.toLowerCase().includes('am') || line.toLowerCase().includes('pm'))) {
          const timeRaw = matchSingle[1].trim();
          const restOfLine = line.replace(matchSingle[0], '').trim();
          if (restOfLine.length > 2) {
            const taskInfo = this.extractActivityAndGoal(restOfLine);
            const category = this.detectCategory(taskInfo.activity);

            parsedTasks.push({
              id: `custom-pdf-${Date.now()}-${taskIdCounter++}`,
              startTime: this.normalizeTo24h(timeRaw),
              endTime: this.addMinutesToTime(this.normalizeTo24h(timeRaw), 30),
              timeDisplay: timeRaw,
              activity: taskInfo.activity,
              goal: taskInfo.goal || 'Execution block',
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

  extractActivityAndGoal(text) {
    // If separated by | or ; or tab or multiple spaces
    if (text.includes('|')) {
      const parts = text.split('|');
      return { activity: parts[0].trim(), goal: parts.slice(1).join(' ').trim() };
    }
    if (text.includes(';')) {
      const parts = text.split(';');
      return { activity: parts[0].trim(), goal: parts.slice(1).join(' ').trim() };
    }

    // Split on multiple spaces (e.g. 2+ spaces between columns in OCR)
    const spacedCols = text.split(/\s{3,}/);
    if (spacedCols.length >= 2) {
      return { activity: spacedCols[0].trim(), goal: spacedCols.slice(1).join(' ').trim() };
    }

    return { activity: text, goal: '' };
  }

  detectCategory(activity) {
    const act = (activity || '').toLowerCase();
    if (act.includes('english') || act.includes('shadowing') || act.includes('reading') || act.includes('pronunciation') || act.includes('speaking') || act.includes('vocabulary') || act.includes('articulation')) {
      return 'English';
    }
    if (act.includes('ai') || act.includes('ml') || act.includes('machine learning') || act.includes('python')) {
      return 'AI/ML';
    }
    if (act.includes('code') || act.includes('coding') || act.includes('sql') || act.includes('dsa') || act.includes('project')) {
      return 'Coding';
    }
    if (act.includes('workout') || act.includes('walk') || act.includes('fitness') || act.includes('breathing') || act.includes('stretching')) {
      return 'Fitness';
    }
    if (act.includes('college') || act.includes('study') || act.includes('assignment') || act.includes('exam')) {
      return 'College';
    }
    if (act.includes('wake') || act.includes('bed') || act.includes('journal') || act.includes('phone') || act.includes('plan')) {
      return 'Discipline';
    }
    return 'Wellness';
  }

  detectPriority(activity) {
    const act = (activity || '').toLowerCase();
    if (act.includes('deep') || act.includes('ai') || act.includes('ml') || act.includes('coding') || act.includes('wake up') || act.includes('speaking')) {
      return 'high';
    }
    if (act.includes('break') || act.includes('dinner') || act.includes('lunch')) {
      return 'low';
    }
    return 'medium';
  }

  normalizeTo24h(timeStr) {
    const cleaned = timeStr.trim().toUpperCase();
    const isPM = cleaned.includes('PM');
    const isAM = cleaned.includes('AM');

    let numeric = cleaned.replace(/[A-Z\s]/g, '');
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
