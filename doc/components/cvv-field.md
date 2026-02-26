---
name: CvvField
description:
  'CvvField captures the card security code with numeric input, card-aware guidance, and strict length
  validation.'
---

## Usage

### Use for

- Collecting card security codes in payment forms where CVV is required
- Helping users locate the CVV with contextual visual guidance (info popover)
- Enforcing the expected security-code length for the selected card context
- Supporting smooth checkout progression when a valid CVV is completed

### Don't use for

- Do not use this field for generic PIN or password entry outside card-payment flows
- Do not hide CVV help when card-location confusion is likely for users
- Do not accept incomplete or mismatched code lengths without clear feedback
- Do not auto-advance to the next step unless CVV length and validation are satisfied
