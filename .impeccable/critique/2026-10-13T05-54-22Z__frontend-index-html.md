---
target: homepage
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Projects\\matanel.studio\\frontend\\index.html"
target_fingerprint: "sha256:93230bb99f8ece90858386e1fe2a66cb472d6877cdf617f1bfc1444c76dcff04"
target_path: "C:\\Projects\\matanel.studio\\frontend\\index.html"
timestamp: 2026-10-13T05-54-22Z
slug: frontend-index-html
---
Method: dual-agent (A: b5793f90 · B: aa99de5b)

# Critique (re-run) — frontend/index.html (homepage, Persuade)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Buffering ring + aria-pressed; error/loading text was CSS-only (fixed after this run) |
| 2 | Match System / Real World | 3 | Event language now; services still use מיקס ומאסטרינג / סולם; headline omits bat mitzvah |
| 3 | User Control and Freedom | 3 | Esc/overlay work; no lightbox prev/next; Android back leaves page |
| 4 | Consistency and Standards | 3 | Footer CTA goes to form while all others go to WhatsApp; contact.html still masculine singular |
| 5 | Error Prevention | 3 | Little to get wrong |
| 6 | Recognition Rather Than Recall | 3 | Desktop nav still hidden behind hamburger |
| 7 | Flexibility and Efficiency | n/a | One-visit persuasion page |
| 8 | Aesthetic and Minimalist Design | 3 | Clean; identical section template repeated, long desktop gaps |
| 9 | Error Recovery | 2 | .reveal hidden without JS; render-blocking unpkg (fixed after this run) |
| 10 | Help and Documentation | 2 | How-it-works is partial help; no FAQ for first-timers |
| **Total** | | **25/36** | Acceptable (69%) — up from 22/36 |

## Design Specificity Verdict
LLM: copy + hero are now authored for this studio (occasions named, Matanel's voice, real color photo). Visual system still the familiar dark-editorial studio look; Matanel disappears after the hero; gallery is gear-only.
Detector: CLI 7 findings, all cramped-padding false positives (.service-row ×4, #side-menu li ×3 — padding lives on the row/link). Browser detector: "No anti-patterns found" at 1440×900 and 390×844. Previous run: 17 CLI findings incl. 6 low-contrast, wide-tracking, numbered-section-labels ×4 — all resolved.

## What's Working
1. Hero: occasion-first headline, real photo, first-person promise, CTA above the fold on desktop and mobile.
2. Audio player: lazy audio (preload none), precomputed peaks, single-play, fallbacks, labeled controls. Page weight ~21MB → ~0.2MB.
3. Honest, accessible defaults: no invented proof, ink-on-accent 4.81:1, text-faint 5.6:1, ≥44px targets, reduced motion.

## Priority Issues
1. [P1] Below-hero content could stay invisible if JS/unpkg slow or fails. FIXED after run: html.js gate + defer on both scripts. (harden/optimize)
2. [P1] No reassurance next to CTAs; no first-timer FAQ (price, booking lead time, "what if I can't sing", deliverable). Needs owner-supplied facts. (clarify/onboard)
3. [P1] Portfolio proof not framed for event clients: original song speaks to artists; no bar/bat-mitzvah example; artist-name consent unconfirmed. (clarify/shape)
4. [P2] Mobile floating WhatsApp duplicated visible CTAs. FIXED after run: hidden while hero actions / inline CTA / footer are on screen. (adapt/polish)
5. [P2] Monotonous section rhythm, cold tone for events; services in light dim type; no person after hero. (layout/typeset/colorize)

## Persona Red Flags
- Jordan: no price/commitment cue near CTAs; studio terms in services; contact form placeholder/heading speak to musicians.
- Riley: waveform not keyboard-operable; no-wave fallback can't seek; drawer lacks focus trap; non-text contrast of waveform/play ring <3:1 (raised after run: wave 0.45 alpha, ring 0.5 alpha).
- Casey: no loading text on first play (added after run: "טוען…" status); hamburger + lightbox close in top corner; Android back exits.
- Bat-mitzvah parent: headline says only לבר מצווה; no young-singer example; booking lead time/what's delivered unanswered.

## Minor Observations
- Wordmark dot nearly invisible with 0.22em tracking + uppercase.
- .track__time 0.72rem small for older visitors.
- Footer WhatsApp link uses a different prefilled message.
- contact.html toasts and heading still masculine singular.

## Questions to Consider
1. The real fear is "my voice isn't good enough" — why not show the transformation (raw vs final)?
2. Does the austere producer aesthetic invite a mother planning a bat mitzvah?
3. Why does Matanel disappear after the first screen?
