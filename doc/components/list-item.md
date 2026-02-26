---
name: ListItem
description:
  'ListItem is the content unit used inside ordered and unordered lists, supporting default markers, custom
  icons, or markerless variants.'
---

## Usage

### Use for

- Building individual entries inside `UnorderedList` and `OrderedList` with consistent spacing and readability
- Using default markers for standard list semantics when no custom visual cue is needed
- Using custom icons when each item benefits from an explicit visual meaning
- Removing markers only when surrounding context already communicates list grouping clearly

### Don't use for

- Do not use ListItem outside list containers when no list semantics are intended
- Do not mix marker, markerless, and icon styles arbitrarily within the same list without rationale
- Do not use decorative icons that compete with or obscure item meaning
- Do not remove markers in dense informational lists where scanability depends on strong item separation
