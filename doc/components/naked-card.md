---
name: NakedCard
description:
  'NakedCard is a transparent card surface that inherits the surrounding theme context while keeping card
  content structure and actions.'
---

## Usage

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
