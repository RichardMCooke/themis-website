THEMIS WEBSITE — PRIVACY NOTICE v1.0
Upload instructions
====================================

FILES IN THIS ZIP
-----------------
privacy.html    Replaces the existing privacy.html in your web root.

That is the only file that changes. Nothing else in the repository
is affected — no CSS, no JS, no images, no other page.


WHY NOTHING ELSE NEEDS CHANGING
-------------------------------
1. Styling — the page uses only classes that already exist in
   css/themis.css (.wrap, .on-navy, .indexed, .sec-index, .compare,
   .ticks, .callout, .card, .stats, .photo-band, .reveal). No new CSS.

2. Scripts — js/themis.js already drives the sticky section index
   (.sec-index active state), the reveal-on-scroll animations and the
   navy header tone. No new JS.

3. Links in — every page footer already carries
   "Privacy & cookies" -> privacy.html, and the cookie consent banner
   in js/analytics.js already links to privacy.html. Both keep working.

4. Image — images/board-laptops.jpg is already in the repository and is
   reused for the closing quote band.


HOW TO UPLOAD
-------------
Via GitHub in the browser:
  1. Open your themis-website repository.
  2. Click privacy.html.
  3. Click the pencil (Edit) icon.
  4. Select all, delete, then paste the contents of the privacy.html
     in this zip.
  5. Commit with a message such as
     "Privacy notice v1.0 — lawful bases, processor role, retention".

Via drag and drop:
  1. Open the repository root.
  2. Click "Add file" > "Upload files".
  3. Drag privacy.html in. GitHub will overwrite the existing file.
  4. Commit.

Azure Static Web Apps will redeploy automatically from the workflow in
.github/workflows/.


WHAT CHANGED FROM THE PREVIOUS NOTICE
-------------------------------------
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
