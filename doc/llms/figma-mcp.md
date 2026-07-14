# Figma MCP

Mandatory reading whenever you are implementing UI from Figma through the Figma MCP or when the user provides
a `figma.com/...` URL. This file only covers the translation layer — the rest of the Mistica docs
(`patterns.md`, `components.md`, `layout.md`, `design-tokens.md`) still apply.

## Step 0: ask the user whether to run the verifier

Before fetching any Figma node or writing any code, ask the user this question exactly once (use a
structured-question tool if your harness has one):

- **Question**:
  `Run the verifier loop after implementing? It compares the rendered app against Figma both visually (Playwright screenshot) and structurally (DOM + rule audit), then iterates fixes.`
- **Options**:
  - **Yes, run the verifier** — recommended when fidelity matters. Catches drift the implementer can't see. It
    will take more time and cost more tokens.
  - **No, skip the verifier** — faster path. The agent still self-checks and reviews its work, but no
    independent comparison runs.

Remember the answer for the rest of this task. **One answer covers the whole implementation — do not re-ask
per section.** If the user opted in, run the [verifier loop](#verifier-loop-run-before-declaring-done). If
they opted out, do not spawn the verifier; the self-checks are the only gate.

## Prime directive: read the DOM verbatim

The Figma MCP response gives you two things:

- a **screenshot** that shows what the design should look like
- a **DOM** that shows what the designer specified

Use the DOM as the source of truth for every numeric and structural decision. The screenshot only validates
that your implementation matches the designer's intent.

**If you cannot point at a line in the DOM to justify a value, do not write that value.** Do not pick "nearby
nicer" numbers.

## Mapping Figma layout to Mistica layout primitives

| Figma                                                   | Mistica                                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `flex gap-[Npx]` (vertical — has `flex-col`)            | `Stack space={N}`                                                                                |
| `flex gap-[Npx]` (horizontal — no `flex-col`)           | `Inline space={N}`                                                                               |
| Full-width section with `px-[48/32/16px]`, **no** `grid-cols` | `ResponsiveLayout` (responsive side margins; content stacks inside) |
| `grid grid-cols-[repeat(12,…)]` on a full-width section | `GridLayout` (inside a `ResponsiveLayout`) — see [Reading grid sections](#reading-grid-sections) |
| `col-[S/span_N]` on a grid child                        | a `GridLayout` column of span `N` (drives the `template`)                                        |
| `justify-between`                                       | `Inline space="between"`                                                                         |
| `justify-around`                                        | `Inline space="around"`                                                                          |
| `justify-evenly`                                        | `Inline space="evenly"`                                                                          |
| `items-center`                                          | `alignItems="center"` on `Inline`                                                                |
| `flex-wrap`                                             | `wrap` on `Inline`                                                                               |
| `p-[Npx]` / `px-[Npx]` / `py-[Npx]`                     | `Box padding={N}` / `paddingX={N}` / `paddingY={N}`                                              |
| `rounded-[var(--radii/container,...)]`                  | `Boxed` (or `skinVars.borderRadii.container`)                                                    |
| `bg-[var(--background...)]`                             | `ResponsiveLayout variant` or `Boxed variant`                                                    |

Each spacing primitive has its own allowed scale. Figma values outside the scale must be rounded to the
nearest allowed value and noted — never silently apply arbitrary CSS.

**Vertical vs. horizontal flex.** The presence of `flex-col` is the deciding signal: `flex` with `flex-col`
is a `Stack`; `flex` without it is an `Inline`. A `flex flex-[1_0_0]` child fills its track — map it to a
component sized to fill its `Inline` / `GridLayout` slot, not to a fixed width.

## Reading grid sections

A full-width section laid out as a 12-column grid is a `GridLayout`. The MCP output makes this explicit — the
section `div` carries `grid grid-cols-[repeat(12,minmax(0,1fr))]` (plus `gap-x-[24px]` on desktop / `16px` on
tablet), and each direct child carries a `col-[start/span_N]` class. Read the `span_N` of each non-empty child
(ignore empty spacer `div`s), in order, and match the sequence to a `GridLayout` template:

| Child column spans, in order | `GridLayout`                                   |
| ---------------------------- | ---------------------------------------------- |
| 6, 6                         | `template="6+6"` (`left` / `right`)            |
| 8, 4                         | `template="8+4"` (`left` / `right`)            |
| 4, 6                         | `template="4+6"` (`left` / `right`)            |
| 3, 9                         | `template="3+9"` (`left` / `right`)            |
| 5, 4                         | `template="5+4"` (`left` / `right`)            |
| single span 10               | `template="10"` (`children`)                   |
| single span 8                | `template="8"` (`children`)                    |
| anything else                | no `template` — pass `children` (raw 12-col grid) |

Rules:

- **Wrap the `GridLayout` in a `ResponsiveLayout`.** `ResponsiveLayout` supplies the responsive side margins
  only (it has no columns); `GridLayout` supplies the 12-column structure. The section's `px-[48px]` /
  `px-[32px]` / `px-[16px]` is the `ResponsiveLayout` margin — do not re-apply it as `Box` padding. The
  section's `py-[Npx]` is real vertical padding → `Box paddingY={N}` inside.
- **Match the template; never hand-build the grid.** Do not emit a raw `<div style={{display:'grid'}}>`, a
  fixed-width flex row, or manual spacer columns. The spacer-span templates (`4+6`, `5+4`, `10`, `8`) render their
  own spacer columns internally — select the named `template` and ignore any empty spacer `div`s the MCP DOM
  shows around the content.
- **Background variant comes from the section fill**, not the grid: `bg-[var(--backgroundalternative,…)]` →
  `ResponsiveLayout variant="alternative"` (likewise `--backgroundbrand` → `"brand"`, `--backgroundnegative`
  → `"negative"`, an image/video background → `"media"`); plain `bg-[var(--background,…)]` → default.
- **Mobile is the same `GridLayout`.** When the design stacks the grid to a single column on mobile, that is
  `GridLayout`'s own responsive behaviour (it collapses to one column) — keep one `GridLayout`; do not branch
  to a separate `Stack`.

Worked example (the `3+9` data section: a filter sidebar beside a table):

```tsx
<ResponsiveLayout variant="default">
  <Box paddingY={32}>
    <GridLayout template="3+9" left={<FilterPanel />} right={<DataTable />} />
  </Box>
</ResponsiveLayout>
```

Do not wrap components that embed their own `ResponsiveLayout` (e.g. `MainNavigationBar`, `NavigationBar`,
`Tabs` — see the list in `layout.md`) in another `ResponsiveLayout`.

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

## Verification checklist

Before closing out a section always:

- [ ] Double check every native html element or style attribute to see if there is a Mistica alternative. If
      so, always use Mistica.
- [ ] Double check every composite component on the page was fetched with: `disableCodeConnect: true` before
      writing props — regardless of whether the stub looked filled in or not.

If you can't check an item off against the DOM, re-read the DOM (with `disableCodeConnect: true` if the node
is CodeConnect-mapped) before committing the value.

## Verifier loop (run before declaring done)

Skip if the user opted out in [Step 0](#step-0-ask-the-user-whether-to-run-the-verifier).

Spawn a **new** subagent (via your harness's subagent mechanism — e.g. Claude's `Agent` tool with
`subagent_type: general-purpose`, Codex's equivalent) pointed at
[agents/figma-verifier.md](./agents/figma-verifier.md). Never reuse a subagent across iterations. Pass in the
prompt:

- Figma `fileKey` and entry `nodeId`
- Implementation file paths you wrote or edited
- Dev-server command and URL (check `package.json`)

If the verifier reports clean, done. Otherwise fix the cited issues — each fix justified by Figma DOM or
screenshot — and re-run with a fresh subagent. Stop after clean, 3 iterations, or out-of-scope issues (missing
tokens, designer clarification — surface these instead of fudging).
