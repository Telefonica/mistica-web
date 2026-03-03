Typologies (by size):
- CoverCard
- PosterCard (deprecated → CoverCard)
- DisplayMediaCard (deprecated → CoverCard size="display")

---

## CoverCard

CoverCard is a media-first card pattern that combines image or video backgrounds with layered content,
  actions, and optional footer content.

### Use for

- Highlighting featured content where visual media is the primary entry point
- Combining headline hierarchy, contextual metadata, and actions in a single promotional surface
- Supporting editorial, campaign, or discovery cards that need strong visual impact with clear call-to-action
- Using optional top actions and footer areas when secondary interactions or extra context are needed

### Don't use for

- Do not use CoverCard for dense informational layouts where media is not the main signal
- Do not overload the card with too many competing actions in top, body, and footer at once
- Do not rely on background imagery alone; ensure text and actions remain legible over media
- Do not use decorative media that conflicts with the card’s content hierarchy or action intent

## PosterCard

PosterCard is a legacy media-first card kept for backward compatibility; use CoverCard for new designs.

### Use for

- Maintaining existing legacy surfaces that still rely on PosterCard behavior
- Supporting transitional migrations where replacing all legacy poster cards is not yet feasible
- Preserving compatibility in older flows while aligning new work to CoverCard patterns
- Using it temporarily when refactoring deprecated props toward current card APIs

### Don't use for

- Do not use PosterCard for new product experiences; use CoverCard instead
- Do not introduce new dependencies on deprecated PosterCard-only prop patterns
- Do not mix legacy and modern card variants inconsistently within the same content family
- Do not postpone migration planning when CoverCard already satisfies the target use case

## DisplayMediaCard

DisplayMediaCard is the large-format media card variant for prominent visual modules; prefer equivalent
  sizing through modern media-card patterns in new designs.

### Use for

- Maintaining legacy large media-card compositions already present in existing product surfaces
- Highlighting high-priority editorial or promotional content with an expanded media footprint
- Preserving visual continuity in sections that depend on this specific display-style card rhythm
- Prefering current card-size and layout variants for new implementations

### Don't use for

- Do not introduce this legacy variant in new card systems when modern equivalents are available
- Do not use oversized media cards in dense, scan-first grids
- Do not combine multiple display-size card patterns without clear visual hierarchy
- Do not fill large card surfaces with minimal content that reduces design balance
