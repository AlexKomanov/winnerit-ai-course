# winnerit-ai-course

Hebrew-language HTML presentations for the WinnerIT AI course. Each lesson is a single self-contained HTML file (no build step, no dependencies) intended to be opened directly in a browser and presented.

Each `.html` file in the project root is a lesson (or `index.html`, the catalog). To see what files exist and what they cover, read the directory and the file titles — do not rely on any list here.

---

## Workflow Defaults

- Prefer the simplest direct approach. Do NOT invoke brainstorming, planning, subagents, or worktrees for small/simple requests unless explicitly asked.
- After starting a dev server, immediately report the actual port (e.g., 8080 vs 3000) so the user knows where to look.
- For visual tweaks (font sizes, spacing), prefer small incremental changes — bumps tend to come out too large on the first try.

---

## Hebrew/RTL Presentations

- All presentations are Hebrew RTL. When adding navigation, prev should go right and next should go left.
- Place RTL punctuation (? and !) on the correct (left) side of Hebrew text.
- New presentations belong under שיעור 1 (lesson 1) by default unless told otherwise — never שיעור 0 (setup).
- Match the existing visual style (cards, fonts, badges) of sibling presentations before introducing new design patterns.

---

## Voice & Language

- **Hebrew, RTL.** `<html lang="he" dir="rtl">`. All body copy is Hebrew.
- **Inclusive plural "we" form (אנחנו).** Verbs: נקבל / נגלה / נתקין / נריץ / נמשוך / נבנה. Possessives: שלנו, לא שלך. Never the imperative "you" form (תוריד, תריץ).
- **Hebrew text only — no dual-language slide labels.** The eyebrow's English mark (e.g., `02 · concept`) is the only label shown; the Hebrew duplicate inside `<span class="he">…</span>` is kept in the markup but hidden via CSS (`.eyebrow .he { display: none; }`). This lets us keep the structure consistent and re-enable bilingual mode later if needed.
- **No lesson numbers** in chrome or content (the course's lesson numbering hasn't been finalized).
- **No mentions of session duration / time** anywhere.
- Use the **English word** for borrowed tech terms rather than Hebrew transliteration where the English word is more idiomatic — e.g., `offline` not `אופליין`.
- Use **"מחשב"** (computer) when referring to the user's local machine — not "מכשיר" (device).
- Use **"ארכיטקטורה"** for architecture — not "אדריכלות".

---

## Design System

### Colors (light theme, warm cream)

```
--bg:          #F2EDE3   warm cream (page)
--bg-2:        #EAE2D2   darker cream (sections)
--bg-3:        #FBF8F1   lightest cream (cards)
--ink:         #1B2336   dark navy (primary text)
--ink-soft:    #4D556C   muted navy (body text)
--muted:       #8B8A82   warm gray (captions)
--border:      #D8CCB5   warm border
--border-soft: #E5DDC9

Accents (used sparingly, one strong color at a time):
--coral:       #E04E36   primary accent — titles, badges, links
--forest:      #2F6B49   success / "local" / model badge L
--mustard:     #E2A93B   highlights / "output" nodes
--sky:         #4A7BA8   "cloud" / informational
```

Background has a subtle dotted grid:
`background-image: radial-gradient(circle at 1px 1px, rgba(27,35,54,0.06) 1px, transparent 0); background-size: 24px 24px;`

### Typography

- **Display (Hebrew + Latin):** `Frank Ruhl Libre` — weights 400, 500, 700, 900. Used for slide titles, big numerals, posters.
- **Body (Hebrew):** `Heebo` — weights 300, 400, 500, 700, 800.
- **Mono:** `JetBrains Mono` — weights 400, 500, 700. Used for code, eyebrows, captions, terminal mockups.

Loaded via Google Fonts in one preconnect + stylesheet link.

### Patterns

