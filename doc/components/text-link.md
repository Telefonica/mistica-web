# TextLink

Use text link (or hyperlink) to create inline linkable text.

## Usage

### Use for

- Inline navigation or lightweight contextual actions embedded in text content
- Short, descriptive link copy that clearly communicates destination or result
- Cases where link styling (always-underlined or underline-on-hover) helps preserve reading flow
- Links that should follow form state behavior (for example disabling while a form is sending)

### Don't use for

- Do not use as the primary call-to-action when a button pattern is more appropriate
- Do not rely on generic text like “click here”; link text should remain meaningful out of context
- Do not fake link semantics with custom roles when native link navigation is available
- Do not place dense clusters of text links where users may struggle to identify the main action

## Accessibility

### Accessibility label

Write link text that clearly describes destination or result when read out of context.

- Avoid generic copy such as "here" or "more"
- If visible copy is not sufficient in context, provide a more descriptive accessible name with `aria-label`
- When a link opens in a new tab/window, make sure that behavior is clearly communicated to users

### Disabled state

Avoid using disabled links in most cases.

- A disabled link often behaves like plain text and creates confusion about whether an action is available
- Prefer reframing the UI with regular text until navigation becomes available
- If link availability depends on form state, ensure users still understand why navigation is temporarily
  unavailable
