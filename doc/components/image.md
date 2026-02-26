---
name: Image
description:
  'Image displays responsive media with controlled aspect ratio, loading skeleton, and graceful error fallback
  to keep layouts stable while assets load or fail.'
---

## Usage

### Use for

- Displaying responsive media in cards, lists, and hero content while preserving intended composition ratios
- Preventing layout jumps with fixed size or aspect-ratio containers during image loading
- Providing resilient experiences with loading and error fallbacks when network or asset quality is variable
- Using circular or rectangular presentation intentionally to match avatar-style vs content-image semantics

### Don't use for

- Do not omit meaningful alternative text when the image conveys essential information
- Do not rely on unconstrained image sizes that cause reflow or inconsistent cropping across breakpoints
- Do not disable loading/error fallback patterns in contexts where reliability and perceived performance
  matter
- Do not mix arbitrary border radius and fit strategies without clear visual-system rationale
