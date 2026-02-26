---
name: Badge
description:
  'Badge is a compact, decorative indicator used to signal unread or pending status on top of another UI
  element.'
---

## Usage

### Use for

- Signaling small counts or attention states attached to icons, buttons, or entry points
- Highlighting notification-like updates without interrupting the main content flow
- Showing either a dot (status only) or a numeric count when exact quantity matters
- Communicating overflow counts compactly (values above nine are displayed as `+9`)

### Don't use for

- Do not use it as a standalone content element; it should decorate another component
- Do not rely on it as the only accessible message, since the badge itself is decorative for screen readers
- Do not show a badge for zero state (no pending content)
- Do not use large numbers or long text inside the badge
