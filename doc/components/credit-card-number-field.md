---
name: CreditCardNumberField
description:
  'CreditCardNumberField captures payment card numbers with guided spacing, card-type recognition, and
  validity-aware progression.'
---

## Usage

### Use for

- Entering payment card numbers in checkout and billing flows with reduced input friction
- Helping users scan and verify long numbers through automatic 4-digit grouping
- Providing immediate brand cues (Visa, Mastercard, Amex) to increase confidence while typing
- Enforcing accepted-card and validity constraints before moving users to the next field

### Don't use for

- Do not use it for generic numeric identifiers outside card-payment contexts
- Do not remove card validation feedback when accepted brands are restricted
- Do not break familiar card-number grouping patterns with custom formatting
- Do not auto-advance to the next step unless card length and validation are complete
