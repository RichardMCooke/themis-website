THEMIS WEBSITE — HOME PAGE SPACING
Incremental update, 5 September 2026
====================================

FILES IN THIS ZIP  (2 files, both replace existing files)
---------------------------------------------------------
  css/themis.css    Hero height; five mandates unpinned.  KEEP IN css/
  js/themis.js      Rail runway calculation.              KEEP IN js/

No HTML file changes. The seven HTML files you uploaded earlier today
are current and should not be re-uploaded.


1. BLUE SPACE ABOVE THE HERO LOGO  (css/themis.css)
---------------------------------------------------
Cause: the hero was set to fill the viewport (min-height:100svh) with
its content centred inside it. Halving the emblem removed roughly 260px
of content height, and because the block is vertically centred, half of
that reappeared as empty navy above the logo.

Changed one rule, the .hero block:

    min-height: 100svh        ->  76svh
    padding:    100px 0 90px  ->  44px 0 84px

Confirmed good by you.


2. WHITE SPACE IN THE FIVE MANDATES  (css/themis.css)
-----------------------------------------------------
The honest explanation, because my first attempt at this was wrong.

The section was built as a "pinned rail": it is deliberately made
several screens tall, and as you scroll down that extra height, a
sticky box stays fixed under the header and the cards slide sideways.
The extra height IS the scroll mechanism — and .rail-stage paints that
whole height off-white.

So any window taller than the cards themselves shows the surplus as an
empty off-white band. My earlier attempt forced the sticky box to fill
the screen, which did not remove the surplus — it split it, half below
the cards and half above the "Five mandates" heading, which was worse.
There is no arrangement of a pinned rail that removes it. The pin is
the cause.

So the pin is gone. The five mandates are now a plain horizontal strip:
all six cards in a row, scrolled or swiped sideways, with the section
exactly as tall as the cards. This is precisely what the site already
did on phones — the mobile rules had unpinned it all along — so it is a
behaviour the design already contained, now used at every width.

Added as one block, after the six-item nav block:

    .rail-stage{height:auto!important}
    .rail-sticky{position:static;max-height:none;overflow:visible;
      padding:clamp(64px,9vw,128px) 0 clamp(40px,5vw,72px)}
    .rail-track{transform:none!important;overflow-x:auto;
      scroll-snap-type:x mandatory;scroll-padding-inline:28px;
      -webkit-overflow-scrolling:touch;padding-bottom:26px}
    .rail-card{scroll-snap-align:start}
    .rail-progress{display:none}

The padding on .rail-sticky matters: index.html carries an inline
style="padding:0" on the section itself, so this section takes none of
the site's usual section spacing from the stylesheet — all of its
vertical space has always come from .rail-sticky. The clamp above is
the same rhythm every other section on the page uses, so the off-white
band starts and ends with the spacing you would expect.

The !important on the stage height is needed because js/themis.js sets
that height inline. Cards snap as you swipe. The scroll-padding-inline is what keeps the
first card level with the heading: scroll snapping aligns cards to the
edge of the scrolling area and ignores the track's own padding, so
without it card 01 parks hard against the section edge. The thin gold progress bar
is hidden, since it tracked the vertical scroll that no longer drives
anything.

WHAT YOU LOSE: the sideways-scroll-on-scroll effect on desktop. It was
one of the four motion moves in the site's design. The original rules
are untouched above it, so deleting this one block restores the pin
exactly as it was. Say the word and I will.

WHAT YOU GAIN: zero dead space at every window size, maximised or not,
on any screen height — because the section can no longer be taller than
its contents.


3. THE RUNWAY WAS 10% TOO LONG  (js/themis.js)
----------------------------------------------
Separate bug, found while investigating the above. The section height
was set to the horizontal travel distance PLUS 10%:

    stage.style.height = (sticky.offsetHeight + travel * 1.1) + 'px';

That surplus was scroll distance with nothing left to move. The file's
own comment says the runway should be "exactly the horizontal distance
to cover, so no dead space below the cards", so the multiplier
contradicted the intent. Changed to:

    stage.style.height = (sticky.offsetHeight + travel) + 'px';

With the rail now unpinned this line no longer affects the home page —
the CSS above overrides the height. It is included because it is a
genuine fix, and because it means the pin behaves correctly if you ever
restore it.


HOW TO UPLOAD
-------------
Two files, two folders — do them separately so neither lands in the
root by mistake:

  1. Open the css folder in the repository, "Add file" > "Upload
     files", drag themis.css in, commit.
  2. Open the js folder, same again with themis.js, commit.

Commit message suggestion:
  "Trim hero height; unpin the mandates rail"


CHECK AFTER DEPLOYMENT
----------------------
  - Load the home page maximised. Logo near the top of the navy area.
  - Scroll to the five mandates. The cards sit in a single row with the
    section ending just below them, and swiping or scrolling sideways
    moves through all six. No off-white band above or below.
  - Repeat in a small, non-maximised window and on a phone. The section
    height follows the cards at every size.


STILL OUTSTANDING
-----------------
  - The shorter LinkedIn posts and the three article images, awaiting
    your LinkedIn archive.
  - Three factual claims in the privacy notice to confirm: Microsoft
    UK/EU data residency, whether AML checks apply to your mandates,
    and the 6-year engagement file retention.
