---
name: IntegerField
description:
  'IntegerField captures whole-number input with digit-only sanitization and numeric keypad support on mobile
  devices.'
---

## Usage

### Use for

- Collecting whole-number values such as quantities, counts, ages, or integer limits
- Reducing input errors by automatically filtering non-numeric characters during typing
- Supporting form flows where mobile numeric keyboard entry improves speed and accuracy
- Pairing integer entry with helper text and validation feedback for allowed ranges or business rules

### Don't use for

- Do not use IntegerField for decimal, currency, or formatted values that require separators
- Do not use it for identifiers that may include letters or symbols
- Do not rely on digit filtering alone when domain constraints also require min/max or rule-based validation
- Do not hide range expectations; users should understand valid numeric boundaries before submission
