---
name: EmailField
description:
  'EmailField captures email addresses with email-optimized input behavior and built-in format validation.'
---

## Usage

### Use for

- Collecting user email addresses in signup, login recovery, and contact flows
- Providing email-specific keyboard/input mode support to reduce entry friction
- Validating basic address structure early to prevent malformed submissions
- Keeping identity/contact inputs consistent across forms with clear error feedback

### Don't use for

- Do not use EmailField for usernames or identifiers that are not email addresses
- Do not accept invalid email formatting without visible guidance to correct it
- Do not hide required context (for example, why email is needed) in sensitive flows
- Do not rely only on placeholder text; provide a clear, persistent field label
