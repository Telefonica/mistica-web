---
name: TextField
description:
  'Use text field as the default Mística input for free-text entry, with built-in form integration, validation
  support, and optional suggestions.'
---

## Usage

### Use for

- Most user-facing single-line text inputs in forms
- Multiline free-text entry when users need to write longer content
- Form flows that need consistent label, helper/error messaging, validation, and optional/required behavior
- Inputs that benefit from controlled suggestions/autocomplete guidance
- Scenarios where you want a ready-to-use field component instead of building directly on `TextFieldBase`

### Don't use for

- Do not use for read-only display data
- Do not rely on placeholder text as the only label
- Do not hide helper/error context users need to complete a form correctly
- Do not choose this component when a more specific field type (for example email, password, phone, or
  numeric) better matches the input constraints
- Do not use uncontrolled patterns for suggestion-driven inputs
