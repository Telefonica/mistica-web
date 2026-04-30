# Figma MCP

Mandatory reading whenever you are implementing UI from Figma through the Figma MCP or when the user provides
a `figma.com/...` URL. This file only covers the translation layer — the rest of the Mistica docs
(`patterns.md`, `components.md`, `layout.md`, `design-tokens.md`) still apply.

## Prime directive: read the DOM verbatim

The Figma MCP response gives you two things:

- a **screenshot** that shows what the design should look like
- a **DOM** that shows what the designer specified

Use the DOM as the source of truth for every numeric and structural decision. The screenshot only validates
that your implementation matches the designer's intent.

**If you cannot point at a line in the DOM to justify a value, do not write that value.** Do not pick "nearby
nicer" numbers.

## Mapping Figma flex to Mistica layout primitives

| Figma                                   | Mistica                                             |
| --------------------------------------- | --------------------------------------------------- |
| `flex gap-[Npx]` (vertical, `flex-col`) | `Stack space={N}`                                   |
| `flex gap-[Npx]` (horizontal)           | `Inline space={N}`                                  |
| `justify-between`                       | `Inline space="between"`                            |
| `justify-around`                        | `Inline space="around"`                             |
| `justify-evenly`                        | `Inline space="evenly"`                             |
| `items-center`                          | `alignItems="center"` on `Inline`                   |
| `flex-wrap`                             | `wrap` on `Inline`                                  |
| `p-[Npx]` / `px-[Npx]` / `py-[Npx]`     | `Box padding={N}` / `paddingX={N}` / `paddingY={N}` |
| `rounded-[var(--radii/container,...)]`  | `Boxed` (or `skinVars.borderRadii.container`)       |
| `bg-[var(--background...)]`             | `ResponsiveLayout variant` or `Boxed variant`       |

Each spacing primitive has its own allowed scale. Figma values outside the scale must be rounded to the
nearest allowed value and noted — never silently apply arbitrary CSS.

## Don't snap Figma values to Mistica's rhythm

Mistica's 16 / 24 / 32 vertical-rhythm guidance in `patterns.md` and `layout.md` is for **greenfield
composition** — UI you are designing yourself. It is not a reason to override explicit Figma values. When the
DOM specifies a spacing, use it literally.

## Tokens over literal values

The MCP output often contains hex colors (`#262423`), CSS custom properties
(`var(--backgroundalternative,#fefaf5)`), and raw border-radius values
(`rounded-[var(--radii/container,16px)]`). These must be translated:

- Colors → `skinVars.colors.*` (or `skinVars.rawColors.*` with `applyAlpha`)
- Border radii → `skinVars.borderRadii.*`, or a Mistica component that handles it (`Boxed`, cards)
- Spacing tokens → `skinVars.spacing.*` where applicable

Never keep a hex literal or a `var(--...)` reference in app code. If the right token doesn't exist, the design
is ahead of the skin — flag it and extend the skin instead of hardcoding.

## Fonts

Ignore per-node `font-[family-name:var(--fontfamily/fontfamily,'Movistar_Sans:Medium',...)]` and
`font-['On_Air:Regular',...]` classes. Font family is set **once globally** under `ThemeContextProvider` via
`GlobalStyles` — the active skin's font (see `fonts.md`) is the source of truth. Per-node font families in the
MCP output are leaked style from the Figma file, not designer intent.

Font weight is handled by the Mistica text components (`Text1`-`Text10` and `Title1`-`Title4`). Map Figma's
`font-weight/text5` to the matching component (e.g. `Text5`), not to a CSS `font-weight`.

## `CodeConnectSnippet` wrappers: gather before you choose

MCP responses wrap mapped components in `<CodeConnectSnippet>`. **The snippet is never authoritative.** It's a
hint about which Mistica component the designer used — not a source of truth for any specific prop value.
Individual values inside it may happen to be correct, may be stale placeholders, or may look right but map to
the wrong semantic slot. You cannot tell reliably from the snippet alone which is which, so don't try.

Don't classify snippet values into "trustworthy" and "untrustworthy". The classification is itself where
mistakes come from. Instead: for every composite component, gather all available information first, then pick
props from the combined picture.

### How to gather

For any CodeConnect-wrapped **composite component** — one with multiple content slots (`headline`, `pretitle`,
`title`, `subtitle`, `description`, `extra`, `slot`, `buttonPrimary`, `buttonSecondary`, `buttonLink`,
`asset`, etc.) — re-fetch the node with Code Connect disabled before mapping props:

```
get_design_context({
  nodeId: "<the collapsed node id>",
  fileKey: "<same fileKey>",
  disableCodeConnect: true,
  excludeScreenshot: true  // optional, saves tokens if you already have one
})
```

That returns the real child tree: the actual text nodes, their font-size tokens, the actual image aspect
ratio, Tag instances with their `type` (e.g. the `--tagbackgroundinfo` CSS variable tells you `type="info"`),
child slots that correspond to `extra` / `slot` / `headline`, sibling buttons, etc.

Use `get_metadata` on the same node when you also need to understand which children are component instances
vs. raw nodes.

### Rule of thumb

Every prop value you write — text, enum, aspect ratio, boolean — should be something you picked after reading
the real (non-CodeConnect) DOM, not something you copied from the snippet. If you can't say which node in the
drilled-in DOM justifies the value, gather more before committing it.

## Assets: always download, store, and serve locally

Figma MCP asset URLs (`https://www.figma.com/api/mcp/asset/<uuid>`) are valid for only ~7 days. Do **not**
inline them anywhere. Download the asset first, save it into the project (e.g. `public/images/...` or
`src/assets/...`), and reference the local path.

Do **not** substitute unrelated stock photos (Unsplash, Picsum, Lorem Picsum, etc.) for the designer's assets.
The real images are part of the design.

The right workflow for every image in a Figma design:

1. Drill into the node (per the composite section above) to get the real asset URL — initial CodeConnect stubs
   often use `example.com/image.jpg` placeholders that hide the actual URL.
2. Download the file (`curl -o public/images/<name>.<ext> <mcp-asset-url>`). Use names that describe the
   content (`hero-fibra.png`, `partner-eurosport.svg`), not the Figma UUID.
3. Reference it from code via the local path (e.g. `/images/hero-fibra.png` in Vite projects, `/images/...` or
   `import heroFibra from './assets/hero-fibra.png'` in bundler-aware setups).
4. If you cannot resolve an asset — the URL 404s, the node has no fill, the design legitimately has no image
   there — say so explicitly and ask, rather than inventing a stock replacement.

## Verification checklist

Before closing out a section always:

- [ ] Double check every native html element or style attribute to see if there is a Mistica alternative. If
      so, always use Mistica.
- [ ] Double check every composite component on the page was fetched with: `disableCodeConnect: true` before
      writing props — regardless of whether the stub looked filled in or not.

If you can't check an item off against the DOM, re-read the DOM (with `disableCodeConnect: true` if the node
is CodeConnect-mapped) before committing the value.
