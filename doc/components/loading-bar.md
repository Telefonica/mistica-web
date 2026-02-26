---
name: LoadingBar
description:
  'LoadingBar shows a global, indeterminate progress indicator for ongoing background activity while the
  current screen remains usable.'
---

## Usage

### Use for

- Signaling background loading states that affect the page globally but do not require full blocking overlays
- Giving immediate feedback after navigation or async actions when completion time is unknown
- Keeping users informed that work is in progress while allowing them to retain context on screen
- Using a lightweight global loading affordance when skeletons or inline loaders are not appropriate

### Don't use for

- Do not use LoadingBar as a determinate progress meter for tasks with known completion percentages
- Do not keep the bar visible longer than the real loading state, as this reduces trust in feedback
- Do not replace localized loading indicators when only a specific section is loading
- Do not stack multiple simultaneous global loading bars; aggregate loading signals into one state
