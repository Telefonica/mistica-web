---
name: MonthField
description:
  'MonthField captures month-and-year values with calendar affordance, range validation, and adaptive
  native/fallback picker behavior.'
---

## Usage

### Use for

- Collecting month/year inputs such as billing cycle, subscription period, or contract start month
- Restricting selection to allowed date ranges when business rules define valid periods
- Providing consistent month selection experience across devices with native picker when available
- Supporting form flows where users need clear validation feedback for out-of-range values

### Don't use for

- Do not use MonthField when day-level precision is required; use a date field instead
- Do not use it for free-form date text entry patterns that expect arbitrary formats
- Do not hide min/max constraints from users when only specific months are valid
- Do not use month selection for non-temporal categorical choices
