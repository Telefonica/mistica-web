---
name: Text
description:
  'Foundational typography primitive for custom text rendering when preset components (`Text1`–`Text10`) do
  not cover the need.'
---

## Usage

### Use for

- Building custom text compositions that need explicit control of size, line-height, weight, truncation, or
  semantic element (`as`)
- Advanced typography cases that still must integrate with Mística theme variants and accessibility attributes
- Implementing edge cases where preset levels (`Text1`–`Text10`) are not sufficient
- Rendering text with controlled behaviors like multi-line truncation, alignment, transform, and hyphenation

### Don't use for

- Do not use this primitive by default when a text preset communicates hierarchy correctly
- Do not break typographic consistency by creating arbitrary one-off sizes for standard product copy
- Do not use styling alone to convey structure; keep proper semantic tags for headings and content
- Do not overuse truncation when full content is required for comprehension
