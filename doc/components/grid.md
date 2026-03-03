Children:
- GridItem → Grid

---

## Grid

Grid is a responsive layout primitive for arranging content in rows and columns with controlled spacing and
  alignment.

### Use for

- Building multi-column layouts where content needs consistent structural rhythm
- Defining responsive track patterns with fixed counts or auto-fill behavior
- Controlling horizontal and vertical spacing independently across breakpoints
- Aligning groups of elements within a shared grid context for dashboards, cards, and content blocks

### Don't use for

- Do not use Grid when simpler stack/inline patterns solve the layout more clearly
- Do not force complex track definitions that reduce readability and maintainability
- Do not rely on fixed dimensions that break content adaptability at smaller sizes
- Do not use layout-only structure as a substitute for semantic grouping and headings

## GridItem

GridItem defines how each element occupies and aligns within a Grid, including span, start position, and
  ordering.

### Use for

- Positioning individual blocks precisely inside a Grid layout
- Spanning items across multiple rows or columns when visual hierarchy requires larger footprints
- Controlling per-item alignment and order for responsive composition refinements
- Creating balanced layouts where featured elements coexist with standard-sized content

### Don't use for

- Do not overuse manual start/span overrides when natural grid flow already works
- Do not create fragmented layouts with excessive custom placement rules
- Do not use item reordering in ways that hurt reading flow or accessibility expectations
- Do not treat GridItem positioning as a replacement for meaningful content hierarchy
