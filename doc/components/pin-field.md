---
name: PinField
description:
  'PinField captures short verification codes in segmented digit inputs, with optional masked display and SMS
  one-time-code autofill support.'
---

## Usage

### Use for

- Entering OTP, PIN, or verification codes where each digit should be clear and easy to scan
- Supporting fast code completion with paste/autocomplete behavior across segmented inputs
- Enabling SMS one-time-code autofill in flows where automatic code retrieval is expected
- Using masked code presentation for higher-sensitivity verification steps

### Don't use for

- Do not use PinField for long passwords or arbitrary free-text input
- Do not hide helper/error feedback when code requirements or failures need clarification
- Do not force SMS autofill in security contexts where code visibility must remain fully user-controlled
- Do not use segmented code input when the journey does not rely on fixed-length numeric verification
