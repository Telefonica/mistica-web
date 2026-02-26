---
name: Stack
description:
  'Use stack to arrange content vertically with a predefined spacing scale, including responsive spacing and
  distribution modes.'
---

## Usage

### Use for

- Building vertical layouts where each child needs consistent separation
- Applying the supported spacing scale values (0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80) between
  blocks, including responsive values by breakpoint
- Distributing children across available vertical space with `between`, `around`, or `evenly` when a
  flex-style layout is needed
- Grouping semantic lists by setting list roles so each child is exposed as a list item

### Don't use for

- Do not use stack as a replacement for components that already define their own internal structure and
  spacing
- Do not assume arbitrary spacing values are supported; keep to the provided spacing scale
- Do not use flex distribution modes when fixed spacing values communicate hierarchy better
- Do not rely on visual grouping alone when content is a real list; provide the appropriate semantic role
