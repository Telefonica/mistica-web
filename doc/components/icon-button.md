---
name: IconButton
description:
  'IconButton exposes a compact icon-only action with accessible labeling, visual variants, and optional
  loading feedback for async interactions.'
---

## Usage

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
