# Light Implementation Plan — Enable responsiveLayoutMargin Token

**Version:** 0.3.0 · **Date:** 2026-07-09 · **Source:** GitHub Telefonica/mistica-web#1611 · **Slug:**
enable-responsive-layout-margin-token

## Context

`ResponsiveLayout` side margins are currently hardcoded constants (16 / 32 / 48 / 64 px). The design system
(mistica-design#2662 — open PR, branch `2648-responsive-layout-update-app-50-vivo-new`) adds a
`responsiveLayoutMargin` spacing token so each brand can vary its margins.

The mistica-design token format is:

```json
"responsiveLayoutMargin": {
  "value": { "mobile": 16, "tablet": 32, "desktop": 48, "largeDesktop": 64, "extraLargeDesktop": "auto" }
}
```

`extraLargeDesktop: "auto"` is a CSS semantic (use the existing centring formula `calc((100vw - 1704px) / 2)`)
— all current skins use it. It is **not** a pixel value and must be stripped by the import script; the formula
stays hardcoded in the CSS file. `vivo-evolution` differs only in `mobile: 8`; all other skins use
16/32/48/64.

The `generate-design-tokens` script already passes spacing values through with
`Object.entries(designTokens.spacing).map(([name, {value}]) => [name, value])`, so it will emit
`responsiveLayoutMargin` automatically — after a one-line guard to drop `extraLargeDesktop`.

## Tasks

1. [ ] **Add `responsiveLayoutMargin` to the type system, skin contract, and defaults**

   - AC:
     - AC-1: A `ResponsiveMarginValues` type
       `{ mobile: number; tablet: number; desktop: number; largeDesktop: number }` is exported from
       `src/skins/types/index.tsx`.
     - AC-2: `SpacingConfig` in `src/skins/types/index.tsx` includes
       `responsiveLayoutMargin?: ResponsiveMarginValues` (optional so currently-generated skins compile before
       the import run).
     - AC-3: The `ToThemeTokens` conditional in `src/skins/skin-contract.css.ts` is changed from
       `T extends {mobile: number; desktop: number}` to `keyof T extends 'mobile' | 'desktop'`, so four-key
       objects expand to per-key CSS vars.
     - AC-4: The `spacing` contract in `src/skins/skin-contract.css.ts` includes
       `responsiveLayoutMargin: { mobile: '', tablet: '', desktop: '', largeDesktop: '' }`.
     - AC-5: `defaultSpacing` in `src/skins/defaults.tsx` includes
       `responsiveLayoutMargin: { mobile: 16, tablet: 32, desktop: 48, largeDesktop: 64 }`.
   - Target: `src/skins/types/index.tsx`, `src/skins/skin-contract.css.ts`, `src/skins/defaults.tsx`
   - Contract:
     ```typescript
     export type ResponsiveMarginValues = {
         mobile: number;
         tablet: number;
         desktop: number;
         largeDesktop: number;
     };
     // added to SpacingConfig (optional):
     responsiveLayoutMargin?: ResponsiveMarginValues;
     ```
   - Steps:
     1. In `src/skins/types/index.tsx` after `type PaddingValues = ...`, add the `ResponsiveMarginValues`
        export.
     2. Add `responsiveLayoutMargin?: ResponsiveMarginValues` as the last field of `SpacingConfig`.
     3. In `src/skins/skin-contract.css.ts`, change
        `type ToThemeTokens<T> = T extends {mobile: number; desktop: number}` to
        `type ToThemeTokens<T> = keyof T extends 'mobile' | 'desktop'`.
     4. Add `responsiveLayoutMargin: {mobile: '', tablet: '', desktop: '', largeDesktop: ''}` as the last
        entry of the `spacing` const.
     5. In `src/skins/defaults.tsx`, add
        `responsiveLayoutMargin: {mobile: 16, tablet: 32, desktop: 48, largeDesktop: 64}` as the last entry of
        `defaultSpacing`.

2. [ ] **Teach `ThemeContextProvider` to always populate the token and emit CSS vars for its four-breakpoint
       shape**

   - AC:
     - AC-6: `contextTheme.spacing` is computed as `{...defaultSpacing, ...theme.skin.spacing}` (was
       `theme.skin.spacing ?? defaultSpacing`) so that skins providing spacing but lacking
       `responsiveLayoutMargin` still get the default.
     - AC-7: When a spacing token value contains a `largeDesktop` key, both `spacingDesktopVars` and
       `spacingMobileVars` emit four CSS vars (`mobile`, `tablet`, `desktop`, `largeDesktop`) with `"<n>px"`
       values; the `top/right/bottom/left` path handles all other tokens unchanged.
   - Target: `src/theme-context-provider.tsx`
   - Contract: internal — no public API change.
   - Steps:
     1. Find the line `spacing: theme.skin.spacing ?? defaultSpacing`; change to
        `spacing: {...defaultSpacing, ...theme.skin.spacing}`.
     2. In `spacingDesktopVars` useMemo, before the existing return, add:
        ```ts
        if ('largeDesktop' in values) {
          const m = values as {mobile: number; tablet: number; desktop: number; largeDesktop: number};
          return {
            [token]: {
              mobile: `${m.mobile}px`,
              tablet: `${m.tablet}px`,
              desktop: `${m.desktop}px`,
              largeDesktop: `${m.largeDesktop}px`,
            },
          };
        }
        ```
     3. Apply the identical guard in `spacingMobileVars`.

3. [ ] **Replace hardcoded constants in `responsive-layout.css.ts` with skin CSS vars**

   - AC:
     - AC-8: `marginValue.{mobile,tablet,desktop,largeDesktop}` in `src/responsive-layout.css.ts` reference
       `skinVars.spacing.responsiveLayoutMargin.*`; `extraLargeDesktop` keeps the existing
       `calc((100vw - 1704px) / 2)` formula.
     - AC-9: The four exported constants `MOBILE_SIDE_MARGIN`, `TABLET_SIDE_MARGIN`,
       `SMALL_DESKTOP_SIDE_MARGIN`, `LARGE_DESKTOP_SIDE_MARGIN` remain exported with their current numeric
       values (used by `sheet-common.tsx`).
   - Target: `src/responsive-layout.css.ts`
   - Contract: only the `marginValue` object changes; exports are unchanged.
   - Steps:
     1. Replace the four `"${CONSTANT}px"` strings in `marginValue` with CSS var references:
        ```ts
        largeDesktop: skinVars.spacing.responsiveLayoutMargin.largeDesktop,
        desktop:      skinVars.spacing.responsiveLayoutMargin.desktop,
        tablet:       skinVars.spacing.responsiveLayoutMargin.tablet,
        mobile:       skinVars.spacing.responsiveLayoutMargin.mobile,
        ```
     2. Leave `extraLargeDesktop` and all constant exports unchanged.

4. [ ] **Update `generate-design-tokens` script to strip `extraLargeDesktop` from `responsiveLayoutMargin`**

   - AC:
     - AC-10: When the import script processes a skin JSON whose `spacing.responsiveLayoutMargin.value`
       contains an `extraLargeDesktop` key, the generated `*.tsx` skin file omits that key — leaving only
       `{ mobile, tablet, desktop, largeDesktop }` — so it matches `ResponsiveMarginValues` without a
       TypeScript error.
     - AC-11: All other spacing tokens are emitted unchanged (the existing pass-through logic is unaffected).
   - Target: `packages/generate-design-tokens/index.js`
   - Contract: single guard inside the existing `spacing` emission at line 163-165.
   - Steps:
     1. In `generateSkinSrc`, replace the `spacing` output block:
        ```js
        spacing: ${JSON.stringify(
            Object.fromEntries(Object.entries(designTokens.spacing).map(([name, {value}]) => [name, value]))
        )},
        ```
        with:
        ```js
        spacing: ${JSON.stringify(
            Object.fromEntries(Object.entries(designTokens.spacing).map(([name, {value}]) => {
                if (name === 'responsiveLayoutMargin') {
                    const {extraLargeDesktop: _ignored, ...rest} = value;
                    return [name, rest];
                }
                return [name, value];
            }))
        )},
        ```

5. [ ] **Run the import script against the mistica-design PR branch to seed skin files with real token
       values**
   - AC:
     - AC-12: After the run, every skin file in `src/skins/` that the script manages (`blau`, `movistar`,
       `movistar-new`, `o2`, `o2-new`, `telefonica`, `vivo`, `vivo-new`, `tu`, `esimflag`) includes
       `responsiveLayoutMargin: { mobile: N, tablet: 32, desktop: 48, largeDesktop: 64 }` in its `spacing`
       object, with `N = 8` for vivo-evolution and `N = 16` for all others.
     - AC-13: `yarn tsc --noEmit` exits 0 after the skin files are regenerated.
   - Target: `src/skins/blau.tsx`, `src/skins/movistar.tsx`, `src/skins/movistar-new.tsx`, `src/skins/o2.tsx`,
     `src/skins/o2-new.tsx`, `src/skins/telefonica.tsx`, `src/skins/vivo.tsx`, `src/skins/vivo-new.tsx`,
     `src/skins/tu.tsx`, `src/skins/esimflag.tsx`, `src/community/skins/cyber-skin.tsx`
   - Contract: N/A — the script is the source of truth for these files.
   - Steps:
     1. Clone the mistica-design PR branch into a local temp path:
        ```bash
        gh repo clone Telefonica/mistica-design /tmp/mistica-design-tokens -- \
          --depth=1 --branch 2648-responsive-layout-update-app-50-vivo-new --single-branch
        ```
     2. Run the import script:
        ```bash
        cd packages/generate-design-tokens && DESIGN_TOKENS_FOLDER=/tmp/mistica-design-tokens/tokens node index.js
        ```
     3. Run `yarn prettier src/skins --write` (the workflow step the CI job runs after the script).
     4. For `src/community/skins/cyber-skin.tsx` (not generated by the script), manually add
        `responsiveLayoutMargin: {mobile: 16, tablet: 32, desktop: 48, largeDesktop: 64}` to its `spacing`
        object.
     5. Verify with `yarn tsc --noEmit`.
