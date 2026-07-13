# Design System Inspired by Drill

## 1. Visual Theme & Atmosphere

The Drill design system embodies modern industrial sophistication with clean, minimalist aesthetics balanced by warm material accents. This is a construction-focused design language that projects professionalism, reliability, and contemporary craftsmanship. The visual identity combines deep charcoal and black foundations with striking red CTAs, sophisticated wood tones, and generous whitespace. The atmosphere is confident yet approachable—conveying technical excellence while remaining human and accessible. Imagery plays a central role, with large hero sections and project showcases allowing photography to drive emotional connection. The typography is purposefully minimal and sans-serif, ensuring legibility across contexts while maintaining an aspirational, forward-thinking tone.

**Key Characteristics**
- Clean, grid-based layouts with substantial breathing room
- High contrast text on light or dark backgrounds for clarity
- Bold, expressive typography hierarchy with generous scale differences
- Material-rich visual references (wood, concrete, glass) reflected in photography
- Strategic use of red accent color for primary actions and hierarchy
- Minimal borders, shadows, and decorative elements—design through subtraction
- Responsive imagery and project-centric content presentation
- Professional, enterprise-grade visual polish with approachable warmth

## 2. Color Palette & Roles

### Primary
- **Deep Charcoal** (`#121117`): Primary brand color, used for headings, deep backgrounds, and brand identity anchors
- **Bright Red** (`#D2151E`): Primary call-to-action, danger states, and accent highlighting on hero sections

### Accent Colors
- **Soft Pink** (`#FFDEDE`): Light accent and subtle highlighting, used sparingly for delicate background accents

### Interactive
- **Red CTA** (`#D2151E`): Button backgrounds and interactive primary actions
- **Black Link** (`#000000`): Text links with high contrast for accessibility

### Neutral Scale
- **Dark Gray** (`#333333`): Body text, secondary headings, and default text color across most contexts
- **True Black** (`#000000`): Maximum contrast for primary headings and bold text elements
- **Medium Gray** (`#999999`): Secondary text, metadata, captions, and disabled states
- **Light Gray** (`#DDDDDD`): Subtle borders and divider lines
- **Off-White** (`#F3F4F6`): Light backgrounds, section dividers, and subtle surface variation

### Surface & Borders
- **White** (`#FFFFFF`): Primary surface background for cards, containers, and content areas
- **Light Gray Border** (`#DDDDDD`): Subtle 1px borders for input fields and container edges
- **Off-White Background** (`#F3F4F6`): Soft background alternative to pure white for section breaks

### Semantic / Status
- **Error Red** (`#D2151E`): Error messages, validation failures, and alert states

## 3. Typography Rules

### Font Family
**Primary:** Public Sans (sans-serif)
Fallback stack: `Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`

**Secondary:** Public Sans (unified across all weights and scales)
Fallback stack: Same as primary

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Public Sans | 94px | 600 | 65.8px | 0px | Hero headlines, maximum visual impact |
| Heading 2 | Public Sans | 36px | 500 | 54px | 0px | Section headers, project titles |
| Heading 3 | Public Sans | 28px | 400 | 42px | 0px | Subsection headers, card titles |
| Heading 4 | Public Sans | 22px | 400 | 33px | 0px | Secondary headings, list headers |
| Heading 5 | Public Sans | 18px | 400 | 27px | 0px | Tertiary headings, labels |
| Body | Public Sans | 16px | 400 | 27.2px | 0px | Default paragraph text, descriptions |
| Button / Link | Public Sans | 14px | 400 | 16.8px | 0px | Interactive elements, CTAs |
| Input / Form | Public Sans | 14px | 400 | 21px | 0px | Form fields, input text |
| Caption / Meta | Public Sans | 12px | 400 | 18px | 0px | Metadata, timestamps, secondary info |
| Code | Public Sans | 13px | 400 | 19.5px | 0px | Inline and block code references |

### Principles
- **Generous Scale Contrast:** Large jumps between heading levels create visual hierarchy and guide user attention
- **Single Typeface Family:** Public Sans carries all weights and sizes, ensuring visual cohesion and technical simplicity
- **Performance First:** System fonts and single web font minimize load and maximize readability
- **Accessibility:** Generous line heights (27px+) for body text ensure comfortable reading; high contrast between text and backgrounds
- **Minimal Letter Spacing:** Rely on weight and scale rather than spacing manipulation for emphasis

## 4. Component Stylings

### Buttons

