Typologies: RowList, BoxedRowList, UnorderedList, OrderedList

Children:
- Row → RowList
- BoxedRow → BoxedRowList
- ListItem → UnorderedList, OrderedList

---

## RowList

RowList groups multiple Row items into a single accessible list with consistent spacing and separators.

### Use for

- Grouping related Row items into one structured section
- Presenting navigational or settings options with consistent vertical rhythm
- Preserving list semantics for assistive technologies while keeping a clean visual split between items
- Building modular page sections where rows can be added, removed, or updated over time

### Don't use for

- Do not combine unrelated row categories in a single list without section separation
- Do not use RowList for free-form content blocks that are not row-based interactions
- Do not remove visual consistency between items by introducing ad-hoc row spacing patterns
- Do not add manual dividers between rows by default, since `RowList` already includes separators

## Row

Row is a flexible list item pattern for navigation, selection, and status display with optional leading
  asset and trailing actions.

### Use for

- Building scannable list items with clear hierarchy (title, optional supporting text, optional right-side
  info)
- Creating tappable rows for navigation or inline actions with automatic chevron affordance
- Combining content with controls (switch, checkbox, radio, icon action) when a row needs quick state change
- Showing optional badges, detail text, and assets to communicate priority and context

### Don't use for

- Do not mix inconsistent asset styles within the same list group
- Do not overload a single row with too many secondary elements that reduce scanability
- Do not use row-level interaction and control interaction in a confusing way without clear tap targets
- Do not use this pattern for dense tabular data where table semantics fit better

## BoxedRowList

BoxedRowList stacks multiple BoxedRow items with consistent spacing to create separated, card-like list
  groups.

### Use for

- Grouping several BoxedRow items when each entry needs clear visual separation
- Building modular sections of prominent actions or settings in a card-based layout
- Keeping boxed row collections visually consistent across screens with a stable vertical rhythm

### Don't use for

- Do not use BoxedRowList for dense, utility-first lists where plain RowList is more appropriate
- Do not mix boxed and non-boxed rows in the same group without intentional visual hierarchy
- Do not turn boxed lists into generic layout wrappers unrelated to row interactions

## BoxedRow

BoxedRow applies the Row interaction model inside a boxed container for stronger visual separation and
  emphasis.

### Use for

- Presenting high-importance row items that need stronger boundaries than a plain list
- Grouping row content in card-like surfaces while keeping the same row anatomy and behavior
- Distinguishing specific sections (for example, highlighted settings or featured options) from standard lists

### Don't use for

- Do not use BoxedRow as a generic container when row semantics are not needed
- Do not mix too many visual variants in the same boxed group without clear hierarchy
- Do not use danger styling for non-destructive content

## UnorderedList

UnorderedList groups related items where sequence is not meaningful, preserving semantic list structure for
  accessibility and scanning.

### Use for

- Presenting related points, features, or requirements where item order does not imply priority or step flow
- Keeping content scannable with consistent list rhythm and semantic `ul` behavior
- Combining text and rich `ListItem` content while preserving list semantics for assistive technologies
- Structuring supporting information blocks that benefit from bullet-style grouping

### Don't use for

- Do not use UnorderedList when users must follow a strict sequence; use OrderedList instead
- Do not overload items with long paragraph-like content that reduces bullet scanability
- Do not mix unrelated content types in one list without a clear grouping rationale
- Do not use list styling for purely decorative alignment when no semantic grouping exists

## OrderedList

OrderedList presents items in an explicit sequence, helping users follow ordered steps, ranked priorities,
  or procedural flows.

### Use for

- Presenting step-by-step instructions where users should follow a defined order
- Displaying ranked or prioritized lists where numeric position carries meaning
- Structuring procedural guidance in onboarding, setup, or task-completion contexts
- Maintaining semantic `ol` behavior so assistive technologies announce sequence correctly

### Don't use for

- Do not use OrderedList when order is arbitrary or interchangeable; use UnorderedList instead
- Do not fake progression with numbered items when the flow is not truly sequential
- Do not split one logical sequence into multiple independent ordered lists without clear transitions
- Do not use ordered markers as decoration when users are not expected to process item order

## ListItem

ListItem is the content unit used inside ordered and unordered lists, supporting default markers, custom
  icons, or markerless variants.

### Use for

- Building individual entries inside `UnorderedList` and `OrderedList` with consistent spacing and readability
- Using default markers for standard list semantics when no custom visual cue is needed
- Using custom icons when each item benefits from an explicit visual meaning
- Removing markers only when surrounding context already communicates list grouping clearly

### Don't use for

- Do not use ListItem outside list containers when no list semantics are intended
- Do not mix marker, markerless, and icon styles arbitrarily within the same list without rationale
- Do not use decorative icons that compete with or obscure item meaning
- Do not remove markers in dense informational lists where scanability depends on strong item separation
