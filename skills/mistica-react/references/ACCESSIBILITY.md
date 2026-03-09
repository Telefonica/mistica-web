# Accessibility

These rules are mandatory for all UI built with the Mistica design system.

Agents must **never guess** when a rule cannot be satisfied — report the issue instead.

## 1. Using existing components

- When using Mistica components (Button, TextField, Alert, etc.), evaluate the **context**:
  - Use the available a11y props if needed (`aria-label`, `aria-describedby`, `disabled`, etc.)
  - Respect focus, contrast, and motion defaults provided by the component
  - Do not modify or remove built-in accessibility behavior

- Examples:

  ```tsx
  <ButtonPrimary aria-label="Submit form" />
  <TextField label="Email" required />
  ```

## 2. Creating extended components

When creating new or extended components:

Reuse existing prop names for accessibility where applicable
All extended components must comply with **WCAG 2.0** standards: [WCAG 2.0 Guidelines](https://www.w3.org/TR/WCAG20/)

### Color and contrast

- Minimum contrast: 4.5:1 (body text), 3:1 (large text ≥18px regular / 14px bold)
- Use semantic color tokens from skinVars.colors
- When creating new tokens, ensure contrast

### Focus

Component must be keyboard focusable
Rely on native focus indicator when possible, don't modify focus styles

### Labels

All interactive elements must have an accessible name
Icon-only elements require aria-label or equivalent

### Disabled / Loading states

When disabled decide either if the element should be focusable or not and use aria-disabled
Loading states must be announced to screen readers

### Motion

Respect prefers-reduced-motion
Do not rely on motion to convey meaning

### Errors and feedback

Errors must have text description
Do not rely on color alone
Associate error messages programmatically (e.g., aria-describedby)
