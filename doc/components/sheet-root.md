---
name: SheetRoot
description:
  'SheetRoot is the global host that mounts and resolves sheet experiences triggered through showSheet.'
---

## Usage

### Use for

- Providing a single top-level integration point for imperative sheet orchestration
- Enabling lazy-loaded sheet rendering and promise-based result handling from anywhere in the app
- Supporting optional native sheet delegation in hybrid environments with web fallback behavior
- Keeping sheet lifecycle and focus-return behavior centralized and predictable

### Don't use for

- Do not mount multiple independent SheetRoot instances for the same experience
- Do not trigger sheets before SheetRoot is mounted in the application tree
- Do not treat SheetRoot as presentational UI; it is an orchestration host
- Do not bypass root-level sheet orchestration with ad-hoc parallel modal systems
