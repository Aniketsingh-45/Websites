const fs = require('fs');
const path = 'e:/My Apps/cafe/cafe.js';
let js = fs.readFileSync(path, 'utf8');

const svg = {
  utensils: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  chat: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.19 12a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>',
  bike: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>',
  party: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  chef: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M6 13.87A4 4 0 013.13 11 4 4 0 016 4a4 4 0 018 0 4 4 0 012.87 7 4 4 0 01-2.87 2.87V18a2 2 0 01-2 2H8a2 2 0 01-2-2z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
  sound: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>',
  mute: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" width="18" height="18" fill="var(--crimson)" stroke="var(--crimson)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  heartOutline: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>',
  money: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>'
};

// Mute toggle (textContent -> innerHTML)
js = js.replace(/muteBtn\.textContent = video\.muted \? '🔇' : '🔊';/, "muteBtn.innerHTML = video.muted ? `" + svg.mute + "` : `" + svg.sound + "`;");

// Heart toggles
js = js.replace(/heart\.textContent = !liked \? '❤️' : '🤍';/, "heart.innerHTML = !liked ? `" + svg.heartFilled + "` : `" + svg.heartOutline + "`;");
js = js.replace(/lbHeart\.textContent = lbHeart\.textContent === '❤️' \? '🤍' : '❤️';/, "lbHeart.innerHTML = lbHeart.innerHTML.includes('fill=\"var(--crimson)\"') ? `" + svg.heartOutline + "` : `" + svg.heartFilled + "`;");

// Success message
js = js.replace(/fm\.textContent = '✓ Message sent! We\\'ll get back to you soon.';/, "fm.innerHTML = `" + svg.check + "` + ' Message sent! We\\'ll get back to you soon.';");

// Dark mode toggles
js = js.replace(/if \(icon\) icon\.textContent = isDark \? '☀️' : '🌙';/g, "if (icon) icon.innerHTML = isDark ? `" + svg.sun + "` : `" + svg.moon + "`;");

// Sound mode toggle
js = js.replace(/if \(icon\) icon\.textContent = soundOn \? '🔊' : '🔇';/, "if (icon) icon.innerHTML = soundOn ? `" + svg.sound + "` : `" + svg.mute + "`;");

// Spin wheel result
js = js.replace(/resultEl\.textContent = `🎉 You won: \${winner\.label}! Show this to our team\.`;/, "resultEl.innerHTML = `" + svg.party + "` + ` You won: ${winner.label}! Show this to our team.`;");

// Easter egg
js = js.replace(/alert\('🎉 Easter Egg! Use code TASTYSECRET for 10% off your next order! Show this to our team\. 🍽️'\);/, "alert('Easter Egg! Use code TASTYSECRET for 10% off your next order! Show this to our team.');");

// Chatbot messages
js = js.replace(/'⏰ We\\'re open daily from \*\*11 AM to 11 PM\*\*\. Come anytime!'/, "`" + svg.clock + " We're open daily from **11 AM to 11 PM**. Come anytime!`");
js = js.replace(/'⏰ We\\'re open daily from \*\*11 AM to 11 PM\*\*\.'/g, "`" + svg.clock + " We're open daily from **11 AM to 11 PM**.`");
js = js.replace(/'🛵 We deliver via \*\*Zomato & Swiggy\*\*\. Free delivery within 3km on orders above ₹300!'/, "`" + svg.bike + " We deliver via **Zomato & Swiggy**. Free delivery within 3km on orders above ₹300!`");
js = js.replace(/'🏆 Our bestsellers are \*\*Crispy Chilli Starters \(₹309\)\*\*, \*\*Chicken Special \(₹339\)\*\*, and \*\*Naan & Paneer Combo \(₹349\)\*\*!'/, "`" + svg.trophy + " Our bestsellers are **Crispy Chilli Starters (₹309)**, **Chicken Special (₹339)**, and **Naan & Paneer Combo (₹349)**!`");
js = js.replace(/'🍽️ We serve 133\+ dishes — Indian, Chinese, Tandoori & Continental\. Our menu categories are visible on the website!'/, "`" + svg.utensils + " We serve 133+ dishes — Indian, Chinese, Tandoori & Continental. Our menu categories are visible on the website!`");
js = js.replace(/'💰 Our prices range from ₹25 \(Roti\) to ₹599 \(Tandoori\)\. Very affordable!'/, "`" + svg.money + " Our prices range from ₹25 (Roti) to ₹599 (Tandoori). Very affordable!`");
js = js.replace(/'📅 You can book a table via WhatsApp at \+91 620 677 3176 or use the "Book a Table" button!'/, "`" + svg.clock + " You can book a table via WhatsApp at +91 620 677 3176 or use the \"Book a Table\" button!`");
js = js.replace(/'📍 Umber House, 3rd & 4th Floor, Danapur-Khagaul Rd, near Hyundai Showroom, Patna 801503\.'/g, "`" + svg.mapPin + " Umber House, 3rd & 4th Floor, Danapur-Khagaul Rd, near Hyundai Showroom, Patna 801503.`");
js = js.replace(/'📞 Call us: 620 677 3176 \/ 977 147 1115 \/ 778 186 0059'/g, "`" + svg.phone + " Call us: 620 677 3176 / 977 147 1115 / 778 186 0059`");
js = js.replace(/'👨‍🍳 Great question! For the best answers, please WhatsApp us at 620 677 3176\. We\\'re always happy to help!'/g, "`" + svg.chef + " Great question! For the best answers, please WhatsApp us at 620 677 3176. We're always happy to help!`");

// Floating particles emoji array (clear it since we disabled particles but the array is still there)
js = js.replace(/const foods = \['🍕','🍔','🍜','🥗','🍰','🍛','🥘','🍗','🫓','🥤','🍹','🍲','🫚','🌮','🧆','🥙','🫔','🍱','🍣','🥞','🧇','🥓'\];/, "const foods = [];");

fs.writeFileSync(path, js, 'utf8');
console.log('✅ JS emojis replaced with SVGs');
