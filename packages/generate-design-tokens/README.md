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

Without an argument, the script reads `.github/mistica-design/tokens`, where the import-design-tokens workflow
checks out mistica-design. To read a local clone, give the path of its `tokens` folder. The root script runs
the generator from the repository root, so a relative path starts there:

```bash
# from the repository root, with mistica-design cloned next to mistica-web
yarn generate-design-tokens ../mistica-design/tokens
```

The density definitions come from `src/density/definitions.ts`, the same module that the library uses, so the
two cannot drift apart. That file has no imports, because Node can not load the React code of the library. The
root `package.json` has no `"type"` field, so Node loads it as an ES module after a warning; the `generate`
script turns off that warning only (`--disable-warning=MODULE_TYPELESS_PACKAGE_JSON`). Use the script, not
`node index.ts`, to keep the output clean.

## Schema validation

Before it writes any file, the script validates every token file against `tokens/schema/skin-schema.json` of
the same mistica-design checkout. If a file does not match, or the schema is missing, the script lists the
errors and stops, so `src/skins` and `css` are not changed.

The mistica-design repo validates its skins only on pull requests into `pre-production` and `production`, so
the tokens of other branches can be invalid. To generate without the validation, for example to try a work in
progress branch:

```bash
yarn generate --skip-validation
# or with a custom tokens folder
yarn generate /path/to/mistica-design/tokens --skip-validation
```

The script uses `jsonschema` with its default options, the same library as the skin validator workflow of
mistica-design, so a token file passes here only if it passes there.

## Type check

Type-check the package with:

```bash
yarn typecheck
```

This script is used by the import-design-tokens GitHub workflow.
