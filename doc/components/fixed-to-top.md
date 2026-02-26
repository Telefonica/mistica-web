---
name: FixedToTop
description:
  'FixedToTop coordinates stacked fixed-top elements by sharing cumulative top offset, avoiding overlap
  between layered sticky regions.'
---

## Usage

### Use for

- Building interfaces with multiple fixed/sticky top layers that must stack predictably
- Positioning new fixed-top elements relative to already occupied top space
- Keeping global UI regions (for example headers and contextual bars) visually aligned during scroll
- Preserving layout coherence when different components need awareness of top offset accumulation

### Don't use for

- Do not use this pattern when only one fixed-top element exists and no stacking logic is needed
- Do not hardcode top offsets that can conflict with accumulated fixed-top height
- Do not mix unmanaged fixed-position elements with FixedToTop-managed layers in the same stack
- Do not treat FixedToTop as a visual component; its role is layout coordination
