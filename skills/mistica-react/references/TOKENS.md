# Mística Design Tokens

Design tokens in Mistica can be used **directly in your project** by importing `skinVars` from `@telefonica/mistica`.

## 1. Importing Tokens

```tsx
import { skinVars } from "@telefonica/mistica";
```

skinVars contains:

`skinVars.colors` → semantic color tokens
`skinVars.borderRadii` → border radius values
`skinVars.rawColors` → optional raw palette colors

All color tokens are CSS variable strings, e.g.:

`skinVars.colors.background` // "var(--colors-background)"
`skinVars.colors.backgroundBrand` // "var(--colors-backgroundBrand)"
`skinVars.colors.textPrimary` // "var(--colors-textPrimary)"
`skinVars.colors.buttonPrimaryBackground` // "var(--colors-buttonPrimaryBackground)"

2. Using Tokens in React

```tsx
import { Box, TextField, ButtonPrimary } from "@telefonica/mistica";
import { skinVars } from "@telefonica/mistica";

<Box style={{ backgroundColor: skinVars.colors.backgroundContainer }}>
  <TextField label="Name" style={{ color: skinVars.colors.textPrimary }} />
  <ButtonPrimary
    style={{ backgroundColor: skinVars.colors.buttonPrimaryBackground }}
  >
    Submit
  </ButtonPrimary>
</Box>;
```

3. Token Rules

Prefer semantic tokens (skinVars.colors, skinVars.borderRadii)
Never hardcode visual values
If a token don’t satisfy the needs an extended token can be created in app code following the token structure
When creating new tokens in app code, for color use skinVars.rawColors as values

If a required token does not exist, report it instead of guessing

## Deprecation (TODO)

Tokens may be marked as deprecated.

Rules:

- Never use deprecated tokens in new code
- If a token is defined as `deprecated` use the replacement if defined in `deprecatedBy`
- Prefer the documented replacement token
