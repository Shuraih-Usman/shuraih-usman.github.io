/* ═══════════════════════════════════════════════════════════
   SHURAIHU USMAN PORTFOLIO — main.js
   ═══════════════════════════════════════════════════════════ */
"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─────────────────── PROJECT DATA ─────────────────── */
const PROJECT_DATA = {
  proj1: {
    num: '01', year: '2024',
    title: 'ShopNest E-Commerce',
    liveLabel: 'shopnest.app',
    liveUrl: '#', codeUrl: '#',
    mockupClass: 'bm-s1',
    mockupInner: `
      <div class="bm-nav-strip"></div>
      <div class="bm-hero-strip"></div>
      <div class="bm-cards">
        <div class="bm-card"></div><div class="bm-card"></div><div class="bm-card"></div>
      </div>`,
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
    num: '02', year: '2023',
    title: 'Analytix SaaS Dashboard',
    liveLabel: 'analytix.io',
    liveUrl: '#', codeUrl: '#',
    mockupClass: 'bm-s2',
    mockupInner: `
      <div class="bm-sidebar"></div>
      <div class="bm-main">
        <div class="bm-chart"></div>
        <div class="bm-stat-row">
          <div class="bm-stat"></div><div class="bm-stat"></div><div class="bm-stat"></div>
        </div>
      </div>`,
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
    num: '03', year: '2023',
    title: 'TaskFlow — Laravel App',
    liveLabel: 'taskflow.dev',
    liveUrl: '#', codeUrl: '#',
    mockupClass: 'bm-s3',
    mockupInner: `
      <div class="bm-nav-strip"></div>
      <div class="bm-board">
        <div class="bm-col"><div class="bm-ticket"></div><div class="bm-ticket"></div></div>
        <div class="bm-col"><div class="bm-ticket"></div></div>
        <div class="bm-col"><div class="bm-ticket"></div><div class="bm-ticket"></div></div>
      </div>`,
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
    drawer.classList.add('pd-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('pd-open');
    document.body.style.overflow = '';
  }

  function buildDrawerHTML(p) {
    return `
      <div class="pd-eyebrow">
        <span class="pd-num">${p.num}</span>
        <div class="pd-meta">
          <span class="pd-year">${p.year}</span>
          <h2 class="pd-title">${p.title}</h2>
        </div>
      </div>

      <div class="pd-mockup">
        <div class="browser-mock">
          <div class="bm-bar">
            <span class="bm-dot"></span><span class="bm-dot"></span><span class="bm-dot"></span>
            <span class="bm-url">${p.liveLabel}</span>
          </div>
          <div class="bm-screen ${p.mockupClass}">${p.mockupInner}</div>
        </div>
      </div>

      <div class="pd-divider"></div>

      <p class="pd-desc">${p.desc}</p>

      <p class="pd-features-head">Key Features</p>
      <ul class="pd-features-list">
        ${p.features.map(f => `<li><i class="fa-solid fa-check"></i>${f}</li>`).join('')}
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
}
