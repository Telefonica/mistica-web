# generate-design-tokens

Script to generate mistica skins from design tokens imported from the mistica-design repo.

## Generated Files

- **Main skins** → `src/skins/` and `css/`
- **Community skins** → `src/community/skins/` and `css/community/`

The script discovers community skin tokens in the `tokens/community/` folder of the mistica-design repository
and generates corresponding TypeScript and CSS files.

## Run

The script is written in TypeScript and runs directly on Node (>= 24), which strips the types at runtime, so
no build step is required:

```bash
yarn generate
# or, from the repository root: yarn generate-design-tokens
```

The density definitions come from `src/density/definitions.ts`, the same module that the library uses, so the
two cannot drift apart. That file has no imports, because Node can not load the React code of the library. The
root `package.json` has no `"type"` field, so Node loads it as an ES module after a warning; the `generate`
script turns off that warning only (`--disable-warning=MODULE_TYPELESS_PACKAGE_JSON`). Use the script, not
`node index.ts`, to keep the output clean.

Type-check the package with:

```bash
yarn typecheck
```

This script is used by the import-design-tokens GitHub workflow.
