THEMIS WEBSITE — HOME PAGE SPACING
Incremental update, 5 September 2026
====================================

FILES IN THIS ZIP  (2 files, both replace existing files)
---------------------------------------------------------
  css/themis.css    Hero height; five mandates now a grid.  KEEP IN css/
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


2. THE FIVE MANDATES SECTION  (css/themis.css)
----------------------------------------------
The honest version, because this took several attempts.

The section was built as a "pinned rail": it is made several screens
tall, and as you scroll that extra height a sticky box stays fixed
under the header while the cards slide sideways. Two structural
problems, neither fixable by adjusting numbers:

  1. The extra height IS the scroll mechanism, and .rail-stage paints
     all of it off-white. Any window taller than the cards showed the
     surplus as an empty band. Making the sticky box fill the screen
     did not remove the surplus, it split it — half below the cards and
     half above the "Five mandates" heading, which was worse.

  2. Unpinned as a plain horizontal strip, the cards were reachable
     only by scrolling sideways in a container whose sole affordance is
     an overlay scrollbar that macOS hides. On a narrow window the
     off-screen cards were unreachable in practice.

Both problems require something to scroll. So nothing does.

The six cards now wrap into a grid, exactly like the .grid card sets
elsewhere on the site: three across on a wide screen, then two, then
one, with the section always as tall as its contents. Added as one
block, after the print rule:

    .rail-stage{height:auto!important}
    .rail-sticky{position:static;max-height:none;overflow:visible;
      padding:clamp(64px,9vw,128px) 0 clamp(56px,7vw,104px)}
    .rail-track{display:grid;
      grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));
      gap:24px;transform:none!important;overflow:visible;
      max-width:var(--wrap);width:100%;margin:0 auto;padding:32px 28px 0}
    .rail-card{flex:initial;min-height:0}
    .rail-progress{display:none}

Notes on why each line is there:
  - height:auto!important overrides the inline height js/themis.js sets
    on the section.
  - The padding on .rail-sticky matters because index.html carries an
    inline style="padding:0" on the section itself, so this section
    takes none of the usual section spacing from the stylesheet — all
    of its vertical space has always come from .rail-sticky. The clamp
    is the same rhythm every other section uses.
  - max-width:var(--wrap) aligns the cards with the heading above them.
    As a full-bleed strip they had to sit outside it.
  - flex:initial releases the fixed card width the strip needed, so
    grid columns can size themselves; min-height:0 lets a card be as
    short as its text now that they sit in equal-height rows.
  - The gold progress bar is hidden: it tracked the vertical scroll
    that no longer drives anything.

WHAT YOU LOSE: the sideways-scroll-on-scroll effect, one of the four
motion moves in the site's design. The original rules are untouched
above this block, so deleting the block restores the pin exactly as it
was.

WHAT YOU GAIN: no dead space and no hidden cards, at any window size,
maximised or not, on any screen height — because nothing has to scroll
and the section cannot be taller than its contents.

Measured at 924px wide before shipping: two columns, no horizontal
overflow on the track or the document, first card aligned with the
heading, all six cards present, section height exactly equal to its
content height.


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

With the rail now a grid this line no longer affects the home page —
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
  "Trim hero height; five mandates as a wrapping grid"


CHECK AFTER DEPLOYMENT
----------------------
  - Load the home page maximised. Logo near the top of the navy area.
  - Scroll to the five mandates. All six cards visible in a grid, no
    sideways scrolling, no off-white band above or below.
  - Drag the window narrower and watch the grid go three columns, two,
    then one. No card should ever be cut off or need scrolling to.
  - Check on a phone too.


STILL OUTSTANDING
-----------------
  - The shorter LinkedIn posts and the three article images, awaiting
    your LinkedIn archive.
  - Three factual claims in the privacy notice to confirm: Microsoft
    UK/EU data residency, whether AML checks apply to your mandates,
    and the 6-year engagement file retention.
