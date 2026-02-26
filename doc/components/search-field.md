---
name: SearchField
description:
  'SearchField captures query input for discovery flows with optional search icon, clear action, and
  autosuggest integration.'
---

## Usage

### Use for

- Capturing free-text queries in search and filtering experiences
- Supporting suggestion-driven discovery when users need guidance while typing
- Providing quick reset behavior through a clear control to restart search intent
- Keeping search affordance recognizable with optional leading search icon

### Don't use for

- Do not use SearchField for strict structured data inputs that require fixed formats
- Do not overload search with heavy validation patterns that block exploratory typing
- Do not hide no-results or empty-suggestion feedback when discovery relies on it
- Do not remove clear affordance in long-query contexts where users need fast reset
