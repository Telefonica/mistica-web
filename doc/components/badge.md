# Badge

Badge is a compact, informative indicator used to signal unread or pending status on top of another UI
element.

## Usage

### Use for

- Signaling small counts or attention states attached to icons, icon buttons, or entry points
- Highlighting notification-like updates without interrupting the main content flow
- Showing either a dot (status only) or a numeric count when exact quantity matters
- Communicating overflow counts compactly (values above nine are displayed as `+9`)

### Don't use for

- Do not rely on it as the only accessible message, since the badge itself is decorative for screen readers
- Do not show a badge for zero state (no pending content)

## Accessibility

### Decorative behavior

Badge is decorative for assistive technologies. Its visual dot/number is not announced directly by screen
readers.

### Accessible label on the related control

When Badge wraps an interactive element (for example an icon button), include the unread/pending meaning in
the interactive element label (for example via `aria-label`).

- Example: `"Shopping cart with 2 items"`
- Do not expose only `"Shopping cart"` if the badge count is important for task completion
