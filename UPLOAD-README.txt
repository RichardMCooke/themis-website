THEMIS WEBSITE — HOME PAGE SPACING
Incremental update, 5 September 2026
====================================

FILES IN THIS ZIP  (2 files, both replace existing files)
---------------------------------------------------------
  css/themis.css    Hero height and padding.   KEEP IN css/
  js/themis.js      Rail runway calculation.   KEEP IN js/

No HTML file changes. Nothing else in the repository is affected.

This zip contains ONLY what has changed since your last upload, as
requested. The seven HTML files you uploaded earlier today are current
and should not be re-uploaded.


1. BLUE SPACE ABOVE THE HERO LOGO  (css/themis.css)
---------------------------------------------------
Cause: the hero was set to fill the viewport (min-height:100svh) with
its content centred inside it. Halving the emblem removed roughly 260px
of content height, and because the block is vertically centred, half of
that reappeared as empty navy above the logo.

Changed one rule, the .hero block:

    min-height: 100svh        ->  76svh
    padding:    100px 0 90px  ->  44px 0 84px

The shorter top padding lifts the whole block, and 76svh keeps the hero
a deliberate stage without forcing a screen height it no longer needs.
The scroll cue still pins to the bottom, and the emblem's
scale-on-scroll effect is unaffected — it reads the hero's height at
runtime, whatever that height is.


2. WHITE SPACE BELOW THE FIVE MANDATES  (two causes)
----------------------------------------------------

2a. THE PINNED BOX DID NOT FILL THE SCREEN  (css/themis.css)

This was the main one, and it is worse the taller your screen is.

The rail works by making the section tall enough that scrolling down
drives the cards sideways, while a sticky box stays pinned under the
header. That sticky box was set to

    max-height: calc(100svh - 70px)

which caps its height but never grows it, so it was only as tall as its
own content — heading plus cards, roughly 700px. The section behind it
is deliberately much taller (that height IS the scroll runway), and it
is painted off-white. On a tall display the remaining 700-odd pixels of
that off-white sat below the cards for the entire time the section was
pinned. That is the empty band in your first screenshot.

Changed one word:

    max-height: calc(100svh - 70px)  ->  min-height: calc(100svh - 70px)

The box now fills the pinned area, and because the rule already says
justify-content:center the heading and cards sit centred in the screen
with balanced space above and below — which is what the centring was
there for. No void.

Two guards added so the static fallbacks do not inherit the new
minimum, since they are not pinned and must hug their content:

    @media (max-width:760px){.rail-sticky{min-height:0}}
    @media (prefers-reduced-motion:reduce){.rail-sticky{min-height:0}}


2b. THE RUNWAY WAS 10% TOO LONG  (js/themis.js)
-----------------------------------------------
Cause: the pinned horizontal rail works by making its section tall
enough that scrolling down drives the cards sideways. The section's
height was set to the horizontal travel distance PLUS 10%:

    stage.style.height = (sticky.offsetHeight + travel * 1.1) + 'px';

That extra 10% is scroll distance with nothing left to move — the cards
have finished travelling, so you scroll through a screen of empty
off-white before the next section arrives. The file's own comment says
the runway should be "exactly the horizontal distance to cover, so no
dead space below the cards", so the multiplier contradicted the intent.

Changed to:

    stage.style.height = (sticky.offsetHeight + travel) + 'px';

One line. The last card now reaches its final position exactly as the
section ends. This also self-corrects if you add a sixth mandate later:
the travel distance is measured from the actual track width, so the
runway grows by precisely the right amount.

This is the change visible at the end of your second screenshot — the
gap between the last card and "The practice" section.

All three fixes affect the home page only. The rail is used nowhere else,
and no other page has a .hero section.


HOW TO UPLOAD
-------------
Two files, two folders — do them separately so neither lands in the
root by mistake:

  1. Open the css folder in the repository, "Add file" > "Upload
     files", drag themis.css in, commit.
  2. Open the js folder, same again with themis.js, commit.

Commit message suggestion:
  "Trim hero height and rail runway on the home page"


CHECK AFTER DEPLOYMENT
----------------------
  - Load the home page. The logo should sit near the top of the navy
    area, not floating in the middle of it.
  - Scroll slowly through the five mandates. The cards should sit
    centred in the screen throughout, with no empty off-white band
    beneath them, and the moment the last card stops moving the next
    section should begin.
  - Check it on your tallest display — that is where the old behaviour
    was most obvious.
  - Scroll the same section on a phone. Below 760px the rail becomes a
    normal swipe-across strip and ignores both changes, as before.


STILL OUTSTANDING
-----------------
  - The shorter LinkedIn posts and the three article images, awaiting
    your LinkedIn archive.
  - Three factual claims in the privacy notice to confirm: Microsoft
    UK/EU data residency, whether AML checks apply to your mandates,
    and the 6-year engagement file retention.
