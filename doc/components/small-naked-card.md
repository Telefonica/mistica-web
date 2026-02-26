---
name: SmallNakedCard
description:
  'Deprecated alias of `NakedCard` in snap size, for compact transparent cards that inherit the surrounding
  theme variant.'
---

## Usage

### Use for

- Maintaining legacy screens that already use this component while migrating to `NakedCard size=\"snap\"`
- Compact, lightweight card entries on transparent backgrounds where the card should inherit the current
  variant context
- Short teaser content that links to a more detailed destination

### Don't use for

- Do not use in new designs; use `NakedCard size=\"snap\"` instead
- Do not use when you need strong surface/background separation; choose a non-naked card variant
- Do not overload this compact format with long text, dense metadata, or multiple competing actions
