# H3 — Animation Engineer: GSAP animations + mobile optimization

## Task
Add GSAP animations to the remaining site sections (testimonials, process, cta-banner, stats, faq, why-us, instagram-feed) AND optimize the entire site for mobile (header, footer, contact form, globals.css).

## Work Log

### Pre-flight
- Read `/home/z/my-project/worklog.md` (full history of prior G1/G2/G3 + production-hardening agents).
- Confirmed GSAP v3.15.0 is installed; the gsap-utils.tsx file was being created in parallel by another agent (appeared mid-task).
- Read all 11 target files plus motion-primitives.tsx, language-toggle.tsx, page.tsx, eslint.config.mjs to understand existing patterns.

### Part 1: GSAP Animations

**`src/components/site/testimonials.tsx`**
- Removed the legacy `Reveal` import; switched to `useGsapReveal` from `@/components/site/gsap-utils` for the header + rating badge.
- Added a GSAP timeline (in a `useEffect` keyed on `index`) that re-fires on every slide change and drives:
  - Slide transition: `x: 100 → 0`, `opacity: 0 → 1` (per spec)
  - Quote icon (`.slide-quote-icon`): scale 0 → 1
  - Stars (`.slide-star`): stagger pop-in one by one (0.07s stagger)
  - Author info (`.slide-author`): slide up from bottom (y:20 → 0)
- Wrapped in `gsap.context()` for safe cleanup; respects `prefers-reduced-motion` (early-returns).
- Kept `AnimatePresence` for the exit animation (handles the slide-swap), with reduced-motion-aware `initial`/`exit` props.
- Added `no-tap-highlight` class + 48x48 touch targets on the prev/next arrow buttons and dot indicators.

**`src/components/site/process.tsx`**
- Registered `ScrollTrigger` plugin at module level (SSR-safe).
- Used `useGsapReveal` for the header.
- Used `useGsapStagger` for both desktop (`.process-step`) and mobile (`.process-step`) step containers — added a separate `mobileStepsRef` since the mobile timeline lives in a different DOM subtree.
- Timeline line draw-in:
  - Desktop SVG `<path>`: animated `stroke-dashoffset` 100 → 0 with a ScrollTrigger when the section enters view (uses `pathLength={100}` + inline `stroke-dasharray: "100 100"`). Avoided the premium-only `drawSVG` plugin.
  - Mobile bar: `scaleY` 0 → 1 with ScrollTrigger.
- Pulsing dots: infinite `gsap.to()` with `repeat: -1, yoyo: true` animating scale 1 → 1.5 and opacity 1 → 0.4 (the dot "breathes").
- Step counters: created a `ProcessCounter` sub-component that uses `useGsapCounter(ref, value, { duration: 1.4, delay })`. Each step's delay is staggered (0.18s per step on desktop, 0.12s on mobile) so the count-ups cascade.
- All animations wrapped in `gsap.context()` for cleanup; `prefers-reduced-motion` respected.

