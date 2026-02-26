---
name: PhoneNumberFieldLite
description:
  'PhoneNumberFieldLite captures phone numbers with a lightweight formatter for a limited country set and
  common numbering patterns.'
---

## Usage

### Use for

- Capturing phone numbers in performance-sensitive flows where a simplified formatter is sufficient
- Supporting common phone patterns for the built-in country subset (for example ES, BR, DE, GB)
- Keeping phone entry lightweight while still offering structured formatting and optional E.164 output
- Handling products with constrained regional scope and predictable numbering conventions

### Don't use for

- Do not use PhoneNumberFieldLite for broad international support with complex numbering rules; use
  PhoneNumberField instead
- Do not assume all national formats are covered; Lite intentionally handles a subset of cases
- Do not use it when strict telecom-grade formatting fidelity is required across many countries
- Do not hide regional limitations from product requirements and validation strategy
