---
name: IbanField
description:
  'IbanField captures IBAN account identifiers with automatic formatting, uppercase normalization, and
  built-in IBAN validity checks.'
---

## Usage

### Use for

- Capturing bank account identifiers specifically in IBAN format inside payment and account forms
- Reducing entry errors with automatic grouping and uppercase normalization while users type
- Providing immediate validation feedback when IBAN structure or checksum is invalid
- Integrating with form flows that require label, helper text, optional state, and validation messaging

### Don't use for

- Do not use IbanField for non-IBAN identifiers such as local account numbers without IBAN rules
- Do not replace it with a generic text field when IBAN-specific validation is required
- Do not hide or delay error guidance in critical payment steps where correction speed matters
- Do not overload the field with unrelated instructions; keep helper text focused on IBAN entry