**Primary CTA Button**
- Background: `#D2151E`
- Text Color: `#FFFFFF`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: `Public Sans`
- Padding: `16px 24px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `16.8px`
- Hover State: Background `#B01118`, text remains `#FFFFFF`
- Active State: Background `#900F15`
- Disabled State: Background `#CCCCCC`, text `#FFFFFF`, cursor `not-allowed`
- Display: `inline-block`

**Secondary Button**
- Background: `#FFFFFF`
- Text Color: `#000000`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: `Public Sans`
- Padding: `16px 24px`
- Border Radius: `0px`
- Border: `1px solid #000000`
- Box Shadow: `none`
- Line Height: `16.8px`
- Hover State: Background `#F3F4F6`, text `#000000`, border `#000000`
- Active State: Background `#E8E8E8`
- Disabled State: Background `#FFFFFF`, text `#999999`, border `#CCCCCC`

**Ghost Button**
- Background: `transparent`
- Text Color: `#333333`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: `Public Sans`
- Padding: `12px 16px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `16.8px`
- Text Decoration: `underline`
- Hover State: Text Color `#000000`, underline persists
- Active State: Text Color `#333333`, underline thickens

### Cards & Containers

**Project Card**
- Background: `#FFFFFF`
- Border: `none`
- Border Radius: `0px`
- Padding: `0px`
- Box Shadow: `none`
- Image: Full width, responsive aspect ratio
- Content Padding: `24px`
- Text Color: `#333333`
- Hover State: Subtle brightness increase on image, text remains unchanged
- Gap between image and text: `0px`

**Content Card**
- Background: `#FFFFFF`
- Border: `1px solid #DDDDDD`
- Border Radius: `0px`
- Padding: `24px`
- Box Shadow: `none`
- Text Color: `#333333`
- Heading: `#121117` weight `500`
- Hover State: Border color `#999999`

**Section Background**
- Background: `#F3F4F6` (alternating sections) or `#FFFFFF`
- Padding: `60px 40px` (desktop), `40px 20px` (tablet), `24px 16px` (mobile)
- Border Radius: `0px`
- Border: `none`

### Inputs & Forms

**Text Input / Email Field**
- Background: `#FFFFFF`
- Border: `1px solid rgba(0, 0, 0, 0.1)`
- Border Radius: `0px`
- Padding: `15px`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: `Public Sans`
- Text Color: `#333333`
- Line Height: `21px`
- Height: `53px`
- Placeholder Color: `#999999`
- Focus State: Border `1px solid #000000`, outline `none`
- Active State: Border `1px solid #333333`
- Disabled State: Background `#F3F4F6`, border `#CCCCCC`, text `#999999`
- Box Shadow: `none`

**Textarea**
- Background: `#FFFFFF`
- Border: `1px solid rgba(0, 0, 0, 0.1)`
- Border Radius: `0px`
- Padding: `14px`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: `Public Sans`
- Text Color: `#333333`
- Line Height: `21px`
- Minimum Height: `180px`
- Placeholder Color: `#999999`
- Focus State: Border `1px solid #000000`, outline `none`
- Resize: `vertical`
- Box Shadow: `none`

### Navigation

**Primary Navigation Bar**
- Background: `#FFFFFF`
- Height: `auto` (min `64px` on desktop)
- Border Bottom: `none`
- Box Shadow: `none`
- Padding: `16px 40px`
- Logo Font: Public Sans, weight `600`, size `20px`, color `#121117`
- Nav Link Font Size: `16px`
- Nav Link Color: `#333333`
- Nav Link Weight: `400`
- Nav Link Line Height: `27.2px`
- Nav Link Hover: Color `#000000`, text-decoration `none`
- Nav Link Active: Color `#D2151E`, font-weight `500`
- Menu Items Gap: `32px`
- Display: `flex`, justify-content `space-between`, align-items `center`

**Mobile Navigation**
- Background: `#FFFFFF`
- Position: `fixed` or `absolute`
- Width: `100%`
- Padding: `16px 20px`
- Display on mobile: `flex`, flex-direction `column`
- Toggle Button: Size `24px`, color `#121117`, background `transparent`

### Links

**Text Link (Inline)**
- Color: `#333333`
- Text Decoration: `none`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `27.2px`
- Hover State: Color `#000000`, text-decoration `underline`
- Active State: Color `#D2151E`
- Visited State: Color `#999999`

