---
category: Snackbar
---

# Snackbar

## Snackbar

Use snackbar for brief, non-blocking feedback about a recent action, with optional action and dismiss controls.

### Usage

#### Use for

- Confirming short-lived outcomes after user actions (for example success/failure of a lightweight operation)
- Offering one immediate follow-up action in context (button) without interrupting the current flow
- Showing transient notifications that auto-close, or persistent ones when explicit dismissal is required
- Communicating message severity through informative and critical snackbar types

#### Don't use for

- Do not use for blocking decisions, multi-step actions, or content that requires sustained attention; use
  modal/sheet patterns instead
- Do not place long text or multiple competing actions inside a snackbar
- Do not depend on stacked snackbars for important communication; consecutive messages replace the current one
- Do not use as the only place for critical permanent information; snackbars are temporary status feedback

## useSnackbar

useSnackbar provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope
