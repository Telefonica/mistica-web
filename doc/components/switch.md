# Switch

Use switch for immediate on/off settings, ensuring each control has a clear visible or accessible label.

## Usage

### Use for

- Binary preferences or settings that can be turned on and off independently
- Cases where the state change is immediate and does not require a separate confirmation action
- Interfaces with short, explicit labels (or accessible labels) so users understand the effect of each toggle

### Don't use for

- Do not use for choosing one option among many; use radio/select patterns for single-choice selection
- Do not use for irreversible, high-impact actions that require explicit confirmation
- Do not leave switches unlabeled or ambiguously labeled; provide clear visible text or
  `aria-label`/`aria-labelledby`
- Do not use as a read-only status indicator; use non-interactive status text or badges instead
- Do not compose a standalone switch inside row layouts that already support switches; use `Row` or `BoxedRow`
  with built-in switch support instead

## Accessibility

### Accessibility label

Always give each switch a clear, descriptive label that explains the effect of turning it on or off.

- If visible text is missing or ambiguous, use an existing nearby UI label via `aria-labelledby`, or provide
  a hidden label with `aria-label`
- Keep labels unique when multiple switches appear together
- For custom-rendered switch content, ensure the visible text remains programmatically associated with the
  switch

### Disabled state

Use disabled state only when the setting is truly unavailable.

- Provide nearby explanation when the reason is not obvious
