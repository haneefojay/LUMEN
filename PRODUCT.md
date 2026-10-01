# Product

## Platform
web

## Stack
- Next.js App Router, TypeScript, Tailwind CSS
- React Three Fiber and Drei for WebGL scenes
- GSAP + ScrollTrigger for scroll orchestration
- Motion for React for DOM-level motion
- Playwright and Lighthouse for validation

## Users
- Inferred from the supplied brief: design-conscious visitors, creative technologists, digital-art collectors, and prospective studio collaborators.

## Product Purpose
LUMEN is a fictional digital atelier and museum for impossible objects: interactive 3D sculptures that respond to scroll, cursor, and time.

## Positioning
An authored cultural experience, not a startup landing page. It must feel like a high-end experimental exhibition with production-grade interaction craft.

## Operating Context
- Single-page cinematic scroll narrative.
- Desktop is the fullest experience; mobile receives an intentionally simplified scene rather than a broken imitation.
- The page must remain legible and complete without WebGL or scroll-driven effects.

## Capabilities and Constraints
- Four procedural exhibits: seeded artifact, Möbius knot, liquid cube, fractured sphere/growing crystal.
- Full scene → simplified scene → CSS fallback degradation.
- No stock imagery, purple gradients, generic card grids, centered CTA hero, emoji icons, default easing, or default Inter.
- Performance targets: LCP <2.5s, CLS <0.1, INP <200ms; Lighthouse Performance ≥80, Accessibility ≥95, Best Practices ≥90, SEO ≥90.

## Brand Commitments
- Name: LUMEN
- Tagline: “Objects that should not exist.”
- Near-black `#0A0A0C`, warm bone `#E8D5B7`, cool slate `#6C7A89`, muted gold `#C9A96E`.
- Display serif + tight geometric sans + technical mono.
- Motion is slow, deliberate, weighty; frequent interactions remain under 300ms.

## Evidence on Hand
- The user supplied the complete concept, information architecture, palette, typography direction, motion rules, tool stack, workflow, and success criteria.
- The GitHub repository was verified through the connected GitHub MCP and is currently empty.

## Product Principles
1. 3D is the subject, not decoration.
2. One continuous spatial journey beats disconnected sections.
3. The interface recedes so the artifacts can lead.
4. Every movement has a named narrative or interaction purpose.
5. Progressive enhancement is part of the art direction.

## Accessibility & Inclusion
- Semantic reading order independent of canvas.
- Visible keyboard focus and 44px minimum targets.
- `prefers-reduced-motion`, coarse-pointer, save-data, and low-power fallbacks.
- WCAG AA contrast for readable text and accessible labels for non-text interactions.

> Assumption note: audience details are inferred from the explicit brief; no commercial claims, clients, awards, or real collection provenance are asserted.