- **Eyebrow:** small uppercase mono label in coral with a short coral horizontal line. Format: `XX · english-mark` (e.g., `13 · cloud`). **Used only in `ollama.html`. New presentations do not use eyebrows — omit them entirely.**
- **Italic accent inside titles:** wrap a key noun in `<em>` — it renders italic in coral. This is the deck's signature emphasis style.
- **Poster slide** (`.slide-poster`): full-slide emphasis with a large `<h1 class="mega">` and an optional `.sub` subtitle. CSS must use `justify-content: center; align-items: center; text-align: center;` — content is centered both vertically and horizontally. Do **not** use `align-items: stretch` or `text-align: right` on poster slides.
- **Step blocks** (numbered cards with copyable command): coral square badge with number, Hebrew title, paragraph, dark code line with copy icon at the bottom. Class `.step-block` inside `.steps-grid` (default 3 cols, `.two` variant for 2 cols).
- **`.step-code`** (dark terminal block inside a step-block): for real shell commands the user types. Prompt `>_`, colored keywords via `.kw` / `.arg` spans, copy button.
- **`.step-action`** (light cream block inside a step-block): for UI navigation steps — clicking, searching, opening menus, typing into a chat box. Uses `var(--bg-2)` background with a coral `→` arrow and plain text. Never use `.step-code` for UI actions; it looks like a terminal command and confuses students.
- **`.os-tag`** (small badge at top-right of step-block): platform indicator. Variants: `.os-tag.mac` (macOS only), `.os-tag.win` (Windows only), `.os-tag.both` (both). Text is uppercase mono in coral.
- **Mini-cards** (3-up bullet cards): used on the "cloud problem" slide and "cloud intro" slide. Icon at top, title, short paragraph.
- **Link banner:** dashed-border card pointing to an external page. Class `.link-banner` with `.lb-text` and `.lb-link`.
- **No corner numerals.** The `.corner-num` class (large translucent background number) exists in older files but is **not used in new presentations**. Do not add corner numbers to new slides.
- **Film grain + dot grid background.** Both subtle. Don't remove.

### Topbar (every presentation)

Every presentation has an identical topbar pattern:

```html
<header class="topbar">
  <div class="left">
    <a href="index.html" class="back-home">חזרה לכל השיעורים</a>
    <button class="fs-btn" id="btn-fs" aria-label="מסך מלא" title="מסך מלא">
      <svg class="icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
      <svg class="icon-compress" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" style="display:none"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/></svg>
    </button>
  </div>
  <div class="right">
    <span>Presentation Title · Hebrew subtitle</span>
    <span class="counter"><span id="cur">01</span> <span class="total">/ NN</span></span>
  </div>
</header>
```

- `.back-home` is a coral-bordered pill button (no SVG arrow, text only). It fills solid coral on hover.
- `.fs-btn` is the fullscreen toggle button — a 32×32 icon button next to the back button. Uses two SVG icons: `.icon-expand` (enter fullscreen) and `.icon-compress` (exit fullscreen), toggled via JS on the `fullscreenchange` event. CSS:
  ```css
  .fs-btn {
    border: 1.5px solid var(--border); background: transparent; border-radius: 6px;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--muted); transition: all 0.15s; padding: 0; flex-shrink: 0;
  }
  .fs-btn:hover { border-color: var(--coral); color: var(--coral); }
  ```
  JS (add inside the existing IIFE script):
  ```js
  const btn = document.getElementById('btn-fs');
  btn.addEventListener('click', () => {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); }
    else { document.exitFullscreen(); }
  });
  document.addEventListener('fullscreenchange', () => {
    const full = !!document.fullscreenElement;
    btn.querySelector('.icon-expand').style.display = full ? 'none' : '';
    btn.querySelector('.icon-compress').style.display = full ? '' : 'none';
    btn.setAttribute('aria-label', full ? 'צא ממסך מלא' : 'מסך מלא');
  });
  ```
- The `/ NN` counter must match the actual number of `<section class="slide"` elements in the file. Count them — do not guess.
- No "winnerit · ai course" text in the topbar — only the back button, fullscreen button, and the presentation title.

---

## Slide structure

Every presentation follows the same arc:

1. **Cover** — title + decorative SVG icons, no body copy.
2. **Overview** — two info cards: prerequisites on one side, outcomes on the other.
3. **Content slides** — use existing layout patterns (see below). Typically 5–15 slides.
4. **Closing** — three Hebrew verb bullets (e.g., נוריד · נריץ · נבנה) matching the lesson's actions.

### Layout patterns (use existing, don't invent new ones)

