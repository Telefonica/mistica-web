---
name: showSheet
description:
  'showSheet opens a typed sheet flow imperatively and returns a promise with user outcome or dismissal
  result.'
---

## Usage

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
