# Figma MCP

Mandatory reading whenever you are implementing UI from Figma through the Figma MCP (`get_design_context`,
`get_metadata`, `get_screenshot`, `use_figma`) or when the user provides a `figma.com/...` URL. This file only
covers the translation layer — the rest of the Mistica docs (`patterns.md`, `components.md`, `layout.md`,
`design-tokens.md`) still apply.

## Prime directive: read the DOM verbatim

The Figma MCP response gives you two things:

- a **screenshot** that shows what the design should look like
- a **DOM** (React + Tailwind) that shows what the designer specified

Use the DOM as the source of truth for every numeric and structural decision. The screenshot only validates
that your implementation matches the designer's intent.

**If you cannot point at a line in the DOM to justify a value, do not write that value.** Do not pick "nearby
nicer" numbers. Do not default to Mistica's 16 / 24 / 32 vertical rhythm when the DOM is explicit. If Figma
says `72`, use `72`; if Figma says `justify-between`, use `space="between"` — not an invented fixed gap.

## Mapping Figma flex to Mistica layout primitives

| Figma / Tailwind                        | Mistica                                             |
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

| Primitive        | Allowed values                                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Box` `padding*` | `0 \| 2 \| 4 \| 8 \| 12 \| 16 \| 20 \| 24 \| 32 \| 40 \| 48 \| 56 \| 64 \| 72 \| 80`                                                     |
| `Stack` `space`  | `0 \| 2 \| 4 \| 8 \| 12 \| 16 \| 24 \| 32 \| 40 \| 48 \| 56 \| 64 \| 72 \| 80` + `"between" \| "around" \| "evenly"`                     |
| `Inline` `space` | `-16 \| -12 \| -8 \| -4 \| -2 \| 0 \| 2 \| 4 \| 8 \| 12 \| 16 \| 24 \| 32 \| 40 \| 48 \| 56 \| 64` + `"between" \| "around" \| "evenly"` |

`Inline` notably allows negative values and caps at 64; `Stack` starts at 0 and caps at 80; `Box` includes
`20` which the others don't. If Figma says `gap-[10px]`, it doesn't fit any of these — round to `8` or `12`
and flag it, don't invent a CSS override.

## The single-child gap trap

A `flex gap-[Npx]` class applied to a wrapper that has **only one child** renders no space — gap is between
siblings, not around a solo child. Figma's MCP output often stacks wrappers this way:

```tsx
<div className="flex gap-[72px] ...">
  <div className="flex ...">
    {' '}
    {/* single child */}
    <FirstColumn />
  </div>
  <div className="flex gap-[48px] ...">
    {' '}
    {/* single child — the 48 never renders */}
    <SecondColumn />
  </div>
  <div className="flex gap-[48px] ...">
    {' '}
    {/* single child — the 48 never renders */}
    <ThirdColumn />
  </div>
</div>
```

The real spacing here is `72px` (from the outer wrapper). The `48px` on each inner wrapper is dead CSS. When
you see this pattern, use the parent's gap and ignore the child wrappers' gaps.

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

Font weight is handled by the Mistica text components (`Text1`-`Text4` accept `light` / `regular` / `medium` /
`bold`; `Text5`-`Text10` and `Title1`-`Title4` have a fixed weight per skin). Map Figma's `font-weight/text5`
to the matching component (e.g. `Text5`), not to a CSS `font-weight`.

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

The usual composites: `Hero`, `CoverHero`, `Header`, `CoverCard`, `MediaCard`, `DataCard`, `NakedCard`,
`PosterCard`, `DisplayMediaCard`, `Callout`, `EmptyState`, `EmptyStateCard`, `Row`, `BoxedRow`, anything with
a slot. Pure atoms (`IconTruckRegular` and similar, plain `ButtonPrimary`/`ButtonSecondary`/`ButtonLink`) have
a single content slot — the snippet plus the screenshot is usually enough, but if anything looks off, drill in
anyway.

### How snippets go wrong

Some failure modes to keep in mind — not as a checklist of things to detect, but as reasons to gather the
underlying data rather than read values off the snippet:

- **Stub content** — `title="Title"`, `description="Description"`, `imageSrc="https://example.com/image.jpg"`,
  `aspectRatio="16:9"` on non-landscape media.
- **Values that happen to match the schema but don't match the design** — `variant="default"` on a card that
  actually renders inverse; `type="info"` where the real node resolves to `--tagbackgroundpromo`;
  `size="default"` on a snap-size card. These pass type checks silently.
- **Mis-mapped content slots** — a price block under a title looks like it belongs in `description`, but the
  real node lives in a separate content slot that maps to `extra`. The snippet may say `description="..."`,
  may omit it, may stub it — only the real DOM tells you the correct prop.
- **Stale prop names after an API change** — `backgroundImage` on `CoverCard` when the current API is
  `imageSrc`; `isInverse` where `variant` is now preferred.
- **Noisy artifacts** — `🔄ReplaceSlot="5267:4885"`, `asset="ERROR"`, `footer="false"` (string instead of
  boolean), conflicting component imports at the top of the output.

### Rule of thumb

Every prop value you write — text, enum, aspect ratio, boolean — should be something you picked after reading
the real (non-CodeConnect) DOM, not something you copied from the snippet. If you can't say which node in the
drilled-in DOM justifies the value, gather more before committing it.

## Assets: always download, store, and serve locally

Figma MCP asset URLs (`https://www.figma.com/api/mcp/asset/<uuid>`) are valid for only ~7 days. Do **not**
inline them anywhere — not in committed code, not in dev-only code, not as "temporary" placeholders. Every
time you would paste a Figma MCP URL, download the asset first, save it into the project (e.g.
`public/images/...` or `src/assets/...`), and reference the local path.

