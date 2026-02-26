---
name: PasswordField
description:
  'PasswordField captures sensitive credentials with masked input, accessible show/hide control, and form
  validation support.'
---

## Usage

### Use for

- Collecting account credentials and other sensitive secrets in authentication or security flows
- Allowing users to reveal/hide password text when they need to verify typed content
- Preserving editing continuity when toggling visibility so users can correct input confidently
- Integrating with form-level validation, helper text, and optional state handling

### Don't use for

- Do not use PasswordField for non-sensitive text inputs that should stay visible by default
- Do not remove clear visibility-toggle affordance in contexts where typing errors are common
- Do not expose sensitive values by default; visibility should remain user-controlled
- Do not hide password requirements or error guidance when users need them to succeed
