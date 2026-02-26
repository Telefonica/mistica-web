---
name: DateTimeField
description:
  'DateTimeField captures a combined date and time value with platform-appropriate picker behavior and range
  validation.'
---

## Usage

### Use for

- Scheduling scenarios where users must provide both calendar date and exact time in one step
- Enforcing valid datetime windows for booking, delivery, reservation, or eligibility constraints
- Providing native date-time selection when available while preserving cross-browser consistency through
  fallback picker support
- Keeping temporal input unified to reduce context switching between separate date and time fields

### Don't use for

- Do not use DateTimeField when only a date or only a time is required
- Do not allow out-of-range datetime values without explicit error feedback
- Do not split tightly coupled date/time decisions across distant form areas
- Do not replace picker interactions with ambiguous free-text datetime entry
