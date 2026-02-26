---
name: PosterCard
description:
  'PosterCard is a legacy media-first card kept for backward compatibility; use CoverCard for new designs.'
---

## Usage

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
