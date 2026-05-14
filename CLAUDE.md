# winnerit-ai-course

Hebrew-language HTML presentations for the WinnerIT AI course. Each lesson is a single self-contained HTML file (no build step, no dependencies) intended to be opened directly in a browser and presented.

## Files

| File | Topic | Slides |
|---|---|---|
| `ollama.html` | Ollama — running language models locally + Ollama Cloud | 20 |

More lessons will be added as sibling HTML files. Each file should follow the conventions below.

---

## Voice & Language

- **Hebrew, RTL.** `<html lang="he" dir="rtl">`. All body copy is Hebrew.
- **Inclusive plural "we" form (אנחנו).** Verbs: נקבל / נגלה / נתקין / נריץ / נמשוך / נבנה. Possessives: שלנו, לא שלך. Never the imperative "you" form (תוריד, תריץ).
- **Hebrew text only — no dual-language slide labels.** The eyebrow's English mark (e.g., `02 · concept`) is the only label shown; the Hebrew duplicate inside `<span class="he">…</span>` is kept in the markup but hidden via CSS (`.eyebrow .he { display: none; }`). This lets us keep the structure consistent and re-enable bilingual mode later if needed.
- **No lesson numbers** in chrome or content (the course's lesson numbering hasn't been finalized).
- **No mentions of session duration / time** anywhere.
- Use the **English word** for borrowed tech terms rather than Hebrew transliteration where the English word is more idiomatic — e.g., `offline` not `אופליין`.

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

- **Eyebrow:** small uppercase mono label in coral with a short coral horizontal line. Format: `XX · english-mark` (e.g., `13 · cloud`).
- **Italic accent inside titles:** wrap a key noun in `<em>` — it renders italic in coral. This is the deck's signature emphasis style.
- **Step blocks** (numbered cards with copyable command): coral square badge with number, Hebrew title, paragraph, dark code line with copy icon at the bottom. Class `.step-block` inside `.steps-grid` (default 3 cols, `.two` variant for 2 cols).
- **Mini-cards** (3-up bullet cards): used on the "cloud problem" slide and "cloud intro" slide. Icon at top, title, short paragraph.
- **Link banner:** dashed-border card pointing to an external page (`ollama.com/download`, `ollama.com/search`). Class `.link-banner` with `.lb-text` and `.lb-link`.
- **Big corner numerals:** large translucent number in a slide corner. Class `.corner-num`. Decorative.
- **Film grain + dot grid background.** Both subtle. Don't remove.

## Slide Order (ollama.html, 20 slides)

| # | Eyebrow | Slide |
|---|---|---|
| 01 | — | Cover (pure title + decorative SVG icons) |
| 02 | `00 · overview` | Prerequisites + outcomes (two info cards) |
| 03 | `01 · what is` | What is Ollama (statement + mini terminal) |
| 04 | `02 · concept` | What is an LLM (definition + neural-net SVG) |
| 05 | `03 · models` | Popular models grid (link to ollama.com/search) |
| 06 | `04 · the problem` | Cloud AI — 3 problems (mini-cards) |
| 07 | `05 · the shift` | Poster: מקומי. פרטי. חופשי. |
| 08 | `06 · benefit 01` | Privacy |
| 09 | `07 · benefit 02` | Free / no costs |
| 10 | `08 · benefit 03` | Offline |
| 11 | `09 · benefit 04` | Instant response |
| 12 | `10 · comparison` | Local vs Cloud side-by-side |
| 13 | `11 · install` | One install command + link |
| 14 | `12 · quick start` | 3 step blocks: pull → run → chat |
| 15 | `13 · cloud` | Ollama Cloud intro (3 mini-cards) |
| 16 | `14 · cloud setup` | 3 step blocks: signup → signin → pull+run |
| 17 | `15 · the rule` | Poster: RAM rule |
| 18 | `16 · memory` | RAM size table |
| 19 | `17 · cli` | Grouped CLI commands (models / service & cloud) |
| 20 | — | Closing: נוריד · נריץ · נבנה |

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

## Model versions (verify before each refresh)

The presentation references current LLM versions. These move fast — re-verify against `https://ollama.com/search` periodically.

**As of last update:**

- `gemma4` — used as the default example model in CLI, quick-start, and the what-is terminal demo.
- Models slide lists 6 representative models:
  - gemma4 (Google · קל ומהיר)
  - qwen 3.5 (Alibaba · רב־לשוני)
  - mistral-medium-3.5 (Mistral AI · צרפת)
  - deepseek-v4-pro (DeepSeek · reasoning)
  - glm-5.1 (Zhipu AI · קוד פתוח)
  - gemini-3-flash-preview (Google · ענן בלבד)
- Cloud-model example throughout uses `deepseek-v4-pro:cloud` (the `:cloud` tag pattern).
- The slide also links to `ollama.com/search` so viewers can see the live catalog.

If model names go stale, update them in: models slide, what-is terminal mock, quick-start (3 cards), cloud-setup step 3, CLI commands table, and the closing CTA.

## External Links

| What | Where |
|---|---|
| Install script (primary) | `https://ollama.com/install.sh` (run via `curl -fsSL https://ollama.com/install.sh \| sh`) |
| Download page (all platforms) | `https://ollama.com/download` |
| Model catalog | `https://ollama.com/search` |
| Cloud signup | `https://ollama.com/signup` |

## Tech Notes

- **Single HTML file**, no build step. Open `ollama.html` in any modern browser.
- All decoration is inline SVG. No external images. (Title-slide decorations: llama, terminal, lock, CPU, sparkle, speech bubble.)
- Copy-to-clipboard on step-blocks is implemented in the inline `<script>` at the bottom — uses the async Clipboard API, flashes the copy icon green for 1.4s on success.
- Fonts are the only network request (Google Fonts CDN). The deck works offline once fonts are cached.

## When making changes

- **Voice check:** any new Hebrew text should be in plural "we" form. Audit verbs especially.
- **Don't introduce new fonts** without a reason — the Frank Ruhl Libre / Heebo / JetBrains Mono trio is the deck's voice.
- **Don't introduce dark mode or a second palette** — the cream + coral identity is intentional.
- **Don't add Hebrew labels back into eyebrows.** The dual-language convention was removed.
- **New slides** should use one of the existing layout patterns (statement, step-blocks, mini-cards, why-grid, poster, info-grid). Avoid one-off layouts.
- **After adding/removing slides**, update the `/ N` counter in the topbar and verify the eyebrow numbering is sequential.
- **Verify navigation** (← / →, edge zones, dots, wheel) still works after structural changes — the `IntersectionObserver` setup assumes all slides are direct children of `#slides`.
- **Always test in a real browser** before declaring done — the design depends on the dot grid, film grain, font loading, and RTL behavior, none of which show up in static review.
