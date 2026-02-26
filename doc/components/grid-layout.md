---
name: GridLayout
description:
  'GridLayout provides predefined responsive column templates to compose balanced page sections with
  predictable proportions.'
---

## Usage

### Use for

- Building page sections with curated layout ratios such as `6+6`, `8+4`, `4+6`, `5+4`, and `3+9`
- Structuring two-area compositions (main + side content) without manually managing low-level grid math
- Centering medium or narrow content blocks using templates like `10` and `8`
- Controlling vertical rhythm and collapse behavior for responsive transitions from desktop to smaller
  breakpoints

### Don't use for

- Do not use GridLayout when your composition requires fully custom per-item placement better suited to `Grid`
- Do not mix inconsistent templates in adjacent sections without clear visual rationale
- Do not force wide split templates for content that needs single-column reading focus
- Do not ignore collapse behavior when designing tablet/mobile experiences
