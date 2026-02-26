---
name: Table
description:
  'Use table for structured row-and-column data, with responsive behavior for mobile scrolling or collapsed
  row cards.'
---

## Usage

### Use for

- Displaying comparable structured data across multiple rows and columns
- Data sets that need clear column headers and optional row headers for better scanning and accessibility
- Tables that require per-row actions while keeping actions aligned and consistent
- Responsive scenarios where mobile users either scroll horizontally or see rows collapsed into card-like
  blocks
- Representing empty states directly inside the table container when no rows are available

### Don't use for

- Do not use for unstructured rich content layouts; use cards or list compositions instead
- Do not hide headers unless users can still understand each cell context (especially in responsive/collapsed
  views)
- Do not force dense tables on small screens without choosing an appropriate responsive mode
- Do not overload rows with too many actions; keep row actions focused and scannable
- Do not use table when each item requires unique layout or long-form content rather than comparison
