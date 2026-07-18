# G3 — full-stack-developer (testimonials + process + cta + stats redesign)

## Task
Redesign Testimonials, Process, CTA, Stats sections of The Handyman & Carpentry Group website to $50k quality.

## Files modified (only these four + i18n.ts additions)
- `src/components/site/testimonials.tsx` — REWROTE as premium carousel
- `src/components/site/process.tsx` — REWROTE as horizontal/vertical timeline with animated draw-in line
- `src/components/site/cta-banner.tsx` — REWROTE with deep parallax + grain overlay + staggered content
- `src/components/site/stats.tsx` — REWROTE with premium stat cards + watermark + hover effects
- `src/lib/i18n.ts` — ADDED `process.eyebrow`, `process.title`, `process.subtitle` to both `en` and `es` dictionaries (existing keys untouched)

## Component signatures preserved (page.tsx unchanged)
- `Testimonials({ testimonials: TestimonialItem[] })` ✓
- `Process()` ✓
- `CtaBanner()` ✓
- `Stats()` ✓
- `TestimonialItem` shape preserved (id, name, role, quote, video, image, order)

## Design highlights
### Testimonials (carousel)
- Single-slide premium carousel using `AnimatePresence mode="wait"` with x-axis slide (±80px)
- Auto-advance every 6s with pause-on-hover (mouseEnter/Leave) + keyboard nav (ArrowLeft/Right)
- Charcoal circle prev/next arrows (48px), red on hover; dot indicators + counter "01 — 03"
- Each slide: if video → large 16:9 thumbnail with pulsing red play button + side-by-side quote panel; if text-only → oversized quote card with decorative oversized quote-mark watermark behind, 5 red stars, large 34px quote text, avatar+name+role footer
- VideoModal preserved (escape to close, click-outside, body scroll lock, focus close button on open)
- Background: blurred red & charcoal circles + faint 80px grid pattern
- All strings via `t()` (8 keys used: eyebrow/title1/title2/subtitle/rating/verified/videoBadge/video)

### Process (timeline)
- Charcoal #121117 background, py-24/32
- Desktop: 4-col grid with SVG horizontal line above, animates pathLength 0→1 over 1.8s on scroll-in (uses `useInView` + `motion.path`)
- Each step: pulsing red dot on line, then 60-72px red number, bold title, white/60 description
- Staggered step entrance (0.4s + i × 0.18s)
- Mobile: vertical timeline with animated scaleY line on the left, stacked steps
- Background: subtle red blur + faint grid

### CTA banner
- Full-width charcoal, parallax CTA_IMAGE (y: -18%→+18%, scale 1.15→1.05→1.15 — image moves slower than scroll)
- Heavy gradient: charcoal 92% on left → 35% on right (mobile: vertical fade for legibility)
- Inline SVG `feTurbulence` grain overlay (12% opacity, mix-blend-overlay, no extra network request)
- Staggered left-slide entrance (eyebrow → heading → subtitle → CTAs → trust line, 0.12s stagger)
- Huge heading `text-[48px] md:text-[80px] lg:text-[88px]`, "your space?" in red
- Two CTAs: red primary with animated right-arrow on hover, white outline secondary with phone
- Trust strip with licensing / founders / established year

### Stats
- White bg, py-20/24
- Massive "BRISBANE" watermark behind cards (18vw mobile, 14vw desktop, 2.5% opacity charcoal)
- 4 cards in 2×2 (mobile) / 1×4 (desktop) grid, staggered 0.1s entrance
- Each card: 88-96px bold charcoal number using CountUp, red 2px underline accent that grows on hover (w-10 → w-16), uppercase gray label, top red border that draws in (scaleX 0→1) on hover
- Hover: card lifts -6px, shadow becomes charcoal drop-shadow `0_8px_0_0_#121117`, number turns red
- Footer trust line with licensing

## Quality bar
- Every animation uses `ease: [0.22, 1, 0.36, 1]`
- All hover states implemented
- 0px radius throughout (Drill design)
- Mobile-first responsive at 390px (single col stats, single slide testimonials, vertical timeline, full-width CTA with stacked buttons)
- Performance: transform/opacity only, lazy-load images
- Accessibility: aria-labels, role="region/tablist/tab/dialog", keyboard nav, focus-visible outlines, sr-only markup where needed

## Verification
- `bun run lint` → exit 0, 0 errors ✓
- `GET /` returns HTTP 200, no runtime errors in dev.log ✓
- page.tsx, hero, services, projects, about, faq, why-us, motion-primitives, globals.css, layout untouched ✓
