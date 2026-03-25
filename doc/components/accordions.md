# Accordions

## Accordion

Accordion groups multiple AccordionItem components stacked vertically, helping present expandable content as a
coherent set.

### Usage

#### Use for

- Grouping multiple AccordionItem elements as a single stacked section
- Building accordion groups where the only allowed children are AccordionItem elements
- Presenting expandable and collapsible content blocks in a clear hierarchy

#### Don't use for

- Do not use Accordion when content does not need expand/collapse behavior
- Do not mix unrelated content under one Accordion group without clear section meaning
- Do not place children other than AccordionItem inside Accordion
- Do not insert extra dividers between items by default, since `Accordion` already renders separators

## AccordionItem

AccordionItem is the interactive unit inside an Accordion: it renders a tappable header that toggles an
accessible, animated content panel.

### Usage

#### Use for

- Building each expandable row inside an Accordion group
- Showing a header (title/asset/right content) that toggles panel visibility with chevron state
- Providing accessible expand/collapse behavior with `aria-expanded`, `aria-controls`, and labelled panel
  region

#### Don't use for

- Do not use AccordionItem outside an Accordion context, since open state and toggle come from
  `useAccordionContext`
- Do not omit meaningful title/asset labelling when relying on computed accessibility labels
- Do not bypass the built-in toggle/transition behavior for custom interaction patterns that break consistency

## BoxedAccordion

BoxedAccordion groups multiple BoxedAccordionItem components in a stacked expandable set; the visible box
treatment is applied by each item.

### Usage

#### Use for

- Grouping multiple accordion items as a single expandable/collapsible section
- Building groups where the only allowed children are BoxedAccordionItem elements
- Presenting related expandable content with clearer visual boundaries

#### Don't use for

- Do not use BoxedAccordion when content does not need expand/collapse behavior
- Do not mix unrelated content in the same boxed accordion group
- Do not use mixed asset types within the same accordion group when visual consistency is required
- Do not place children other than BoxedAccordionItem inside BoxedAccordion

## BoxedAccordionItem

BoxedAccordionItem is the interactive unit of a BoxedAccordion: it behaves like AccordionItem and applies the
visible boxed styling at item level.

### Usage

#### Use for

- Building each expandable row inside a BoxedAccordion group
- Showing a tappable header that toggles an accessible content panel with chevron state
- Keeping AccordionItem behavior while adding a stronger boxed visual grouping

#### Don't use for

- Do not use BoxedAccordionItem outside a BoxedAccordion/Accordion grouped context
- Do not omit meaningful item labeling when relying on computed accessibility labels
- Do not replace built-in toggle and transition behavior with inconsistent custom interaction patterns

## Accessibility

### Accordion group

By default, accordion headers are rendered as interactive button-like controls and the group has no list role.
When the accordion should be exposed as a grouped list in your context, set roles explicitly on the container
and items (for example `role="list"` on `Accordion` and `role="listitem"` on each item wrapper).

### Slot

Accordion content areas (`asset`, `right`, and panel `content`) accept custom content. Because these areas are
fully customizable, ensure custom controls, icons, and media preserve accessible names, focus order, and
semantics.

### Heading hierarchy

Accordion heading levels are configurable.

- By default, no document heading level is enforced
- Set `titleAs` (for example `h2`, `h3`) when the accordion title should participate in the page heading
  outline
- Keep levels consistent with surrounding content hierarchy
