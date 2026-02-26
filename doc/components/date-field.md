---
name: DateField
description:
  'DateField captures calendar dates with platform-appropriate picker behavior and optional range constraints.'
---

## Usage

### Use for

- Collecting single date values in forms where calendar precision is required
- Guiding users with familiar native date-picking experiences when supported by the platform
- Enforcing valid date windows (minimum and maximum) for business rules such as booking or eligibility
- Keeping date entry consistent across browsers through fallback picker behavior when native support differs

### Don't use for

- Do not use DateField for date-time capture when time selection is also required
- Do not allow out-of-range dates without clear user feedback
- Do not replace date pickers with free-text formats that increase entry errors
- Do not use this field for non-date identifiers that only look numeric
