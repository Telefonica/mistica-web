---
name: MasterDetailLayout
description:
  'MasterDetailLayout adapts list-detail experiences across breakpoints, switching from single-pane on smaller
  screens to split-pane on larger screens.'
---

## Usage

### Use for

- Building master-detail flows where users browse a collection and open one item for deeper context
- Preserving a focused single-pane experience on mobile/tablet while keeping side-by-side context on desktop
- Supporting transitions between list view and detail view without changing overall page architecture
- Handling responsive information density where desktop benefits from concurrent master and detail visibility

### Don't use for

- Do not use MasterDetailLayout when both panes must always be visible on all breakpoints
- Do not use it for unrelated side-by-side content that is not a true master-detail relationship
- Do not overload the master pane with complex controls that compete with detail comprehension
- Do not rely on this layout for multi-column dashboards requiring more than two coordinated regions
