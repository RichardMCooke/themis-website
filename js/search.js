/* Themis site search: runs entirely in the browser from /search-index.json. Nothing is sent or stored. */
(function () {
  var idx = null, loading = null, box, input, list, count, active = -1, lastFocus;
  var STOP = { the: 1, and: 1, of: 1, a: 1, an: 1, to: 1, in: 1, for: 1, on: 1, is: 1, my: 1, i: 1, how: 1, do: 1, what: 1 };
  function load() {
    if (idx) return Promise.resolve(idx);
    if (!loading) loading = fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (j) {
      idx = j.map(function (e) { e._t = e.t.toLowerCase(); e._h = (e.h || '').toLowerCase(); e._d = (e.d || '').toLowerCase(); e._b = (e.b || '').toLowerCase(); return e; });
      return idx;
    });
    return loading;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function terms(q) { return q.toLowerCase().replace(/[^\w£%&\s-]/g, ' ').split(/\s+/).filter(function (w) { return w.length > 1 && !STOP[w]; }); }
  function occurrences(s, w) { var n = 0, i = s.indexOf(w); while (i > -1 && n < 5) { n++; i = s.indexOf(w, i + w.length); } return n; }
  function score(e, ts, all) {
    var total = 0, hit = 0;
    ts.forEach(function (w) {
      var s = 0;
      if (e._t.indexOf(w) > -1) s += (new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(e._t)) ? 14 : 9;
      if (e._h.indexOf(w) > -1) s += 4;
      if (e._d.indexOf(w) > -1) s += 3;
      s += occurrences(e._b, w);
      if (s) hit++;
      total += s;
    });
    if (all && hit < ts.length) return 0;
    if (e.u.indexOf('#') > -1) total *= 0.92;
    return total;
  }
  function snippet(e, ts) {
    var src = e.d && ts.some(function (w) { return e._d.indexOf(w) > -1; }) ? e.d : e.b, low = src.toLowerCase(), at = -1;
    ts.forEach(function (w) { var i = low.indexOf(w); if (i > -1 && (at < 0 || i < at)) at = i; });
    var start = Math.max(0, at - 70), text = src.slice(start, start + 190);
    if (at < 0) text = (e.d || e.b).slice(0, 170);
    var out = esc(text);
    ts.forEach(function (w) { out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return (start > 0 ? '… ' : '') + out + '…';
  }
  function run() {
    var q = input.value.trim(), ts = terms(q);
    active = -1;
    if (!ts.length) { list.innerHTML = ''; count.textContent = 'Try: exit readiness, IFRS 18, Power BI, succession, cash flow'; return; }
    load().then(function (data) {
      var res = data.map(function (e) { return [score(e, ts, true), e]; }).filter(function (r) { return r[0] > 0; });
      if (!res.length) res = data.map(function (e) { return [score(e, ts, false), e]; }).filter(function (r) { return r[0] > 0; });
      res.sort(function (a, b) { return b[0] - a[0]; });
      var seen = {}, top = [];
      res.forEach(function (r) { var page = r[1].u.split('#')[0]; if (top.length < 12 && (!seen[page] || seen[page] < 2)) { seen[page] = (seen[page] || 0) + 1; top.push(r[1]); } });
      count.textContent = top.length ? (top.length === 1 ? '1 result' : top.length + ' results') : 'No matches. Try a different word, or call 01952 37 90 70.';
      list.innerHTML = top.map(function (e) {
        return '<li><a href="' + esc(e.u) + '"><span class="srch-sec">' + esc(e.s) + '</span><span class="srch-title">' + esc(e.t) + '</span><span class="srch-snip">' + snippet(e, ts) + '</span></a></li>';
      }).join('');
    }).catch(function () { count.textContent = 'Search is unavailable just now.'; });
  }
  function move(d) {
    var links = list.querySelectorAll('a'); if (!links.length) return;
    active = Math.max(0, Math.min(links.length - 1, active + d));
    links[active].focus();
  }
  function build() {
    box = document.createElement('div');
    box.className = 'srch'; box.hidden = true;
    box.innerHTML = '<div class="srch-back" data-close></div><div class="srch-panel" role="dialog" aria-modal="true" aria-label="Search the site">'
      + '<div class="srch-bar"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>'
      + '<input type="search" placeholder="Search Themis" aria-label="Search the site" autocomplete="off" spellcheck="false">'
      + '<button type="button" class="srch-close" data-close aria-label="Close search">Close</button></div>'
      + '<p class="srch-count" aria-live="polite"></p><ul class="srch-list"></ul></div>';
    document.body.appendChild(box);
    input = box.querySelector('input'); list = box.querySelector('.srch-list'); count = box.querySelector('.srch-count');
    var t; input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 80); });
    box.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (active <= 0) { active = -1; input.focus(); } else move(-1); }
      else if (e.key === 'Enter' && document.activeElement === input) { var a = list.querySelector('a'); if (a) { e.preventDefault(); location.href = a.href; } }
    });
  }
  function open(q) {
    if (!box) build();
    lastFocus = document.activeElement;
    box.hidden = false; document.documentElement.classList.add('srch-open');
    if (typeof q === 'string') input.value = q;
    input.focus(); input.setSelectionRange(input.value.length, input.value.length);
    run(); load();
  }
  function close() {
    if (!box || box.hidden) return;
    box.hidden = true; document.documentElement.classList.remove('srch-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-search-open]');
    if (b) { e.preventDefault(); open(); }
  });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase(), typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); open(); }
  });
  [].forEach.call(document.querySelectorAll('[data-search-field]'), function (f) {
    var field = f.querySelector('input');
    f.addEventListener('submit', function (e) { e.preventDefault(); open(field.value); field.value = ''; });
    field.addEventListener('input', function () { if (field.value.trim().length > 0) { var v = field.value; field.value = ''; open(v); } });
  });
})();
