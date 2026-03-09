# Accordions

## Accordion

Accordion groups multiple AccordionItem components stacked vertically, helping present expandable content as a coherent set.

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

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| dataAttributes | `DataAttributes` | No | - |  |
| defaultIndex | `number \| readonly number[]` | No | - |  |
| index | `number \| readonly number[]` | No | - |  |
| onChange | `(index: number, value: boolean) => void` | No | - |  |
| role | `string` | No | - |  |
| singleOpen | `boolean` | No | - |  |

## AccordionItem

AccordionItem is the interactive unit inside an Accordion: it renders a tappable header that toggles an accessible, animated content panel.

### Usage

#### Use for

- Building each expandable row inside an Accordion group
- Showing a header (title/asset/right content) that toggles panel visibility with chevron state
- Providing accessible expand/collapse behavior with `aria-expanded`, `aria-controls`, and labelled panel region

#### Don't use for

- Do not use AccordionItem outside an Accordion context, since open state and toggle come from `useAccordionContext`
- Do not omit meaningful title/asset labelling when relying on computed accessibility labels
- Do not bypass the built-in toggle/transition behavior for custom interaction patterns that break consistency

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| content | `ReactNode` | Yes | - |  |
| title | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| asset | `ReactNode` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| detail | `string` | No | - |  |
| right | `ReactNode` | No | - |  |
| role | `string` | No | - |  |
| subtitle | `string` | No | - |  |
| titleAs | `string` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## BoxedAccordion

BoxedAccordion groups multiple BoxedAccordionItem components in a stacked expandable set; the visible box treatment is applied by each item.

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

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| dataAttributes | `DataAttributes` | No | - |  |
| defaultIndex | `number \| readonly number[]` | No | - |  |
| index | `number \| readonly number[]` | No | - |  |
| onChange | `(index: number, value: boolean) => void` | No | - |  |
| role | `string` | No | - |  |
| singleOpen | `boolean` | No | - |  |

## BoxedAccordionItem

BoxedAccordionItem is the interactive unit of a BoxedAccordion: it behaves like AccordionItem and applies the visible boxed styling at item level.

### Usage

#### Use for

- Building each expandable row inside a BoxedAccordion group
- Showing a tappable header that toggles an accessible content panel with chevron state
- Keeping AccordionItem behavior while adding a stronger boxed visual grouping

#### Don't use for

- Do not use BoxedAccordionItem outside a BoxedAccordion/Accordion grouped context
- Do not omit meaningful item labeling when relying on computed accessibility labels
- Do not replace built-in toggle and transition behavior with inconsistent custom interaction patterns

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| content | `ReactNode` | Yes | - |  |
| title | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| asset | `ReactNode` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| detail | `string` | No | - |  |
| isInverse | `boolean` | No | - | @deprecated Use `variant="brand"` instead. |
| right | `ReactNode` | No | - |  |
| role | `string` | No | - |  |
| subtitle | `string` | No | - |  |
| titleAs | `string` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand"` | No | - |  |
