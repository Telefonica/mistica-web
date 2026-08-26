# generate-design-tokens

Generates the Mistica skins and the theme CSS from the design tokens of the
[mistica-design](https://github.com/Telefonica/mistica-design) repo.

## Usage

```bash
# from the repo root (recommended)
yarn generate-design-tokens [/path/to/mistica-design/tokens]

# from this folder (needs its own install, it has a separate yarn.lock)
yarn install && yarn generate [/path/to/mistica-design/tokens]
```

The tokens folder is resolved in this order: CLI argument, `DESIGN_TOKENS_FOLDER` env var, then
`.github/mistica-design/tokens/` (the default). The script prints the folder it uses and stops if a
`<skin>.json` file is missing.

To add a skin, add its name to `KNOWN_SKINS` in `index.js`.

> **Warning:** the script always regenerates every skin and every CSS file. Do not run it only to check a
> generator change, or it pulls unrelated token deltas into your working tree.

## Generated files

| Output                       | Content                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/skins/<skin>.tsx`       | `palette` and `get<Skin>Skin()`: colors, dark mode colors, border radii, text presets, theme variants, spacing |
| `src/skins/types/colors.tsx` | The `Colors` type, built from the last generated skin                                                          |
| `css/<skin>.css`             | The CSS custom properties of the skin, per color scheme and per breakpoint                                     |
| `css/mistica-common.css`     | Skin independent CSS: default text color, text utility classes, `boxed`, `responsive-layout`                   |

Every output file starts with an `@generated` banner (`GENERATED_FILE_BANNER` in `index.js`) and is formatted
with the repo root Prettier config.

`src/skins/skin-contract.css.ts` and `src/community/skins/cyber-skin.tsx` are hand maintained: the script
never writes them, so a new color token needs a manual entry in both.

## Token format

`index.js` builds the TypeScript sources, `css-generator.js` the CSS. Both understand the same color formats:
a palette reference (`{palette.primary}`), a reference with alpha (`rgba({palette.primary}, 0.5)`), or a
`linear-gradient`. An unknown format throws. Radius values accept a percentage, a pixel value, a bare number,
or `circle` (which becomes `50%`).

The CSS generator emits only the palette colors the skin uses, plus a `raw-` variable for each color an
`rgba()` token needs. Text presets combine the generator font sizes and line heights (converted to rem) with
the font weight from the token files; desktop values go into a `min-width: 1024px` media query.

## CI

The `import-design-tokens` workflow checks out mistica-design (default `production`), runs the script, runs
Prettier on `src/skins`, and opens a `feat(skin): update design tokens` pull request. It needs manual approval
(it uses `GH_TOKEN_MISTICA` to read the private repo).

> **Important:** the workflow commits only `src/skins`. If a token change also touches `css/`, commit those
> files yourself.
