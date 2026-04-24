# Tooltip

Tooltip shows short, contextual helper text near a target on hover, focus, or touch, then dismisses when
interaction ends.

## Usage

### Use for

- Providing brief, supplementary clarification for controls, icons, or labels
- Surfacing contextual hints that improve understanding without interrupting task flow
- Supporting non-critical helper content discoverable on hover/focus/tap interactions
- Keeping messages concise so users can parse them quickly in transient surfaces

### Don't use for

- Do not place critical instructions or mandatory requirements only in a tooltip
- Do not use Tooltip for long-form, structured, or interactive content; use Popover instead
- Do not rely on tooltip-only content for accessibility-critical task completion
- Do not attach tooltips to every element when context is already clear without extra help

## Accessibility

### Accessibility label

Do not treat tooltip content as guaranteed screen-reader content.

- Include essential helper text in the interactive element's accessible name/description
- If tooltip text is important for understanding an action, incorporate that meaning into the trigger's
  `aria-label` (or equivalent accessible labeling strategy)

### Trigger requirements

Avoid attaching tooltips to non-interactive elements.

- Use interactive targets so keyboard and assistive technology users can discover the same help
- Ensure the trigger control is still understandable without tooltip visibility (especially on touch devices)

### Content scope

Keep tooltip copy brief and supplementary, not required for completing the task.

- Do not place critical instructions or mandatory requirements only in a tooltip
- For mandatory guidance, place instructions persistently in visible content rather than only in transient
  tooltip surfaces
