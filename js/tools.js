/* Themis self-assessment tools. Answers stay in the visitor's browser unless they choose to send them. */
(function () {
  var FS = 'https://formspree.io/f/meaardwg', BOOK = 'https://bookings.cloud.microsoft/book/ThemisProfessionalServices@ThemisProfessional.com/';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function gbp(n) { return '£' + Math.round(n / 1000).toLocaleString('en-GB') + 'K'; }
  function segments(root, onChange) {
    $$('.tool-seg', root).forEach(function (g) {
      $$('button', g).forEach(function (b) {
        b.addEventListener('click', function () {
          $$('button', g).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true'); onChange();
        });
      });
    });
  }
  function qtext(it) { var q = $('.tool-q', it); return q.lastChild.textContent.trim(); }
  function picked(g) { var b = $('button[aria-pressed="true"]', g); return b ? +b.getAttribute('data-v') : null; }
  function actions(tool, summary) {
    return '<div class="tool-acts">'
      + '<a class="btn btn-gold" href="' + BOOK + '" target="_blank" rel="noopener">Book a 30-minute call</a>'
      + '<button type="button" class="btn tool-print">Save as PDF</button>'
      + (summary ? '<button type="button" class="btn tool-send-open">Send my results to Themis</button>' : '')
      + '</div>'
      + (summary ? '<form class="tool-send" hidden><p class="tool-send-h">Send your results</p>'
        + '<p class="tool-small">Your answers and score go to Richard Cooke at Themis with the details below, so we can reply. Nothing is sent until you press Send.</p>'
        + '<div class="tool-fields"><label>Name<input name="Name" required autocomplete="name"></label>'
        + '<label>Email<input type="email" name="Email" required autocomplete="email"></label>'
        + '<label>Company<input name="Company" autocomplete="organization"></label>'
        + '<label>Phone<input type="tel" name="Phone" autocomplete="tel"></label></div>'
        + '<label>Anything you would like to add?<textarea name="Message" rows="3"></textarea></label>'
        + '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">'
        + '<button type="submit" class="btn btn-solid">Send</button> <span class="tool-small">See our <a href="/privacy.html">privacy notice</a>.</span>'
        + '<p class="tool-status" role="status" aria-live="polite" hidden></p></form>' : '');
  }
  function wire(out, tool, summaryFn) {
    var p = $('.tool-print', out);
    if (p) p.addEventListener('click', function () {
      document.documentElement.classList.add('print-tool');
      window.print();
      setTimeout(function () { document.documentElement.classList.remove('print-tool'); }, 500);
    });
    var o = $('.tool-send-open', out), f = $('.tool-send', out);
    if (!o || !f) return;
    o.addEventListener('click', function () { f.hidden = false; o.hidden = true; $('input', f).focus(); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f), s = summaryFn(), st = $('.tool-status', f), btn = $('button[type="submit"]', f);
      d.append('Tool', tool); d.append('Results', s.text);
      d.append('_subject', 'Website ' + tool + ' result: ' + s.headline + ' (' + (d.get('Company') || d.get('Name')) + ')');
      btn.disabled = true; btn.textContent = 'Sending…';
      fetch(FS, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw 0; f.innerHTML = '<p class="tool-send-h">Thank you</p><p>Your results are with us. A director will reply, usually the same day.</p>'; })
        .catch(function () { btn.disabled = false; btn.textContent = 'Send'; st.hidden = false; st.innerHTML = 'Sorry, that did not send. Please try again, or email <a href="mailto:richardcooke@themisprofessional.com">richardcooke@themisprofessional.com</a>.'; });
    });
  }

  /* ---------- Exit-readiness scorecard ---------- */
  var exitRoot = $('[data-tool="exit"]');
  if (exitRoot) {
    var items = $$('.tool-item', exitRoot), out = $('.tool-result', exitRoot), prog = $('.tool-progress', exitRoot);
    var LABEL = ['Not yet', 'Partly', 'Mostly', 'Fully'];
    function exitSummary() {
      var total = 0, lines = [];
      items.forEach(function (it, i) { var v = picked($('.tool-seg', it)); total += v; lines.push((i + 1) + '. ' + qtext(it) + ': ' + LABEL[v]); });
      var score = Math.round(total / (items.length * 3) * 100);
      return { score: score, headline: score + '/100', text: 'Exit-readiness score: ' + score + '/100\n\n' + lines.join('\n') };
    }
    function renderExit() {
      var done = items.filter(function (it) { return picked($('.tool-seg', it)) !== null; }).length;
      prog.textContent = done + ' of ' + items.length + ' answered';
      if (done < items.length) { out.hidden = true; return; }
      var s = exitSummary(), band, msg;
      if (s.score >= 80) { band = 'Close'; msg = 'Focus on the remaining gaps before a process starts.'; }
      else if (s.score >= 50) { band = 'On the way'; msg = 'The gaps are fixable, but not in twelve weeks.'; }
      else { band = 'Early'; msg = 'The eighteen-month runway starts now.'; }
      var weak = items.map(function (it, i) { return { i: i, v: picked($('.tool-seg', it)), it: it }; })
        .filter(function (x) { return x.v < 3; }).sort(function (a, b) { return a.v - b.v || a.i - b.i; }).slice(0, 3);
      var html = '<div class="tool-score"><span class="tool-num">' + s.score + '</span><span class="tool-of">/100</span></div>'
        + '<div><p class="tool-band">' + band + '</p><p class="tool-msg">' + msg + '</p></div>';
      html = '<div class="tool-head">' + html + '</div><div class="tool-bar"><i style="width:' + s.score + '%"></i></div>';
      if (weak.length) {
        html += '<p class="tool-sub">Where to start</p><ol class="tool-weak">' + weak.map(function (w) {
          return '<li><b>' + esc(qtext(w.it)) + '</b> <span class="tool-small">(' + LABEL[w.v] + ')</span><br>' + esc(w.it.getAttribute('data-why')) + '</li>';
        }).join('') + '</ol>';
      } else html += '<p class="tool-msg">Every area scored Fully. A short call will confirm a buyer would see it the same way.</p>';
      html += '<p class="tool-small">A guide to where you stand, not a valuation or formal advice.</p>' + actions('Exit readiness', true);
      out.innerHTML = html; out.hidden = false; wire(out, 'exit-readiness', exitSummary);
    }
    segments(exitRoot, renderExit); renderExit();
  }

  /* ---------- Bottleneck quiz ---------- */
  var bRoot = $('[data-tool="bottleneck"]');
  if (bRoot) {
    var qs = $$('.tool-item', bRoot), bout = $('.tool-result', bRoot);
    function bSummary() {
      var risk = 0, lines = [];
      qs.forEach(function (q, i) { var g = $('.tool-seg', q), b = $('button[aria-pressed="true"]', g); risk += +b.getAttribute('data-v'); lines.push((i + 1) + '. ' + qtext(q) + ': ' + b.textContent); });
      var level = risk <= 2 ? 'Low' : risk <= 5 ? 'Moderate' : 'High';
      return { risk: risk, level: level, headline: level + ' key-person risk', text: 'Bottleneck test: ' + level + ' key-person risk (' + risk + ' of 8)\n\n' + lines.join('\n') };
    }
    function renderB() {
      var done = qs.filter(function (q) { return picked($('.tool-seg', q)) !== null; }).length;
      if (done < qs.length) { bout.hidden = true; return; }
      var s = bSummary(), msg = {
        Low: 'Your absence tests the business rather than exposes it. Keep it that way as you grow.',
        Moderate: 'Some decisions still wait for you. Name who owns them, and let them own the outcome.',
        High: 'The business depends on you day to day, and a buyer will price that into the multiple.' }[s.level];
      var html = '<div class="tool-head"><div class="tool-score"><span class="tool-num">' + s.level + '</span></div><div><p class="tool-band">Key-person risk</p><p class="tool-msg">' + msg + '</p></div></div>'
        + '<div class="tool-bar"><i style="width:' + Math.max(8, s.risk / 8 * 100) + '%"></i></div>'
        + '<p class="tool-small">A buyer prices key-person risk directly into the multiple they are willing to pay. Reducing that reliance is one of the most direct ways to add measurable value.</p>'
        + '<p class="tool-sub">What good delegation looks like</p><ul class="ticks">'
        + '<li>A leadership team that keeps the business moving while one person is away.</li>'
        + '<li>Capable people with the skills and confidence to decide without approval.</li>'
        + '<li>A short, genuinely exceptional list of things that warrant a call.</li>'
        + '<li>A team trusted with real decisions long before the holiday.</li></ul>'
        + '<p class="tool-small" style="margin-top:16px">Thinking about a sale? <a href="/insights/exit-readiness.html#tool">Take the exit-readiness scorecard →</a></p>'
        + actions('Bottleneck test', true);
      bout.innerHTML = html; bout.hidden = false; wire(bout, 'bottleneck-test', bSummary);
    }
    segments(bRoot, renderB); renderB();
  }

  /* ---------- Full-time vs fractional cost ---------- */
  var cRoot = $('[data-tool="cost"]');
  if (cRoot) {
    var sal = $('input[type="range"]', cRoot), salOut = $('.tool-sal', cRoot), cout = $('.tool-result', cRoot);
    var LEVELS = { 1: ['Light', 2000, 4000, 'A few hours a month'], 2: ['Regular', 4000, 6000, 'A day or two most weeks'], 3: ['Intensive', 6000, 8000, 'Up to around 20 hours a week'] };
    function renderC() {
      var s = +sal.value, lvl = LEVELS[picked($('.tool-seg', cRoot)) || 2];
      salOut.textContent = gbp(s);
      var bonus = s * 0.15, ni = 0.15 * Math.max(0, s + bonus - 5000), pension = s * 0.05, recruit = s * 0.25;
      var ongoing = s + bonus + ni + pension, y1 = ongoing + recruit, fLo = lvl[1] * 12, fHi = lvl[2] * 12, max = y1;
      function bar(label, lo, hi, cls) {
        return '<div class="cost-row"><span class="cost-l">' + label + '</span><span class="cost-track"><i class="' + cls + '" style="width:' + (hi / max * 100) + '%"></i>'
          + (lo !== hi ? '<i class="cost-lo" style="width:' + (lo / max * 100) + '%"></i>' : '') + '</span><b>' + (lo !== hi ? gbp(lo) + '–' + gbp(hi) : gbp(hi)) + '</b></div>';
      }
      cout.innerHTML = '<div class="cost-bars">' + bar('Full-time CFO, year one', y1, y1, 'cost-ft')
        + bar('Full-time CFO, later years', ongoing, ongoing, 'cost-ft2')
        + bar('Fractional CFO, ' + lvl[0].toLowerCase(), fLo, fHi, 'cost-fr') + '</div>'
        + '<p class="tool-msg">At this level, a fractional CFO costs roughly <b>' + gbp(ongoing - fHi) + '–' + gbp(ongoing - fLo) + ' a year less</b> than a full-time hire after year one, and starts in one to two weeks rather than four to six months.</p>'
        + '<details class="cost-notes"><summary>How these figures are worked out</summary><ul class="ticks">'
        + '<li>Full-time: salary, plus a 15% bonus, plus employer National Insurance at 15% on earnings above £5,000 (2026/27 rates), plus 5% employer pension. Year one adds a 25% recruiter fee.</li>'
        + '<li>Fractional: ' + lvl[0] + ' support (' + lvl[3].toLowerCase() + ') at £' + (lvl[1] / 1000) + 'K–£' + (lvl[2] / 1000) + 'K a month, excluding VAT where applicable.</li>'
        + '<li>Indicative only. Office costs, equipment, benefits and management time for a full-time hire are not included.</li></ul></details>'
        + '<div class="tool-acts"><a class="btn btn-gold" href="' + BOOK + '" target="_blank" rel="noopener">Book a 30-minute call</a><a class="btn" href="/contact.html">Discuss your situation</a></div>';
      cout.hidden = false;
    }
    sal.addEventListener('input', renderC); segments(cRoot, renderC); renderC();
  }
})();
