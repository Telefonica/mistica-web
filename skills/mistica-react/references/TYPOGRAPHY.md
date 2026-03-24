# Typography

This document defines how agents must use Mistica typography components.

- Typography must always rely on the design system primitives.
- Do not use custom font sizes, weights, or raw HTML text elements for styling.

## Text Components

Mistica provides a structured typography scale composed of:

- Text1 → Text10
- Text (primitive)
- Title1 → Title4
- Text1 → Text10

These components represent the predefined text scale of the system.

- The scale goes from 1 to 10, higher number are bigger sizes
- They are intended for body content, labels, and supporting text
- They already include responsive sizing and proper line-height
- Use them instead of defining custom font sizes.

Example:

```tsx
<Text1>Small supporting text</Text1>
<Text3>Standard component label and body text</Text3>
<Text6>Large emphasized text</Text6>
```

## Text (Primitive)

Text is a lower-level typography primitive.

Use it only when:

- A specific size is required that is not covered by Text1–Text10
- The design explicitly requires it
- Do not use Text to bypass the system scale.

Example:

```tsx
<Text>
```

## Title1 → Title4

- Titles are intended for section and page headings.
- The scale goes from 1 to 4, higher number are bigger sizes
- Title components don't accept custom colors

Example:

```tsx
<Title1>Main page title</Title1>
<Title2>Section title</Title2>
```

Do not use Title components for body content.

## Text color and variants

Color can be applied to text components using the `color` prop

```tsx
<Text3 color={skinVars.colors.textBrand}>
  Standard component label and body text
</Text3>
```

When the text are included in a tinted background or section, use `<ThemeVariant />` instead of `color`

```tsx
<section style={{ backgroud: skinVars.color.backgroundBrand }}>
  <ThemeVariant variant="brand">
    <Text3>Standard component label and body text</Text3>
  </ThemeVariant>
</section>
```

Some componentes already include the variant prop, so `<ThemeVariant />` is no needed

```tsx
<ResponsiveLayout variant="brand">
  <Text3>Standard component label and body text</Text3>
</ResponsiveLayout>
```

## Typography Rules

When implementing text:

- Use Title1–Title4 for page and section headings
- Use Text1–Text10 for body and supporting content
- Maintain hierarchical order (do not skip levels without reason)
- To create hierarchy in the same typographic size, use `skinVars.colors.textPrimary`and `skinVars.colors.textSecondary` via components color prop
- Do not define custom font sizes
- Do not use raw <h1>, <p>, <span> for styling
- Do not override typography tokens manually