**`src/components/site/cta-banner.tsx`**
- Removed the old Framer-Motion `useScroll` / `useTransform` parallax and the `motion.div` variants — replaced with the `useGsapParallax` hook (speed: 0.3 → ±56px drift, deep parallax).
- Used `useGsapTextReveal` for the heading — splits `cta.title1` into character spans and slides each up from 110% → 0% with a 0.025s stagger. Refactored the JSX so the heading text lives in a dedicated empty `<span ref={headingRef}>` (the hook rebuilds the span's innerHTML with char spans); the red `cta.title2` is a separate React-rendered span so it isn't wiped out.
- Used `useGsapStagger` for the CTA buttons row (`.cta-btn`): buttons slide in from the bottom (y: 24, stagger 0.12s).
- Added `min-h-[44px]` + `no-tap-highlight` to both CTA buttons for mobile touch friendliness.
- Removed the unused `useReducedMotion` import + the redundant `<style jsx>` reduced-motion override (the hooks handle reduced motion internally).

**`src/components/site/stats.tsx`**
- Used `useGsapReveal` for the header.
- Used `useGsapStagger` for the stat cards (`.stat-card`, stagger 0.1s, y: 28).
- Used `useGsapCounter` (via a `StatNumber` sub-component) for each number — counts from 0 → target value when the ref scrolls into view, with prefix/suffix support and a staggered delay (0.2s + i * 0.1s).
- Underline accents: created a `useUnderlineAccents` local hook that uses `gsap.fromTo(".stat-underline", { scaleX: 0 }, { scaleX: 1, stagger: 0.12, delay: 0.3 })` with a ScrollTrigger — the red 10px underline beneath each number draws in left-to-right.
- Made the stat cards responsive: `p-5 sm:p-6 md:p-8`, number `text-[44px] sm:text-[56px] md:text-[88px] lg:text-[96px]`, label `text-[11px] sm:text-[12px] md:text-[13px]`. Grid is `gap-4 sm:gap-6 md:gap-8` so the 2×2 mobile layout doesn't crowd.

**`src/components/site/faq.tsx`**
- Used `useGsapReveal` for the section header.
- Used `useGsapStagger` with `from: "left"` for the accordion items (`.faq-item`, stagger 0.1s, y: 24) — items slide in from the left, staggered.
- Replaced the Framer-Motion `AnimatePresence` accordion expand/collapse with a GSAP-driven height animation:
  - Open: measure `offsetHeight`, animate from `{height: 0, opacity: 0}` → `{height: fullHeight, opacity: 1}`, then set `height: "auto"` on complete so content can reflow on viewport resize.
  - Close: animate current height → 0 with opacity → 0.
  - Reduced-motion fallback: set height/opacity instantly.
- Animated the `+`/`×` icon via GSAP too (rotate 0 ↔ 135°, background-color swap).
- Added `min-h-[44px]` to each accordion row + the "Ask your question" CTA for mobile touch friendliness. Made headings responsive (`text-[16px] sm:text-[17px] md:text-[19px]`).
- Added `overflow-x-hidden` to the section to prevent any horizontal scroll on small screens.

**`src/components/site/why-us.tsx`**
- Used `useGsapReveal` for the header column + subtitle column.
- Used `useGsapStagger` for the cards grid (`.why-card`, stagger 0.12s, y: 24).
- Created a `WhyCard` sub-component that uses BOTH `useGsapClipReveal` (alternating "left" / "right" direction per card) and `useGsapScale` (icon scales from 0.5 per spec).
- The card's outer `.why-card` div is the clip-reveal target; the inner `motion.div` keeps the existing hover-lift + icon hover-rotate behavior (Framer Motion) — the two animation systems coexist cleanly because clip-path and transform are independent.
- Made headings + body text responsive (`text-[18px] sm:text-[20px]`, `text-[14px] sm:text-[15px]`). Made the "Contact us" button `min-h-[44px]`.

**`src/components/site/instagram-feed.tsx`**
- Used `useGsapReveal` for the header column + the follow CTA.
- Used `useGsapStagger` for the grid (`.ig-tile`, stagger 0.06s, y: 24) — items reveal in a wave pattern (top-left → bottom-right).
- Removed the per-item Framer Motion `initial`/`whileInView` (the GSAP hook now handles the entrance).
- Added `no-tap-highlight` to each IG tile. Made the follow button `min-h-[44px]`.
- Added `overflow-x-hidden` to the section.

### Part 2: Mobile Optimization

**`src/app/globals.css`** (additive only)
- `@layer base` enhancements:
  - `body`: `overscroll-behavior: none` (prevents pull-to-refresh on Android Chrome), `-webkit-text-size-adjust: 100%` (prevents iOS text inflation on orientation change), `overflow-x: hidden` (no horizontal scroll).
  - `html`: `-webkit-text-size-adjust: 100%`, `overflow-x: hidden`.
  - `input, select, textarea`: `font-size: 16px` globally (prevents iOS auto-zoom on focus).
  - `button, a, [role="button"], label[for]`: `-webkit-tap-highlight-color: transparent` + `touch-action: manipulation` (no 300ms tap delay, no grey flash).
  - `img, picture, video, canvas, svg`: `max-width: 100%; display: block` (responsive media).
  - `p, h1-h6, li, blockquote`: `overflow-wrap: break-word; word-break: break-word` (prevents long words/URLs from causing horizontal overflow).
- New mobile utility classes (in `@layer utilities`):
  - `.touch-target` — `min-height: 44px; min-width: 44px`
  - `.no-tap-highlight` — `-webkit-tap-highlight-color: transparent`
  - `.safe-bottom`, `.safe-top`, `.safe-x` — `env(safe-area-inset-*)` padding (iPhone notch / home indicator)
  - `.no-scrollbar` — hides scrollbars on touch carousels
  - `.no-select` — disables text selection on UI chrome
  - `.clip-x` — `overflow-x: clip`
- `@media (max-width: 380px)`: shrinks `.container-drill` padding to 14px, scales the logo lockup down to 32px (`.logo-shrink` class on the header logo).
- `@media (max-width: 360px)`: shrinks `.container-drill` padding to 12px.
- `@media (max-width: 1023px) .mobile-lang-touch button`: bumps the language toggle's inner buttons to `min-height: 44px; min-width: 44px` on mobile only (the toggle component itself uses h-8 which is too small for fingertips).
- `@media (max-width: 640px)`: disables `backdrop-filter` blur for performance on low-end mobiles (the `.glass` class and any `[class*="backdrop-blur"]` element).
- Extended the `prefers-reduced-motion` block to also disable `scroll-behavior`.

**`src/components/site/site-header.tsx`**
- Logo: added `logo-shrink` + `no-tap-highlight` classes; wrapped the text in `min-w-0 flex flex-col` with `truncate` on the brand name so it scales down on <380px viewports without overflowing.
- Mobile toggle button: added `no-tap-highlight` + `shrink-0` (already 44x44 = h-11 w-11).
- Mobile menu: made it `fixed inset-x-0 top-14 z-50 max-h-[calc(100svh-3.5rem)] overflow-y-auto overflow-x-hidden` so it's full-width, scrolls internally if it overflows, and respects the safe-area inset via `.safe-bottom`. Bumped each nav link to `min-h-[44px]` and `py-3` for touch. The "Get a Quote" CTA is `min-h-[44px]` and `w-full`-ish (via container width). Added staggered entrance for the mobile menu items.
- Wrapped the `LanguageToggle` in a `.mobile-lang-touch` div so the global CSS rule bumps its inner buttons to 44px on mobile.

**`src/components/site/site-footer.tsx`**
- Top CTA strip: made the buttons `min-h-[44px]` + `w-full sm:w-auto` so they stack full-width on mobile. Made the heading responsive (`text-[24px] sm:text-[26px] md:text-[34px]`).
- Main footer grid: added `min-w-0` to every column so long words/URLs don't cause horizontal overflow. Wrapped links in `inline-block break-words`. Social icons bumped from `h-10 w-10` → `h-11 w-11` (44px touch target). Phone/email links use `break-all`.
- Bottom bar: added `.safe-bottom` for iPhone home indicator; switched to centered text on mobile with `text-center md:text-left`. Smaller text on mobile (`text-[12px] sm:text-[13px]`).

**`src/components/site/contact-form.tsx`**
- Section: added `overflow-x-hidden`.
- Grid: `gap-10 lg:gap-16` (was `gap-12 lg:gap-16`); added `min-w-0` to both columns.
- All contact info rows: `min-h-[44px]` for touch. Email/phone use `break-all`, area/hours use `break-words`. Body text responsive (`text-[15px] sm:text-[17px]`).
- Heading responsive: `text-[32px] sm:text-[36px] md:text-[48px]`.
- Form wrapper: `p-5 sm:p-6 md:p-10` (less padding on small screens).
- Submit button: `min-h-[44px] w-full sm:w-auto` — full-width on mobile, auto-width on sm+.
- "Send another request" button: `min-h-[44px]` + `py-3`.
- `.drill-input` style: bumped font-size from `14px` → `16px` (prevents iOS auto-zoom), added `-webkit-appearance: none` (removes iOS inner shadow), `max-width: 100%` (never causes horizontal scroll). Added `@media (max-width: 640px)` rule that bumps input height from 53px → 56px for easier tapping.
- Success heading + message text made responsive.

### Verification
- `bun run lint` → exit 0, 0 errors, 0 warnings.
- `curl http://localhost:3000/` → HTTP 200, ~150-470ms response time (compile + render).
- `dev.log` shows no errors related to my changes (only the pre-existing `sharp metadata failed: Error: Input buffer contains unsupported image format` from earlier admin upload tests — unrelated to my work).
- Confirmed the gsap-utils.tsx file exists (created by the parallel H2 agent mid-task) and its hook signatures match what my code expects:
  - `useGsapReveal(ref, { delay, y, duration, start, once })` ✓
  - `useGsapStagger(containerRef, itemSelector, { stagger, y, delay, duration, start, from, once })` ✓ (used `from: "left"` for FAQ)
  - `useGsapParallax(ref, { speed, start, end })` ✓
  - `useGsapTextReveal(ref, text, { delay, stagger, duration, start, trigger })` ✓
  - `useGsapScale(ref, { delay, from, duration, start, once })` ✓ (used `from: 0.5` for Why Us icons)
  - `useGsapClipReveal(ref, { delay, direction, duration, start, once })` ✓ (alternating left/right for Why Us cards)
  - `useGsapCounter(ref, target, { duration, suffix, prefix, delay, start, trigger })` ✓ (delay supported — used for staggered count-ups)

### Quality bar checklist
- ✅ All GSAP animations use `ease: "power3.out"` or similar (the gsap-utils hooks default to `power3.out`; my direct gsap code uses `power3.out`, `power3.inOut`, `sine.inOut`).
- ✅ Mobile: motion intensity reduced — the gsap-utils hooks apply a 0.6x motion scale on `<768px` viewports automatically.
- ✅ `prefers-reduced-motion` respected — every hook has an internal reduced-motion branch (sets final state, no animation); my direct gsap code early-returns when `reduce` is true.
- ✅ All touch targets minimum 44x44px (header nav, header toggle, footer CTAs, footer socials, contact info rows, contact submit, FAQ rows, IG tiles, carousel arrows).
- ✅ No horizontal overflow at 320px — added `overflow-x: hidden` on html/body/sections, `min-w-0` on flex/grid children, `break-words`/`break-all` on text, `.container-drill` padding shrinks to 12-14px below 380px.
- ✅ Font sizes prevent iOS zoom — global `input, select, textarea { font-size: 16px }` rule.

### Stage Summary
**Files modified (11):**
- `src/components/site/testimonials.tsx` — GSAP timeline for slide transition + quote/star/author reveal; useGsapReveal for header
- `src/components/site/process.tsx` — timeline line draw-in (stroke-dashoffset + scaleY), useGsapCounter for step numbers, useGsapStagger for step cards, pulsing dots yoyo
- `src/components/site/cta-banner.tsx` — useGsapParallax for deep bg parallax, useGsapTextReveal for char-by-char heading, useGsapStagger for CTAs
- `src/components/site/stats.tsx` — useGsapCounter for numbers, useGsapStagger for cards, GSAP scaleX for underline accents
- `src/components/site/faq.tsx` — useGsapReveal for header, useGsapStagger (from:left) for items, GSAP height animation for accordion open/close
- `src/components/site/why-us.tsx` — useGsapReveal for header, useGsapStagger for cards, useGsapClipReveal per card, useGsapScale (from:0.5) for icons
- `src/components/site/instagram-feed.tsx` — useGsapReveal for header, useGsapStagger for grid wave
- `src/components/site/site-header.tsx` — mobile: 44px touch targets, full-width menu, logo-shrink, language toggle 44px on mobile
- `src/components/site/site-footer.tsx` — mobile: single-column stack, 44px social icons, break-words on text
- `src/components/site/contact-form.tsx` — mobile: full-width inputs/submit, 16px font on inputs, no horizontal scroll, 44px touch rows
- `src/app/globals.css` — mobile utilities (.touch-target, .no-tap-highlight, .safe-bottom/top/x, .no-scrollbar, .clip-x), iOS-zoom-prevention input font-size rule, overscroll-behavior:none, very-small-screen breakpoints (380px / 360px), language-toggle 44px-on-mobile rule, backdrop-filter disable on <640px

**Lint:** 0 errors, 0 warnings. **Dev server:** HTTP 200, no errors.
