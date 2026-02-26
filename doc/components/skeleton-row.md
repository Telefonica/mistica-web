---
name: SkeletonRow
description: 'Skeleton row can be used to represent components like lists (also in its boxed variant).'
---

## Usage

### Use for

- Representing list-row loading states that combine avatar/media and one-line text content
- Preserving row-level structure in feeds, option lists, or summary rows while loading
- Providing realistic row placeholders for patterns that mirror list-item anatomy
- Maintaining perceived progress in list-heavy screens where content arrives incrementally

### Don't use for

- Do not use SkeletonRow for complex card layouts with multiple text blocks and actions
- Do not use row skeletons when final UI is not row-based
- Do not keep row placeholders visible after row data is rendered
- Do not stack excessive row skeletons when a smaller preview set can communicate loading state
