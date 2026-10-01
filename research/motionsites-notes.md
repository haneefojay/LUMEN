# motionsites.ai & Mobbin Research Extractions — LUMEN

This document records the architectural and motion principles extracted from top-tier 3D web references (Phantom.land, Linear, Awwwards Site of the Year candidates, and motionsites.ai patterns).

---

## 1. Hero Anatomy: "The Spatial Threshold"

### Reference Analysis
- **Motionsites Pattern:** Cinematic hero with floating 3D focal subject and ambient particle depth.
- **Mobbin Insight (Museum/Architecture Showcase):** A grand exhibition does not begin with marketing slogans or call-to-action buttons. It opens with an experiential threshold: silence, atmospheric presence, and a sense of scale.
- **Structural Layering:**
  1. *Layer 0 (Deep Background):* Space void (`#0A0A0C`) with subtle radial light vignette and 1,200 floating star dust / luminescent particles.
  2. *Layer 1 (3D Subject):* Floating seed artifact ("The Seed of Impossible Geometry") rendered with procedural displacement, Fresnel iridescent bone reflection, and slow orbital rotation (`~0.003 rad/frame`).
  3. *Layer 2 (Monumental Typography):* Massive "LUMEN" logotype in high-contrast Cormorant Garamond, initially veiled and revealed via scroll-scrubbed clip-path.
  4. *Layer 3 (Telemetry & Atmospheric Metadata):* Top corner museum registration marks (`EXHIBITION 01: NON-EUCLIDEAN FORM`), spatial coordinates `[0.00, 1.42, -3.18]`, and audio/experience toggle.
  5. *Layer 4 (The Only CTA):* A subtle vertical scroll indicator ("ENTER THE ARCHIVE" with an oscillating bone-gold line).

### Motion Pattern Extracted
- **Camera Dolly on Scroll:** As the user scrolls down from Act 1 (The Threshold), the Three.js camera smoothly tracks inward and pitches down, transitioning the seed artifact into the narrative space of Act 2 (Manifesto).
- **Easing Curve:** Stately deceleration `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 2. Horizontal Exhibit Hall: "The Impossible Objects"

### Reference Analysis
- **Phantom.land & Awwwards Gallery Grids:** Pinning the viewport while horizontal scroll triggers camera trajectory.
- **Objects Identified:**
  1. **Object I: The Klein Torus (Continuous Surface)** — A self-intersecting topological knot with non-orientable normals and pulsing gold rim.
  2. **Object II: The Hyper-Crystalline Polytope (Fractured Symmetry)** — An icosahedral crystal lattice undergoing fractal subdivision and wireframe refraction.
  3. **Object III: The Ferrofluid Monolith (Liquid Geometry)** — A cube whose vertices deform like liquid magnetic fluid reacting to cursor proximity.
  4. **Object IV: The Chrono-Spherical Disruption (Fragmented Time)** — A concentric concentric gyro-sphere shattered along golden-ratio planes.

### Motion Pattern Extracted
- **ScrollTrigger Pinning:** `pin: true` on the exhibit container.
- **Synchronized WebGL Translation:** The camera pans smoothly between object anchor coordinates `[x: -6 -> 0 -> 6 -> 12]` as the horizontal scroll track advances.
- **Interactive Cursor Orbit:** Mouse movement adds a subtle spring-damped tilt (`rotation.x = mouse.y * 0.3`, `rotation.y = mouse.x * 0.3`) for tactile depth.

---

## 3. The Studio: "Deconstruction & Technical Craft"

### Reference Analysis
- **Stripe & Linear Engineering Showcases:** Showing technical authenticity rather than stock decoration.
- **Structural Concept:** An interactive laboratory bench revealing the raw shader code (GLSL vertex & fragment algorithms), live wireframe switch, and material property toggles (Roughness, Metalness, Transmission, Chromatic Aberration).
- **Motion Pattern:**
  - Fast-switching wireframe overlay with instant keyframe response (no sluggish lag).
  - Code syntax with subtle pulsing cursor and live slider manipulation of geometry shader uniforms.

---

## 4. Colophon & Epilogue

### Reference Analysis
- **Minimalist Curatorial Sign-off:** Clean catalog colophon, typography hierarchy, curatorial statement, and a final interactive 3D talisman that reacts to cursor velocity.
- **Hover micro-interactions:** Scale 0.98, border highlight transition in 180ms.
