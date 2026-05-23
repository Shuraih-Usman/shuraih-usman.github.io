/* ═══════════════════════════════════════════════════════════
   SHURAIHU USMAN PORTFOLIO — main.js
   ═══════════════════════════════════════════════════════════ */
"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─────────────────── PROJECT DATA ─────────────────── */
const PROJECT_DATA = {
  proj1: {
    num: '01', year: '2024', catLabel: 'Full-Stack',
    title: 'ShopNest E-Commerce',
    liveUrl: '#', codeUrl: '#',
    images: [
      'images/proj-ecommerce.jpg',
      'images/proj-analytics.jpg',
      'images/proj-kanban.jpg',
    ],
    desc: `ShopNest is a modern full-stack e-commerce platform built with React and Node.js. It supports real-time inventory tracking, Stripe & PayPal payment processing, product filtering, JWT-based authentication, and a comprehensive admin dashboard for managing products, orders, and customers at scale.`,
    features: [
      'Real-time inventory & stock management',
      'Stripe & PayPal payment gateway integration',
      'JWT authentication with role-based access',
      'Admin dashboard with sales analytics',
      'Advanced product search & filtering',
      'Order tracking & automated email receipts',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Tailwind'],
  },
  proj2: {
    num: '02', year: '2023', catLabel: 'Full-Stack',
    title: 'Analytix SaaS Dashboard',
    liveUrl: '#', codeUrl: '#',
    images: [
      'images/proj-analytics.jpg',
      'images/proj-finance.jpg',
      'images/proj-healthcare.jpg',
    ],
    desc: `Analytix is a real-time SaaS analytics platform designed for product teams. It provides interactive data visualisation, team collaboration features, and automated report generation. The platform supports multiple data sources and processes thousands of events per second through a Redis-powered queue.`,
    features: [
      'Real-time data visualisation with Chart.js',
      'Customisable chart widgets & dashboards',
      'Team collaboration, comments & mentions',
      'Automated PDF & CSV report generation',
      'Multi-source data integration (REST & webhooks)',
      'Role-based access control & team workspaces',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Chart.js', 'Tailwind'],
  },
  proj3: {
    num: '03', year: '2023', catLabel: 'Full-Stack',
    title: 'TaskFlow — Laravel App',
    liveUrl: '#', codeUrl: '#',
    images: [
      'images/proj-kanban.jpg',
      'images/proj-ecommerce.jpg',
      'images/proj-education.jpg',
    ],
    desc: `TaskFlow is a full-featured project management application built with PHP Laravel and React. It features Kanban-style drag-and-drop boards, Gantt chart views, team workspaces, real-time notifications via WebSockets, time tracking, and integrations with popular productivity tools.`,
    features: [
      'Drag-and-drop Kanban boards (React DnD)',
      'Real-time notifications via Laravel WebSockets',
      'Role-based access control (Admin, Member, Viewer)',
      'Time tracking & productivity reports',
      'File attachments, comments & @mentions',
      'Team workspaces with invite system',
    ],
    tags: ['PHP', 'Laravel', 'React', 'MySQL', 'Redis', 'WebSockets', 'Livewire'],
  },
};

/* ─────────────────── LOADER ─────────────────── */
(function initLoader() {
  const loader = $('#loader');
  const fill   = $('#loaderFill');
  const txt    = $('#loaderText');
  const msgs   = ['Initializing...', 'Loading assets...', 'Almost there...', 'Welcome!'];
  let progress = 0, msgIdx = 0;

  document.body.style.overflow = 'hidden';

  const iv = setInterval(() => {
    progress += Math.random() * 22 + 8;
    if (progress >= 100) { progress = 100; clearInterval(iv); }
    fill.style.width = progress + '%';

    if (progress > 30 && msgIdx < 1) { msgIdx = 1; txt.textContent = msgs[1]; }
    if (progress > 65 && msgIdx < 2) { msgIdx = 2; txt.textContent = msgs[2]; }
    if (progress >= 100) {
      txt.textContent = msgs[3];
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        startAnimations();
      }, 400);
    }
  }, 120);
})();

/* ─────────────────── CUSTOM CURSOR ─────────────────── */
(function initCursor() {
  const cursor   = $('#cursor');
  const follower = $('#cursorFollower');
  if (!cursor || !follower) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverEls = 'a, button, input, textarea, .sicon, .proj-item, .avatar-frame, .plink-detail';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) { cursor.classList.add('hovering'); follower.classList.add('hovering'); }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) { cursor.classList.remove('hovering'); follower.classList.remove('hovering'); }
  });
})();

