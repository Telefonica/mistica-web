---
name: Overlay
description:
  'Overlay provides a full-viewport interaction layer behind temporary surfaces, enabling outside-click
  dismissal and optional body scroll lock.'
---

## Usage

### Use for

- Dimming or blocking background interaction while a modal, menu, or transient surface is open
- Enabling outside-tap/click dismissal patterns for contextual surfaces
- Preventing background page scroll when focus should remain on the active overlayed content
- Creating consistent full-screen interaction coverage across desktop and mobile browsers

### Don't use for

- Do not use Overlay as a standalone content container for primary page layouts
- Do not lock body scroll when background interaction should remain available
- Do not rely on overlay dismissal for destructive or irreversible flows without explicit confirmation
- Do not stack multiple independent overlays when a single coordinated layer can manage focus and dismissal
