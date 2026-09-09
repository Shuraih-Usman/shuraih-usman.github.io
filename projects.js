/* ═══════════════════════════════════════════════════════════
   PROJECTS PAGE  ·  projects.js
   Infinite scroll + filter + card builder + detail drawer
   ═══════════════════════════════════════════════════════════ */
"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─────────────────── ALL PROJECT DATA ─────────────────── */
const ALL_PROJECTS = [
  {
    id: 1, num: '01', cat: 'fullstack', catLabel: 'SaaS Platform', year: '2025',
    title: 'Ahioma — Multi-Tenant Restaurant & Food SaaS',
    desc: 'Feature-rich multi-tenant SaaS platform for restaurants with independent business accounts, order dispatching, food management, and analytics.',
    longDesc: 'Ahioma is a feature-rich, multi-tenant SaaS platform built for restaurants, eateries, and food businesses using Node.js, Express, React, and PostgreSQL. It implements a multi-tenant architecture supporting independent business accounts, modules for restaurant operations, food catalog management, orders, customer tracking, and customizable dashboards.',
    images: ['images/proj-food.jpg', 'images/proj-analytics.jpg', 'images/proj-ecommerce.jpg'],
    features: [
      'Multi-tenant architecture supporting independent business accounts',
      'Restaurant operations, food management & pricing catalogs',
      'Order processing, tracking & customer administration',
      'Reusable dashboards & customizable business workflows',
      'RESTful APIs with PostgreSQL database optimization',
      'End-to-end deployment support & Git workflows',
    ],
    tags: ['Node.js', 'Express.js', 'React.js', 'PostgreSQL', 'REST APIs', 'Tailwind CSS'],
    img: 'images/proj-food.jpg',
    live: '#', code: '#',
  },
  {
    id: 2, num: '02', cat: 'fullstack', catLabel: 'EdTech SaaS', year: '2025',
    title: 'Skolentra — School Management SaaS with AI',
    desc: 'Multi-tenant school management SaaS with AI features, online CBT exams, timetables, and multi-currency billing (NGN, USD, INR).',
    longDesc: 'Skolentra is a comprehensive multi-tenant school management SaaS platform built with Laravel and PHP. It supports administrators, teachers, students, parents, staff, finance, library, registration, and examination roles. Includes AI-powered features, online CBT exams, CA timetables, term results, role-based ID cards, and multi-currency billing.',
    images: ['images/product-skolentra.jpg', 'images/proj-education.jpg', 'images/proj-analytics.jpg'],
    features: [
      'Multi-tenant school management supporting all major administrative roles',
      'AI-powered education tools and administrative assistance',
      'Online CBT examinations, exam & CA timetables, and automated results',
      'Multi-currency payment recording (NGN, USD, INR) with online/offline support',
      'Role-based ID cards and customizable student result templates',
      'Full RESTful API backend with MySQL query optimization',
    ],
    tags: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'REST APIs', 'JavaScript', 'AI'],
    img: 'images/product-skolentra.jpg',
    live: '#', code: '#',
  },
  {
    id: 3, num: '03', cat: 'backend', catLabel: 'POS & ERP', year: '2024',
    title: 'OnTrack.ng — Business Management & POS Platform',
    desc: 'Business management and Point-of-Sale platform supporting business operations, sales, inventory, and database-driven business processes.',
    longDesc: 'OnTrack.ng is a robust business management and Point-of-Sale (POS) platform supporting retail and commercial business operations, sales recording, multi-category inventory, and transaction workflows. Built with Laravel and PHP to provide high-reliability API services and backend database communication.',
    images: ['images/proj-analytics.jpg', 'images/proj-kanban.jpg', 'images/proj-finance.jpg'],
    features: [
      'Point-of-Sale (POS) cash register and sales workflow automation',
      'Inventory management, stock tracking, and supplier logs',
      'Backend API services for reliable communication with central database',
      'Transaction-related functionality & automated financial accounting',
      'Database-driven business reporting & analytics export',
      'Role-based staff permissions and transaction audits',
    ],
    tags: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'JavaScript'],
    img: 'images/proj-analytics.jpg',
    live: '#', code: '#',
  },
  {
    id: 4, num: '04', cat: 'mobile', catLabel: 'Fintech & VTU', year: '2024',
    title: 'Billing.ng — VTU & Utility Payment Platform',
    desc: 'Digital payment platform supporting airtime, data, electricity, cable TV, exam PINs, and digital café services with React Native app.',
    longDesc: 'Billing.ng is an automated digital VTU and utility payment platform built with Laravel, PHP, MySQL, and React Native. Supports automated transactions for airtime, data bundles, cable TV subscriptions, electricity token purchases, JAMB/WAEC exam PINs, and digital café services through third-party API integrations.',
    images: ['images/proj-finance.jpg', 'images/proj-ecommerce.jpg', 'images/proj-food.jpg'],
    features: [
      'Automated transaction processing for airtime, internet data, and cable TV',
      'Electricity bill payments and instant token delivery',
      'JAMB, WAEC, and NECO exam PIN generation and vending',
      'Digital wallet, transaction tracking, and payment gateway backend',
      'Third-party service API integration with automated webhooks',
      'Cross-platform mobile application developed with React Native',
    ],
    tags: ['Laravel', 'PHP', 'React Native', 'MySQL', 'REST APIs', 'Payment Gateways'],
    img: 'images/proj-finance.jpg',
    live: '#', code: '#',
  },
  {
    id: 5, num: '05', cat: 'mobile', catLabel: 'Digital Media', year: '2023',
    title: 'Magajin Wilbafos — Publishing & Audiobook Platform',
    desc: 'Web and mobile digital literature and audiobook distribution platform featuring virtual coin wallet and push notifications.',
    longDesc: 'Magajin Wilbafos is a specialized web and mobile platform for digital literature, eBooks, and audiobook distribution. It features a standalone virtual currency system that users purchase and spend to unlock premium chapters and audio content, complete with Firebase Cloud Messaging (FCM) push notifications.',
    images: ['images/product-novel-engine.jpg', 'images/proj-kanban.jpg', 'images/proj-education.jpg'],
    features: [
      'Digital literature and audiobook streaming and distribution',
      'Standalone virtual currency & wallet system for in-app purchases',
      'Integrated payment processing and access control for premium audio',
      'Real-time mobile push notifications via Firebase Cloud Messaging (FCM)',
      'Chapter bookmarking, reading progress, and audio playback state',
      'Author publishing portal with royalty and sales analytics',
    ],
    tags: ['Laravel', 'PHP', 'React Native', 'MySQL', 'REST APIs', 'Firebase FCM'],
    img: 'images/product-novel-engine.jpg',
    live: '#', code: '#',
  },
  {
    id: 6, num: '06', cat: 'fullstack', catLabel: 'Publishing CMS', year: '2024',
    title: 'Novel Engine V2 — PHP Fiction Reading Platform',
    desc: 'Multipurpose PHP novel and fiction platform with multi-genre catalog, chapter reader with dark mode, and admin control.',
    longDesc: 'Novel Engine V2 is a versatile web publishing platform designed for fiction authors and novel communities. Features an intuitive reading experience with custom typography and dark mode, author submission pipelines, chapter-based monetization, and SEO optimization.',
    images: ['images/product-novel-engine.jpg', 'images/product-blogpulse.jpg', 'images/proj-ecommerce.jpg'],
    features: [
      'Multi-genre library with nested categorization',
      'User authentication, profile bookmarks, and reading history',
      'Custom chapter reader with dark mode and font adjustments',
      'Admin dashboard for managing authors, stories, and chapters',
      'Monetization modules for subscriptions and pay-per-chapter',
      'SEO-friendly URLs and Open Graph social sharing tags',
    ],
    tags: ['PHP', 'MySQL', 'Bootstrap', 'AJAX', 'jQuery'],
    img: 'images/product-novel-engine.jpg',
    live: '#', code: '#',
  },
  {
    id: 7, num: '07', cat: 'fullstack', catLabel: 'E-Commerce', year: '2024',
    title: 'VendorHub — Multi-Vendor Marketplace',
    desc: 'Multi-vendor e-commerce marketplace supporting vendor storefronts, commission payouts, and payment gateway integration.',
    longDesc: 'VendorHub is an online multi-vendor marketplace engine built with Laravel and PHP. It provides individual merchant storefronts, automated commission calculations, order fulfillment workflows, customer reviews, and integrated Stripe/Paystack payment processing.',
    images: ['images/product-vendorhub.jpg', 'images/proj-ecommerce.jpg', 'images/proj-analytics.jpg'],
    features: [
      'Independent vendor registration, storefronts, and catalog management',
      'Commission-based payout system with transaction records',
      'Stripe & Paystack payment integrations with multi-currency support',
      'Order fulfillment status timeline and tracking updates',
      'Customer review and product rating mechanisms',
      'Super-admin oversight panel with full marketplace governance',
    ],
    tags: ['PHP', 'Laravel', 'MySQL', 'Stripe', 'Paystack', 'Tailwind CSS'],
    img: 'images/product-vendorhub.jpg',
    live: '#', code: '#',
  },
  {
    id: 8, num: '08', cat: 'frontend', catLabel: 'CMS & Blog', year: '2023',
    title: 'BlogPulse Pro — Advanced CMS & Editorial Platform',
    desc: 'Modern editorial content management platform with rich text editor, SEO metadata fields, and newsletter broadcasts.',
    longDesc: 'BlogPulse Pro is a high-speed blogging and content management system developed for publishers. It includes a customized TinyMCE WYSIWYG editor, category hierarchy, comment spam protection, tag filtering, and built-in SEO tools.',
    images: ['images/product-blogpulse.jpg', 'images/proj-analytics.jpg', 'images/proj-education.jpg'],
    features: [
      'Rich text editor with multimedia asset management',
      'Category and tag taxonomy with nested relationships',
      'Automated sitemaps, Open Graph tags, and SEO optimization',
      'Newsletter subscriber list collection and email broadcasts',
      'Multi-author team collaboration with role permissions',
      'Fast caching layer for high-traffic publishing loads',
    ],
    tags: ['PHP', 'MySQL', 'TinyMCE', 'SEO', 'JavaScript'],
    img: 'images/product-blogpulse.jpg',
    live: '#', code: '#',
  },
    longDesc: 'FinFlow is a personal finance management app that connects to bank accounts via the Plaid API. It categorises transactions automatically, provides spending analytics with charts, helps users set and track savings goals, and sends smart budget alerts when thresholds are reached.',
    features: [
      'Bank account connection via Plaid API',
      'Automatic transaction categorisation with ML',
      'Visual spending analytics & monthly reports',
      'Savings goals tracker with milestone alerts',
      'Smart budget alerts & overspending warnings',
      'Export transactions as PDF & CSV statements',
    ],
    tags: ['Angular', 'Node.js', 'PostgreSQL', 'Plaid API', 'Chart.js', 'TypeScript'],
    img: 'images/proj-finance.jpg',
    live: '#', code: '#',
  },
  {
    id: 9, num: '09', cat: 'frontend', catLabel: 'Frontend', year: '2023',
    title: 'ChatConnect Messenger',
    desc: 'Real-time messaging app with group chats, file sharing, voice messages, read receipts, and end-to-end encryption.',
    longDesc: 'ChatConnect is a real-time messaging web app built with React and Socket.io. It supports one-on-one and group conversations, file & image sharing, voice message recording, typing indicators, read receipts, message reactions, and end-to-end encryption powered by the Signal Protocol.',
    features: [
      'Real-time messaging with Socket.io',
      'Group chats with admin controls & roles',
      'File, image & voice message sharing',
      'Read receipts & typing indicators',
      'Message reactions & reply threads',
      'End-to-end encryption (Signal Protocol)',
    ],
    tags: ['React', 'Socket.io', 'Firebase', 'WebRTC', 'Tailwind', 'Redux'],
    img: 'images/proj-analytics.jpg',
    live: '#', code: '#',
  },
  {
    id: 10, num: '10', cat: 'backend', catLabel: 'Backend', year: '2023',
    title: 'NewsHub API Portal',
    desc: 'Scalable news aggregation API with automated content scraping, NLP categorisation, and personalised feed recommendations.',
    longDesc: 'NewsHub is a high-performance news aggregation REST API built with Django REST Framework. It auto-scrapes 50+ news sources using Celery workers, uses NLP to categorise articles, generates personalised user feeds via a recommendation engine, and serves 1M+ requests per day.',
    features: [
      'Automated scraping of 50+ news sources',
      'NLP-powered article categorisation (NLTK)',
      'Personalised recommendation engine',
      'Full-text search with Elasticsearch',
      'Rate-limited REST API with JWT auth',
      'Admin portal for source management',
    ],
    tags: ['Python', 'Django REST', 'PostgreSQL', 'Celery', 'Redis', 'Elasticsearch'],
    img: 'images/proj-ecommerce.jpg',
    live: '#', code: '#',
  },
  {
    id: 11, num: '11', cat: 'frontend', catLabel: 'Frontend', year: '2022',
    title: 'WeatherSphere App',
    desc: 'Beautifully animated weather app with 7-day forecasts, hourly breakdowns, UV index, and geolocation detection.',
    longDesc: 'WeatherSphere is a visually stunning weather application that fetches live data from the OpenWeatherMap API. It features smooth GSAP-powered animations that reflect current conditions, 7-day & hourly forecasts, UV index, air quality index, and auto-detects the user\'s location.',
    features: [
      'Live weather data from OpenWeatherMap API',
      'GSAP-powered condition animations (rain, sun, snow)',
      '7-day forecast & hourly breakdown',
      'UV index & air quality monitoring',
      'Auto geolocation & manual city search',
      'Temperature unit toggle (°C / °F)',
    ],
    tags: ['React', 'OpenWeather API', 'GSAP', 'CSS Animations', 'Vite'],
    img: 'images/proj-kanban.jpg',
    live: '#', code: '#',
  },
  {
    id: 12, num: '12', cat: 'mobile', catLabel: 'Mobile', year: '2021',
    title: 'PortfolioBuilder App',
    desc: 'Drag-and-drop portfolio builder for creatives. Custom themes, live preview, one-click export, and Firebase hosting.',
    longDesc: 'PortfolioBuilder is a mobile-first app that lets creatives build professional portfolios without code. It features a drag-and-drop section editor, 10+ premium themes, real-time live preview, custom domain support, and one-click publish to Firebase Hosting.',
    features: [
      'Drag-and-drop section editor with Reanimated',
      '10+ premium dark & light themes',
      'Real-time live preview on device',
      'Custom domain mapping support',
      'One-click publish to Firebase Hosting',
      'Analytics dashboard for portfolio visitors',
    ],
    tags: ['React Native', 'Firebase', 'Expo', 'Reanimated', 'TypeScript'],
    img: 'images/proj-food.jpg',
    live: '#', code: '#',
  },
];

