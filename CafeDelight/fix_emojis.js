// Node.js script to replace all emojis with SVG icons and remove dividers
const fs = require('fs');
const path = 'e:/My Apps/cafe/cafe.html';
let h = fs.readFileSync(path, 'utf8');

// ─── SVG ICON TEMPLATES ───
const svg = {
  utensils: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  chat: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.19 12a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  thumbsUp: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2a3.13 3.13 0 013 3.88z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>',
  bike: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>',
  bowl: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v4"/><path d="M8 22h8"/></svg>',
  truck: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  party: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  camera: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
  chef: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 013.13 11 4 4 0 016 4a4 4 0 018 0 4 4 0 012.87 7 4 4 0 01-2.87 2.87V18a2 2 0 01-2 2H8a2 2 0 01-2-2z"/></svg>',
  pepper: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0112 17a5 5 0 01-3.5-10.5C9.5 5.5 11 5 12 2z"/></svg>',
  timer: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 20 4 20 4s-1 4.5-3 10.1A7 7 0 0111 20z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  users: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
  drumstick: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.45 2.86a4 4 0 015.69 5.69L12 17.69 6.31 12z"/><path d="M6.31 12L2 22l10-4.31"/></svg>',
  disc: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
  home: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>',
  chair: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3"/><path d="M3 11v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2z"/></svg>',
  salad: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>',
  hand: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 00-4 0v5"/><path d="M14 10V4a2 2 0 00-4 0v6"/><path d="M10 10.5V6a2 2 0 00-4 0v8"/><path d="M18 8a2 2 0 014 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15"/></svg>',
};

// ─── HELPER to do all replacements ───
const R = (a, b) => { h = h.split(a).join(b); };

// ═══ REMOVE ALL DIVIDERS ═══
R('<div class="divider sr"></div>', '');
R('<div class="divider"></div>', '');

// ═══ HERO BUTTONS ═══
R('🍽️ Explore Menu', svg.utensils + ' Explore Menu');
R('💬 WhatsApp Order', svg.chat + ' WhatsApp Order');

// ═══ DELIVERY BADGE ═══
R('<span>🛵</span>', '<span>' + svg.bike + '</span>');

// ═══ STATS ═══
R('<div class="stat-icon">🏆</div>', '<div class="stat-icon">' + svg.trophy + '</div>');
R('<div class="stat-icon">⭐</div>', '<div class="stat-icon">' + svg.star + '</div>');
R('<div class="stat-icon">💬</div>', '<div class="stat-icon">' + svg.chat + '</div>');
R('<div class="stat-icon">👍</div>', '<div class="stat-icon">' + svg.thumbsUp + '</div>');

// ═══ ABOUT FEATURES ═══
R('<div class="icon">🍛</div>', '<div class="icon">' + svg.bowl + '</div>');
R('<div class="icon">🔥</div>', '<div class="icon">' + svg.flame + '</div>');
R('<div class="icon">🚚</div>', '<div class="icon">' + svg.truck + '</div>');
R('<div class="icon">🎉</div>', '<div class="icon">' + svg.party + '</div>');

// ═══ FOOD TAGS ═══
R('🔥 Bestseller', svg.flame + ' Bestseller');
R('🍗 Non-Veg', svg.drumstick + ' Non-Veg');
R('🫓 Fresh', svg.leaf + ' Fresh');
R('🥗 Healthy', svg.leaf + ' Healthy');

// ═══ FLIP CARD BACKS ═══
R('🥬 Ingredients', 'Ingredients');
R('<span>🌶️</span>', '<span>' + svg.pepper + '</span>');
R('<span>⏱️</span>', '<span>' + svg.timer + '</span>');
R('<span>🥩</span>', '<span>' + svg.drumstick + '</span>');
R('<span>🍽️</span>', '<span>' + svg.utensils + '</span>');
R('<span>🥦</span>', '<span>' + svg.leaf + '</span>');
R('<span>🍗</span>', '<span>' + svg.drumstick + '</span>');

// ═══ VIDEO CONTROLS ═══
R('>⏸️</button>', '><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></button>');
R('>🔊</button>', '><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg></button>');

