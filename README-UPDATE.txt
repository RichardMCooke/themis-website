Themis website — Information page update
========================================

Copy into the repo, replacing existing versions:

  information.html                            -> /information.html
  css/themis.css                              -> /css/themis.css
  js/themis.js                                -> /js/themis.js
  downloads/Themis_Death_By_Data.pdf           -> /downloads/ (new)
  downloads/Themis_Bottleneck_Test.pdf         -> /downloads/ (new)
  downloads/Themis_AI_In_Finance.pdf           -> /downloads/ (new)
  downloads/Themis_Boardroom_Finance_Leader.pdf-> /downloads/ (new)

What changed
------------
1. information.html — the Information page is now an accordion of EIGHT flyers.
   Each row shows number, title and a one-line summary with a +/- expand button;
   the full article opens in place. Flyers 01-04 unchanged in content.
   New: 05 Death by data, 06 The bottleneck test, 07 "We can't do AI until the
   data's sorted", 08 Your boardroom doesn't need an accountant.
   All eight now end with a "Download (PDF)" button, and the four new PDFs have
   been added to the footer Downloads list.

2. css/themis.css — appended a "flyer accordion (Information)" block at the end.
   Nothing else in the stylesheet was altered.

3. js/themis.js — added two small blocks before the contact-form handler:
   deep-link opening (information.html#info-05 auto-opens that flyer) and
   reveal-on-open so animated content inside a collapsed flyer appears correctly.

Deep links: #fulltime-vs-fractional, #info-02 ... #info-08
