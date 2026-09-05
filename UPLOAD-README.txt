THEMIS WEBSITE — LINKEDIN PAGE + PRIVACY NOTICE v1.0
Upload instructions
====================================================

FILES IN THIS ZIP  (8 files)
----------------------------
NEW FILE
  linkedin-posts.html   The new page. Three LinkedIn articles in the
                        Information-page accordion, plus a reserved
                        section for the shorter posts to come.

REPLACE EXISTING FILES
  css/themis.css        Nav fix only — see below. KEEP IT IN THE css
                        FOLDER when you upload.
  index.html            Top nav + footer links.
  what-we-do.html       Top nav + footer links.
  data-and-bi.html      Top nav + footer links.
  information.html      Top nav + footer links, plus a "Read our
                        LinkedIn articles" button under the intro.
  contact.html          Top nav + footer links, plus the privacy link
                        under the enquiry form.
  privacy.html          Privacy notice v1.0, plus the nav links.

No JS or image files change.


THE CSS CHANGE — ONE BLOCK, NOTHING ELSE TOUCHED
------------------------------------------------
"LinkedIn" in the top navigation makes six items plus the Enquire
button, which overflowed the header bar between roughly 760px and
1000px wide — the iPad and small-laptop range.

One new block is added to css/themis.css, immediately before the flyer
accordion section and after the existing 760px media query, so it wins
on specificity ties. Nothing existing is edited or deleted:

  @media (max-width:900px)              The header switches to the ☰ menu
                                        button at 900px instead of 760px,
                                        so the bar never has to fit six
                                        items in a narrow space. Same
                                        drop-down styling as before,
                                        including the navy variant.

  @media (max-width:1010px)             Between 901px and 1010px the nav
        and (min-width:901px)           gap tightens to 16px and the link
                                        size to .9rem, so six items sit
                                        comfortably rather than just
                                        barely.

Everything else in the file is byte-identical. The rail, the comparison
tables, the section index and the reduced-motion rules are untouched, so
no other page changes behaviour.

Side effect worth knowing: on a tablet in portrait the menu is now
behind the ☰ button on every page, not just below 760px. That is the
intended trade — a working menu button beats a cramped or overflowing
bar.


NAVIGATION — WHERE THE PAGE NOW SITS
------------------------------------
  Top nav, every page:
    Home / What we do / Data & BI / Information / LinkedIn / Contact
    (plus the Enquire button)

  Footer "Pages" column, every page:
    Home / What we do / Data & BI / Information / LinkedIn posts /
    Contact / Privacy notice

  Plus a "Read our LinkedIn articles" button under the intro on
  information.html.

The nav label is "LinkedIn" — short, so the bar stays balanced. The
page heading and footer say "LinkedIn posts".


THE NEW PAGE
------------
Layout is deliberately identical to information.html: intro section,
photo band, numbered expanding accordion on the off-white background,
closing navy call to action. It uses only classes already in
css/themis.css and the existing handlers in js/themis.js.

Three articles, newest first, each with published date, standfirst,
full text and a "Read on LinkedIn" button:

  01  Building a house of sand              17 May 2026
  02  The child mentality                   14 May 2026
  03  KISS KISS — how a toddler taught me   12 May 2026
      more about leadership clarity than
      most job descriptions

Each has a deep-link id, so linkedin-posts.html#kiss-kiss opens that
article directly, exactly like the Information flyers.

There is no empty "coming soon" section: the page ships with three
finished articles and nothing else. When you send the shorter posts I
will add them as further accordion rows, or as a second section, and
reissue the file.

The photo band reuses images/advisory.jpg. No new image needed.


EDITORIAL CHANGES TO THE ARTICLE TEXT
-------------------------------------
Your own words, essentially verbatim. Changes, all minor:

  - Two typos corrected: "the the following update" and "you happiness
    level".
  - The Four I's / KISS mapping was laid out with spaces and arrows,
    which does not survive as web text. It is now a three-column table
    in the site's existing .compare style.
  - The "---" separators and LinkedIn "see more" artefacts removed.
  - The Matthew 7 bullets are now three cards, matching how the
    Information page presents a set of three.
  - Kay Wenham's list and the job-description quote are set as pull
    quotes with a gold rule.
  - Hashtags kept, in small grey type at the foot of article 01 — the
    only article that carried them.

Nothing added, no argument altered.


HOW TO UPLOAD
-------------
The zip has a css/ folder in it. Keep that structure — themis.css must
land in css/themis.css, not in the root.

Easiest route, two steps:

  1. The seven HTML files: open the repository root, click
     "Add file" > "Upload files", drag all seven in, commit.
  2. The stylesheet: open the css folder in the repository, click
     "Add file" > "Upload files", drag themis.css in, commit.

Or drag the whole unzipped folder onto the repository root in one go —
GitHub preserves the folder structure — but delete UPLOAD-README.txt
first if you would rather it did not live in the repository.

Commit message suggestion:
  "Add LinkedIn page, privacy notice v1.0, six-item nav fix"

Azure Static Web Apps will redeploy automatically.


CHECK AFTER DEPLOYMENT
----------------------
  - Resize a desktop browser slowly from wide to narrow on any page.
    The nav should switch to the ☰ button at 900px with no overlap at
    any width in between.
  - Open the ☰ menu on a phone and confirm LinkedIn is in the list.
  - Open linkedin-posts.html#kiss-kiss directly; article 03 should be
    expanded on arrival.


STILL OUTSTANDING
-----------------
  - The shorter LinkedIn posts. Send Shares.csv or paste the text and I
    will add them to the page.
  - Three factual claims in the privacy notice to confirm: Microsoft
    UK/EU data residency, whether AML checks apply to your mandates,
    and the 6-year engagement file retention.

LinkedIn URL confirmed correct: linkedin.com/in/themisprofessional.
