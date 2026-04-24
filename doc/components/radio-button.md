# Radio Button

## RadioButton

RadioButton represents a single mutually exclusive option within a RadioGroup, enabling clear one-choice
selection.

### Usage

#### Use for

- Offering one explicit choice among a small set of alternatives visible at once
- Making option comparison easy when users should see all available choices before selecting
- Supporting single-choice interactions with direct click/tap and keyboard selection behavior
- Pairing each option with concise labels so the selected state is immediately understandable

#### Don't use for

- Do not use standalone RadioButton without RadioGroup context
- Do not use radios for independent multi-select scenarios; use checkboxes instead
- Do not present too many options in one radio set when scanability degrades
- Do not use ambiguous labels that make mutually exclusive choices unclear
- Do not compose standalone radio controls inside row layouts that already support radio selection; use `Row`
  or `BoxedRow` within a `RadioGroup` instead

## RadioGroup

RadioGroup manages a set of mutually exclusive options, including selection state and keyboard navigation
across radio items.

### Usage

#### Use for

- Grouping related RadioButton options into one coherent single-selection decision
- Ensuring accessible selection patterns with radiogroup semantics and arrow-key navigation
- Structuring form decisions where exactly one option should be chosen at a time
- Managing default and controlled selection states in predictable one-choice workflows

#### Don't use for

- Do not use RadioGroup when users can select multiple options independently
- Do not split one logical decision across multiple disconnected radio groups
- Do not hide the group context or question prompt users need to make an informed selection
- Do not use RadioGroup for long, dynamic option catalogs better served by other selector patterns

## Accessibility

### Accessibility label

Always give each `RadioGroup` a clear accessible name with `aria-label` or `aria-labelledby`.

- Keep option labels unique and specific to avoid ambiguity when moving through radios with a screen reader
- For custom-rendered radios (`render` prop), ensure visible label text is programmatically associated with
  the radio using `labelId`

### Disabled state

Use `disabled` only when selection is truly unavailable.

- Provide nearby explanation when the reason is not obvious from context

### Controlled state

In controlled mode, keep `value` and `onChange` synchronized.

- Selection state announced to assistive technologies must always match what is visually selected
