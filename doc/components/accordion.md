---
name: Accordion
description:
  'Accordion groups multiple AccordionItem components stacked vertically, helping present expandable content
  as a coherent set.'
---

## Usage

### Use for

- Grouping multiple AccordionItem elements as a single stacked section
- Building accordion groups where the only allowed children are AccordionItem elements
- Presenting expandable and collapsible content blocks in a clear hierarchy

### Don't use for

- Do not use Accordion when content does not need expand/collapse behavior
- Do not mix unrelated content under one Accordion group without clear section meaning
- Do not place children other than AccordionItem inside Accordion
- Do not insert extra dividers between items by default, since `Accordion` already renders separators