/* ─────────────────── PARTICLE CANVAS ─────────────────── */
(function initParticles() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const particles = [];
  const COUNT = 55;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 1.8 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = (Math.random() - 0.5) * 0.28;
      this.alpha = Math.random() * 0.4 + 0.05;
      const hue = Math.random() > 0.5 ? 174 : 180;
      this.color = `hsla(${hue}, 70%, 55%, ${this.alpha})`;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(20,184,166,${(1 - dist / 110) * 0.09})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ─────────────────── NAVIGATION ─────────────────── */
(function initNav() {
  const nav      = $('#nav');
  const toggle   = $('#navToggle');
  const mobileMenu = $('#mobileMenu');
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 200) current = sec.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.nav === current));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('[data-close]', mobileMenu).forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─────────────────── TYPEWRITER ─────────────────── */
function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;
  const words = ['web experiences.', 'React.js apps.', 'Node.js APIs.', 'Laravel systems.', 'Django backends.', 'things you love.'];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const word    = words[wordIdx];
    const current = deleting ? word.slice(0, charIdx--) : word.slice(0, ++charIdx);
    el.textContent = current;
    if (!deleting && charIdx === word.length) { setTimeout(() => { deleting = true; type(); }, 1800); }
    else if (deleting && charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; setTimeout(type, 300); }
    else { setTimeout(type, deleting ? 45 : 80); }
  }
  setTimeout(type, 700);
}

/* ─────────────────── COUNTER ANIMATION ─────────────────── */
function animateCounters() {
  $$('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const step   = target / (1800 / 16);
    let current  = 0;
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

/* ─────────────────── SCROLL REVEAL ─────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  $$('.reveal').forEach((el, i) => {
    el.style.setProperty('--delay', (i % 3 * 0.12) + 's');
    obs.observe(el);
  });
}

/* ─────────────────── HERO TILT ─────────────────── */
function initHeroTilt() {
  const wrap = $('#heroCard');
  if (!wrap || window.matchMedia('(pointer: coarse)').matches) return;
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 8;
    const ry = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  * -8;
    wrap.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transition = 'transform .6s cubic-bezier(0.34,1.56,0.64,1)';
    wrap.style.transform = '';
    setTimeout(() => { wrap.style.transition = ''; }, 600);
  });
}

/* ─────────────────── ORB PARALLAX ─────────────────── */
function initOrbParallax() {
  const center = document.querySelector('.orb-center');
  if (!center) return;
  window.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth  - 0.5) * 16;
    const dy = (e.clientY / window.innerHeight - 0.5) * 16;
    center.style.transform = `translate(${dx}px, ${dy}px)`;
  });
}

/* ─────────────────── IMAGE LIGHTBOX ─────────────────── */
function initImageLightbox() {
  const lb      = $('#imgLightbox');
  const lbImg   = $('#lbImg');
  const lbClose = $('#lbClose');
  const lbBd    = $('#lbBackdrop');
  if (!lb) return;

  function openLb() {
    lbImg.src = 'avatar.jpg';
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  const trigger = $('#heroAvatarFrame');
  if (trigger) {
    trigger.addEventListener('click', openLb);
    trigger.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(); } });
  }

  lbClose.addEventListener('click', closeLb);
  lbBd.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('lb-open')) closeLb(); });
}

