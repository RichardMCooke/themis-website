/* Themis — Google Analytics 4 with a consent gate (UK/EU GDPR + PECR).
   ─────────────────────────────────────────────────────────────────────
   Measurement ID G-9SBGZ141PL (stream 15482235744).
   Nothing is sent to Google until the visitor clicks Accept. */

(function () {
  var GA_ID = 'G-9SBGZ141PL';
  var KEY = 'themis-consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  /* Consent Mode v2 — everything denied until the visitor says otherwise. */
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var loaded = false;
  function loadGA() {
    if (loaded || GA_ID.indexOf('XXXX') > -1) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function grant() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadGA();
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === 'granted') { grant(); return; }
  if (stored === 'denied') return;

  /* --- banner --- */
  function banner() {
    var b = document.createElement('div');
    b.className = 'cookie-bar';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie notice');
    b.innerHTML =
      '<p>We use Google Analytics to understand which pages are useful. ' +
      'Nothing is stored until you accept. ' +
      '<a href="privacy.html">Privacy notice</a></p>' +
      '<div class="cookie-acts">' +
      '<button type="button" data-cookie="denied" class="btn btn-sm">Decline</button>' +
      '<button type="button" data-cookie="granted" class="btn btn-gold btn-sm">Accept</button>' +
      '</div>';
    b.addEventListener('click', function (e) {
      var choice = e.target.getAttribute && e.target.getAttribute('data-cookie');
      if (!choice) return;
      try { localStorage.setItem(KEY, choice); } catch (err) {}
      if (choice === 'granted') grant();
      b.parentNode.removeChild(b);
    });
    document.body.appendChild(b);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', banner);
  } else { banner(); }
})();
