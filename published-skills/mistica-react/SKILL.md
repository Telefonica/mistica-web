---
name: mistica-react
description: >
  Build websites and web applications by USING the published @telefonica/mistica package as a dependency in a
  consumer app. Use this skill when writing React UI code that imports @telefonica/mistica from node_modules —
  creating pages, layouts, forms, or any interface that should follow Telefonica's design guidelines. Triggers
  on tasks involving Mistica components, Telefonica branding, or when the user mentions Mistica. Do NOT use it
  when developing the mistica-web library source itself (authoring components, stories, or tests in that
  repository).
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
---

# Mistica React - Telefonica Design System

Build web interfaces using `@telefonica/mistica`, the React component library for Telefonica's Design System.

## When to Apply

Use this skill when you are **consuming** the published `@telefonica/mistica` package in your own application:

- Creating or modifying React components that import `@telefonica/mistica`
- Building pages, layouts, or UIs for Telefonica-branded applications
- The user asks to build a website or web app using Mistica
- Working with Mistica components, design tokens, or skins
- Generating forms, cards, lists, navigation, feedback screens, or any UI pattern

This skill does **not** apply to developing the `mistica-web` library source itself. If you are editing the
package's own components, stories, or tests in that repository, this skill and its documentation do not apply.

## Setup

Before writing any code, ensure the project has `@telefonica/mistica` installed. If not:

```
npm install @telefonica/mistica
```

## Documentation

**Before writing any code**, read `node_modules/@telefonica/mistica/doc/llms/llms.md`. That file is the
canonical source of truth and contains critical rules, a quick start guide, component categories, design token
overview, and step-by-step instructions on which documentation files to read and in what order.

> **Fallback**: If `node_modules/@telefonica/mistica/doc/llms/llms.md` is not available, fetch the equivalent
> file from the GitHub repository: `https://github.com/Telefonica/mistica-web/blob/master/doc/llms/llms.md`

Follow every instruction in `llms/llms.md` exactly, including reading all minimum required docs before
generating any code.
