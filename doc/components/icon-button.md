Typologies (by behavior): IconButton, ToggleIconButton

---

## IconButton

IconButton exposes a compact icon-only action with accessible labeling, visual variants, and optional
  loading feedback for async interactions.

### Use for

- Triggering frequent, low-text actions where space is constrained and icon meaning is familiar
- Supporting toolbars and dense layouts where compact touch targets are needed
- Providing immediate async feedback with spinner state during long-running button actions
- Applying visual emphasis (`neutral`, `brand`, `danger`) that matches action intent

### Don't use for

- Do not use ambiguous or uncommon icons for destructive or high-risk actions
- Do not omit accessible naming (`aria-label` or `aria-labelledby`) for icon-only controls
- Do not place too many icon buttons together without clear hierarchy and grouping
- Do not use IconButton when visible text is needed to remove action ambiguity

## ToggleIconButton

ToggleIconButton switches between checked and unchecked icon states using the same compact visual language
  as IconButton.

### Use for

- Toggling a binary preference or status where both states can be represented with clear icons
- Keeping compact two-state actions consistent with IconButton sizing and visual variants
- Showing distinct accessible labels and assets for checked and unchecked states
- Supporting asynchronous state changes where visual feedback should remain stable until completion

### Don't use for

- Do not use ToggleIconButton for multi-step or multi-option choices beyond two states
- Do not use the same icon/label for checked and unchecked states when meaning changes
- Do not omit accessible naming for each state; state intent must be understandable to assistive tech
- Do not use toggle interactions when the action is not reversible or does not represent a true on/off state
