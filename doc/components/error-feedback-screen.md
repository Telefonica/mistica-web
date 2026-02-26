---
name: ErrorFeedbackScreen
description:
  'ErrorFeedbackScreen presents a dedicated full-screen error state with clear explanation and recovery
  actions when in-flow error handling is not enough.'
---

## Usage

### Use for

- Handling blocking failures where users cannot continue without explicit recovery guidance
- Showing clear error context with optional reference details for support or troubleshooting
- Providing focused next steps through one primary recovery action and optional secondary options
- Communicating critical failure states with strong visual signal and consistent layout hierarchy

### Don't use for

- Do not use full-screen error feedback for minor inline validation or non-blocking issues
- Do not overload the screen with technical detail that prevents fast user recovery
- Do not present multiple competing actions when one clear recovery path is available
- Do not hide contextual information users need to understand what failed and what to do next
