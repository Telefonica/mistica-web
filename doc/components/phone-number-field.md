---
name: PhoneNumberField
description:
  'PhoneNumberField captures phone numbers with robust as-you-type international formatting and optional E.164
  normalization.'
---

## Usage

### Use for

- Capturing phone numbers in products that require reliable international formatting behavior
- Guiding users with region-aware as-you-type formatting to reduce entry errors
- Normalizing values to E.164 when backend systems require canonical phone formats
- Supporting form validation and suggestion flows for contact and account verification journeys

### Don't use for

- Do not use PhoneNumberField when lightweight local formatting is enough; use PhoneNumberFieldLite instead
- Do not hide country/prefix expectations when users can enter numbers from multiple regions
- Do not rely only on visual formatting as validation for number correctness
- Do not use it for non-telephone identifiers that may include unrelated symbols or patterns
