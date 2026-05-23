/* ═══════════════════════════════════════════════════════════
   SHOP / PRODUCTS PAGE  ·  shop.js
   ═══════════════════════════════════════════════════════════ */
'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ═══════════════════════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Novel Engine V2',
    tagline: 'Multipurpose PHP Novel & Fiction Reading Platform',
    category: 'PHP Script', cat: 'php',
    price: 49, oldPrice: 79,
    sales: 248, rating: 4.8, reviews: 67,
    badge: 'bestseller', badgeLabel: 'Best Seller',
    img: 'images/product-novel-engine.jpg',
    demoUrl: '#', buyUrl: '#',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'AJAX', 'jQuery'],
    desc: 'Novel Engine V2 is a fully featured online novel and fiction reading platform. Readers can browse by genre, bookmark chapters, track reading progress, and leave reviews. Authors and admins manage content via a powerful backend. Monetise through Google Ads, subscription tiers, or pay-per-chapter.',
    features: [
      'Multi-genre library with nested categories',
      'User authentication, profiles & reading history',
      'Chapter-by-chapter reader with dark mode',
      'Full admin dashboard — authors, novels, chapters',
      'Monetisation: Ads, subscriptions & pay-per-read',
      'SEO-friendly URLs & Open Graph meta tags',
      'Comment & rating system per novel/chapter',
      'Mobile-first responsive design',
    ],
  },
  {
    id: 2,
    name: 'Skolentra',
    tagline: 'Complete School Management System',
    category: 'Laravel · PHP', cat: 'laravel education',
    price: 79, oldPrice: 129,
    sales: 183, rating: 4.9, reviews: 52,
    badge: 'featured', badgeLabel: 'Featured',
    img: 'images/product-skolentra.jpg',
    demoUrl: '#', buyUrl: '#',
    tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Chart.js'],
    desc: 'Skolentra is a comprehensive school management system covering every aspect of school administration. From student enrollment and attendance tracking to grade management, parent portal, fee collection, timetable generation, and detailed analytics reports — all in one clean, modern dashboard.',
    features: [
      'Student enrollment & profile management',
      'Attendance tracking with SMS notifications',
      'Grade entry, report cards & transcript generation',
      'Parent portal with real-time child progress',
      'Fee collection, invoicing & payment tracking',
      'Timetable & class schedule generator',
      'Teacher & staff HR management',
      'Analytics dashboard with exportable PDF reports',
    ],
  },
  {
    id: 3,
    name: 'VendorHub',
    tagline: 'Multi-Vendor E-Commerce Marketplace',
    category: 'Laravel · PHP', cat: 'laravel ecommerce',
    price: 89, oldPrice: 149,
    sales: 94, rating: 4.7, reviews: 31,
    badge: 'new', badgeLabel: 'New',
    img: 'images/product-vendorhub.jpg',
    demoUrl: '#', buyUrl: '#',
    tags: ['PHP', 'Laravel', 'MySQL', 'Stripe', 'Paystack'],
    desc: 'VendorHub lets you build your own Amazon or Jumia-style multi-vendor marketplace. Vendors register, list products, and manage orders independently while you earn commission. Supports Stripe and Paystack payments, real-time order tracking, product reviews, and a powerful super-admin panel.',
    features: [
      'Vendor registration, approval & profile pages',
      'Commission-based payout management',
      'Stripe & Paystack payment gateway integration',
      'Product listing, inventory & variation management',
      'Order tracking with status timeline',
      'Customer review & rating system per product',
      'Vendor analytics — sales, revenue & top products',
      'Super admin panel with full marketplace control',
    ],
  },
  {
    id: 4,
    name: 'BlogPulse Pro',
    tagline: 'Advanced PHP Blog & Content Management Platform',
    category: 'PHP Script', cat: 'php',
    price: 35, oldPrice: 59,
    sales: 312, rating: 4.6, reviews: 89,
    badge: null, badgeLabel: null,
    img: 'images/product-blogpulse.jpg',
    demoUrl: '#', buyUrl: '#',
    tags: ['PHP', 'MySQL', 'TinyMCE', 'SEO', 'AJAX'],
    desc: 'BlogPulse Pro is a powerful blog and CMS system for content creators, news portals, and digital publications. Features a rich TinyMCE editor, category and tag management, comment moderation, newsletter integration, and built-in SEO tools to help your content rank.',
    features: [
      'Rich text editor with TinyMCE & media uploads',
      'Category & tag management with nested support',
      'Comment moderation with spam protection',
      'Built-in SEO — meta fields, sitemaps, Open Graph',
      'Newsletter subscription & broadcast system',
      'Social sharing & author profile pages',
      'Multi-author support with permission levels',
      'Google Analytics integration dashboard',
    ],
  },
  {
    id: 5,
    name: 'EventFlow',
    tagline: 'Online Event Ticketing & Management Script',
    category: 'PHP Script', cat: 'php ecommerce',
    price: 55, oldPrice: 89,
    sales: 71, rating: 4.8, reviews: 24,
    badge: 'hot', badgeLabel: 'Hot',
    img: 'images/product-eventflow.jpg',
    demoUrl: '#', buyUrl: '#',
    tags: ['PHP', 'MySQL', 'QR Code', 'Paystack', 'Stripe'],
    desc: 'EventFlow is a complete event creation and ticketing platform. Organisers create events with multiple ticket tiers, seat maps, and pricing. Attendees purchase tickets, receive QR code e-tickets by email, and check in via the mobile-friendly scan interface. Real-time sales analytics included.',
    features: [
      'Event creation with unlimited ticket tiers',
      'Interactive seat selection map builder',
      'QR code e-ticket generation & email delivery',
      'Paystack & Stripe payment integration',
      'Mobile-friendly QR scanner for check-in',
      'Real-time ticket sales analytics & charts',
      'Attendee list export (CSV / PDF)',
      'Organiser dashboard with payout management',
    ],
  },
  {
    id: 6,
    name: 'PropNest CMS',
    tagline: 'Real Estate Property Portal & Listing Script',
    category: 'PHP Script', cat: 'php',
    price: 69, oldPrice: 109,
    sales: 58, rating: 4.7, reviews: 18,
    badge: null, badgeLabel: null,
    img: 'images/product-propnest.jpg',
    demoUrl: '#', buyUrl: '#',
    tags: ['PHP', 'MySQL', 'Google Maps', 'Bootstrap', 'AJAX'],
    desc: 'PropNest CMS is a complete real estate web portal with property listings, advanced search filters, virtual tour support, a built-in mortgage calculator, and inquiry management. Supports agent profiles, property approval workflows, and a Google Maps-integrated property search.',
    features: [
      'Property listing with rich media gallery',
      'Advanced filter: price, area, bedrooms, type',
      'Google Maps-integrated property location search',
      'Virtual tour URL & 360° image support',
      'Built-in mortgage calculator with live rates',
      'Agent profile pages with contact & inquiry forms',
      'Property comparison tool (up to 4 listings)',
      'Admin panel — listing approval & agent management',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════ */
let filtered = [...PRODUCTS];
let activeFilter = 'all';

/* ═══════════════════════════════════════════════════════════
   DOM REFS
   ═══════════════════════════════════════════════════════════ */
const grid        = $('#shGrid');
const filterBar   = $('#shFilters');
const sortSel     = $('#shSort');
const noResults   = $('#shNoResults');
const resultsCount= $('#shResultsCount');
const drawer      = $('#shDrawer');
const shdBody     = $('#shdBody');
const shdClose    = $('#shdClose');
const shdBd       = $('#shdBackdrop');

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */
function stars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '<i class="fa-solid fa-star"></i>'.repeat(full) +
         (half ? '<i class="fa-solid fa-star-half-stroke"></i>' : '') +
         '<i class="fa-regular fa-star"></i>'.repeat(empty);
}

function discount(price, old) {
  return Math.round((1 - price / old) * 100);
}

/* ═══════════════════════════════════════════════════════════
   CARD BUILDER — horizontal landscape layout
   ═══════════════════════════════════════════════════════════ */
function buildCard(p, delay) {
  const el = document.createElement('article');
  el.className = 'shcard';
  el.setAttribute('role', 'listitem');
  el.style.transitionDelay = delay + 's';
  el.dataset.id = p.id;

  const badgeHTML = p.badge
    ? `<span class="shcard-badge badge-${p.badge}">${p.badgeLabel}</span>`
    : '';
  const disc = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  el.innerHTML = `
    <!-- Image column -->
    <div class="shcard-img-wrap">
      <img src="${p.img}" alt="${p.name}" class="shcard-img" loading="lazy"
           onerror="this.src='images/product-novel-engine.jpg'" />
      <div class="shcard-img-fade"></div>
      <div class="shcard-badge-wrap">${badgeHTML}</div>
    </div>

    <!-- Info column -->
    <div class="shcard-body">
      <div class="shcard-head">
        <div class="shcard-head-left">
          <p class="shcard-cat">${p.category}</p>
          <h3 class="shcard-name">${p.name}</h3>
        </div>
        <div class="shcard-price-block">
          <span class="shcard-price">$${p.price}</span>
          ${p.oldPrice ? `<span class="shcard-old-price">$${p.oldPrice}</span>` : ''}
        </div>
      </div>

      <p class="shcard-tagline">${p.tagline}</p>

      <div class="shcard-meta">
        <span class="shcard-stars">${stars(p.rating)}</span>
        <span class="shcard-rating-val">${p.rating}</span>
        <span class="shcard-reviews">(${p.reviews})</span>
        <span class="shcard-meta-sep">·</span>
        <span class="shcard-sales">${p.sales} sales</span>
      </div>

      <div class="shcard-tags">
        ${p.tags.slice(0, 5).map(t => `<span>${t}</span>`).join('')}
      </div>

      <div class="shcard-footer">
        <span class="shcard-sales-badge">
          <i class="fa-solid fa-download"></i>
          ${p.sales} purchases
          ${disc ? `&nbsp;·&nbsp;<span style="color:var(--teal)">${disc}% off</span>` : ''}
        </span>
        <div class="shcard-ctas">
          <a href="${p.buyUrl}" class="shcard-btn-buy" target="_blank" rel="noopener"
             onclick="event.stopPropagation()">
            <i class="fa-solid fa-cart-shopping"></i> Buy $${p.price}
          </a>
          <a href="${p.demoUrl}" class="shcard-btn-demo" target="_blank" rel="noopener"
             onclick="event.stopPropagation()">
            <i class="fa-solid fa-eye"></i> Demo
          </a>
        </div>
      </div>
    </div>
  `;

  el.addEventListener('click', () => openDrawer(p));
  return el;
}

/* ═══════════════════════════════════════════════════════════
   RENDER
   ═══════════════════════════════════════════════════════════ */
function renderGrid() {
  grid.innerHTML = '';
  noResults.hidden = true;

  if (filtered.length === 0) {
    noResults.hidden = false;
    if (resultsCount) resultsCount.innerHTML = 'Showing <span>0</span> products';
    return;
  }

  if (resultsCount) {
    resultsCount.innerHTML = `Showing <span>${filtered.length}</span> product${filtered.length !== 1 ? 's' : ''}`;
  }

  filtered.forEach((p, i) => {
    const card = buildCard(p, i * 0.07);
    grid.appendChild(card);
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('shcard-in')));
  });
}

