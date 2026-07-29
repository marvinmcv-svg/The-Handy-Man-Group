# Task H2 — Work Record

**Agent:** animation-engine (GSAP integration for Services, Projects, About)
**Task:** Add GSAP animations to the Services, Projects, and About sections using hooks from `gsap-utils.tsx`.

## Files modified (only these three)
- `src/components/site/services.tsx` — ENHANCED with GSAP entrance / scroll animations
- `src/components/site/projects.tsx` — ENHANCED with GSAP entrance / scroll / lightbox animations
- `src/components/site/about.tsx` — ENHANCED with GSAP entrance / scroll / counter animations

## Approach
- Preserved all existing Framer Motion hover / tap interactions (cards lift on hover, icons rotate, images zoom).
- Added GSAP hooks from `gsap-utils.tsx` exclusively for **entrance / scroll-into-view** animations.
- Used refs + `data-*` attributes as selector hooks so the GSAP stagger hooks can target child elements.
- Added `will-change: transform` (or `clip-path` for clip-reveal elements) to every animated element to keep GPU compositing smooth.
- Split each section into small child components (`ServiceCard`, `ProjectsGrid`, `ProjectCard`, `LightboxModal`) so per-item GSAP hooks can be called at the top level of each component without violating React's rules of hooks.

## services.tsx — GSAP enhancements
| Element | Hook | Options |
| --- | --- | --- |
| Section header (eyebrow + title + subtitle) | `useGsapReveal` | `{ y: 36, duration: 0.9 }` |
| Featured card wrapper | `useGsapClipReveal` | `{ delay: 0.15, direction: "left" }` |
| Featured card background image | `useGsapScale` | `{ delay: 0.35, from: 1.1 }` (ken-burns scale-down) |
| Featured card icon | `useGsapScale` | `{ delay: 0.55, from: 0.5 }` |
| Featured "Get a quote" link | `useGsapReveal` | `{ delay: 0.8, y: 16, duration: 0.6 }` |
| Remaining grid cards | `useGsapStagger` | selector `[data-card]`, `{ stagger: 0.1, y: 30 }` |
| Each card's icon | `useGsapScale` (per-card) | `{ delay: 0.25 + (i-2)*0.08, from: 0.5 }` |
| Each card's bullet list | `useGsapStagger` (per-card) | selector `li`, `{ stagger: 0.08, y: 10 }` |
| Each card's "Get a quote" link | `useGsapReveal` (per-card) | `{ delay: 0.45 + (i-2)*0.08, y: 12, duration: 0.55 }` |

Removed the old Framer Motion `Reveal`/`StaggerGroup`/`StaggerItem` wrappers from `motion-primitives` — those were doing the entrance work that GSAP now handles. The `motion.a` element is retained only for its `whileHover={{ y: -8 }}` spring lift, with its `initial`/`whileInView` entrance props removed (GSAP owns entrance now).

## projects.tsx — GSAP enhancements
| Element | Hook | Options |
| --- | --- | --- |
| Header (eyebrow + title + subtitle) | `useGsapReveal` | `{ y: 36, duration: 0.9 }` |
| Header CTA ("View All Projects" button) | `useGsapReveal` | `{ delay: 0.2, y: 24, duration: 0.7 }` |
| Filter tabs | `useGsapStagger` | selector `[data-tab]`, `{ stagger: 0.08, y: 16, from: "top" }` |
| Masonry grid of project cards | `useGsapStagger` (in `ProjectsGrid`) | selector `[data-project]`, `{ stagger: 0.1, y: 32 }` |
| Each card's image | `useGsapScale` (per-card in `ProjectCard`) | `{ delay: 0.2 + (idx%6)*0.05, from: 1.2 }` (ken-burns) |
| Each card's category badge | `useGsapReveal` (per-card) | `{ delay: 0.4 + (idx%6)*0.05, y: 12, duration: 0.55 }` |
| Lightbox image wrapper | `useGsapClipReveal` (in `LightboxModal`) | `{ delay: 0.15, direction: "right" }` |

Key restructuring decisions:
- Extracted `ProjectsGrid` as its own component with `key={activeFilter}`. This forces a full remount whenever the filter changes, which re-runs the `useGsapStagger` hook on the freshly-rendered cards. Without the remount, the hook would only fire once on first mount and never re-trigger on filter changes.
- Extracted `ProjectCard` so each card can call its own `useGsapScale` / `useGsapReveal` hooks without violating the rules of hooks (the parent `ProjectsGrid` would otherwise need an array of refs).
- Extracted `LightboxModal` so the `useGsapClipReveal` hook fires on each open (the modal mounts fresh thanks to AnimatePresence + `key={currentProject.id}`).
- For the lightbox backdrop fade and modal card scale, kept Framer Motion's `initial/animate/exit` because: (1) the gsap-utils hooks fire on scroll-into-view via ScrollTrigger — for a `position: fixed` modal that's not strictly a "scroll" event, the GSAP hooks would still fire (the modal is in viewport on mount) but the exit animation has no GSAP equivalent in the available hook set. Framer Motion's `AnimatePresence` cleanly handles both enter and exit. The image clip-in (the most visually distinctive part of the lightbox animation) is GSAP-driven.
- Replaced the original `motion.button` `whileInView` entrance on each project card with the GSAP stagger. The `motion.button` is retained for `whileHover={{ y: -4 }}` and `whileTap={{ scale: 0.985 }}` micro-interactions.