/* ─────────────────── PROJECT DETAIL DRAWER ─────────────────── */
function initProjectDrawer() {
  const drawer  = $('#projDrawer');
  const pdBody  = $('#pdBody');
  const pdClose = $('#pdClose');
  const pdBd    = $('#pdBackdrop');
  if (!drawer) return;

  function openDrawer(projId) {
    const proj = PROJECT_DATA[projId];
    if (!proj) return;
    pdBody.innerHTML = buildDrawerHTML(proj);
    initGallery(pdBody);
    drawer.classList.add('pd-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('pd-open');
    document.body.style.overflow = '';
  }

  function buildDrawerHTML(p) {
    const imgs  = p.images || [];
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
          <span class="pcard-badge pcard-cat-badge">${p.catLabel || 'Project'}</span>
          <span class="pcard-badge pcard-year-badge">${p.year}</span>
        </div>
      </div>

      <div class="pd-content">
        <div class="pd-eyebrow">
          <span class="pd-num">${p.num}</span>
          <div class="pd-meta">
            <span class="pd-year">${p.year}</span>
            <h2 class="pd-title">${p.title}</h2>
          </div>
        </div>
        <div class="pd-divider"></div>
        <p class="pd-desc">${p.desc}</p>
        <p class="pd-features-head">Key Features</p>
        <ul class="pd-features-list">
          ${p.features.map(f => `<li><i class="fa-solid fa-circle-check"></i>${f}</li>`).join('')}
        </ul>
        <div class="pd-tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="pd-actions">
          <a href="${p.liveUrl}" class="pd-btn-live" target="_blank" rel="noopener">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
          <a href="${p.codeUrl}" class="pd-btn-code" target="_blank" rel="noopener">
            <i class="fa-brands fa-github"></i> Source Code
          </a>
        </div>
      </div>
    `;
  }

  $$('[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => openDrawer(btn.dataset.proj));
  });

  pdClose.addEventListener('click', closeDrawer);
  pdBd.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('pd-open')) closeDrawer();
  });
}

/* ─────────────────────────────────────────────────────────── SHARED GALLERY */
function initGallery(ctx) {
  const track   = ctx.querySelector('#pgTrack');
  const prevBtn = ctx.querySelector('#pgPrev');
  const nextBtn = ctx.querySelector('#pgNext');
  const dotsEl  = ctx.querySelector('#pgDots');
  const counter = ctx.querySelector('#pgCounter');
  const slides  = ctx ? [...ctx.querySelectorAll('.pg-slide')] : [];
  if (!track || slides.length < 2) return;

  let current = 0;

  function goTo(n) {
    slides[current].classList.remove('pg-active');
    if (dotsEl) dotsEl.querySelectorAll('.pg-dot')[current]?.classList.remove('pg-dot-active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('pg-active');
    if (dotsEl) dotsEl.querySelectorAll('.pg-dot')[current]?.classList.add('pg-dot-active');
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  dotsEl?.querySelectorAll('.pg-dot').forEach(dot => {
    dot.addEventListener('click', () => goTo(+dot.dataset.goto));
  });

  /* Touch/swipe support */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });
}

/* ─────────────────── SMOOTH SCROLL ─────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ─────────────────── FOOTER YEAR ─────────────────── */
function initFooter() {
  const el = $('#footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ─────────────────── SKILL STAGGER ─────────────────── */
function initSkillStagger() {
  $$('.sicon').forEach((el, i) => el.style.setProperty('--delay', (i * 0.04) + 's'));
}

/* ─────────────────── CONTACT DRAWER ─────────────────── */
function initContactDrawer() {
  const drawer    = $('#contactDrawer');
  const cdBd      = $('#cdrBackdrop');
  const cdClose   = $('#cdrClose');
  const openBtn   = $('#contactOpenBtn');
  const form      = $('#contactForm');
  const status    = $('#cdrStatus');
  const submitBtn = $('#cdrSubmit');
  const btnText   = $('#cdrBtnText');
  if (!drawer) return;

  /* --- open / close --- */
  function openDrawer() {
    drawer.classList.add('cdr-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('cdr-open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openDrawer);
  cdClose.addEventListener('click', closeDrawer);
  cdBd.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('cdr-open')) closeDrawer();
  });

  /* --- form validation highlight --- */
  $$('.cdr-input', drawer).forEach(inp => {
    inp.addEventListener('blur', () => {
      inp.classList.toggle('invalid', inp.required && !inp.value.trim());
    });
    inp.addEventListener('input', () => inp.classList.remove('invalid'));
  });

  /* --- form submission via Formspree --- */
  /*
   * 📌 SETUP:  Go to https://formspree.io, create a free account
   *   with shuraihusman@gmail.com, create a new form, and replace
   *   'YOUR_FORMSPREE_ID' below with your unique form ID (e.g. 'xpzgrbka').
   *   Formspree will forward every submission to your Gmail inbox.
   */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    /* validate */
    let valid = true;
    $$('.cdr-input', form).forEach(inp => {
      if (inp.required && !inp.value.trim()) { inp.classList.add('invalid'); valid = false; }
    });
    if (!valid) {
      showStatus('error', '<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all required fields.');
      return;
    }

    /* sending state */
    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';

    const data = new FormData(form);
    data.append('_replyto', data.get('email'));
    data.append('_subject', `[Portfolio] ${data.get('subject')}`);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        btnText.textContent = '✓ Message Sent!';
        showStatus('success', '<i class="fa-solid fa-circle-check"></i> Your message was sent! I\'ll reply within 24 hours.');
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          submitBtn.disabled = false;
          status.className = 'cdr-status';
        }, 5000);
      } else {
        const body = await res.json();
        throw new Error(body?.error || 'Server error');
      }
    } catch (err) {
      console.error('[Contact form]', err);
      btnText.textContent = 'Send Message';
      submitBtn.disabled = false;
      showStatus('error', '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong. Email me directly at <a href="mailto:shuraihusman@gmail.com">shuraihusman@gmail.com</a>');
    }
  });

  function showStatus(type, html) {
    status.className = 'cdr-status cdr-' + type;
    status.innerHTML = html;
  }
}

/* ─────────────────── START ─────────────────── */
function startAnimations() {
  initTypewriter();
  animateCounters();
  initScrollReveal();
  initHeroTilt();
  initOrbParallax();
  initSmoothScroll();
  initFooter();
  initSkillStagger();
  initImageLightbox();
  initProjectDrawer();
  initContactDrawer();
  initIndexProductDrawer();
}

/* ─────────────────── INDEX PRODUCT DRAWER ─────────────────── */
const INDEX_PRODUCTS = {
  prod1: {
    name: 'Novel Engine V2',
    tagline: 'Multipurpose PHP Novel & Fiction Reading Platform',
    category: 'PHP Script',
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
  prod2: {
    name: 'Skolentra',
    tagline: 'Complete School Management System',
    category: 'Laravel · PHP',
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
};

function initIndexProductDrawer() {
  const drawer  = $('#ipDrawer');
  const body    = $('#ipdBody');
  const closeBtn= $('#ipdClose');
  const backdrop= $('#ipdBackdrop');
  if (!drawer) return;

  function openDrawer(prod) {
    body.innerHTML = buildIPDrawerHTML(prod);
    drawer.classList.add('shd-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('shd-open');
    document.body.style.overflow = '';
  }

  $$('.ip-detail-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = INDEX_PRODUCTS[btn.dataset.prod];
      if (p) openDrawer(p);
    });
  });

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('shd-open')) closeDrawer();
  });

  function buildIPDrawerHTML(p) {
    const disc = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    const starsHTML = (() => {
      const full = Math.floor(p.rating), half = p.rating % 1 >= 0.5 ? 1 : 0, empty = 5 - full - half;
      return '<i class="fa-solid fa-star"></i>'.repeat(full) +
             (half ? '<i class="fa-solid fa-star-half-stroke"></i>' : '') +
             '<i class="fa-regular fa-star"></i>'.repeat(empty);
    })();
    const badgeHTML = p.badge
      ? `<span class="shcard-badge badge-${p.badge}">${p.badgeLabel}</span>` : '';
    const featHTML = p.features.map(f =>
      `<li><i class="fa-solid fa-circle-check"></i>${f}</li>`).join('');
    const tagsHTML = p.tags.map(t => `<span>${t}</span>`).join('');

    return `
      <div class="shd-img-wrap">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='images/product-novel-engine.jpg'" />
        <div class="shd-img-gradient"></div>
        <div class="shd-img-badges">${badgeHTML}</div>
      </div>
      <div class="shd-content">
        <div class="shd-header">
          <p class="shd-cat">${p.category}</p>
          <h2 class="shd-name">${p.name}</h2>
          <p class="shd-tagline">${p.tagline}</p>
        </div>
        <div class="shd-price-row">
          <span class="shd-price">$${p.price}</span>
          ${p.oldPrice ? `<span class="shd-old-price">$${p.oldPrice}</span>` : ''}
          ${disc ? `<span class="shd-discount">-${disc}% OFF</span>` : ''}
          <div class="shd-rating-row">
            <span class="shd-stars">${starsHTML}</span>
            <span class="shd-rating-val">${p.rating}</span>
            <span class="shd-reviews">(${p.reviews} reviews)</span>
          </div>
        </div>
        <div class="shd-ctas">
          <a href="${p.buyUrl}" class="shd-btn-buy" target="_blank" rel="noopener">
            <i class="fa-solid fa-cart-shopping"></i> Buy Now — $${p.price}
          </a>
          <a href="${p.demoUrl}" class="shd-btn-demo" target="_blank" rel="noopener">
            <i class="fa-solid fa-eye"></i> Live Preview
          </a>
        </div>
        <div class="shd-stats">
          <div class="shd-stat"><span class="shd-stat-n">${p.sales}+</span><span class="shd-stat-l">Sales</span></div>
          <div class="shd-stat"><span class="shd-stat-n">${p.rating}/5</span><span class="shd-stat-l">Rating</span></div>
          <div class="shd-stat"><span class="shd-stat-n">6 mo</span><span class="shd-stat-l">Support</span></div>
          <div class="shd-stat"><span class="shd-stat-n">Free</span><span class="shd-stat-l">Updates</span></div>
        </div>
        <p class="shd-desc-head">About this script</p>
        <p class="shd-desc">${p.desc}</p>
        <p class="shd-desc-head">What's included</p>
        <ul class="shd-feat-list">${featHTML}</ul>
        <div class="shd-tags">${tagsHTML}</div>
      </div>
    `;
  }
}