/* ═══════════════════════════════════════════════════════════
   FILTER + SORT
   ═══════════════════════════════════════════════════════════ */
function applyFilterSort() {
  let result = activeFilter === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.cat.includes(activeFilter));

  const sort = sortSel?.value || 'popular';
  if      (sort === 'popular')    result.sort((a, b) => b.sales - a.sales);
  else if (sort === 'newest')     result.sort((a, b) => b.id - a.id);
  else if (sort === 'price-low')  result.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') result.sort((a, b) => b.price - a.price);

  filtered = result;
  renderGrid();
}

filterBar?.addEventListener('click', e => {
  const btn = e.target.closest('.shf-btn');
  if (!btn) return;
  $$('.shf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  applyFilterSort();
});

sortSel?.addEventListener('change', applyFilterSort);

/* Sticky toolbar shadow */
(function () {
  const wrap = $('#shToolbarWrap');
  if (!wrap) return;
  const obs = new IntersectionObserver(
    ([e]) => wrap.classList.toggle('is-stuck', e.intersectionRatio < 1),
    { threshold: [1], rootMargin: '-65px 0px 0px 0px' }
  );
  obs.observe(wrap);
})();

/* ═══════════════════════════════════════════════════════════
   PRODUCT DETAIL DRAWER
   ═══════════════════════════════════════════════════════════ */
function openDrawer(p) {
  shdBody.innerHTML = buildDrawerHTML(p);
  drawer.classList.add('shd-open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('shd-open');
  document.body.style.overflow = '';
}

function buildDrawerHTML(p) {
  const disc = p.oldPrice ? discount(p.price, p.oldPrice) : 0;
  const featHTML = p.features.map(f =>
    `<li><i class="fa-solid fa-circle-check"></i>${f}</li>`
  ).join('');
  const tagsHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  const badgeHTML = p.badge
    ? `<span class="shcard-badge badge-${p.badge}">${p.badgeLabel}</span>`
    : '';

  return `
    <!-- Image -->
    <div class="shd-img-wrap">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='images/product-novel-engine.jpg'" />
      <div class="shd-img-gradient"></div>
      <div class="shd-img-badges">${badgeHTML}</div>
    </div>

    <div class="shd-content">

      <!-- Header -->
      <div class="shd-header">
        <p class="shd-cat">${p.category}</p>
        <h2 class="shd-name">${p.name}</h2>
        <p class="shd-tagline">${p.tagline}</p>
      </div>

      <!-- Price & Rating -->
      <div class="shd-price-row">
        <span class="shd-price">$${p.price}</span>
        ${p.oldPrice ? `<span class="shd-old-price">$${p.oldPrice}</span>` : ''}
        ${disc ? `<span class="shd-discount">-${disc}% OFF</span>` : ''}
        <div class="shd-rating-row">
          <span class="shd-stars">${stars(p.rating)}</span>
          <span class="shd-rating-val">${p.rating}</span>
          <span class="shd-reviews">(${p.reviews} reviews)</span>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="shd-ctas">
        <a href="${p.buyUrl}" class="shd-btn-buy" target="_blank" rel="noopener">
          <i class="fa-solid fa-cart-shopping"></i> Buy Now — $${p.price}
        </a>
        <a href="${p.demoUrl}" class="shd-btn-demo" target="_blank" rel="noopener">
          <i class="fa-solid fa-eye"></i> Live Preview
        </a>
      </div>

      <!-- Stats -->
      <div class="shd-stats">
        <div class="shd-stat">
          <span class="shd-stat-n">${p.sales}+</span>
          <span class="shd-stat-l">Sales</span>
        </div>
        <div class="shd-stat">
          <span class="shd-stat-n">${p.rating}/5</span>
          <span class="shd-stat-l">Rating</span>
        </div>
        <div class="shd-stat">
          <span class="shd-stat-n">6 mo</span>
          <span class="shd-stat-l">Support</span>
        </div>
        <div class="shd-stat">
          <span class="shd-stat-n">Free</span>
          <span class="shd-stat-l">Updates</span>
        </div>
      </div>

      <!-- Description -->
      <p class="shd-desc-head">About this script</p>
      <p class="shd-desc">${p.desc}</p>

      <!-- Features -->
      <p class="shd-desc-head">What's included</p>
      <ul class="shd-feat-list">${featHTML}</ul>

      <!-- Tags -->
      <div class="shd-tags">${tagsHTML}</div>

    </div>
  `;
}

shdClose?.addEventListener('click', closeDrawer);
shdBd?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer?.classList.contains('shd-open')) closeDrawer();
});

/* ═══════════════════════════════════════════════════════════
   NAV SCROLL
   ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════ */
(function () {
  const c = $('#cursor');
  const f = $('#cursorFollower');
  if (!c || !f || window.matchMedia('(pointer: coarse)').matches) {
    c && (c.style.display = 'none');
    f && (f.style.display = 'none');
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

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
applyFilterSort();
