---
name: Divider
description:
  'Divider is a subtle visual separator used to split related content areas while preserving rhythm and
  scanability.'
---

## Usage

### Use for

- Separating adjacent content blocks that belong to the same section but need clearer visual boundaries
- Improving scanability in dense lists, cards, and stacked layouts
- Reinforcing content grouping without introducing heavy structural containers
- Keeping separator styling consistent with the active theme variant

### Don't use for

- Do not use dividers where spacing alone already provides clear separation
- Do not stack multiple dividers to simulate complex layout structures
- Do not rely on dividers as the only cue for section hierarchy when headings are needed
- Do not add separators after every minor element if it creates visual noise

### Built-in separators

- `RowList` already renders dividers between rows
- `Accordion` already renders dividers between accordion items
- `Menu`/`MenuSection` already includes section separators
- `Drawer` and `Sheet` patterns render contextual dividers based on scroll state
- Prefer these built-in separators before adding extra `Divider` instances manually
