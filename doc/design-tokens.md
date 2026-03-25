# Design Tokens

Mistica uses design tokens via CSS custom properties. All tokens are accessed through the `skinVars` object
exported from `@telefonica/mistica`. Tokens adapt automatically to the active skin and color scheme
(light/dark mode).

## Critical rules

- **NEVER hardcode colors.** Always use `skinVars.colors.*` for all color values.
- Use `skinVars.rawColors.*` (not `skinVars.colors.*`) when applying alpha with `applyAlpha`.
- Use `skinVars.borderRadii.*` for border radius values.
- Tokens are CSS custom properties at runtime (e.g. `var(--colorBrand)`), so they work in both inline styles
  and CSS.

## Color tokens

All colors are accessed via `skinVars.colors.*`. Each token resolves to a CSS custom property.

### Semantic colors

| Token                   | Usage                                                    |
| ----------------------- | -------------------------------------------------------- |
| `brand`                 | Primary brand color                                      |
| `brandHigh`             | High-emphasis brand color                                |
| `inverse`               | Inverse foreground color                                 |
| `neutralHigh`           | High-emphasis neutral (e.g. primary text on default)     |
| `neutralMedium`         | Medium-emphasis neutral (e.g. secondary text on default) |
| `neutralLow`            | Low-emphasis neutral                                     |
| `neutralLowAlternative` | Alternative low-emphasis neutral                         |
| `success`               | Success semantic color                                   |
| `warning`               | Warning semantic color                                   |
| `error`                 | Error semantic color                                     |
| `promo`                 | Promotional color                                        |
| `highlight`             | Highlight color                                          |

### Background colors

| Token                            | Usage                               |
| -------------------------------- | ----------------------------------- |
| `background`                     | Default page background             |
| `backgroundAlternative`          | Alternative section background      |
| `backgroundBrand`                | Brand-colored background            |
| `backgroundBrandSecondary`       | Secondary brand background          |
| `backgroundContainer`            | Container/card background           |
| `backgroundContainerBrand`       | Container on brand background       |
| `backgroundContainerAlternative` | Container on alternative background |
| `backgroundOverlay`              | Modal/sheet overlay                 |
| `backgroundSkeleton`             | Skeleton loading placeholder        |
| `appBarBackground`               | App bar background                  |
| `navigationBarBackground`        | Navigation bar background           |

### Text colors

| Token                  | Usage                                      |
| ---------------------- | ------------------------------------------ |
| `textPrimary`          | Primary text on default background         |
| `textPrimaryInverse`   | Primary text on brand/inverse background   |
| `textPrimaryBrand`     | Primary text on brand background           |
| `textPrimaryMedia`     | Primary text on media background           |
| `textSecondary`        | Secondary text on default background       |
| `textSecondaryInverse` | Secondary text on brand/inverse background |
| `textSecondaryBrand`   | Secondary text on brand background         |
| `textError`            | Error text                                 |
| `textLink`             | Link text color                            |
| `textLinkInverse`      | Link text on brand/inverse background      |
| `textLinkDanger`       | Danger link text color                     |

### Border colors

| Token            | Usage                  |
| ---------------- | ---------------------- |
| `borderLow`      | Low-emphasis border    |
| `border`         | Default border         |
| `borderHigh`     | High-emphasis border   |
| `borderSelected` | Selected/active border |

### Status colors (low/high emphasis)

| Low emphasis | High emphasis | Usage          |
| ------------ | ------------- | -------------- |
| `successLow` | `successHigh` | Success status |
| `warningLow` | `warningHigh` | Warning status |
| `errorLow`   | `errorHigh`   | Error status   |
| `promoLow`   | `promoHigh`   | Promo status   |
| `brandLow`   | `brandHigh`   | Brand status   |

### Control colors

| Token              | Usage                                     |
| ------------------ | ----------------------------------------- |
| `control`          | Default control (checkbox, radio, switch) |
| `controlActivated` | Activated control                         |
| `controlError`     | Error state control                       |
| `loadingBar`       | Loading bar color                         |
| `divider`          | Divider line color                        |

### Tag colors

Tags have paired `tagText*` and `tagBackground*` tokens for each type: `Promo`, `Active`, `Inactive`, `Info`,
`Success`, `Warning`, `Error`. Each also has `Inverse`, `Negative`, and `Brand` variants.

Example: `skinVars.colors.tagTextPromo`, `skinVars.colors.tagBackgroundPromo`.

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

## Border radius tokens

Access via `skinVars.borderRadii.*`:

| Token        | Usage                   |
| ------------ | ----------------------- |
| `container`  | Cards, boxed containers |
| `button`     | Buttons                 |
| `input`      | Form inputs             |
| `popup`      | Popups, tooltips        |
| `checkbox`   | Checkboxes              |
| `indicator`  | Indicators              |
| `chip`       | Chips                   |
| `sheet`      | Bottom sheets           |
| `bar`        | Progress bars           |
| `avatar`     | Avatars                 |
| `mediaSmall` | Small media elements    |
| `tag`        | Tags                    |

```tsx
// Use in styles when building custom elements (prefer Mistica components instead)
<div style={{borderRadius: skinVars.borderRadii.container}}>...</div>
```

## Text presets

Text sizing is handled by text components (`Text1`-`Text10`, `Title1`-`Title4`). Do not manually set font
sizes -- use the appropriate text component instead.

| Component        | Weight options                       | Usage                              |
| ---------------- | ------------------------------------ | ---------------------------------- |
| `Text1`-`Text4`  | `light`, `regular`, `medium`, `bold` | Body text with configurable weight |
| `Text5`-`Text10` | Fixed per skin                       | Display/headline text              |
| `Title1`         | Default weight from skin             | Section title                      |
| `Title2`         | Default weight from skin             | Subsection title                   |
| `Title3`         | Default weight from skin             | Card/small title                   |
| `Title4`         | Default weight from skin             | Smallest title                     |

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

Available variants: `'default'`, `'brand'`, `'negative'`, `'alternative'`, `'media'`.

Components inside a variant section automatically adapt their colors. You do not need to manually set inverse
colors.
