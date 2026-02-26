---
name: CarouselContextConsumer
description:
  'CarouselContextConsumer reads shared carousel actions and state to render custom controls aligned with
  active carousel behavior.'
---

## Usage

### Use for

- Building custom bullets, arrows, or autoplay controls that react to real carousel state
- Accessing carousel navigation callbacks without prop-drilling through multiple layers
- Keeping custom control components visually flexible while preserving behavior consistency
- Integrating carousel state into bespoke layouts that still follow carousel interaction rules

### Don't use for

- Do not use CarouselContextConsumer outside CarouselContextProvider
- Do not cache context values as static assumptions when carousel state is dynamic
- Do not use consumer-only patterns when default built-in controls already cover requirements
- Do not mix unrelated non-carousel concerns into carousel context-driven components