/* ─────────────────── STATE ─────────────────── */
const PER_PAGE    = 6;
let page          = 0;
let filtered      = [...ALL_PROJECTS];
let activeFilter  = 'all';
let loading       = false;
let allLoaded     = false;

/* ─────────────────── DOM REFS ─────────────────── */
const grid      = $('#apGrid');
const sentinel  = $('#apSentinel');
const spinner   = $('#apSpinner');
const endMsg    = $('#apEndMsg');
const noResults = $('#apNoResults');
const filterBar = $('#apFilters');

/* ═══════════════════════════════════════════════════════════
   CARD BUILDER
   ═══════════════════════════════════════════════════════════ */
function buildCard(proj, delay) {
  const el = document.createElement('article');
  el.className = 'pcard';
  el.setAttribute('role', 'listitem');
  el.style.transitionDelay = delay + 's';

  el.innerHTML = `
    <div class="pcard-img-wrap">
      <img
        src="${proj.img}"
        alt="${proj.title} — screenshot"
        class="pcard-img"
        loading="lazy"
        decoding="async"
        onerror="this.src='images/proj-analytics.jpg'"
      />
      <div class="pcard-overlay" aria-hidden="true">
        <a href="${proj.live}" class="pcard-live-btn" target="_blank" rel="noopener" tabindex="-1">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> 
        </a>
        <button class="pcard-detail-btn" data-proj-id="${proj.id}" tabindex="-1">
          <i class="fa-solid fa-eye"></i> 
        </button>
        <a href="${proj.code}" class="pcard-code-btn" target="_blank" rel="noopener" tabindex="-1">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
      <span class="pcard-badge pcard-cat-badge">${proj.catLabel}</span>
      <span class="pcard-badge pcard-year-badge">${proj.year}</span>
    </div>
    <div class="pcard-info">
      <h3 class="pcard-title">${proj.title}</h3>
      <p class="pcard-desc">${proj.desc}</p>
      <div class="pcard-tags">
        ${proj.tags.slice(0, 5).map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>
  `;

  /* Also open drawer when clicking the card body */
  el.querySelector('.pcard-info').addEventListener('click', () => openDrawer(proj));
  el.querySelector('.pcard-detail-btn').addEventListener('click', () => openDrawer(proj));

  return el;
}

