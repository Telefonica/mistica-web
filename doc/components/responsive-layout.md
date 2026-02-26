---
name: ResponsiveLayout
description:
  'ResponsiveLayout provides a responsive page container that keeps content within adaptive bounds or expands
  to full width when needed.'
---

## Usage

### Use for

- Wrapping page sections in consistent responsive margins and maximum content widths
- Keeping layout rhythm stable across mobile, tablet, and desktop breakpoints
- Applying container-level variant/background surfaces around a responsive content area
- Switching to full-width mode when content intentionally needs edge-to-edge presentation

### Don't use for

- Do not nest multiple ResponsiveLayout wrappers unnecessarily, as it can create redundant spacing behavior
- Do not use full-width mode by default when readable bounded content is expected
- Do not mix container variants and custom backgrounds without clear hierarchy intent
- Do not use ResponsiveLayout to solve component-level spacing issues that belong inside local layouts
