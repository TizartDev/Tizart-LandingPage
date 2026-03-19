/**
 * COLOR MIGRATION GUIDE
 * =====================
 * In every page component (Hero, About, Services, Projects, Contact, Footer)
 * replace these hardcoded values with CSS variables defined in theme.css
 *
 * The CSS variables automatically switch between dark and light values
 * when data-theme="light" is set on <html>.
 *
 * FIND → REPLACE
 * ──────────────────────────────────────────────────────────────────
 *
 * BACKGROUNDS
 *   #040f12                     → var(--bg-page)
 *   rgba(255,255,255,.025)      → var(--bg-card)
 *   rgba(0,222,217,.04)         → var(--bg-card-hover)
 *
 * TEXT
 *   #e8f4f6                     → var(--text-primary)
 *   rgba(232,244,246,.5)        → var(--text-secondary)
 *   rgba(138,172,179,.8)        → var(--text-muted)
 *   #00DED9                     → var(--text-teal)
 *   color: #00DED9              → color: var(--text-teal)
 *
 * BORDERS
 *   rgba(0,222,217,.1)          → var(--border-subtle)
 *   rgba(0,222,217,.22)         → var(--border-mid)
 *   rgba(0,222,217,.4)          → var(--border-strong)
 *
 * GRID LINES
 *   rgba(0,222,217,.03)         → var(--grid-line)
 *
 * SHADOWS
 *   0 20px 60px rgba(0,0,0,.5)  → var(--shadow-card)
 *   0 0 28px rgba(0,222,217,.28)→ var(--shadow-btn)
 *
 * ──────────────────────────────────────────────────────────────────
 *
 * EXAMPLE — before:
 *   .sv-section {
 *     background: #040f12;
 *     color: #e8f4f6;
 *   }
 *   .sv-card {
 *     background: rgba(255,255,255,.025);
 *     border: 1px solid rgba(0,222,217,.1);
 *   }
 *   .sv-title-teal { color: #00DED9; }
 *
 * EXAMPLE — after:
 *   .sv-section {
 *     background: var(--bg-page);
 *     color: var(--text-primary);
 *   }
 *   .sv-card {
 *     background: var(--bg-card);
 *     border: 1px solid var(--border-subtle);
 *   }
 *   .sv-title-teal { color: var(--text-teal); }
 *
 * ──────────────────────────────────────────────────────────────────
 *
 * IMAGES (no change needed)
 * Images don't need color swapping. In light mode they automatically
 * look correct because only the surrounding background/text shifts.
 *
 * TEAL ACCENT COLOR
 * In light mode, --text-teal shifts to #007c7a (darker teal) so it
 * has enough contrast on a light background. This happens automatically.
 *
 * ──────────────────────────────────────────────────────────────────
 *
 * QUICK SEARCH STRINGS (copy into your editor's find-and-replace)
 *
 * In Hero.tsx:
 *   background: #040f12     → background: var(--bg-page)
 *   color: #e8f4f6          → color: var(--text-primary)
 *   color: rgba(232,244,246 → color: rgba from --text-secondary / --text-muted
 *   color: #00DED9          → color: var(--text-teal)
 *   border.*rgba(0,222,217  → use var(--border-subtle/mid/strong)
 *
 * In About.tsx / Services.tsx / Projects.tsx / Contact.tsx / Footer.tsx:
 *   Same replacements apply. Every component uses the same color tokens.
 */

export {};   // keeps TS happy as a module