/* ═══════════════════════════════════════════════════════════
   PROJECT DETAIL DRAWER
   ═══════════════════════════════════════════════════════════ */
const drawer     = $('#apDrawer');
const apdBackdrop = $('#apdBackdrop');
const apdClose   = $('#apdClose');
const apdBody    = $('#apdBody');

function openDrawer(proj) {
  apdBody.innerHTML = buildDrawerHTML(proj);
  initGallery(apdBody);
  drawer.classList.add('apd-open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('apd-open');
  document.body.style.overflow = '';
}

function buildDrawerHTML(p) {
  const imgs   = p.images || [p.img];
  const slides = imgs.map((src, i) =>
    `<div class="pg-slide${i===0?' pg-active':''}" data-idx="${i}"><img src="${src}" alt="${p.title} screenshot ${i+1}" loading="${i===0?'eager':'lazy'}" onerror="this.src='images/proj-ecommerce.jpg'"/></div>`
  ).join('');
  const dots = imgs.map((_, i) =>
    `<button class="pg-dot${i===0?' pg-dot-active':''}" data-goto="${i}" aria-label="Slide ${i+1}"></button>`
  ).join('');

  return `
    <div class="pd-gallery" id="pdGallery">
      <div class="pg-track" id="pgTrack">${slides}</div>
      ${imgs.length > 1 ? `
        <button class="pg-arrow pg-prev" id="pgPrev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="pg-arrow pg-next" id="pgNext" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="pg-dots" id="pgDots">${dots}</div>
        <span class="pg-counter" id="pgCounter">1 / ${imgs.length}</span>` : ''}
      <div class="pg-badges">
        <span class="pcard-badge pcard-cat-badge">${p.catLabel}</span>
        <span class="pcard-badge pcard-year-badge">${p.year}</span>
      </div>
    </div>

    <div class="apd-content">
      <div class="apd-eyebrow">
        <span class="apd-num">${p.num}</span>
        <div class="apd-meta">
          <span class="apd-year">${p.year}</span>
          <h2 class="apd-title">${p.title}</h2>
        </div>
      </div>
      <div class="apd-divider"></div>
      <p class="apd-desc">${p.longDesc}</p>
      <p class="apd-feat-head">Key Features</p>
      <ul class="apd-feat-list">
        ${p.features.map(f => `<li><i class="fa-solid fa-circle-check"></i>${f}</li>`).join('')}
      </ul>
      <div class="apd-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="apd-actions">
        <a href="${p.live}" class="apd-btn-live" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
        </a>
        <a href="${p.code}" class="apd-btn-code" target="_blank" rel="noopener">
          <i class="fa-brands fa-github"></i> Source Code
        </a>
      </div>
    </div>
  `;
}

/* Close triggers */
apdClose?.addEventListener('click', closeDrawer);
apdBackdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer?.classList.contains('apd-open')) closeDrawer();
});

