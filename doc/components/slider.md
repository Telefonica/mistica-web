# Slider

Use slider for selecting a value by dragging along a bounded range, with optional tooltip feedback while
interacting.

## Usage

### Use for

- Letting people choose a numeric value within a known min/max interval
- Fine-tuning values with defined increments (`step`) or snapping to a predefined set of allowed values
- Exposing immediate value feedback during drag, hover, or focus (for example with the optional tooltip)
- Inputs where direct manipulation is faster than typing, especially on touch devices

### Don't use for

- Do not use for read-only values; show static text or another non-interactive pattern instead
- Do not use when users must enter an exact value that is easier to type directly
- Do not use for binary on/off decisions; use a control designed for toggles or single-choice selection
- Do not rely only on tooltip value feedback; keep a clear label and accessible naming for the control

## Accessibility

### Accessibility label

Provide an accessible name for the slider whenever possible (`aria-label` or `aria-labelledby`).

- If no accessible name is provided, the control may be announced generically as "slider"
- Keep label wording task-oriented (what the value controls), not only unit-oriented

### Value feedback

Treat tooltip value display as supportive only.

- Do not rely on tooltip visibility as the only way to understand current value
- For wide ranges (for example, 0 to 100), pair the slider with an `IntegerField` so users can either drag or
  type an exact value

### Keyboard interaction

Use predictable bounds and increments (`min`, `max`, `step`).

- Keep keyboard and assistive technology interactions understandable and consistent
