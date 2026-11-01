#!/usr/bin/env python3
"""Builds search-index.json from the site's HTML pages.
Run from the website folder:  python3 tools/build_search_index.py
The GitHub publishing workflow runs this automatically before every deploy."""
import json, os, re, glob
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {"404.html"}
SECTION = {"index.html": "Home", "what-we-do.html": "Services", "data-and-bi.html": "Data & BI",
           "insights.html": "Insights", "contact.html": "Contact", "privacy.html": "Privacy"}
SPLIT = {"what-we-do.html", "data-and-bi.html", "privacy.html"}   # long pages: index each section too
IGNORE_IDS = {"main", "primary-nav"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""; self.desc = ""; self.text = []; self.heads = []
        self.skip = 0; self.in_title = False; self.stack = []; self.sections = []; self.hbuf = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta" and a.get("name") == "description": self.desc = a.get("content", "")
        if tag == "title": self.in_title = True
        if tag in ("script", "style", "header", "footer", "noscript", "svg") or "data-search-skip" in a or (tag == "a" and "skip" in (a.get("class") or "").split()): self.skip += 1; self.stack.append((tag, None, True)); return
        if tag in VOID: return
        if tag in ("h1", "h2", "h3") and not self.skip: self.hbuf = (tag, len(self.text))
        sid = a.get("id")
        self.stack.append((tag, {"id": sid, "start": len(self.text), "h2": None} if sid and sid not in IGNORE_IDS else None, False))
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag in VOID: return
        if self.hbuf and tag == self.hbuf[0]:
            h = " ".join(self.text[self.hbuf[1]:]).strip()
            if h:
                self.heads.append(h)
                if tag == "h2":
                    for t, info, _ in reversed(self.stack):
                        if info and info["h2"] is None: info["h2"] = h; break
            self.hbuf = None
        while self.stack:
            t, info, skipping = self.stack.pop()
            if skipping: self.skip -= 1
            if info and info["h2"]:
                self.sections.append((info["id"], info["h2"], " ".join(self.text[info["start"]:])))
            if t == tag: break
    def handle_data(self, d):
        if self.in_title: self.title += d; return
        if self.skip: return
        d = re.sub(r"\s+", " ", d).strip()
        if d: self.text.append(d)

def clean(s, n=None):
    s = re.sub(r"\s+", " ", s).strip()
    return s[:n] if n else s

entries = []
files = sorted(glob.glob(os.path.join(ROOT, "*.html")) + glob.glob(os.path.join(ROOT, "insights", "*.html")))
for path in files:
    rel = os.path.relpath(path, ROOT).replace(os.sep, "/")
    if rel in SKIP: continue
    p = Page(); p.feed(open(path, encoding="utf-8").read())
    url = "/" if rel == "index.html" else "/" + rel
    section = SECTION.get(rel, "Insights" if rel.startswith("insights/") else "Page")
    title = re.sub(r"\s*·\s*Themis.*$", "", clean(p.title))
    entries.append({"u": url, "t": title, "s": section, "d": clean(p.desc), "h": clean(" | ".join(p.heads), 600), "b": clean(" ".join(p.text), 9000)})
    if rel in SPLIT:
        for sid, h2, txt in p.sections:
            entries.append({"u": url + "#" + sid, "t": h2, "s": section, "d": "", "h": "", "b": clean(txt, 3000)})
out = os.path.join(ROOT, "search-index.json")
json.dump(entries, open(out, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
print(f"search-index.json: {len(entries)} entries, {os.path.getsize(out)//1024} KB")