**Footer Link**
- Color: `#000000`
- Text Decoration: `none`
- Font Size: `14px`
- Font Weight: `400`
- Padding Bottom: `2px`
- Line Height: `16.8px`
- Hover State: Text decoration `underline`
- Active State: Color `#D2151E`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px` — Minimal gaps within components, tight button padding
- `8px` — Small gaps between inline elements
- `12px` — Small component spacing
- `16px` — Default padding for containers and buttons
- `20px` — Medium padding for larger components
- `24px` — Standard card and section padding
- `28px` — Large content padding
- `32px` — Gap between major sections
- `36px` — Large gaps between sections
- `40px` — Page-level horizontal margins and section separation
- `52px` — Extra-large vertical spacing for dramatic separation
- `60px` — Maximum vertical section padding on desktop

**Usage Context:**
- Button padding: `16px 24px`
- Card content: `24px`
- Form inputs: `15px` internal, `12px` between fields
- Section margins: `40px` horizontal, `52px–60px` vertical
- Navigation: `16px` vertical, `32px` horizontal between items

### Grid & Container

**Max Width:** `1200px` (desktop main container)

**Column Strategy:**
- Desktop: 12-column grid system with `24px` gutters
- Tablet (768px): 8-column grid with `20px` gutters
- Mobile: Single column with `16px` margins

**Section Patterns:**
- Full-width hero: Bleeds to viewport edges, internal padding `60px 40px`
- Contained section: Max-width `1200px`, centered, padding `52px 40px`
- Two-column: 50/50 split on desktop; stacked on tablet/mobile
- Three-column grid: Project cards in equal-width columns; collapses to 1 column on mobile
- Asymmetric layout: Image left (60%), text right (40%); reverses on mobile

### Whitespace Philosophy

Whitespace is treated as a design element, not empty space. Generous margins and padding create visual rest and guide attention through content hierarchy. Section breaks use full-width background color changes (`#FFFFFF` to `#F3F4F6`) rather than borders. Vertical rhythm is maintained through consistent spacing multiples (52px, 60px). Imagery and text are separated by whitespace, never adjacent, to improve legibility and visual flow. Mobile layouts maintain proportional whitespace rather than collapsing to zero margins.

### Border Radius Scale

- **Sharp Corners:** `0px` — All interactive elements (buttons, inputs, cards, containers) use squared corners for a technical, modern aesthetic
- **Consistent Zero Radius:** Applied uniformly across buttons, form fields, cards, and containers to maintain unified visual language

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| **Base (Level 0)** | No shadow, `box-shadow: none` | Flat backgrounds, neutral surfaces, most components |
| **Hover (Level 1)** | Subtle color shift (border darkens or text changes) | Interactive hover states without spatial lift |
| **Active (Level 2)** | Color change + border adjustment | Pressed button states, active navigation items |
| **Disabled (Level 3)** | Reduced opacity (0.5) or muted color palette | Disabled form states, inactive elements |

**Shadow Philosophy:** This design system eschews traditional drop shadows in favor of flat, color-based differentiation. Elevation is communicated through background color changes, border weight increases, and text color shifts rather than shadow depth. This approach maintains visual simplicity while ensuring accessibility and performance. When shadows are necessary (e.g., tooltips or floating modals), use `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)` at minimum.

## 7. Do's and Don'ts

### Do

- **Use sharp corners (`0px` border radius) consistently** across all components—this is the design system signature
- **Maintain generous vertical spacing between sections** (`52px–60px`) to create visual breathing room
- **Leverage image photography prominently**, especially in hero sections and project showcases
- **Use red (`#D2151E`) exclusively for primary CTAs and call-to-action states** to maintain visual focus
- **Apply high contrast text colors** (`#000000` on `#FFFFFF`, `#FFFFFF` on `#333333`) for accessibility
- **Group navigation links with consistent `32px` gaps** for scannability
- **Default all form inputs to white backgrounds with subtle borders** (`1px solid rgba(0, 0, 0, 0.1)`)
- **Use Public Sans across all scales and weights** for visual cohesion
- **Implement responsive padding and margins** that scale from `16px` (mobile) to `40px` (desktop)
- **Alternate section backgrounds** between white and off-white (`#F3F4F6`) for visual segmentation without borders

### Don't

