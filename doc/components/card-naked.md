Typologies (by size):
- NakedCard
- SmallNakedCard (deprecated → NakedCard size="snap")

---

## NakedCard

NakedCard is a transparent card surface that inherits the surrounding theme context while keeping card
  content structure and actions.

### Use for

- Presenting grouped content with card hierarchy but without an emphasized container background
- Integrating card content in already-defined surfaces where extra visual chrome would add noise
- Keeping consistent card anatomy (media/content/actions) while adapting naturally to parent variant context
- Using `size` variants (including `snap`) to fit compact and dense layout scenarios

### Don't use for

- Do not use NakedCard when strong visual separation from background is required for comprehension
- Do not force explicit card variant styling; NakedCard is designed to inherit context variant
- Do not rely on deprecated small-card patterns when `NakedCard size="snap"` is the intended approach
- Do not overload transparent cards with excessive actions that reduce scanability on busy backgrounds

## SmallNakedCard

Deprecated alias of `NakedCard` in snap size, for compact transparent cards that inherit the surrounding
  theme variant.

### Use for

- Maintaining legacy screens that already use this component while migrating to `NakedCard size=\"snap\"`
- Compact, lightweight card entries on transparent backgrounds where the card should inherit the current
  variant context
- Short teaser content that links to a more detailed destination

### Don't use for

- Do not use in new designs; use `NakedCard size=\"snap\"` instead
- Do not use when you need strong surface/background separation; choose a non-naked card variant
- Do not overload this compact format with long text, dense metadata, or multiple competing actions
