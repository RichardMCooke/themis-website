# Themis Professional Services — website

Static site. No build step, no dependencies, no tracking. Upload the contents of this
folder to your web root and it works.

## Files
    index.html              Home — scroll-narrative with the Apple-style pinned stages
    what-we-do.html         Four mandates + how engagements work (sticky section index)
    information.html        Information hub — "Full-time CFO or fractional CFO?" live,
                            plus three reserved slots (#info-02/03/04)
    data-and-bi.html        Themis Data & BI division — BI strategy, Power BI, NSAW
    contact.html            Enquiry form + direct details
    css/themis.css          All styling. Brand tokens are the :root variables at the top.
    js/themis.js            Scroll behaviours (see "Motion" below)
    images/                 Logo lockup. Drop replacement photography here.
    downloads/              Flyer + profile PDFs linked from the site

## Upload
Copy everything inside `site/` into your public web root (`public_html`,
`www`, or equivalent). Keep the folder structure — paths are relative.

## Motion — four moves only
1. **Reveal on enter** — add `class="reveal"` to any element, or `class="reveal-group"`
   to a container to stagger its children.
2. **Count-up** — `<span data-count-to="32" data-prefix="£" data-suffix="m">`.
3. **Emblem scale** — the hero logo scales and fades on scroll (home only).
4. **Pinned horizontal rail** — `.rail-stage` (tall) > `.rail-sticky` > `.rail-track`.
   Rail travel is driven by the stage's height: `height:340vh` on the home page. Add a
   card, increase the height a little.

Everything degrades to a static stack under `prefers-reduced-motion` and below 760px.

## Photography
All photographs in `images/` are Unsplash stock, free for commercial use with no
attribution required, downloaded locally (no hotlinking, no third-party requests):

    team-meeting.jpg   Christina @ wocintechchat.com   home — the practice
    boardroom.jpg      Dylan Gillis                    home — quote band
    advisory.jpg       Christina @ wocintechchat.com   home — our people
    reporting.jpg      Isaac Smith                     what we do 01
    deal-table.jpg     Annie Spratt                    what we do 03
    board-laptops.jpg  Mapbox                          information banner
    consult.jpg        Headway                         contact banner
    bi-analytics.jpg   Luke Chesser                    home + Data & BI banner
    bi-dashboard.jpg   Deng Xiang                      Data & BI 02
    bi-monitors.jpg    Stephen Dawson                  Data & BI 03
    bi-tablet.jpg      Jakub Żerdzicki                 Data & BI 04
    bi-desk.jpg        Campaign Creators               Data & BI 01

Swap any of them for real client or team photography by overwriting the file — sizes and
crops are handled by CSS (`.photo-frame`, `.photo-band`).

## Placeholders to replace before launch
- Two people cards in the "Our people" band on `index.html` currently show role titles
  only ("Associate Director", "Senior Consultant") — replace the <h3> with real names when
  confirmed. Copy across the site is written in the firm's voice ("we", "our
  directors", "the team") with Richard named as founder.
- LinkedIn URL on the contact page (`[data-placeholder]`)
- Three reserved information sections on `information.html`

## Map
The contact page embeds a live, zoomable Google Maps frame for postcode **TF1 6AP**
(`maps.google.com/maps?q=TF1%206AP&z=14&output=embed`) — no API key needed, but it does
load from Google, so it is the site's only third-party request. Change the postcode in
that one URL to move the pin. Replace the iframe with a static image if you'd rather keep
the site request-free.

## Contact routing
Two routes, set as plain `mailto:` addresses — search and replace to change them. No
personal names are shown on the contact page or in the form's division selector:
- Professional Services — `richardcooke@themisprofessional.com`
- Themis MIS (Data & BI) — `MI@ThemisProfessional.com` *(placeholder — confirm)*
- Finance Transformation — `Transform@ThemisProfessional.com`
- Reporting & Controls — `Controls@ThemisProfessional.com`

The contact page's "Direct routing" band shows one card per route; only the founder card
carries a personal name.

The contact form's first field is a division `<select>`; its value is the destination
address (`[data-route]` in js/themis.js), so adding a third division is a one-line change.

## Contact form
There is no server-side handler, so the form hands off to `mailto:` on submit — nothing
is lost, but it opens the visitor's email client. When your host is decided, point the
form at a handler (Formspree, Netlify Forms, or a PHP script) by giving the `<form>`
an `action` and removing the `data-mailto` attribute.

## Divisional lockup — THEMIS / MIS
The Data & BI pages use a sibling lockup: the same emblem and Georgia wordmark, with the
last three letters of THEMIS set in gold (`.mis`) and the subtitle changed to
"Management Information Systems". It is built from live text + `images/themis-emblem.png`
(cropped from the supplied artwork), so no new logo file is needed. Alternative treatments
were explored in "Themis MIS Logo Options" — swap by editing `.mis` in css/themis.css.

## Logo assets
`images/themis-logo-full.png` (full colour) is used on white/off-white only.
`images/themis-logo-white.png` is a white-reversed lockup generated from the supplied
artwork's alpha channel, used on every navy background per the brand rule. If an official
white-reversed PNG exists, drop it in at that filename to replace it.

## Brand
Navy `#0B1F3A` and gold `#B08D3E` only. Georgia for display type, Calibri for body —
both system fonts, so no webfont loading and no third-party requests.
