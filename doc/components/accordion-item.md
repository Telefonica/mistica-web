---
name: AccordionItem
description: "AccordionItem is the interactive unit inside an Accordion: it renders a tappable header that toggles an accessible, animated content panel."
---

## Usage

### Use for

- Building each expandable row inside an Accordion group
- Showing a header (title/asset/right content) that toggles panel visibility with chevron state
- Providing accessible expand/collapse behavior with `aria-expanded`, `aria-controls`, and labelled panel region

### Don't use for

- Do not use AccordionItem outside an Accordion context, since open state and toggle come from `useAccordionContext`
- Do not omit meaningful title/asset labelling when relying on computed accessibility labels
- Do not bypass the built-in toggle/transition behavior for custom interaction patterns that break consistency
