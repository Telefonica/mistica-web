---
name: RadioGroup
description:
  'RadioGroup manages a set of mutually exclusive options, including selection state and keyboard navigation
  across radio items.'
---

## Usage

### Use for

- Grouping related RadioButton options into one coherent single-selection decision
- Ensuring accessible selection patterns with radiogroup semantics and arrow-key navigation
- Structuring form decisions where exactly one option should be chosen at a time
- Managing default and controlled selection states in predictable one-choice workflows

### Don't use for

- Do not use RadioGroup when users can select multiple options independently
- Do not split one logical decision across multiple disconnected radio groups
- Do not hide the group context or question prompt users need to make an informed selection
- Do not use RadioGroup for long, dynamic option catalogs better served by other selector patterns
