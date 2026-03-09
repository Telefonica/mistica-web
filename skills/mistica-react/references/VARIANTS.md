# Variants

In addition to light and dark modes, Mistica components adapt visually based on the variant context in which they are rendered.

Variants automatically adjust internal tokens (colors, contrast, etc.) to maintain accessibility and visual consistency.

Agents must understand the difference between:

- Variant context (container-level)
- Component variant (component-level)

## Variant Context (Container-Level)

A container can define a variant that affects all components rendered inside it.

Available container variants:

- default: uses white as background
- brand: uses the brand color as background
- alternative: same as default but with light neutral backgrounds
- negative: meant for dark background where text should be white
- media: meant for content on top of images or videos

When a variant context is applied:

- All nested components automatically adapt their tokens to improve contrast
- No manual color overrides are required

Example using ResponsiveLayout:

```tsx
<ResponsiveLayout variant="brand">
  <ButtonPrimary small fake>
    Primary
  </ButtonPrimary>
</ResponsiveLayout>
```

### ThemeVariant

ThemeVariant is a dedicated component to override the variant context for its children.

```tsx
<ThemeVariant variant="brand">
  <ButtonPrimary small fake>
    Primary
  </ButtonPrimary>
</ThemeVariant>
```

Use ThemeVariant when:

- You need to change variant inside an existing layout
- You do not want to affect the entire page

Variant Context Rules

- Do not manually change component colors inside a variant context
- Do not simulate variants using custom styles
- Use only supported variant values
- Prefer container-level variant when affecting large sections

## Component Variant (Component-Level)

Specific components can be rendered in different variants ( default / inverse / alternative ) without being in an context.

```tsx
<DataCard
  title="Title"
  subtitle="Subtitle"
  description="Description"
  variant="brand"
  buttonPrimary={
    <ButtonPrimary small onPress={() => {}}>
      Action
    </ButtonPrimary>
  }
  buttonLink={
    <ButtonLink small onPress={() => {}}>
      Link
    </ButtonLink>
  }
/>
```

## Variant Usage Rules

When deciding how to apply a variant:

- If an entire section changes background or semantic tone → use variant context
- If only one component needs a visual alternative → use component variant prop
- Never mix manual styling with variant logic
- Do not override token-based behavior