/* ═══════════════════════════════════════════════════════════
   INFINITE SCROLL — LOAD BATCH
   ═══════════════════════════════════════════════════════════ */
function loadMore() {
  if (loading || allLoaded) return;
  loading = true;
  spinner.hidden = false;

  const start = page * PER_PAGE;
  const batch = filtered.slice(start, start + PER_PAGE);

  setTimeout(() => {
    if (batch.length === 0) {
      allLoaded = true;
      spinner.hidden = true;
      endMsg.hidden = false;
      loading = false;
      return;
    }

    batch.forEach((proj, i) => {
      const card = buildCard(proj, i * 0.07);
      grid.appendChild(card);
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('pcard-in')));
    });

    page++;
    loading = false;
    spinner.hidden = true;

    if (page * PER_PAGE >= filtered.length) {
      allLoaded = true;
      endMsg.hidden = false;
      observer.disconnect();
    }
  }, page === 0 ? 0 : 480);
}

/* ─────────────────── INTERSECTION OBSERVER ─────────────────── */
const observer = new IntersectionObserver(
  entries => { if (entries[0].isIntersecting) loadMore(); },
  { rootMargin: '250px' }
);
observer.observe(sentinel);

/* ═══════════════════════════════════════════════════════════
   FILTER LOGIC
   ═══════════════════════════════════════════════════════════ */
