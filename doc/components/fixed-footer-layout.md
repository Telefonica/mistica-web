---
name: FixedFooterLayout
description:
  'FixedFooterLayout keeps footer content anchored to the bottom when space allows, while preserving readable
  scrollable content above it.'
---

## Usage

### Use for

- Keeping key actions persistently reachable at the bottom during long mobile-first flows
- Combining scrollable content with a stable footer action zone without covering focused elements
- Supporting responsive behavior where footer fixation adapts to available viewport height
- Maintaining visual continuity with contextual elevation and safe-area-aware spacing

### Don't use for

- Do not use fixed footers for short/simple screens where inline actions are clearer
- Do not overload the footer with too many controls; keep it focused on essential actions
- Do not assume the footer is always fixed on every viewport; layout should still work when it is not
- Do not ignore background and contrast transitions between content area and footer layer
