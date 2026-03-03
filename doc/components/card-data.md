Typologies (by size):
- DataCard
- SnapCard (deprecated → DataCard size="snap")
- DisplayDataCard (deprecated → DataCard size="display")

---

## DataCard

DataCard presents structured informational content with optional media, hierarchy, actions, and supporting
  slots in a reusable card surface.

### Use for

- Displaying data-rich summaries that combine title hierarchy, supporting text, and contextual metadata
- Grouping informative content with optional actions (primary, secondary, link) in a single card container
- Building modular content blocks for dashboards, listings, and discovery experiences
- Using optional slots, top actions, and footer areas when extra context or secondary interactions are needed

### Don't use for

- Do not overload the card with too many simultaneous actions and slots
- Do not use this pattern when a simpler list row or text block better fits the information density
- Do not let decorative assets dominate over the data hierarchy and actionable intent
- Do not create inconsistent card variants in the same collection without clear hierarchy

## SnapCard

Deprecated alias of `DataCard` in snap size for compact, actionable data cards.

### Use for

- Keeping legacy implementations stable while migrating to `DataCard size=\"snap\"`
- Compact content cards with clear hierarchy (pretitle/title/subtitle/description) and optional primary action
- Small promotional or informative entry points that open a richer detail view

### Don't use for

- Do not use in new work; use `DataCard size=\"snap\"` instead
- Do not use when content requires extended reading or many controls; move to a larger card size or another
  layout
- Do not add optional elements just because they are available; keep snap cards concise and scannable

## DisplayDataCard

DisplayDataCard is the display-sized data card pattern for high-prominence information blocks; prefer the
  equivalent DataCard size variant in new designs.

### Use for

- Presenting high-visibility data cards that need a larger visual footprint than default card sizes
- Highlighting key informational modules in editorial or promotional layouts
- Maintaining continuity in legacy screens that already use this display-card pattern
- Prefering the display size option in `DataCard` for new implementations

### Don't use for

- Do not introduce this legacy variant in new component compositions when the modern `DataCard` size option is
  available
- Do not use display-sized cards in dense grids where compact scanning is the priority
- Do not fill large cards with minimal content that weakens visual balance and hierarchy
- Do not mix multiple card sizing paradigms in one section without intentional layout rationale