Do **not** substitute unrelated stock photos (Unsplash, Picsum, Lorem Picsum, etc.) for the designer's assets.
The real images are part of the design — an Xbox controller in the Figma means Xbox, not a random
phone-on-a-table from a stock library. Substituting unrelated images is the same failure class as picking an
unrelated spacing value.

The right workflow for every image in a Figma design:

1. Drill into the node (per the composite section above) to get the real asset URL — initial CodeConnect stubs
   often use `example.com/image.jpg` placeholders that hide the actual URL.
2. Download the file (`curl -o public/images/<name>.<ext> <mcp-asset-url>`). Use names that describe the
   content (`hero-fibra.png`, `partner-eurosport.svg`), not the Figma UUID.
3. Reference it from code via the local path (e.g. `/images/hero-fibra.png` in Vite projects, `/images/...` or
   `import heroFibra from './assets/hero-fibra.png'` in bundler-aware setups).
4. If you cannot resolve an asset — the URL 404s, the node has no fill, the design legitimately has no image
   there — say so explicitly and ask, rather than inventing a stock replacement.

The only acceptable exception is when the Figma file itself uses a stub URL (`https://example.com/image.jpg`),
in which case drilling in confirmed there is no real asset, and a placeholder is appropriate — but it should
still be a committed asset in the project (e.g. a branded silhouette or a neutral grey rectangle), not a live
external URL.

## Verification checklist

Before closing out a section, be able to justify every decision against the DOM:

- [ ] For every composite component on the page (card, hero, header, callout, row…), you fetched the node with
      `disableCodeConnect: true` before writing props — regardless of whether the stub looked filled in or
      not.
- [ ] Every text node in the screenshot maps to a specific Mistica prop that you can point at in the real
      (non-CodeConnect) DOM. The price line could be `description`, `extra`, or a custom slot; only the
      drilled-in DOM tells you which.
- [ ] Every non-text prop (`aspectRatio`, `size`, `variant`, image URL, boolean flags) traces to an attribute
      you read from the real DOM, not from the CodeConnect stub. These match the schema even when wrong and
      typechecks won't catch them.
- [ ] Every `space={N}` / `padding={N}` / `gap={N}` traces to a `gap-[Npx]` / `p-[Npx]` class on a wrapper
      that actually renders it (not a single-child wrapper), or to a nearest-scale round with a one-line
      comment explaining the original value.
- [ ] Every `space="between" | "around" | "evenly"` traces to the matching `justify-*` class.
- [ ] Every color uses `skinVars.colors.*`, not a hex or `var(--...)` literal.
- [ ] Every font decision comes from the global `GlobalStyles` + the skin's defaults, not from a per-node
      class.
- [ ] Every mapped component uses current Mistica props, not the literal attribute list from the
      `CodeConnectSnippet`.

If you can't check an item off against the DOM, re-read the DOM (with `disableCodeConnect: true` if the node
is CodeConnect-mapped) before committing the value.