function applyFilter(cat) {
  activeFilter = cat;
  filtered = cat === 'all' ? [...ALL_PROJECTS] : ALL_PROJECTS.filter(p => p.cat === cat);

  page = 0; allLoaded = false; loading = false;
  grid.innerHTML = '';
  endMsg.hidden = true; noResults.hidden = true; spinner.hidden = true;

  if (filtered.length === 0) { noResults.hidden = false; return; }

  observer.observe(sentinel);
  loadMore();
}

filterBar?.addEventListener('click', e => {
  const btn = e.target.closest('.apf-btn');
  if (!btn) return;
  $$('.apf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter(btn.dataset.filter);
});

/* ─────────────────── STICKY FILTER SHADOW ─────────────────── */
(function () {
  const wrap = $('#apFiltersWrap');
  if (!wrap) return;
  const obs = new IntersectionObserver(
    ([e]) => wrap.classList.toggle('is-stuck', e.intersectionRatio < 1),
    { threshold: [1], rootMargin: '-65px 0px 0px 0px' }
  );
  obs.observe(wrap);
})();

/* ─────────────────── COUNTER ANIMATION ─────────────────── */
(function () {
  $$('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const step   = target / (1400 / 16);
    let current  = 0;
    const iv = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(iv); }
      el.textContent = Math.floor(current);
    }, 16);
  });
})();

