# Animation review

| Before | After | Why |
|---|---|---|
| GSAP `power4.out` / `power2.inOut` | `cubic-bezier(0.23, 1, 0.32, 1)` / `cubic-bezier(0.77, 0, 0.175, 1)` | Removes built-in easing and aligns enter versus transport behavior. |
| Full WebGL on every viewport | CSS atmosphere on compact, save-data, reduced-motion, or ≤4-core devices | Protects responsiveness and treats degradation as art direction. |
| 1.05s mobile title reveal | 200ms compact reveal | Frequent first paint should not be held behind cinematic timing. |

## Verdict
**Approve.** Rare narrative motion is justified as explanation and spatial continuity; frequent navigation is instant for keyboard activation and 180ms for pointer feedback. Motion is transform/opacity based, hover is pointer-gated, and reduced motion removes spatial travel.
