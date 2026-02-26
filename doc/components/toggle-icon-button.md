---
name: ToggleIconButton
description:
  'ToggleIconButton switches between checked and unchecked icon states using the same compact visual language
  as IconButton.'
---

## Usage

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
