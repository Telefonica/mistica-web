# Chip

Chip is a compact interactive label element used for navigation, selection state, or removable contextual
metadata. Use Tag instead when the content is non-interactive status/category information.

## Usage

### Use for

- Offering compact navigation entry points in horizontal groups or dense UI areas
- Showing selectable/toggled state in lightweight filter or option sets
- Displaying removable tags with a close action when users need to dismiss applied context
- Adding optional iconography or badge counters to improve discoverability and status signaling

### Don't use for

- Do not use chips as the primary call-to-action for critical task completion
- Do not overload chips with long labels; keep text short and scannable
- Do not use Chip for passive status/category labels with no interaction; use Tag in those cases
- Do not mix too many chip behaviors (navigation, toggle, close) in one group without clear intent
- Do not rely on badge or icon alone to convey meaning; label text should stay self-explanatory

## Accessibility

### Accessibility label

The accessible name of each chip should match its visible text label and remain descriptive in context.

- Use clear, specific chip text labels (avoid ambiguous labels like `More` without context)
- When repeated labels are unavoidable, add contextual accessible naming in the interactive wrapper
- Keep label meaning consistent between visible text and screen reader output

### Chip with close button

Dismissible chips expose a dedicated close action as a button, announced by assistive technologies with a
localized close/remove label by default.

- Use `closeButtonLabel` when the default close wording is not specific enough for the context
- Prefer contextual labels such as `Remove filter: Sports` instead of generic `Close`
- Ensure visual removal is paired with clear announced intent through the dismiss button label

### Active chip

When chips represent active filters or selected state, do not rely only on color to communicate state.

- Prefer adding a leading icon to reinforce active state
- Keep active-state meaning understandable in both visual and non-visual usage contexts
