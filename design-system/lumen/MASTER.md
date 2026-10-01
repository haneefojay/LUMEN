# LUMEN — Design System

This reconciles the UI UX Pro Max generator output with the user’s pinned world. The brief wins where the generator’s generic brutalist palette or typography conflicts.

## Direction
**Mode:** Experience  
**Pattern:** Continuous scroll-triggered exhibition  
**Visual thesis:** A warm, archaeological museum language applied to matter that can only exist in computation.

## Color tokens
| Token | Value | Use |
|---|---:|---|
| `--ink` | `#0A0A0C` | primary void |
| `--ink-soft` | `#111116` | depth plane |
| `--bone` | `#E8D5B7` | principal type and diffuse material |
| `--bone-dim` | `#A99C87` | secondary text |
| `--slate` | `#6C7A89` | depth annotations only |
| `--gold` | `#C9A96E` | interactive highlight only |
| `--line` | `rgba(232,213,183,.18)` | rules and boundaries |

Never use purple, neon cyan, pure black, pure white, gradient text, or generic glow chrome.

## Typography
- Display: **Cormorant Garamond Variable**, optical contrast used at monumental scale; the user explicitly pinned a high-contrast editorial serif.
- Body/UI: **Inter Tight Variable** (not default Inter), compact and legible.
- Technical annotations: **JetBrains Mono Variable**.
- Fluid display: `clamp(4.75rem, 17vw, 17rem)`; section titles `clamp(3rem, 8vw, 8rem)`; body `clamp(1rem, 1.3vw, 1.25rem)`.
- Preserve asymmetry. Do not center editorial blocks by default.

## Spatial system
- Base unit: 4px.
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- Desktop gutters: 40–64px; mobile gutters: 20px.
- Section depth: 120–240px equivalent vertical breathing room.
- Hairlines before surfaces; almost no cards; radii only for compact controls.

## Motion grammar
- Rare narrative reveals: 700–1200ms, `cubic-bezier(0.77, 0, 0.175, 1)` or scrubbed directly to scroll.
- Enter/exit: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Frequent hover/press: 180ms max, exact transform/opacity/color properties only.
- Decorative cursor following: spring `{ mass: 1, stiffness: 100, damping: 10 }`.
- Never animate from `scale(0)`, never use built-in `ease`, never animate layout properties.
- Reduced motion removes camera travel and positional reveals while retaining short opacity changes.

## Material and light
- Bone ceramic, smoked metal, translucent mineral, and cold slate shadow.
- Lighting behaves like a dark conservation lab: one warm key, low cool fill, restrained rim.
- No glossy toy rendering. Surfaces should reveal topology through roughness and anisotropy.

## Responsive degradation
- Full: procedural geometry, particles, post-free lighting, scroll camera.
- Simplified: lower DPR, fewer particles, reduced geometry, no pointer-driven displacement.
- CSS fallback: layered authored radial fields and still typographic composition; all exhibit copy remains.

## Absolute bans
Centered CTA hero; three-card feature grids; nested cards; emoji icons; generic stock imagery; purple gradients; default Inter; built-in easing; `transition: all`; decorative motion without purpose.
