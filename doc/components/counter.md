# Counter

A counter is a component used to increase or decrease a numeric value.

## Usage

### Use for

- Letting users adjust quantities in clear step-by-step increments
- Managing bounded numeric values where minimum and maximum limits matter
- Replacing a free numeric input when quick tap-based increase/decrease is preferable
- Supporting basket-like flows where reaching minimum can map to a remove action

### Don't use for

- Do not use for large-range or high-precision numeric editing that needs direct text input
- Do not hide the meaning of the value; provide nearby context for what is being counted
- Do not allow counter use when quantity changes should be blocked by business constraints
- Do not use remove-at-min behavior unless deletion is a clear and expected outcome

## Accessibility

### Accessibility label

Counter supports dedicated accessibility labels for each action and for the value announcement.

- `increaseLabel` for the add button
- `decreaseLabel` for the decrease button
- `removeLabel` for the remove action (when min value maps to delete)
- `valueLabel` for the live-announced quantity context

Use clear, contextual wording so users understand both the action and its effect on quantity.

### Value announcement

The counter value is announced through a live region (`aria-live="polite"`). Include meaningful `valueLabel`
context (for example, `items in cart`) so announcements remain explicit when the number changes.
