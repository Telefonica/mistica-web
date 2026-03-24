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
