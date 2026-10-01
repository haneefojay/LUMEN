---
name: LUMEN
description: A conservation chamber for impossible digital matter.
colors:
  void: "#0A0A0C"
  void-soft: "#111116"
  bone: "#E8D5B7"
  bone-dim: "#A99C87"
  slate: "#6C7A89"
  contact-gold: "#C9A96E"
  hairline: "rgba(232, 213, 183, 0.18)"
typography:
  display:
    fontFamily: "Cormorant Garamond Variable, Georgia, serif"
    fontSize: "clamp(3.7rem, 10vw, 11rem)"
    fontWeight: 410
    lineHeight: 0.8
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Inter Tight Variable, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono Variable, Courier New, monospace"
    fontSize: "0.67rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.13em"
rounded:
  focus: "0px"
spacing:
  hairline: "1px"
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  section: "20vh"
components:
  navigation-label:
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    height: "44px"
  technical-rule:
    backgroundColor: "{colors.hairline}"
    height: "1px"
---

# Design System: LUMEN

## Overview

**Creative North Star: “The Conservation Chamber”**

LUMEN uses the authority of a museum catalogue to frame objects that can only exist in computation. Near-black space is active negative space; warm bone type and mineral surfaces provide archaeological weight. The interface stays thin and measured so scale, topology, and camera movement can carry the experience.

**Key Characteristics:** monumental asymmetric crops; editorial serif at extreme scale; sparse technical mono; warm mineral light; hairlines instead of cards; responsive degradation as a designed state.

## Colors

The palette is warm bone and cold slate suspended in a near-black void.

### Primary
- **Conservation Bone** (`#E8D5B7`): principal type and artifact light.
- **Contact Gold** (`#C9A96E`): rare interaction and specimen-category accent.

### Secondary
- **Depth Slate** (`#6C7A89`): technical depth and cool material contrast.

### Neutral
- **Museum Void** (`#0A0A0C`): page and WebGL ground.
- **Soft Void** (`#111116`): studio tonal field.
- **Aged Bone** (`#A99C87`): secondary prose.
- **Conservation Line** (`rgba(232, 213, 183, 0.18)`): dividers and measuring rules.

**The Contact Rule.** Gold is a response, classification mark, or focal spark; it is never a general fill.

## Typography

**Display Font:** Cormorant Garamond Variable with Georgia fallback.  
**Body Font:** Inter Tight Variable with Arial fallback.  
**Label/Mono Font:** JetBrains Mono Variable with Courier New fallback.

**Character:** Display text is high-contrast, italic when the voice becomes atmospheric, and set with compressed line-height. Body text is compact and quiet. Mono labels behave like accession metadata.

### Hierarchy
- **Display** (380–420, `clamp(3.7rem, 10vw, 11rem)`, 0.78–0.82): thresholds, manifesto, exhibit names.
- **Body** (400, `clamp(1rem, 1.25vw, 1.2rem)`, 1.55): interpretive copy, held to roughly 30rem.
- **Label** (400, `0.67rem`, `0.13em`, uppercase): navigation, coordinates, exhibit metadata.

**The Scale Split.** Display and labels remain radically different in scale; mid-sized generic marketing headings do not enter the system.

## Layout

The page uses viewport-relative chapters and a fixed canvas. Desktop gutters are fluid (`clamp(1.25rem, 4vw, 4rem)`). Major compositions are asymmetric, often using a 0.38/1 split or a 12-column technical grid. The hall is a 500svh pinned traversal. At 760px and below, navigation recedes, the wordmark turns vertical, studio data stacks, and WebGL becomes a CSS atmospheric fallback.

## Elevation & Depth

No interface shadows are used. Depth comes from real camera movement, material lighting, tonal fields, occlusion, and sparse glow at the colophon. Text receives a restrained dark shadow only where a moving object can pass behind it.

**The Real Depth Rule.** If a moment asks for dimensionality, change space, light, or occlusion; do not imitate depth with glass cards.

## Shapes

Interface geometry is square and ruled. Hairlines, coordinate ticks, and full-bleed crops dominate. Organic contour belongs to rendered artifacts, never to decorative CSS masks. Rounded forms are limited to the terminal light particle and natural 3D topology.

## Components

### Navigation
- Fixed three-part header: collection mark, central chapter links, status.
- 44px minimum targets; 180ms underline response with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Mobile removes chapter links rather than squeezing them into a false app bar.

### Technical rules
- One-pixel conservation lines use `rgba(232, 213, 183, 0.18)`.
- Progress is expressed by replacing the line with bone from left to right.

### Exhibit copy
- Large accession number opposite a right-aligned interpretive block.
- Gold mono category, italic display name, dim body note.
- Copy changes while the fixed camera traverses physical X positions.

## Do's and Don'ts

### Do:
- **Do** give one artifact visual sovereignty per chapter.
- **Do** use custom cubic-bezier curves and transform/opacity-only UI motion.
- **Do** preserve complete semantic text when WebGL is unavailable.
- **Do** use hairlines and spacing before inventing containers.

### Don't:
- **Don't** introduce purple, neon cyan, gradient text, stock imagery, or glossy toy materials.
- **Don't** use centered CTA heroes, feature-card grids, nested cards, or pill-heavy navigation.
- **Don't** use default Inter, built-in easing, `transition: all`, or entrances from `scale(0)`.
- **Don't** let frequent or keyboard-initiated actions wait for animation.
