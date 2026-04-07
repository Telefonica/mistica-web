# Design Tokens

Mistica uses design tokens via CSS custom properties. All tokens are accessed through the `skinVars` object
exported from `@telefonica/mistica`. Tokens adapt automatically to the active skin and color scheme
(light/dark mode).

## Critical rules

- **NEVER hardcode colors in app/component UI code.** Always use `skinVars.colors.*` for all color values.
- Use `skinVars.rawColors.*` (not `skinVars.colors.*`) when applying alpha with `applyAlpha`.
- Use `skinVars.borderRadii.*` for border radius values.
- For custom skins, palette-based skin authoring, or theme-level visual customization, see
  [theme-config.md](./theme-config.md).
- Tokens are CSS custom properties at runtime (e.g. `var(--colorBrand)`), so they work in both inline styles
  and CSS.

## Color tokens

All colors are accessed via `skinVars.colors.*`. Each token resolves to a CSS custom property. Low/High colors
mean low-contrast or high-contrast versions.

## Using colors in code

```tsx
import {skinVars, Text2, Box} from '@telefonica/mistica';

// In inline styles
<div style={{color: skinVars.colors.textPrimary, backgroundColor: skinVars.colors.backgroundContainer}}>
  Content
</div>

// In component color props
<Text2 regular color={skinVars.colors.textSecondary}>Secondary text</Text2>

// Prefer Mistica components over raw divs:
<Box padding={16}>
  <Text2 regular color={skinVars.colors.textSecondary}>Secondary text</Text2>
</Box>
```

## Applying alpha to colors

Use `applyAlpha` with `skinVars.rawColors` (not `skinVars.colors`):

```tsx
import {applyAlpha, skinVars} from '@telefonica/mistica';

// Correct: use rawColors for alpha
const semiTransparentBrand = applyAlpha(skinVars.rawColors.brand, 0.5);

// Wrong: skinVars.colors contains CSS var() references, not raw RGB values
// applyAlpha(skinVars.colors.brand, 0.5) // Don't do this
```

## Using palettes when authoring a skin

Palette exports are for skin authoring, not for styling components directly. If you need to customize default
colors, radii, or related visual tokens, create or extend a `Skin` and then consume those values through
`skinVars.*` in component code. See [theme-config.md](./theme-config.md) for the full custom-skin example.

## Border radius tokens

Access via `skinVars.borderRadii.*`.

```tsx
// Use in styles when building custom elements (but STRONGLY prefer Mistica components instead)
<div style={{borderRadius: skinVars.borderRadii.container}}>...</div>
```

## Spacing tokens

Spacing tokens are exposed via `skinVars.spacing.*`. They are mainly useful for skin authoring and modifying
the spacing of mistica layout components like `Box`, `Stack`, `Inline`, `ResponsiveLayout`, and `GridLayout`.

These spacing tokens are responsive and adapt to the active skin.

Some tokens expose `top` / `bottom`, some expose `left` / `right`, and some expose all four sides depending on
the component they support.

```tsx
import {skinVars} from '@telefonica/mistica';

// Use in styles when building custom elements (but STRONGLY prefer Mistica components instead)
<div
  style={{
    paddingTop: skinVars.spacing.cardDefaultPadding.top,
    paddingRight: skinVars.spacing.cardDefaultPadding.right,
    paddingBottom: skinVars.spacing.cardDefaultPadding.bottom,
    paddingLeft: skinVars.spacing.cardDefaultPadding.left,
  }}
>
  ...
</div>;
```

## Text presets

Text sizing is handled by text components (`Text1`-`Text10`, `Title1`-`Title4`). Do not manually set font
sizes -- use the appropriate text component instead.

| Component        | Weight options                       | Usage                              |
| ---------------- | ------------------------------------ | ---------------------------------- |
| `Text1`-`Text4`  | `light`, `regular`, `medium`, `bold` | Body text with configurable weight |
| `Text5`-`Text10` | Fixed per skin                       | Display/headline text              |
| `Title4`         | Default weight from skin             | Section title                      |
| `Title3`         | Default weight from skin             | Subsection title                   |
| `Title2`         | Default weight from skin             | Card/small title                   |
| `Title1`         | Default weight from skin             | Smallest title                     |

## ThemeVariant (variant contexts)

Some sections of a page use different color contexts. Use `variant` prop on `ResponsiveLayout` or `Boxed`:

```tsx
// Brand section (colored background)
<ResponsiveLayout variant="brand">
  <Box paddingY={24}>
    <Text2 regular>Text automatically adapts colors</Text2>
    <ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>
  </Box>
</ResponsiveLayout>

// Alternative section
<ResponsiveLayout variant="alternative">
  <Box paddingY={24}>
    <Text2 regular>Alternative background section</Text2>
  </Box>
</ResponsiveLayout>
```

Also some components can receive a variant prop.

Available variants: `'default'` (white background), `'brand'` (brand color background), `'negative'` (dark
background where text should be white), `'alternative'` (light neutral background), `'media'` (meant for
content on top of images or videos).

Components inside a variant section automatically adapt their colors. You do not need to manually set inverse
colors.
