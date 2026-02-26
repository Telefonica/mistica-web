---
name: DecimalField
description:
  'DecimalField captures numeric values with fractional precision, adapting decimal separator behavior to the
  user locale.'
---

## Usage

### Use for

- Entering amounts, measurements, or rates that require decimal precision
- Supporting international users with locale-appropriate decimal separator input behavior
- Limiting fractional precision when business rules require fixed decimal scale
- Reducing formatting errors by allowing only numeric and decimal-separator characters

### Don't use for

- Do not use DecimalField for integer-only values when no fractional part is allowed
- Do not allow unlimited decimals in flows that require strict precision consistency
- Do not use this field for identifiers (for example card numbers or IDs) that are not numeric quantities
- Do not hide expected number format when locale differences can create ambiguity
