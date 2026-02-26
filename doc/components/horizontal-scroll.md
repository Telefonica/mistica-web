---
name: HorizontalScroll
description:
  'HorizontalScroll creates a horizontal overflow area so content can be explored by sideways scrolling when
  items do not fit in the available width.'
---

## Usage

### Use for

- Presenting rows of cards, chips, or media previews that need horizontal exploration
- Preserving item size and composition when compressing into narrow viewports would harm readability
- Enabling simple, touch-friendly sideways navigation without introducing carousel pagination logic
- Hiding the scrollbar only in polished surfaces where discoverability of horizontal movement remains clear

### Don't use for

- Do not hide the scrollbar when users need clear affordance to understand the area is scrollable
- Do not place long-form text flows in HorizontalScroll; it is for lateral scanning patterns
- Do not use HorizontalScroll as a replacement for components that require grouped pages and controls
- Do not rely on it to solve poor content hierarchy; simplify item density and priorities first