| Pattern | Class | When |
|---|---|---|
| Statement | `.slide-statement` | Defining a concept in one sentence + supporting detail |
| Poster | `.slide-poster` | One-slide emphasis: big bold phrase, minimal copy |
| Step blocks | `.steps-grid` + `.step-block` | Numbered how-to sequence (max 3 per row) |
| Mini-cards | `.slide-three` / `.slide-four` | 3–4 parallel concepts with icons |
| Side-by-side | `.slide-vs` | Comparing two things (e.g., local vs cloud) |
| Info grid | `.slide-info` | Prerequisites / outcomes (cover slide 2) |
| Why grid | `.slide-why` | Single benefit with icon, title, paragraph |
| CLI table | `.slide-cli` | Grouped command reference |
| Closing | `.slide-end` | Final verb-bullet slide |

---

## Navigation (horizontal, RTL flow)

- **Container:** `.slides { direction: rtl; display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }`
- **First slide is on the right.** Advancing moves left (matching Hebrew reading flow).
- **Keyboard:**
  - `←` / `Space` / `PageDown` → next slide (forward = left in RTL)
  - `→` / `PageUp` → previous slide
  - `Home` / `End` → first / last
- **Edge click zones:** invisible buttons fixed to the page edges (`.edge-prev` on the **right**, `.edge-next` on the **left**) that reveal a coral circular arrow knob on hover.
- **Bottom bar:** keyboard hint, slide dots, prev/next icon buttons. Active dot is coral and elongated.
- **Wheel:** vertical scroll is converted to slide nav (debounced).
- **Scroll detection:** uses `IntersectionObserver` against `slidesEl` so RTL/LTR scroll-position quirks don't break the active-slide indicator.
- **All scrolling uses** `slides[idx].scrollIntoView({ inline: 'start' })` — the `inline: 'start'` keyword is direction-aware and survives RTL.

> ⚠️ Don't change `direction: rtl` on `.slides` to `ltr` — that breaks the visual flow even though `scrollLeft` math becomes simpler. The current `scrollIntoView` approach handles RTL correctly without falling back to manual scrollLeft arithmetic.

---

## index.html — Course Catalog

`index.html` is the course landing page, not a presentation. It lists all lessons grouped into module cards. Read `index.html` to see the current module structure — do not rely on a list here.

### Module card structure

```html
<div class="module-card" data-color="mustard|coral|forest|sky">
  <div class="module-strip"></div>
  <button class="module-toggle" aria-expanded="false" onclick="toggleModule(this)">
    <div class="module-meta">
      <div class="module-label">שיעור N · english-slug</div>
      <div class="module-title">Hebrew title <span class="en">English Title</span></div>
      <div class="module-desc">Short description.</div>
      <div class="module-tags"><span class="tag">Tag</span> …</div>
    </div>
    <div class="module-chevron">…svg chevron…</div>
  </button>
  <div class="module-body">
    <a class="lesson-row" href="./filename.html">
      <div class="lesson-row-info">
        <div class="lesson-row-name">Short name</div>
        <div class="lesson-row-title">One-line description</div>
      </div>
      <div class="lesson-row-cta">פתיחה</div>
    </a>
  </div>
</div>
```

- **Tags** must list only tools/topics actually covered by the lessons inside that module.
- **`.lesson-row-cta`** is a coral-bordered pill button (text only, no SVG arrow). Fills on hover.
- **"שיעורים בקרוב"** placeholder: use a `.soon-row` div inside `.module-body` for modules with no lessons yet.

### Flow module (ordered learning path)

Add `class="flow-module"` to a module card when the lessons have a required reading order. This activates:
- Numbered coral badges (`.lesson-row-step`) on each lesson row
- A dashed vertical coral line connecting badge centers

```html
<div class="lesson-row-left">
  <div class="lesson-row-step">1</div>
  <div class="lesson-row-info">…</div>
</div>
```

---

## Model names in presentations

Model names (e.g., in ollama.html, claude-code-ollama.html) go stale quickly. Before updating any presentation that shows model names: check `https://ollama.com/search` for the current list, then find and replace all occurrences in the file. Model names appear in: models grid, terminal demo, step blocks, CLI command table, RAM/memory notes.

---

## Tech Notes

- **Single HTML file**, no build step. Open any `.html` directly in a modern browser.
- All decoration is inline SVG. No external images.
- Copy-to-clipboard on step-blocks uses the async Clipboard API — flashes the copy icon green for 1.4s on success.
- Fonts are the only network request (Google Fonts CDN). Decks work offline once fonts are cached.

