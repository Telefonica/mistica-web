# generate-design-tokens

Generates the Mistica skins and the theme CSS from the design tokens of the
[mistica-design](https://github.com/Telefonica/mistica-design) repo.

## Usage

Run it from the repo root:

```bash
yarn generate-design-tokens

# with a custom tokens folder
yarn generate-design-tokens /path/to/mistica-design/tokens
```

Run it from this folder:

```bash
yarn install
yarn generate /path/to/mistica-design/tokens
```

This folder holds its own `yarn.lock`, so it needs a separate `yarn install`. Without that install,
`yarn workspace generate-design-tokens generate` fails from the root. Use the root
`yarn generate-design-tokens` script instead: it calls `node` directly and needs only the root install.

The script resolves the tokens folder in this order:

1. the first CLI argument;
2. the `DESIGN_TOKENS_FOLDER` environment variable;
3. `.github/mistica-design/tokens/` (the default, where the CI workflow checks out mistica-design).

```bash
DESIGN_TOKENS_FOLDER="/path/to/mistica-design/tokens" node index.js
```

The script prints the folder that it uses. It reads one `<skin>.json` file per skin and stops if a file is
missing.

Skins: `blau`, `movistar`, `o2`, `telefonica`, `vivo`, `vivo-evolution`, `esimflag`. To add a skin, add its
name to `KNOWN_SKINS` in `index.js`.

## Generated files

| Output                       | Content                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/skins/<skin>.tsx`       | `palette` and `get<Skin>Skin()`: colors, dark mode colors, border radii, text presets, theme variants, spacing |
| `src/skins/types/colors.tsx` | The `Colors` type, built from the color names of the last generated skin                                       |
| `css/<skin>.css`             | The CSS custom properties of the skin, per color scheme and per breakpoint                                     |
| `css/mistica-common.css`     | Skin independent CSS: default text color, text utility classes, `boxed`, `responsive-layout`                   |

Prettier formats every file with the config of the repo root.

Every output file starts with an `@generated` banner, so nobody edits it by hand:

```
/**
 * @generated
 *
 * This file was generated from the mistica-design tokens. Do not edit it by hand, your changes will be
 * lost on the next import. Run `yarn generate-design-tokens` to update it.
 *
 * @see packages/generate-design-tokens
 */
```

The `GENERATED_FILE_BANNER` constant in `index.js` holds the text. The `withBanner` function prepends it
before Prettier runs, so the banner follows the format of the repo. A block comment is valid in TypeScript and
in CSS, therefore both output types share one banner.

**Warning:** the script always regenerates every skin and every CSS file. Do not run it only to check a change
in the generator, because it also pulls unrelated token deltas into your working tree.

**Note:** `src/skins/skin-contract.css.ts` and `src/community/skins/cyber-skin.tsx` are hand maintained. The
script never writes them, so they carry no banner. A new color token needs a manual entry in both files.

## Token format

`index.js` builds the TypeScript sources. `css-generator.js` builds the CSS sources. Both understand the same
color formats:

- a palette reference, for example `{palette.primary}`;
- a palette reference with alpha, for example `rgba({palette.primary}, 0.5)`;
- a linear gradient, declared with `type: 'linear-gradient'`, an `angle` and a list of color stops.

An unknown color format throws an error, so a malformed token file fails the generation instead of producing a
wrong skin.

Radius values accept a percentage, a pixel value, a bare number, or the `circle` keyword. `circle` becomes
`50%`.

The CSS generator emits only the palette colors that the skin uses. It also emits a `raw-` variable with the
`r, g, b` components for each color that an `rgba()` token needs.

Text presets combine two sources. The generator holds the font sizes and the line heights, in px for mobile
and for desktop, and it converts them to rem. The token files supply the font weight. The desktop values go
into a `min-width: 1024px` media query.

## CI

The `import-design-tokens` GitHub workflow runs this script. The workflow:

1. checks out mistica-design at the requested ref, `production` by default;
2. runs the script;
3. runs Prettier on `src/skins`;
4. opens a pull request with the `feat(skin): update design tokens` message.

The workflow needs a manual approval, because it uses `GH_TOKEN_MISTICA` to read the private mistica-design
repo.

**Important:** the workflow commits only `src/skins`. If a token change also changes the files in `css/`,
commit those files yourself.