## about.tsx — GSAP enhancements
| Element | Hook | Options |
| --- | --- | --- |
| Portrait image wrapper | `useGsapParallax` | `{ speed: 0.18 }` (~±65px drift on scroll) |
| Portrait `<img>` element | `useGsapClipReveal` | `{ delay: 0.15, direction: "bottom" }` |
| Decorative red border (offset behind image) | `useGsapScale` | `{ delay: 0.35, from: 0 }` |
| Stat card number ("12+") | `useGsapCounter` | target = `yearsOfService`, `{ duration: 2.2, suffix: "+" }` |
| Heading (eyebrow + title + two paragraphs) | `useGsapReveal` | `{ delay: 0.1, y: 32, duration: 0.9 }` |
| Checklist `<ul>` items | `useGsapStagger` | selector `li`, `{ stagger: 0.08, y: 12 }` |
| Badges row (QBCC, Master Builders, On-Time) | `useGsapStagger` | selector `[data-badge]`, `{ stagger: 0.1, y: 16, from: "right" }` |

Removed the old `Reveal`, `ImageReveal`, `Parallax`, `CountUp` imports from `motion-primitives` — those responsibilities are now handled by their GSAP equivalents. The floating QBCC badge (top-left of image) and the floating stat card wrapper (bottom-right of image) still use Framer Motion's `motion.div` with `initial`/`whileInView` for their subtle entrance because they're tiny one-shot animations and mixing hooks there would have added complexity without visual benefit.

## Quality bar
- **Easing:** every GSAP animation inherits `power3.out` from the hooks (the hooks' default `EASE`).
- **Mobile intensity:** the hooks automatically reduce movement to 60% on viewports ≤767px via `motionScale()`. No additional per-component logic needed.
- **prefers-reduced-motion:** the hooks check `window.matchMedia("(prefers-reduced-motion: reduce)")` and short-circuit to the final state. No additional per-component logic needed.
- **Performance:** every animated element has `will-change: transform` (or `will-change: clip-path` for the clip-reveal targets) via Tailwind class so the browser promotes them to a GPU layer. GSAP animates only `transform`, `opacity`, and `clip-path` — never layout properties.
- **Framer Motion hover/tap preserved:** all existing `whileHover`/`whileTap` spring interactions on cards, icons, badges, and CTAs are retained. GSAP only owns entrance / scroll animations.
- **i18n preserved:** all `t("...")` calls are intact. Language switching still re-renders text content correctly (the GSAP hooks are tied to refs, not text).

## Verification
- `bun run lint` → exit 0, 0 errors, 0 warnings.
- `curl http://localhost:3000/` → HTTP 200 in ~150–250ms.
- `dev.log` (most recent entries) → no errors, only Prisma queries and successful `GET / 200` lines.
- DOM check: `id="services"`, `id="projects"`, `id="about"` all present; `data-card`, `data-tab`, `data-project`, `data-badge` selector hooks all present (confirming the GSAP stagger hooks will find their targets).
- `gsap-utils.tsx` was confirmed to exist (created in parallel by another agent) with the documented hook signatures: `useGsapReveal`, `useGsapStagger`, `useGsapParallax`, `useGsapTextReveal`, `useGsapScale`, `useGsapClipReveal`, `useGsapCounter`. My code's option objects match these signatures exactly.

## Stage summary
Three sections now have noticeably more premium, layered animations:
- **Services** — featured card wipes in from the left, image ken-burns scale-down, icon pops in, grid cards stagger in 0.1s apart, each card's bullets stagger within the card, "Get a quote" link fades in last.
- **Projects** — filter tabs slide down from the top in sequence, project cards stagger in 0.1s apart with ken-burns image scale-down, category badges fade up alongside each card, lightbox image clips in from the right when opened.
- **About** — portrait image clips in from the bottom then parallaxes on scroll, decorative red border scales from 0 to full size, "12+" stat counts up from 0, heading slides up, checklist items reveal one-by-one, badges slide in from the right.

All existing Framer Motion hover/tap interactions are preserved; GSAP handles entrance/scroll only. `prefers-reduced-motion` and mobile intensity reduction are handled by the hooks themselves. Lint passes cleanly and the page loads at HTTP 200 with no runtime errors.