- **Do not add decorative borders or subtle shadows** to cards and containers—keep surfaces flat
- **Do not use rounded corners** on any interactive element; maintain square corners throughout
- **Do not apply red color outside of CTAs and error states**—its rarity maintains impact
- **Do not crowd navigation items**; maintain minimum `32px` gap between links
- **Do not use more than two font weights** in a single design (typically `400` and `500–600`)
- **Do not nest cards within cards**; use background color changes and padding to create hierarchy
- **Do not center-align body text**; use left-align (`text-align: left`) for readability
- **Do not reduce line height below `1.5x` font size** for body text (16px min line-height `24px`)
- **Do not implement complex drop shadows or gradients**; maintain flat color design
- **Do not use placeholder images**; prioritize real photography that reflects construction quality and modern design

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| **Mobile** | 320px–767px | Single column, `16px` padding, font sizes reduce by 10–15%, navigation collapses to mobile menu, section padding `24px–40px` |
| **Tablet** | 768px–1023px | 2–3 columns, `20px` padding, 8-column grid, navigation remains visible, section padding `40px` |
| **Desktop** | 1024px+ | 12-column grid, `40px` padding, full navigation bar, max-width container `1200px`, section padding `60px` |
| **Large Desktop** | 1440px+ | Same as desktop; typography increases by 5–10% on hero/display type only |

### Touch Targets

- **Minimum Touch Size:** `44px × 44px` for all interactive elements (buttons, links, form inputs)
- **Button Minimum:** `48px` height on mobile, `44px` on desktop
- **Link Spacing:** Minimum `24px` between adjacent clickable elements
- **Form Input Height:** `53px` on all breakpoints to ensure comfortable interaction
- **Navigation Link Padding:** `12px` vertical, `16px` horizontal on mobile; `16px` vertical, `24px` horizontal on desktop

### Collapsing Strategy

- **Navigation:** Full horizontal bar on desktop; hamburger toggle (three horizontal lines) on mobile; expands vertically when toggled
- **Multi-Column Sections:** 3-column grid on desktop → 2-column on tablet → 1-column on mobile
- **Two-Column Asymmetric Layout:** 60/40 split on desktop; reverses to 100% stacked on tablet/mobile
- **Padding Scaling:** `60px` (desktop) → `40px` (tablet) → `24px` (mobile) for vertical section spacing
- **Typography:** H1 scales from `94px` (desktop) to `48px` (tablet) to `32px` (mobile); body text `16px` across all breakpoints
- **Hero Section:** Full-width image on all breakpoints; text overlay repositions from center (desktop) to lower left (mobile)
- **Form Fields:** Full width on mobile; 2-column grid on tablet; 3-column on desktop (as applicable)

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA Button:** Red (`#D2151E`)
- **Brand Dark Accent:** Deep Charcoal (`#121117`)
- **Primary Heading Text:** True Black (`#000000`)
- **Body Text:** Dark Gray (`#333333`)
- **Secondary Text / Metadata:** Medium Gray (`#999999`)
- **Background Surface:** White (`#FFFFFF`)
- **Section Background Alternate:** Off-White (`#F3F4F6`)
- **Input Border:** `rgba(0, 0, 0, 0.1)` (10% transparent black on white)
- **Subtle Divider:** Light Gray (`#DDDDDD`)
- **Error / Alert:** Red (`#D2151E`)

### Iteration Guide

1. **All components use square corners** (`border-radius: 0px`) — no rounding under any circumstance.
2. **Primary call-to-action buttons are always red (`#D2151E`)** with white text, padding `16px 24px`, no borders or shadows.
3. **Form inputs default to white background** with `1px solid rgba(0, 0, 0, 0.1)` borders, `15px` padding, `53px` height, and focus state of `1px solid #000000`.
4. **Body text is `16px` Public Sans, weight `400`, line-height `27.2px`, color `#333333`** — no exceptions for default paragraph text.
5. **Headings use bold weight (`500`–`600`)** with tight line heights and deep charcoal or black color; scale hierarchy strictly by `px` size, not weight alone.
6. **Navigation bars maintain `32px` gaps between links**, use `16px` font size, remain transparent (no background bar), and display horizontally on desktop with mobile hamburger fallback.
7. **Section spacing is generous:** `52px`–`60px` vertical margin between major sections; `40px` horizontal padding on desktop, scaling to `24px` on mobile.
8. **Alternate section backgrounds** between white and off-white (`#F3F4F6`) to create visual breaks without adding borders or shadows.
9. **Image-to-text separation:** Never let images and text touch; maintain whitespace between them; project cards show full-width image above padded text area.
10. **Mobile-first responsive design:** Single column base on mobile (`16px` padding), expand to `8px–12px` grid on tablet (`20px` padding), full `12-column` grid on desktop (`40px` padding).