// ═══ MENU CATEGORY EMOJIS → SVG ═══
R('<div class="menu-cat-emoji">🥘</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🔥</div>', '<div class="menu-cat-emoji">' + svg.flame + '</div>');
R('<div class="menu-cat-emoji">🥡</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🍗</div>', '<div class="menu-cat-emoji">' + svg.drumstick + '</div>');
R('<div class="menu-cat-emoji">🥚</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🫓</div>', '<div class="menu-cat-emoji">' + svg.utensils + '</div>');
R('<div class="menu-cat-emoji">🍚</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🥣</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🍹</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🥤</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🍰</div>', '<div class="menu-cat-emoji">' + svg.bowl + '</div>');
R('<div class="menu-cat-emoji">🍱</div>', '<div class="menu-cat-emoji">' + svg.utensils + '</div>');

// ═══ TABLE BOOKING CTA ═══
R('🍽️ Reserve Your Table', 'Reserve Your Table');
R('🍽️ Reserve a Table', 'Reserve a Table');

// ═══ GALLERY HOVER ═══
R('🏠 Floral Interior', svg.home + ' Floral Interior');
R('🍗 Crispy Starters', 'Crispy Starters');
R('💺 Cozy Seating', svg.chair + ' Cozy Seating');
R('🍛 Signature Dish', 'Signature Dish');
R('🍗 Chicken Special', 'Chicken Special');
R('🫓 Naan &amp; Curry', 'Naan &amp; Curry');
R('🥗 Fresh Salad', 'Fresh Salad');
R('🎉 Celebration', svg.party + ' Celebration');

// ═══ ORDER SECTION ═══
R('Ready to Order? 🔥', 'Ready to Order?');
R('💬 WhatsApp Order', svg.chat + ' WhatsApp Order');
R('📞 620 677 3176', svg.phone + ' 620 677 3176');
R('📞 977 147 1115', svg.phone + ' 977 147 1115');
R('📞 778 186 0059', svg.phone + ' 778 186 0059');
R('🎡 Spin for a discount!', svg.disc + ' Spin for a discount!');
R('🎡 Spin for a Discount!', svg.disc + ' Spin for a Discount!');

// ═══ CONTACT ICONS ═══
R('<div class="contact-icon">📍</div>', '<div class="contact-icon">' + svg.mapPin + '</div>');
R('<div class="contact-icon">📞</div>', '<div class="contact-icon">' + svg.phone + '</div>');
R('<div class="contact-icon">✉️</div>', '<div class="contact-icon">' + svg.mail + '</div>');
R('<div class="contact-icon">🕐</div>', '<div class="contact-icon">' + svg.clock + '</div>');
R('<div class="contact-icon">🛵</div>', '<div class="contact-icon">' + svg.bike + '</div>');

// ═══ SOCIAL BUTTONS ═══
R('>📸</a>', '>' + svg.camera + '</a>');
R('>💬</a>', '>' + svg.chat + '</a>');
R('>📞</a>', '>' + svg.phone + '</a>');
R('>✉️</a>', '>' + svg.mail + '</a>');

// ═══ FOOTER ═══
R('>📞 620 677 3176</a>', '>' + svg.phone + ' 620 677 3176</a>');
R('>✉️ Email</a>', '>' + svg.mail + ' Email</a>');

// ═══ LIGHTBOX ═══
R('>🔗 Share</button>', '>' + svg.link + ' Share</button>');

// ═══ CHATBOT ═══
R('<span class="chat-icon">💬</span>', '<span class="chat-icon">' + svg.chat + '</span>');
R('<div class="chatbot-avatar">👨‍🍳</div>', '<div class="chatbot-avatar">' + svg.chef + '</div>');
R('👋 Welcome to Cafe Skylite!', 'Welcome to Cafe Skylite!');

// ═══ CHATBOT QUICK REPLIES ═══
R('⏰ Timings', svg.clock + ' Timings');
R('🍽️ Best Dish', svg.utensils + ' Best Dish');
R('🛵 Delivery', svg.bike + ' Delivery');

// ═══ BOOKING MODAL OCCASION OPTIONS ═══
R('🎂 Birthday', 'Birthday');
R('💍 Anniversary', 'Anniversary');
R('💕 Date Night', 'Date Night');
R('💼 Business', 'Business');
R('👨‍👩‍👧 Family', 'Family');

// ═══ SUBMIT LOADER ═══
R('>⏳</span>', '><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="spin-loader"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg></span>');

// ═══ HEARTS → simple text ═══
// Gallery hearts remain as they are (❤️) since they're interactive and emoji-based intentionally

fs.writeFileSync(path, h, 'utf8');
console.log('✅ All emojis replaced with SVGs, all dividers removed.');
