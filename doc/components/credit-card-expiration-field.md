---
name: CreditCardExpirationField
description:
  'CreditCardExpirationField captures card expiry in a guided `MM/YY` format with built-in validity checks.'
---

## Usage

### Use for

- Capturing payment card expiration dates in a standardized and familiar format
- Reducing input friction with automatic formatting and month normalization as users type
- Validating expiry in context (month/year completeness and non-expired dates)
- Supporting checkout flows where valid expiry should move users smoothly to the next step

### Don't use for

- Do not use this field for generic date entry outside credit-card expiration use cases
- Do not request full-date patterns (day/month/year) when only month and year are needed
- Do not hide expiration errors; users should clearly understand when a card date is invalid or expired
- Do not break the expected `MM/YY` interaction pattern with custom masking behavior
