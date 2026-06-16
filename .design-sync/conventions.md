# Mística (Telefónica) — how to build with these components

Mística is a **prop-and-theme** design system. There are **no utility CSS classes** — you
style by composing components and passing props. Colors, spacing, typography, and radii all
come from the active theme (skin). Brand font is **On Air** (Movistar), applied for you.

## 1. Wrap the app in the theme provider (required)

Every Mística component reads theme context. Without the provider they throw or render
unstyled. Wrap the whole app **once** at the root:

```jsx
import {ThemeContextProvider, getMovistarSkin, OverscrollColorProvider} from '@telefonica/mistica';

const theme = {
  skin: getMovistarSkin(),                 // or getO2Skin / getVivoSkin / getTelefonicaSkin / getBlauSkin
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
  colorScheme: 'light',                    // 'light' | 'dark' | 'auto'
};

<ThemeContextProvider theme={theme}>
  <OverscrollColorProvider>
    {/* your screens */}
  </OverscrollColorProvider>
</ThemeContextProvider>
```

Switch brand by swapping the skin function. Do not set `font-family` yourself — the skin
already applies the brand font.

## 2. The styling idiom — props, not classes

- **Layout** is done with primitives, never raw CSS: `Box` (padding/margin), `Stack`
  (vertical spacing), `Inline` (horizontal spacing), `ResponsiveLayout` (page gutters/max
  width), `GridLayout`, `Grid`. Spacing props take fixed tokens (e.g. `Box padding={16}`,
  `Stack space={16}`).
- **Color** comes from the skin via `skinVars`: `import {skinVars} from '@telefonica/mistica'`
  then `skinVars.colors.textPrimary`, `skinVars.colors.background`, `skinVars.colors.brand`,
  etc. Use these (never hex literals) so designs stay on-brand and theme-correct.
- **Typography** uses the `Text` components: `Text1`…`Text10`, plus `Title1`…`Title4`. They
  carry the correct size/weight/line-height per breakpoint — do not set font-size by hand.
- **Component variants are props**, e.g. `<Tag type="promo">`, `<Boxed>`, button kinds are
  separate components (`ButtonPrimary`, `ButtonSecondary`, `ButtonDanger`, `ButtonLink`).

## 3. Where the truth lives

- Each component ships `<Name>.prompt.md` (usage + examples) and `<Name>.d.ts` (the exact
  props). **Read those before composing a component** — they are authoritative.
- `styles.css` (and its `@import` closure: `fonts/fonts.css`, `_ds_bundle.css`) is the only
  stylesheet designs receive; it carries the component CSS and the On Air font.
- Icons: a curated set of common `Icon*` components is available (e.g. `IconCloseRegular`,
  `IconSearchRegular`, `IconCheckRegular`, arrows/chevrons). The full Mística icon catalogue
  is large and is **not** bundled in full — if an icon you need is not present, pick the
  closest available one.

## 4. A minimal, idiomatic screen

```jsx
import {ResponsiveLayout, Box, Stack, Title1, Text3, ButtonPrimary, DataCard, Tag, skinVars}
  from '@telefonica/mistica';

<ResponsiveLayout>
  <Box paddingY={24}>
    <Stack space={16}>
      <Title1>Your plan</Title1>
      <Text3 color={skinVars.colors.textSecondary}>Choose what fits you.</Text3>
      <DataCard
        title="Unlimited"
        subtitle="Most popular"
        description="Calls, texts and data with no limits."
        button={<ButtonPrimary onPress={() => {}}>Choose</ButtonPrimary>}
      />
      <ButtonPrimary onPress={() => {}}>Continue</ButtonPrimary>
    </Stack>
  </Box>
</ResponsiveLayout>
```

Compose layout with `ResponsiveLayout`/`Box`/`Stack`, controls with library components, and
color/spacing/type only through skin tokens and the typography components.
