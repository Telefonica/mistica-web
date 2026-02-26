---
name: RadioListSheet
description:
  'RadioListSheet presents single-choice options inside a bottom sheet using radio-list rows, optimized for
  responsive selection flows.'
---

## Usage

### Use for

- Letting users pick one option from a contextual list without leaving the current screen
- Presenting option labels, descriptions, and optional assets in a scan-friendly sheet format
- Supporting mobile quick-select flows where choosing an option can immediately close the sheet
- Supporting desktop confirmation flows where users review selection before pressing a confirm action

### Don't use for

- Do not use RadioListSheet for multi-select decisions; use checkbox-based patterns instead
- Do not use it when the option set is so large that list-in-sheet scanning becomes inefficient
- Do not hide the selection consequence when the sheet closes automatically on mobile
- Do not split one decision across multiple sheets when one coherent choice list is enough
