# Popover

Popover presents richer contextual content in a dismissible anchored surface, suitable for guidance that needs
more space than a tooltip.

## Usage

### Use for

- Showing contextual explanations that need title, description, media, or extra content blocks
- Presenting supplementary information that should remain visible until the user dismisses it
- Anchoring richer helper content to a specific target without navigating away from current context
- Offering non-primary actions or extended guidance where tooltip brevity is insufficient

### Don't use for

- Do not use Popover for very short hints where Tooltip is more lightweight and appropriate
- Do not overload popovers with complex workflows that should be full dialogs or pages
- Do not hide mandatory, high-risk decisions inside contextual popovers without clearer flow ownership
- Do not allow content growth that compromises readability or positioning near the target

## Accessibility

### Accessibility label

Use a clearly labeled trigger so users understand what additional content will open.

- If the trigger is icon-only, provide an explicit accessible label (for example, "Open delivery details")
- Ensure all interactive elements inside the popover have descriptive accessible names
- When the same screen can open multiple overlays, set `closeButtonLabel` with contextual wording

### Focus and navigation

Preserve a logical focus flow.

- Users should be able to open the popover, read or interact with content, close it, and continue from a
  predictable place
- If you control visibility with `open`, always wire `onClose` to the same state update so dismiss actions
  and external close events keep UI and accessibility state in sync

### Content scope

Keep popover content concise and scannable, with a clear title and supporting description when needed.

- Do not place critical confirmations or blocking decisions in popovers; use dialogs instead
