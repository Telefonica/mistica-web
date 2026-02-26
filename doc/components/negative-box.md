---
name: NegativeBox
description:
  'NegativeBox offsets horizontal container gutters by applying negative side margins, allowing content to
  bleed to one or both edges.'
---

## Usage

### Use for

- Letting selected content extend beyond standard horizontal padding in constrained layouts
- Aligning edge-to-edge media or separators with surrounding full-bleed patterns
- Applying controlled left, right, or bilateral gutter compensation without custom wrapper styles
- Resolving specific alignment mismatches when parent container padding must be preserved

### Don't use for

- Do not use NegativeBox as a general spacing system; reserve it for targeted gutter compensation
- Do not stack multiple negative-offset wrappers, which can create unpredictable overflow
- Do not use it to hide structural layout issues that should be solved at container level
- Do not apply edge bleed to critical text content when readability relies on safe horizontal padding
