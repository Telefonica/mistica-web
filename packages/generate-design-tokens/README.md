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
node index.ts
```

Type-check the package with:

```bash
yarn typecheck
```

This script is used by the import-design-tokens GitHub workflow.