---

## When making changes

- **Voice check:** any new Hebrew text should be in plural "we" form. Audit verbs especially.
- **Don't introduce new fonts** without a reason — the Frank Ruhl Libre / Heebo / JetBrains Mono trio is the deck's voice.
- **Don't introduce dark mode or a second palette** — the cream + coral identity is intentional.
- **Don't add Hebrew labels back into eyebrows.** The dual-language convention was removed.
- **No corner numbers.** Don't add `.corner-num` to new slides. The pattern exists in older files but is deprecated.
- **New slides** should use one of the existing layout patterns (statement, step-blocks, mini-cards, why-grid, poster, info-grid). Avoid one-off layouts.
- **Vertical centering on content slides:** the base `.slide` class uses `flex-direction: column` without `justify-content: center`, so content sticks to the top by default. Any slide that contains a title + steps-grid (or title + cards) and isn't a named variant (`.slide-poster`, `.slide-end`, `.slide-info`, etc.) must have `style="justify-content:center;"` on the `<section>` to keep content vertically centered.
- **After adding/removing slides**, update the `/ N` counter in the topbar. Count `<section class="slide"` elements in the file to get the correct number.
- **Verify navigation** (← / →, edge zones, dots, wheel) still works after structural changes — the `IntersectionObserver` setup assumes all slides are direct children of `#slides`.
- **Split-layout overflow:** `split-layout` (content left + visual mockup right) overflows the viewport when the content side has 3+ stacked step-blocks. Fix: use a horizontal `steps-grid` instead. Never use `split-layout` with more than 2 step-blocks on the content side.
- **`.step-code` vs `.step-action`:** use `.step-code` only for actual shell commands. UI actions (opening a panel, clicking Install, navigating menus, typing into a chat box) must use `.step-action`. Putting UI steps in a dark terminal block confuses students into thinking they need to type something.
- **Topbar back button:** always include `<a href="index.html" class="back-home">חזרה לכל השיעורים</a>` in every presentation topbar. No SVG arrow on the button — text only.
- **Fullscreen button:** always include the `.fs-btn` button with `id="btn-fs"` next to the back button in `.left`. See the Topbar section above for the exact HTML, CSS, and JS snippet.
- **index.html tags:** when adding a lesson to a module card, update the `module-tags` to include the new topic. Tags must reflect only what's actually covered.
- **Minimum card body font size: 16px.** `.mini-card p` and `.step-block p` must never be below `16px` in the base CSS. Smaller sizes look unreadable when projected or on a laptop screen. Files with 13–14px base were a known bug; the standard is 16px.
- **Laptop viewport (`@media (max-height: 900px)`) minimums:** `.mini-card p` min `15px`, `.step-block p` min `14px`. Do not reduce card body text below these thresholds in the max-height query.
- **Every presentation must include `@media (max-height: 900px)`** — the compact-viewport query that scales down paddings, title sizes, and margins for MacBook screens (~700–900px viewport height). The script that adds it lives in the project; when creating a new presentation, copy the block from any recent `.html` file.
- **Hebrew/English bidi mixing:** when a line contains Hebrew connectors ("או", "ומעלה", "מעבד") interspersed with English tech terms, the browser's bidi algorithm visually reverses the English words. Fix: replace Hebrew connectors with punctuation (`/`, `+`) and wrap the English value portion in `<span dir="ltr">…</span>`. Example: `<strong>Terminal</strong> · <span dir="ltr">Bash / Zsh / PowerShell / CMD</span>`. This rule applies equally to `module-desc` and `lesson-row-title` in `index.html` — not just presentation slides.
- **Slash commands inline in Hebrew text:** an inline `<code>` element containing a slash command (e.g. `/clear`) inside an RTL paragraph will render the slash on the wrong side. Always add `direction:ltr;unicode-bidi:embed` to the `<code>` style: `<code style="…;direction:ltr;unicode-bidi:embed;">/clear</code>`.
- **Multiple shell commands in one step-block:** stack two `.step-code` divs inside the same `.step-block`, adding `style="margin-top:8px;"` to the second one. Use this when a step requires running two sequential commands (e.g., install package then install browsers).