/* ─────────────────── NAV SCROLL ─────────────────── */
(function () {
  const nav    = $('#nav');
  const toggle = $('#navToggle');
  const mob    = $('#mobileMenu');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mob?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('[data-close]', mob || document).forEach(l => {
    l.addEventListener('click', () => {
      toggle?.classList.remove('open');
      mob?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─────────────────── CUSTOM CURSOR ─────────────────── */
(function () {
  const c = $('#cursor');
  const f = $('#cursorFollower');
  if (!c || !f || window.matchMedia('(pointer: coarse)').matches) {
    c?.style && (c.style.display = 'none');
    f?.style && (f.style.display = 'none');
    return;
  }
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    c.style.left = mx + 'px'; c.style.top = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    f.style.left = fx + 'px'; f.style.top = fy + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ─────────────────── SMOOTH SCROLL + FOOTER YEAR ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
const fyEl = $('#footerYear');
if (fyEl) fyEl.textContent = new Date().getFullYear();

/* ─────────────────── SHARED GALLERY ─────────────────── */
function initGallery(ctx) {
  const track   = ctx.querySelector('#pgTrack');
  const prevBtn = ctx.querySelector('#pgPrev');
  const nextBtn = ctx.querySelector('#pgNext');
  const dotsEl  = ctx.querySelector('#pgDots');
  const counter = ctx.querySelector('#pgCounter');
  const slides  = [...ctx.querySelectorAll('.pg-slide')];
  if (!track || slides.length < 2) return;

  let current = 0;

  function goTo(n) {
    slides[current].classList.remove('pg-active');
    dotsEl?.querySelectorAll('.pg-dot')[current]?.classList.remove('pg-dot-active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('pg-active');
    dotsEl?.querySelectorAll('.pg-dot')[current]?.classList.add('pg-dot-active');
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dotsEl?.querySelectorAll('.pg-dot').forEach(dot =>
    dot.addEventListener('click', () => goTo(+dot.dataset.goto))
  );

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });
}

/* ─────────────────── INIT ─────────────────── */
loadMore();
