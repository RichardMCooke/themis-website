/* Themis — scroll behaviours. Four moves only:
   1 reveal on enter · 2 count-up · 3 scroll-driven emblem scale · 4 pinned horizontal rail
   All degrade to static under prefers-reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- mobile nav --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* --- 1. reveal on enter --- */
  var targets = document.querySelectorAll('.reveal, .reveal-group, .compare');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* --- 2. count-up on stat figures ([data-count-to] + optional data-prefix/suffix) --- */
  var figs = document.querySelectorAll('[data-count-to]');
  function runCount(el) {
    var to = parseFloat(el.getAttribute('data-count-to'));
    var dp = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    var start = null, dur = 1100;
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (to * eased).toFixed(dp) + suf;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (figs.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(figs, function (el) {
        el.textContent = (el.getAttribute('data-prefix') || '') + el.getAttribute('data-count-to') + (el.getAttribute('data-suffix') || '');
      });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.6 });
      Array.prototype.forEach.call(figs, function (el) { cio.observe(el); });
    }
  }

  /* --- header tone over navy sections --- */
  var head = document.querySelector('.site-head');
  var navySections = document.querySelectorAll('.on-navy');
  function headTone() {
    if (!head) return;
    var h = head.offsetHeight, over = false;
    Array.prototype.forEach.call(navySections, function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= h * 0.55 && r.bottom >= h * 0.55) over = true;
    });
    head.classList.toggle('over-navy', over);
  }

  /* --- 3. emblem scale, driven by hero scroll progress --- */
  var hero = document.querySelector('.hero');
  function emblem() {
    if (!hero || reduce) return;
    var h = hero.offsetHeight || 1;
    var p = Math.min(Math.max(window.pageYOffset / h, 0), 1);
    hero.style.setProperty('--emblem-scale', (1 - 0.85 * p).toFixed(3));
    hero.style.setProperty('--emblem-fade', (1 - 0.35 * p).toFixed(3));
  }

  /* --- 4. pinned horizontal rail --- */
  var stages = document.querySelectorAll('.rail-stage');
  function rails() {
    Array.prototype.forEach.call(stages, function (stage) {
      var track = stage.querySelector('.rail-track');
      var sticky = stage.querySelector('.rail-sticky');
      if (!track || !sticky) return;
      if (reduce || window.matchMedia('(max-width:760px)').matches) {
        track.style.removeProperty('--rail-x'); stage.style.setProperty('--rail-p', 1);
        stage.style.removeProperty('height'); return;
      }
      var travel = Math.max(track.scrollWidth - sticky.clientWidth + 56, 0);
      /* runway = exactly the horizontal distance to cover, so no dead space below the cards */
      stage.style.height = (sticky.offsetHeight + travel * 1.1) + 'px';
      var scrollable = stage.offsetHeight - sticky.offsetHeight;
      var passed = -stage.getBoundingClientRect().top + (sticky.offsetTop || 0);
      var p = scrollable > 0 ? Math.min(Math.max(passed / scrollable, 0), 1) : 0;
      track.style.setProperty('--rail-x', (-travel * p).toFixed(1) + 'px');
      stage.style.setProperty('--rail-p', p.toFixed(3));
    });
  }

  /* --- section index active state (What we do) --- */
  var links = document.querySelectorAll('.sec-index a');
  function activeIndex() {
    if (!links.length) return;
    var best = null, bestTop = Infinity;
    Array.prototype.forEach.call(links, function (a) {
      var t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      var top = Math.abs(t.getBoundingClientRect().top - 140);
      if (top < bestTop) { bestTop = top; best = a; }
    });
    Array.prototype.forEach.call(links, function (a) { a.classList.toggle('active', a === best); });
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { emblem(); rails(); headTone(); activeIndex(); queued = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* --- flyer accordion: deep-link opens the matching flyer --- */
  function openFromHash() {
    var h = window.location.hash;
    if (!h || h.length < 2) return;
    var t = document.querySelector('details.flyer' + h);
    if (t && !t.open) t.open = true;
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* --- flyer accordion: reveal content that opens after first paint --- */
  Array.prototype.forEach.call(document.querySelectorAll('details.flyer'), function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      Array.prototype.forEach.call(d.querySelectorAll('.reveal, .reveal-group, .compare'), function (el) {
        el.classList.add('in');
      });
    });
  });

  /* --- contact form: no back end yet, hand off to mailto so nothing is lost --- */
  var form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form), lines = [];
      d.forEach(function (v, k) { lines.push(k + ': ' + v); });
      var route = form.querySelector('[data-route]');
      var to = (route && route.value) || form.getAttribute('data-mailto');
      window.location.href = 'mailto:' + to
        + '?subject=' + encodeURIComponent('Website enquiry — ' + (d.get('Company') || d.get('Name') || 'new'))
        + '&body=' + encodeURIComponent(lines.join('\n'));
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Opening your email client… if nothing happens, email ' + to + ' directly.';
    });
  }
})();
