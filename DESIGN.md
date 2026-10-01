# Design System — LUMEN

<!-- impeccable:design-schema 1 -->

## Visual World: "The Impossible Museum"

A celestial, atmospheric digital museum built in deep space-black with warm bone minerals, muted golds, and cool slate shadows. The aesthetic merges classical curatorial gravitas with bleeding-edge computational geometry.

## Color Tokens

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--bg-void` | `#0A0A0C` | Background | Primary dark canvas with warm undertone |
| `--bg-surface` | `#111116` | Container | Subtle elevation for museum plaques & panels |
| `--bg-overlay` | `rgba(10, 10, 12, 0.82)` | Glass/Backdrop | Blurred backdrop-filter glass panels |
| `--color-bone` | `#E8D5B7` | Primary Accent | Editorial headings, monumental numbers, primary text |
| `--color-slate` | `#6C7A89` | Secondary Accent | Subheadings, wireframe lines, ambient depth |
| `--color-gold` | `#C9A96E` | Highlight / Active | Interactive indicators, active states, glowing focal points |
| `--color-border` | `rgba(232, 213, 183, 0.12)` | Structural Lines | Minimal geometric dividers, grid overlays |
| `--color-border-hover` | `rgba(201, 169, 110, 0.35)` | Interactive | Hover state on museum frames |

## Typography

- **Headings / Display:** `"Cormorant Garamond", Georgia, serif`
  - Ultra-high contrast, elegant serifs, aristocratic display proportions.
  - Scale: H1 (clamp(3.5rem, 9vw, 9.5rem)), H2 (clamp(2.5rem, 5vw, 5rem)), H3 (clamp(1.75rem, 3vw, 2.75rem)).
- **Body / Prose:** `"Inter Tight", -apple-system, sans-serif`
  - High-density screen presence, tight tracking, crisp legibility.
  - Weights: 300 (Light), 400 (Regular), 500 (Medium).
- **Technical / Telemetry:** `"JetBrains Mono", monospace`
  - Curatorial registry IDs, shader variables, coordinate data, coordinates `[X, Y, Z]`.

## Motion Principles (Emil Kowalski + Impeccable Motion Rules)

- **The Frequency Rule:**
  - Frequent interactions (nav links, button hovers, exhibit toggles): **180ms**, crisp, responsive.
  - Rare interactions (act reveals, camera dollys, exhibit morphs): **800ms - 1400ms**, stately, weighted.
- **Custom Easing Curves (No default `ease` or `ease-in-out`):**
  - Stately Reveal: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential deceleration)
  - Organic Inertia: `cubic-bezier(0.25, 1, 0.5, 1)`
  - Quick Interactive: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Scale Rules:**
  - Never scale from `0`. Entrances scale from `0.92` to `1.0`.
  - Hover states: subtle scale down `0.98` or micro-lift with border glow.
- **Text Reveal:**
  - Clip-path reveals with `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`.

## Spatial Composition & Layout

- **Anti-Grid / Curatorial Rhythm:** Alternating horizontal axes, asymmetry, extreme generous negative space.
- **Monumental Hierarchy:** Giant Roman numerals (`I`, `II`, `III`, `IV`), museum catalog metadata, floating telemetry.
- **Zero AI-Slop Directives Enforced:**
  - No default Inter font.
  - No purple or neon gradients.
  - No 3-card equal column SaaS grids.
  - No centered "Headline + Subhead + Two Buttons" hero.
  - No emoji icons.
