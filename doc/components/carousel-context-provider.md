---
name: CarouselContextProvider
description:
  'CarouselContextProvider shares carousel navigation and state props so custom controls stay synchronized
  with carousel behavior.'
---

## Usage

### Use for

- Coordinating custom carousel controls with internal carousel state from a single source
- Exposing navigation actions (`goPrev`, `goNext`, `goToPage`) to external control compositions
- Keeping bullets, page controls, and autoplay controls synchronized across custom layouts
- Building advanced carousel UIs without duplicating internal carousel state logic

### Don't use for

- Do not build custom carousel controls outside provider scope when synchronized behavior is required
- Do not mix multiple providers around the same control set without clear separation
- Do not use provider patterns when default carousel controls already satisfy the experience
- Do not bypass context and recreate competing autoplay/navigation state manually
