---
name: InfoRating
description:
  'InfoRating displays read-only scores with rating icons, including accessible value narration for assistive
  technologies.'
---

## Usage

### Use for

- Displaying existing ratings in product cards, lists, and summaries without enabling user editing
- Communicating score magnitude quickly with compact iconography, including optional half values
- Supporting accessible reading of score context when no visible textual score is present
- Reusing the same rating visual language as input ratings while keeping the state non-interactive

### Don't use for

- Do not use InfoRating to collect user feedback; use Rating when interaction is required
- Do not present decorative ratings without meaningful value context for assistive technologies
- Do not over-precision score displays when the source data does not justify half-step granularity
- Do not use rating visuals as the only trust signal; pair with enough surrounding product context
