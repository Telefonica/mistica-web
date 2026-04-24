# Callout

A snippet of information that draws attention to important content. Always includes a description.

## Usage

### Use for

- Informative type: Drawing attention to useful information, tips, or non-urgent recommendations
- Warning type: Alerting users about situations that require attention but are not blocking
- Critical type: Notifying users about critical information or important consequences they should be aware of

### Don't use for

- Never use as a substitute for form or system error messages
- Never use as a substitute for feedback after a user action

## Accessibility

### Role

Callout is rendered as a `section` element and allows overriding semantics through the `role` prop when
needed.

### Content announcement options

Depending on urgency, you can configure callout announcement behavior by choosing an appropriate role.

- Use polite-style semantics for informative, non-urgent content
- Use assertive-style semantics only for urgent content that should interrupt current speech output
- Choose role values intentionally so announcements match the real importance of the message

### Title accessibility label

The title supports an accessibility label via `title={{text, 'aria-label'}}`, allowing screen readers to
announce contextual text that differs from the visible title when necessary.

### Dismiss action label

You can pass `closeButtonLabel` to provide a more contextual accessible name for the dismiss action. By
default, the close action label is "Close" (localized by theme texts when available).

### Heading hierarchy

Callout heading levels are configurable.

- Title defaults to `h2` (`titleAs="h2"`)
- Adjust heading level to keep a consistent outline in the surrounding page structure
