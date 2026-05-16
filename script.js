/* ================================================================
   script.js — Portfolio Interactions
   No dependencies. Vanilla JS only.
   ================================================================ */

'use strict';

/* ── 1. DARK MODE TOGGLE ──────────────────────────────────────── */
(function initTheme() {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const stored = localStorage.getItem('portfolio-theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme  = stored || system;

  html.setAttribute('data-theme', theme);

  btn.addEventListener('click', function () {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
})();


/* ── 2. MOBILE MENU ───────────────────────────────────────────── */
(function initMobileMenu() {
  const toggle = document.getElementById('hamburger');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  function openMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  }

  toggle.addEventListener('click', function () {
    openMenu(menu.getAttribute('aria-hidden') === 'true');
  });

  // Close when a nav link is tapped
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { openMenu(false); });
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)) {
      openMenu(false);
    }
  });
})();


/* ── 3. NAV SCROLL SHADOW ─────────────────────────────────────── */
(function initNavShadow() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 16);
  }, { passive: true });
})();


/* ── 4. SCROLL-REVEAL ANIMATIONS ─────────────────────────────── */
(function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // If the browser doesn't support IntersectionObserver, just show everything
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (!entry.isIntersecting) return;
      // Stagger siblings within the same grid parent
      var delay = 0;
      var parent = entry.target.parentElement;
      if (parent) {
        var siblings = Array.from(parent.children).filter(function (c) {
          return c.classList.contains('reveal');
        });
        delay = siblings.indexOf(entry.target) * 70;
      }
      setTimeout(function () {
        entry.target.classList.add('is-visible');
      }, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();


/* ── 5. CONTACT FORM ──────────────────────────────────────────── */
/*
   By default this simulates a send. To use a real backend:
   ─ Netlify Forms: add  data-netlify="true"  to the <form> in index.html.
     Remove the e.preventDefault() call below and Netlify handles it.
   ─ Formspree: change <form action="https://formspree.io/f/YOUR_ID" method="POST">
     and remove the e.preventDefault() call below.
   See INSTRUCTIONS.md for full step-by-step.
*/
(function initContactForm() {
  var form   = document.getElementById('contactForm');
  var btn    = document.getElementById('submitBtn');
  var status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // ← Remove this line if using Netlify Forms or Formspree

    // Basic validation
    var name    = form.querySelector('[name="name"]').value.trim();
    var email   = form.querySelector('[name="email"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Simulated send — replace this block with a real fetch() if needed
    btn.disabled    = true;
    btn.textContent = 'Sending…';
    setStatus('', '');

    setTimeout(function () {
      btn.textContent = 'Message sent ✓';
      setStatus('Thanks! I\'ll get back to you soon.', 'success');
      form.reset();
      setTimeout(function () {
        btn.textContent = 'Send message';
        btn.disabled    = false;
        setStatus('', '');
      }, 4000);
    }, 1200);
  });

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent  = msg;
    status.className    = 'form-status' + (type ? ' ' + type : '');
  }
})();


/* ── 6. FOOTER YEAR ───────────────────────────────────────────── */
(function setYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ── 7. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────── */
(function initSmoothScroll() {
  var navH = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-h')) || 64;

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
