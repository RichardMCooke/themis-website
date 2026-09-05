THEMIS WEBSITE — PRIVACY NOTICE v1.0
Upload instructions
====================================

FILES IN THIS ZIP  (6 files, all replace existing files)
--------------------------------------------------------
privacy.html        The new privacy notice, v1.0. Replaces the old one.
index.html          Footer only — "Privacy notice" added to Pages.
what-we-do.html     Footer only — "Privacy notice" added to Pages.
data-and-bi.html    Footer only — "Privacy notice" added to Pages.
information.html    Footer only — "Privacy notice" added to Pages.
contact.html        Footer, plus a privacy link under the enquiry form.

No CSS, JS or image files change. Nothing new is added to the
repository — every file here overwrites one that already exists.


WHAT CHANGED IN THE FIVE OTHER PAGES
------------------------------------
1. Footer "Pages" column (all five, plus privacy.html itself)
   One line added after Contact:
       <a href="privacy.html">Privacy notice</a>
   The notice is now reachable from the normal navigation list on every
   page, not only from the legal small print underneath it. The existing
   "Privacy & cookies" link in the legal line is unchanged, so there are
   now two footer routes to it.

2. Contact page enquiry form (contact.html only)
   A second .form-note line added directly beneath the existing one:
       What we do with your details: privacy notice.
   This puts the notice in front of the visitor at the one point where
   they are actually about to hand over personal data — which is what
   ICO transparency guidance asks for.

Nothing else on those five pages is touched. No layout, copy, colour or
navigation change beyond the two items above.


HOW TO UPLOAD
-------------
Drag and drop (easiest for six files):
  1. Open your themis-website repository at the root.
  2. Click "Add file" > "Upload files".
  3. Drag all six .html files in together. GitHub overwrites the
     existing versions.
  4. Commit with a message such as
     "Privacy notice v1.0 + footer and contact-form links".

Azure Static Web Apps will redeploy automatically from the workflow in
.github/workflows/.

If you would rather do it in two commits, upload privacy.html first
(the notice goes live, still reachable from the legal line as before),
then the other five (the new links appear).


THE PRIVACY NOTICE ITSELF — WHAT CHANGED FROM THE OLD VERSION
-------------------------------------------------------------
Added:
  - Lawful basis table (six processing activities). The previous notice
    stated none; UK GDPR Art. 13 requires it.
  - "Client data - where we act as processor" section, covering ledgers,
    payroll files and board papers handled on engagements, and the
    controller/processor split.
  - Retention table with specific periods.
  - Named sub-processors and the international transfer position (UK
    adequacy / IDTA).
  - Security and breach notification, including the 72-hour ICO
    commitment.
  - All eight data subject rights individually, plus the ICO's postal
    address and telephone number.
  - Sticky "on this page" index, version number and effective date.

Retained from the previous notice:
  - Controller identity and company number.
  - Consent-gated Google Analytics description, matching what
    js/analytics.js actually does.
  - The Google Maps embed disclosure on the contact page.
  - 24-month deletion of enquiries that do not progress.

Styling and behaviour use only classes already in css/themis.css
(.wrap, .on-navy, .indexed, .sec-index, .compare, .ticks, .callout,
.card, .stats, .photo-band, .reveal) and the existing scroll handlers
in js/themis.js. images/board-laptops.jpg is reused for the closing
quote band and is already in the repository.

Version:      1.0
Effective:    September 2026
Approved by:  Richard Cooke, 5 September 2026


THREE FACTS TO CONFIRM ARE TRUE OF THE PRACTICE
-----------------------------------------------
These are stated as fact in the notice. If any is wrong, correct it
before or shortly after upload — an inaccurate privacy notice is itself
a compliance problem.

  1. "Microsoft ... UK/EU data residency" — check your Microsoft 365
     tenant's data location.
  2. Anti-money-laundering checks are listed as a legal obligation.
     Remove that row if AML regulations do not apply to your mandates.
  3. Engagement files retained 6 years after the engagement ends.
     Adjust if your professional indemnity insurer requires longer.

Also worth doing once the notice is live: review it annually, and note
the review date at the top of the page.
