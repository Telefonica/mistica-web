---
name: TextFieldBase
description:
  'Foundation primitive used to build Mística text-input fields, including labeling, helper/error feedback,
  and shared interaction states.'
---

## Usage

### Use for

- Creating or extending custom Mística field components on top of the shared text-input foundation
- Collecting typed user input with a persistent label, placeholder support, and helper/error text
- Fields that benefit from additional affordances such as prefix text, start/end icons, or optional copy
  protection
- Multiline inputs where users need character-count feedback against a maximum length
- Guided entry scenarios with controlled suggestions/autocomplete behavior
- Building consistent form fields that adapt to focus, filled, disabled, error, and read-only states

### Don't use for

- Do not use as a passive display container for non-editable content
- Do not choose this base primitive first when a specialized Mística field already covers the use case
- Do not rely on placeholder text as the only field label; keep labels explicit and persistent
- Do not hide validation/help context users need to recover from errors
- Do not add suggestions in uncontrolled mode; suggestion-driven fields must keep input state controlled
- Do not overload a single field with too many visual affordances if they reduce readability or input clarity
