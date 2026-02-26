---
name: NavigationBar
description:
  'NavigationBar is the standard top app bar for page-level navigation, supporting back navigation, title, and
  contextual right-side actions.'
---

## Usage

### Use for

- Structuring screen-level navigation with clear title context and optional back behavior
- Hosting a small set of high-priority contextual actions in the right area
- Keeping page chrome stable across flows where users move between hierarchical views
- Building standard app-level headers when global section menus are not required

### Don't use for

- Do not use NavigationBar as a global multi-section site menu; use MainNavigationBar instead
- Do not overcrowd the right slot with many competing actions
- Do not hide essential navigation intent behind ambiguous icon-only controls
- Do not use it as a funnel-specific confirmation header when funnel behavior is needed
