---
name: mistica-react
description:
  Guides agents in using the Mística Design System correctly. Includes available components, design usage
  rules, accessibility constraints, design tokens, and APIs. Use when implementing UI, choosing components,
  styling interfaces, or validating design-system compliance.
---

# Design System Library

This skill teaches the agent how to correctly use the Mística Design System.

The agent must prefer existing components and tokens and avoid inventing UI primitives.

## When to use this skill

Use this skill when:

- Building or modifying UI
- Choosing design system components
- Applying colors, spacing, or typography
- Reviewing code for design system compliance
- The user mentions UI, components, design system, tokens, or accessibility
- The user ask to implement a design from Figma

## Core rules

1. Always use existing design system components first.
2. If a required component or variant does not exist, create an custom component.
3. Use design tokens instead of raw values.
4. Follow accessibility requirements.
5. If unsure, consult references before guessing.

## Decision process

Follow this order:

1.  Identify the UI goal
2.  Check available components in and it's available properties
3.  Build the page layout using components and guidelines
4.  Validate accessibility
5.  Create an custom solution if needed based on Mistica primitives

## References

- [ACCESSIBILITY](references/ACCESSIBILITY.md)
- [API](references/API.md)
- [COMPONENTS](references/COMPONENTS.md)
- [CUSTOM_COMPONENTS](references/CUSTOM_COMPONENTS.md)
- [ICONS](references/ICONS.md)
- [LAYOUT](references/LAYOUT.md)
- [TOKENS](references/TOKENS.md)
- [TYPOGRAPHY](references/TYPOGRAPHY.md)
- [VARIANTS](references/VARIANTS.md)
