---
name: mistica-react
description:
  Build websites and web applications using Telefonica's Mistica design system React components. Use this
  skill when writing React UI code with @telefonica/mistica, creating pages, layouts, forms, or any user
  interface that should follow Telefonica's design guidelines. Triggers on tasks involving Mistica components,
  Telefonica branding, or when the user mentions Mistica.
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
---

# Mistica React - Telefonica Design System

Build web interfaces using `@telefonica/mistica`, the React component library for Telefonica's Design System.

## When to Apply

Use this skill when:

- Creating or modifying React components that use `@telefonica/mistica`
- Building pages, layouts, or UIs for Telefonica-branded applications
- The user asks to build a website or web app using Mistica
- Working with Mistica components, design tokens, or skins
- Generating forms, cards, lists, navigation, feedback screens, or any UI pattern

## Setup

Before writing any code, ensure the project has `@telefonica/mistica` installed. If not:

```
npm install @telefonica/mistica
```

## Documentation

All Mistica documentation is available in the installed package. **Before generating any UI code**, read the
relevant documentation files from `node_modules/@telefonica/mistica/doc/`.

### Step 1: Read the main reference

Always start by reading the main LLM documentation file:

```
node_modules/@telefonica/mistica/doc/llms.md
```

This file contains the critical rules, quick start guide, component categories, design token overview, and
links to all other documentation files.

> **Fallback**: If `node_modules/@telefonica/mistica` is not available, read the equivalent files directly
> from the GitHub repository: `https://github.com/Telefonica/mistica-web/blob/master/doc/llms.md`

### Step 2: Read specific docs based on the task

Based on what the user needs, read the appropriate documentation files:

| Task                              | Read this file                                            |
| --------------------------------- | --------------------------------------------------------- |
| **Any UI task** (start here)      | `node_modules/@telefonica/mistica/doc/patterns.md`        |
| **Using specific components**     | `node_modules/@telefonica/mistica/doc/components.md`      |
| **Colors, tokens, theming**       | `node_modules/@telefonica/mistica/doc/design-tokens.md`   |
| **Page layouts**                  | `node_modules/@telefonica/mistica/doc/layout.md`          |
| **Forms**                         | `node_modules/@telefonica/mistica/doc/forms.md`           |
| **Theme configuration**           | `node_modules/@telefonica/mistica/doc/theme-config.md`    |
| **Sheets / bottom sheets**        | `node_modules/@telefonica/mistica/doc/sheet.md`           |
| **Analytics tracking**            | `node_modules/@telefonica/mistica/doc/analytics.md`       |
| **Fonts setup**                   | `node_modules/@telefonica/mistica/doc/fonts.md`           |
| **Custom text tokens**            | `node_modules/@telefonica/mistica/doc/texts.md`           |
| **Testing**                       | `node_modules/@telefonica/mistica/doc/testing.md`         |
| **Migration from older versions** | `node_modules/@telefonica/mistica/doc/migration-guide.md` |
| **Lottie animations**             | `node_modules/@telefonica/mistica/doc/lottie.md`          |

## Rules

Treat `node_modules/@telefonica/mistica/doc/llms.md` as the canonical source of truth for critical rules, page
structure, and Mistica best practices. Do not rely on abbreviated rules here when `llms.md` is available.
