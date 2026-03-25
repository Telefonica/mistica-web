# Checkbox

Checkbox lets users select one, several, or no options, with each option operating independently.

## Usage

### Use for

- Allowing multiple selections in a set where choices are not mutually exclusive
- Capturing binary opt-in/opt-out preferences for a single option
- Presenting independent options that users can toggle in any order
- Supporting clear keyboard and touch interaction for inclusive form completion

### Don't use for

- Do not use checkboxes when only one option can be selected (use radio pattern instead)
- Do not group unrelated options under the same checkbox set without clear context
- Do not rely on visual check state alone; always provide clear labels or accessible naming
- Do not use checkbox interactions for read-only status indicators
- Do not compose a standalone checkbox inside row layouts that already support checkboxes; use `Row` or
  `BoxedRow` with built-in checkbox support instead

## Accessibility

### Accessibility label

Each checkbox needs a clear accessible name.

- Prefer a visible text label (`children`) when possible
- Use `aria-label` or `aria-labelledby` when no visible label is available
- Avoid generic labels such as "Option" without contextual meaning

### Role

Checkbox defaults to `role="checkbox"` and exposes checked state through `aria-checked`.

- Use `role="menuitemcheckbox"` only when the checkbox is part of a menu pattern
- Keep role semantics aligned with the surrounding UI context

### Keyboard interaction

Checkbox supports keyboard toggling with `Space` when enabled.

- Ensure disabled checkboxes are not focusable/actionable
- Do not block or override standard keyboard behavior in custom wrappers

### Group context

When several checkboxes represent one decision set, provide clear group context (for example, heading or
fieldset/legend) so relationships are understandable to assistive technologies.
