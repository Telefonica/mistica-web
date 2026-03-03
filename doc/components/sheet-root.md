## SheetRoot

SheetRoot is the global host that mounts and resolves sheet experiences triggered through showSheet.

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

## showSheet

showSheet opens a typed sheet flow imperatively and returns a promise with user outcome or dismissal
  result.

### Use for

- Triggering contextual sheet interactions from events where declarative placement is not practical
- Handling sheet outcomes through explicit result actions (for example submit, dismiss, primary, secondary)
- Coordinating selection and action sheets with a single async control flow
- Integrating native sheet implementations with graceful web fallback when needed

### Don't use for

- Do not call showSheet when another sheet is already open
- Do not ignore returned outcomes; resolution should drive explicit follow-up behavior
- Do not rely on showSheet without mounting SheetRoot first
- Do not use imperative sheet launching for static always-visible UI content
