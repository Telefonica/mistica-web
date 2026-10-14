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

## Border radius tokens

Uniform tokens keep their existing format and output (`16` becomes `16px`). A token can also define all four
corners independently:

```json
{
  "radius": {
    "container": {"value": "16", "type": "borderRadius"},
    "bubble": {
      "topLeft": {"value": "4", "type": "borderRadius"},
      "topRight": {"value": "24", "type": "borderRadius"},
      "bottomRight": {"value": "24", "type": "borderRadius"},
      "bottomLeft": {"value": "24", "type": "borderRadius"}
    }
  }
}
```

The generator exports the latter as the CSS shorthand `4px 24px 24px 24px`, in top-left, top-right,
bottom-right, bottom-left order, in both `skin.borderRadii.bubble` and `--mistica-border-radius-bubble`. The
output remains a string and can be assigned to `border-radius`. A four-corner value must not be assigned to an
individual property such as `border-top-left-radius`.

Each value accepts a non-negative number encoded as a string (pixels), an explicit `px` value, a percentage,
or `circle` (converted to `50%`). All four corners are required. Missing corners, invalid values, and
definitions mixing a uniform value with corners are rejected.

The example names and values are illustrative, not new production tokens. Before publishing tokens, Design and
Development need to agree on their names, values per skin, and how they represent incoming, outgoing, and
grouped messages. Adding a new production token also requires updating the web skin type and theme contract;
this parser change does not add `bubble` to those contracts.

Run the generator tests with Node >= 24:

```bash
yarn test
```
