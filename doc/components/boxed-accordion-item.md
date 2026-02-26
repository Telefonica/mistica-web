---
name: BoxedAccordionItem
description: "BoxedAccordionItem is the interactive unit of a BoxedAccordion: it behaves like AccordionItem and applies the visible boxed styling at item level."
---

## Usage

### Use for

- Building each expandable row inside a BoxedAccordion group
- Showing a tappable header that toggles an accessible content panel with chevron state
- Keeping AccordionItem behavior while adding a stronger boxed visual grouping

### Don't use for

- Do not use BoxedAccordionItem outside a BoxedAccordion/Accordion grouped context
- Do not omit meaningful item labeling when relying on computed accessibility labels
- Do not replace built-in toggle and transition behavior with inconsistent custom interaction patterns
