---
target: homepage
total_score: 22
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Projects\\matanel.studio\\frontend\\index.html"
target_fingerprint: "sha256:4519b4caa1742ca94a64ebd1156a540b60daf9784427e975b8567ab4cdea441b"
target_path: "C:\\Projects\\matanel.studio\\frontend\\index.html"
timestamp: 2026-10-13T05-12-58Z
slug: frontend-index-html
---
Method: dual-agent (A: 936773c7 · B: 1ad9987a)

# Critique — frontend/index.html (homepage, Persuade)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Player state/time clear; empty waveform + 0:00/0:00 before load |
| 2 | Match System / Real World | 2 | Studio jargon (סשן, פרה-אמפים, טונליות, מאסטרינג); no event words |
| 3 | User Control and Freedom | 3 | Esc closes drawer/lightbox; lightbox has no prev/next |
| 4 | Consistency and Standards | 3 | Three numbering systems; CTA label differs everywhere |
| 5 | Error Prevention | 3 | WhatsApp prefilled message |
| 6 | Recognition Rather Than Recall | 2 | Desktop: contact + phone hidden in hamburger drawer |
| 7 | Flexibility and Efficiency | n/a | One-visit persuasion page |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained; tracked mono labels + decorative numbering add noise |
| 9 | Error Recovery | 2 | WaveSurfer CDN failure leaves dead play buttons, no fallback |
| 10 | Help and Documentation | 1 | No how-it-works, price frame, or first-timer reassurance |
| **Total** | | **22/36** | Acceptable (61%) |

## Design Specificity Verdict
LLM: coherent, well-crafted, but the generic "premium dark creative studio" template (graphite, single hot accent, "01 /" mono eyebrows, giant headline over grayscale photo). Speaks to musicians, not the primary event-client audience. Differentiator (one person does every stage) appears once; Matanel is never named on the homepage.
Detector: 17 findings on index.html (~8 false positives). Real: --text-faint #7a7772 at 4.0:1 on 6 selectors; white-on-accent 3.3–3.7:1 (hero .btn hover, .btn--solid on contact); numbered-section-labels ×4 (browser). False positives: cramped-padding on .service-row/#side-menu li, empty lightbox src, hero .btn at rest. No RTL/Hebrew false flags.

## What's Working
1. WaveSurfer player as real proof (seek, single-play, clear state).
2. Editorial restraint (numbered rows, typographic quotes, asymmetric gallery).
3. Reduced-motion, focus-visible, aria-expanded basics.

## Priority Issues
1. [P0] Placeholder testimonials presented as real (#testimonials). Fix: remove until real quotes with name + event type. Command: distill.
2. [P1] Copy addresses musicians, not event clients (hero title/meta, service descriptions, CTA "הזמנת סשן"). Fix: name occasions, 3-step how-it-works, CTA "בואו נדבר על השיר שלכם", lead with wedding cover, show Matanel by name/face. Command: clarify / onboard.
3. [P1] Weak contact path on mobile (outline hero CTA at bottom edge, no topbar contact, WhatsApp only in drawer/footer at TikTok weight). Fix: solid CTA, persistent mobile WhatsApp, CTA after portfolio, reassurance line. Command: layout / bolder.
4. [P1] Weight + hero crop: studio_bg.jpg 5.7MB; song1/2.mp3 15.7MB preloaded by wavesurfer.load() (script.js:186); hero crops Matanel out at 390px; grayscale(1) filter (style.css:545). Fix: responsive WebP/AVIF ~250KB, object-position, drop grayscale, lazy-load audio on first play. Command: optimize / adapt.
5. [P2] Latin-editorial typography on Hebrew (IBM Plex Mono lacks Hebrew; 0.14–0.18em tracking breaks Hebrew labels) + contrast failures. Fix: Hebrew labels in Heebo 500 no tracking, mono for digits/Latin only; --text-faint ≥ #8a8782; fix white-on-accent. Command: typeset.

## Persona Red Flags
- Jordan: H1 doesn't say "I'll record your event song"; "הזמנת סשן" unexplained; no process/price frame.
- Riley: initial-only testimonials; descriptive track titles; dead buttons if CDN fails; gallery imgs not keyboard-focusable; lightbox no focus trap; identical "נגן / עצור" labels.
- Casey: >21MB upfront; CTA at bottom edge; no sticky WhatsApp; blank waveforms until full MP3 decodes.
- Miri (bar-mitzvah parent): no event words; masculine-only address; no face/name; no timeline; no og: tags.

## Minor Observations
- Waveform fills LTR, away from RTL play button.
- Mobile gallery: 6th tile orphaned.
- .service-row hover implies clickability.
- Karaoke (gift product) absent from homepage except menu.
- Generic meta description.

## Questions to Consider
1. If Matanel is the differentiator, why is his only photo grayscale, cropped on mobile, aria-hidden?
2. Would a bride read "מוזיקה שנשמעת נכון" as for her or for musicians?
3. What if the order were listen → meet Matanel → 3 steps → WhatsApp, with gear moved to About?
