# H1 — animation-engineer (GSAP utils + hero enhancement)

## Task
Add reusable GSAP hooks for the whole site + enhance the Hero section with GSAP animations layered on top of the existing Framer Motion.

## Files I own (only these touched)
- `src/components/site/gsap-utils.tsx` — **NEW** (~420 lines)
- `src/components/site/hero.tsx` — **ENHANCED** (~290 lines)

## What I built

### `gsap-utils.tsx` — 7 reusable React hooks wrapping GSAP

All hooks share these conventions:
- `gsap.context()` for cleanup (ctx.revert() on unmount)
- `ScrollTrigger` plugin registered once at module level (`typeof window` guard)
- SSR-safe (early return when `typeof window === "undefined"`)
- Respect `prefers-reduced-motion` (no-op + show final state)
- Mobile intensity reduced to 60% (via `motionScale()` helper, `max-width: 767px`)
- Default easing `power3.out`
- Generic over `T extends HTMLElement`, accepts `RefObject<T | null>` (React 19 compatible)

| Hook | Purpose | Key options |
|---|---|---|
| `useGsapReveal` | Fade + slide up on scroll into view | `delay`, `y=40`, `duration=0.8`, `start`, `once` |
| `useGsapStagger` | Stagger grid items in a container | `stagger=0.1`, `y=30`, `from="bottom"\|"left"\|"right"\|"top"`, `delay`, `duration`, `start`, `once` |
| `useGsapParallax` | Scrubbed y drift parallax | `speed=0.5` (range = (1-speed)×80px), `start`, `end` |
| `useGsapTextReveal` | Char-by-char slide-up reveal | `delay`, `stagger=0.03`, `duration=0.6`, `trigger=false` (mount) vs scroll, splits on words preserving whitespace, sets `aria-label` |
| `useGsapScale` | Scale + fade in | `delay`, `from=0.8`, `duration`, `start`, `once` |
| `useGsapClipReveal` | Clip-path inset wipe reveal | `delay`, `direction="left"\|"right"\|"top"\|"bottom"`, `duration=1`, `start`, `once` |
| `useGsapCounter` | Count 0 → target via proxy obj | `duration=2`, `suffix`, `prefix`, `delay`, `trigger=true`, writes to `el.textContent`, SSR renders target (no-JS friendly) |

### `hero.tsx` — GSAP layered on top of Framer Motion

Added 7 refs and 6 GSAP hook calls. **Kept all Framer Motion** parallax (bgY/bgScale/contentY/contentOpacity/fgY via useScroll/useTransform) + hover/tap interactions (MagneticButton) + the eyebrow blur-in + the inner scroll-dot infinite loop. **GSAP owns the entrance choreography**.

Entrance sequence (the full choreography plays on first paint):
1. **Eyebrow badge** (FM blur-in, delay 0s, 0.7s)
2. **Headline line 1** "The group you can" — GSAP char-by-char slide-up (delay 0.4s, stagger 0.03s)
3. **Headline line 2** "trust." (red) — GSAP char-by-char (delay ~0.95s, stagger 0.05s)
4. **Subhead + CTAs** — GSAP `.hero-stagger-item` stagger (delay 1.5s, stagger 0.18s, y:24)
5. **Stat card fade-in** (FM, delay 1.8s) → **Count-up 0 → yearsServing** (GSAP, delay 2.1s, duration 2s)
6. **Trust badges** — GSAP `.trust-badge` slide-from-left (delay 1.9s, stagger 0.09s, y:16, from:"left"). Badges + dividers all carry the class so they reveal in sequence.
7. **Scroll indicator** — FM fade-in (delay 2.0s) + **GSAP floating yoyo** on the whole `<a>` (y:6, duration 1.6s, sine.inOut, yoyo, repeat:-1, delay 2.0s). The inner Framer Motion dot still does its y:[0,9,0] opacity loop on top → 3 layered animations.

Background image gets a **second parallax layer** via `useGsapParallax(bgImgRef, { speed: 0.3 })` (±56px scrubbed drift on the inner `<img>`) on top of the Framer Motion parent (y 0%→45%, scale 1.05→1.2).

Removed `TextReveal` + `CountUp` imports from motion-primitives (replaced by GSAP equivalents).

## Quality bar met
- All animations use `ease: "power3.out"` (or `sine.inOut` for the yoyo float).
- Mobile: 60% intensity multiplier on movement; reduced durations implicit via the multiplier.
- Performance: `will-change: transform` inline-styled on every animated element (subhead, CTAs container, trust badges, bg img, scroll indicator, char inner spans).
- Accessibility: `prefers-reduced-motion` early-returns in every hook + the inline floating effect; `aria-label` on the GSAP-filled headline spans preserves screen-reader text.

## Verification
- `bun run lint` → **exit 0, 0 errors, 0 warnings** (whole repo).
- `npx eslint src/components/site/gsap-utils.tsx src/components/site/hero.tsx` → **exit 0**.
- `curl http://localhost:3000/` → **HTTP 200** in ~1s (first compile), then ~106ms (cached). No runtime errors in dev.log.
- Verified rendered HTML contains: 2× `.hero-stagger-item`, 5× `.trust-badge`, 1× `data-cursor="Scroll"`, plus all hero text strings ("The group you can", "trust.", "Get a Free Quote", "Serving Brisbane", "QBCC Licensed", "years of craftsmanship").
- **9 other site components** (about, cta-banner, faq, process, projects, services, stats, testimonials, why-us) already import from `@/components/site/gsap-utils` — the reusable hook library is in active use across the site by parallel agents.

## Did NOT touch (other agents own these)
- services.tsx, projects.tsx, about.tsx, testimonials.tsx, process.tsx, cta-banner.tsx, stats.tsx, faq.tsx, why-us.tsx
- Any API routes, auth, prisma, admin components
- site-header.tsx, site-footer.tsx, contact-form.tsx
- motion-primitives.tsx (only stopped importing TextReveal/CountUp from it in hero.tsx; the file itself is untouched)
