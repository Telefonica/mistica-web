---
name: mistica-figma
description: >
  Build Figma screens that USE Mistica — Telefonica's design system — as the chosen design library. Captures
  Mistica's library layout, component keys, text-preset scale, colour tokens and icons. Use this skill
  alongside the generic Figma build skills. This is a design-time consumer skill; do NOT use it when
  developing the mistica-web library source (components, stories, or tests).
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
---

# Mistica Figma - Telefonica Design System

Mistica is Telefonica's multi-brand design system. This skill is the Mistica-specific layer under the generic
Figma build skills. It does not replace them — load all together.

## When to Apply

- The chosen design system for a Figma build is Mistica (Telefonica).
- The file has the Mistica libraries subscribed (Desktop, Mobile, Skins, Icons, Accessibility Annotation).
- The user mentions Mistica, Telefonica DS, or a Telefonica brand (Movistar, O2, Vivo, Blau, Telefonica).

## Mistica library layout

Mistica publishes several libraries; discover keys with `get_libraries({ fileKey })`. Roles:

| Library                              | Holds                             | Use for                         |
| ------------------------------------ | --------------------------------- | ------------------------------- |
| **Mistica Desktop**                  | desktop components (`[D]` suffix) | screen components on desktop    |
| **Mistica Mobile**                   | mobile components                 | mobile/tablet screens           |
| **Mistica Skins**                    | styles + variables                | typography + tokens, all brands |
| **Mistica Icons**                    | icon components                   | icons (instance, don't redraw)  |
| **Mistica Accessibility Annotation** | a11y annotation stamps            | accessibility review markup     |

## Typography

Mistica text styles live in Skins as `desktop/text-preset-N` (and `mobile/…`). The one ordering fact to
remember: higher N = larger (the opposite of most ramps). Discover the presets live and pick by size, then
weight (see below).

All text must use Mistica typography — never a hardcoded font. Either apply a published text style
(`node.textStyleId = style.id`) or bind the Mistica font-family variable. Both are wired to the active brand
via Figma variables, so switching skin changes the font automatically. You still must `loadFontAsync` whatever
font the style/variable currently resolves to before setting `characters` — just never hardcode the family
name.

### Match size and weight

A preset bundles size and line height; the brand variable supplies the family. So beyond size you must pick
one axis: **weight**. Body presets (1–4) ship in light / regular / medium / bold — same size, different
weight. Selecting by size alone inherits an arbitrary weight (for example a Medium nav label landing on
`desktop/text-preset-1/bold` and looking too heavy). Choose weight deliberately — from the source when
reconstructing, or from role when designing fresh (headings bold, body regular, labels/nav medium) — and
import that specific variant (`desktop/text-preset-N/medium`, etc.) before binding.

### Preload brand font families before writing characters

Mistica text presets bind the font **family to a variable** that resolves per the active skin, so the
effective font is not necessarily the one reported by `node.fontName` or `getStyledTextSegments`. For example,
under the Cyber skin a preset resolves to `Telefonica Sans` even when the node reports `Movistar Sans`. The
canonical "load `node.fontName` before setting `characters`" recipe is therefore insufficient and throws
`Cannot write to node with unloaded font …`.

Before writing `characters` on any preset- or variable-styled text, either:

- preload the brand font families in the common weights (for example `Telefonica Sans` and `Movistar Sans` ×
  Light / Regular / Medium / Bold), or
- resolve the bound font-family variable for the active mode and `loadFontAsync` exactly that family.

## Colour, surface & radii tokens

Mística Skins exports colour tokens in two forms: **variables** and **paint styles**. Never hardcode hex/px.
Discover both live per run via `search_design_system` scoped to the Mística Skins library key with both
`includeVariables: true` and `includeStyles: true`. Apply each form correctly:

- **Variable** → `setBoundVariableForPaint` (fills/strokes) or `setBoundVariable` (radii).
- **Paint style** → `node.fillStyleId = style.id` (or `strokeStyleId`).

When resolving a token by name, check variables first, then styles — use whichever form Skins publishes it in.
Some tokens (for example backgrounds that carry gradients) are styles, not variables; using
`setBoundVariableForPaint` on a style-only token will silently fail.

Radii are exported as variables; always bind them rather than using a literal corner value.

### Variable collections

Mistica Skins publishes two variable collections: **brand** and **mode**. Only use variables from the
**brand** collection. Never bind variables from the **mode** collection — those are internal to the design
system and are not intended for direct consumption. When `search_design_system` returns variables, filter to
those whose `variableCollectionName` (or equivalent field) is `brand` before selecting a variable to bind.

Screen-level frames (the outermost frame representing a full screen or page) must always have an explicit
background fill bound to a Skins background variable — never transparent or unfilled. When a screen contains
sections with different background colours, keep the base fill on the screen frame (typically `background`)
and layer each distinct section as a child frame with its own background fill on top. Do not rely solely on
section fills to cover the screen.

### Never ship a default white fill

`figma.createFrame()` returns a frame with a default **opaque white fill**. This also applies to frames you later
turn into auto-layout by setting `layoutMode`. That fill is unbound `#FFFFFF`: it blends into a white page in
light mode but stays white when the skin switches to dark mode, producing white blocks. This survives most
often on intermediate **arrangement / container** frames (page headers, KPI rows, section headers), not just
screen frames.

The rule: every frame you create — screen, section, or arrangement — must immediately either be set to
`fills = []` (transparent, letting the screen background show through) or have its fill bound to a Skins
background variable (`background` / `backgroundContainer`). Never leave the `createFrame`
default white fill in place (including on frames you later set to auto-layout).

**Validation step.** After building, scan the new tree for SOLID near-white fills with no bound variable
(`!node.boundVariables?.fills`) and rebind or clear each hit before finishing.

### Theme context

Set the theme context to match the background underneath: use alternative over `backgroundAlternative`, brand
over `backgroundBrand`, negative over `backgroundNegative`, and media over an image or video.

## Layout

### Frame sizing

Three form factors. Width is fixed; height starts at the minimum and grows with content (hug vertically, never
below the minimum):

| Form factor | Width   | Min height |
| ----------- | ------- | ---------- |
| Mobile      | 375 px  | 812 px     |
| Tablet      | 834 px  | 1194 px    |
| Desktop     | 1440 px | 1024 px    |

### Full-viewport-width constraint

`ResponsiveLayout` and `GridLayout` frames must be **direct children of the screen frame**. Nesting them
inside a narrower custom parent breaks padding and column math.

### Full-screen sections — background and padding rule

Both responsive layout frames and grid layout frames represent **full-screen-width sections**. They must
always span the full width of the screen frame and carry their own background fill — never rely on the screen
frame's background to show through the padding areas.

**The rule:** set the background fill on the layout/grid frame itself (full width), then apply padding inward.
This ensures the section's background colour covers edge to edge — padding areas included — so there are no
white gaps at the sides regardless of which Skins background variable is used.

```
Screen frame (e.g. 1440 px, background = `background`)
└── Layout/Desktop  ← width: 1440 px, fill: `backgroundAlternative`, padding: 48 px L/R
    └── content children (width constrained by padding)
```

If a section has the same background as the screen, bind it to the same variable explicitly — do not leave it
unfilled or transparent.

### Components with built-in responsive layout

These components include their own full-width layout and must be placed as **direct children of the screen
frame** — never inside a `Layout/<FormFactor>` wrapper:

Header, Hero, CoverHero, NavigationBar, MainNavigationBar, FunnelNavigationBar, FeedbackScreen, LoadingScreen,
BrandLoadingScreen, Carousel, ButtonFixedFooterLayout.

### Responsive layout frame

A responsive layout frame defines **only the horizontal padding** for a section. It is the Figma equivalent of
Mistica's `ResponsiveLayout` wrapper. Use it for any full-width section — whether the content inside is
stacked vertically, arranged in a horizontal row, or a mix.

It is always a **vertical auto-layout frame**, full screen width, hug height, with horizontal padding matching
the form factor. It is a direct child of the screen frame. Its role is padding only — never use the layout
frame itself as the horizontal arrangement layer.

**Arranging children horizontally (Mistica `Inline`).** When items within a section sit side by side (e.g. a
row of KPI cards, a row of filter chips), create a **horizontal auto-layout child frame** with no extra
padding inside the layout frame. That inner frame is the arrangement layer; the outer layout frame remains
vertical. Never set the layout frame's own `layoutMode` to `HORIZONTAL`.

```
Layout/Tablet  (VERTICAL, padding 32 px L/R)      ← ResponsiveLayout
└── Inline row (HORIZONTAL, no padding, hug)       ← Inline
    ├── KPI Card — Uptime
    └── KPI Card — Conversion
```

**Naming:** if no other skill has already named this frame, name it `Layout/<FormFactor>` (e.g.
`Layout/Mobile`). If another skill has already given the frame a semantic name (e.g. `Hero Section`), keep
that name and append the layout convention: `Hero Section — Layout/Mobile`. Never override a name set by
another skill.

| Form factor | Width   | Horizontal padding |
| ----------- | ------- | ------------------ |
| Mobile      | 375 px  | 16 px              |
| Tablet      | 834 px  | 32 px              |
| Desktop     | 1440 px | 48 px              |

Set `itemSpacing` to 0; child sections define their own vertical spacing.

### Never use empty spacer frames

Drive all vertical rhythm from auto-layout `itemSpacing`. Never insert empty fixed-height frames as vertical
spacers — they do not reflow, break on content change, and litter the layer tree. For variable gaps between
sections, group the sections into nested auto-layout frames, each with its own `itemSpacing`, rather than
padding the gaps with empty frames.

### Grid layout frame

A grid layout frame defines **both the horizontal padding and the column structure** of a section. It is the
Figma equivalent of Mistica's `GridLayout`. Use it only when content must align to a specific 12-column
template — split layouts (`6+6`, `8+4`, `3+9`, etc.) or centred single-column layouts (`10`, `8`). Do not use
a grid frame for a simple horizontal row of items where column alignment to a 12-column grid is not required —
use a `Layout/<FormFactor>` frame with an `Inline` child instead (see above).

It is a direct child of the screen frame (or of a `Layout/<FormFactor>` frame when the section shares a
background with adjacent full-width content).

**Use Figma's native grid layout mode for every grid section on every form factor.** A section that is a grid
on tablet/desktop must also be a grid on mobile — do NOT replace it with a plain `Layout/Mobile` frame. The
only difference on mobile is the column count (1) and row count (2). Do NOT use `layoutMode = "HORIZONTAL"`
with manual widths on any form factor.

**Tablet / Desktop** (`gridColumns = 12`, `gridRows = 1`):

```js
// 1. Create the grid frame
const gridFrame = figma.createFrame();
gridFrame.layoutMode = 'GRID';
gridFrame.gridColumns = 12;
gridFrame.gridRows = 1;
gridFrame.columnGap = 24; // gutter: 24px desktop, 16px tablet
gridFrame.rowGap = 0;
gridFrame.paddingLeft = 48; // 48px desktop, 32px tablet
gridFrame.paddingRight = 48;
gridFrame.layoutSizingHorizontal = 'FILL';

// 2. Append children FIRST, then set spans and sizing
// CRITICAL: gridColumnSpan must be set AFTER appendChild — setting it before resets to 1.
const leftChild = figma.createFrame();
gridFrame.appendChild(leftChild);
leftChild.gridColumnSpan = 6; // e.g. 6+6 template — adjust per template
leftChild.layoutSizingHorizontal = 'FILL';

const rightChild = figma.createFrame();
gridFrame.appendChild(rightChild);
rightChild.gridColumnSpan = 6;
rightChild.layoutSizingHorizontal = 'FILL';

// 3. Add layout grid overlay (column guides)
gridFrame.layoutGrids = [
  {
    pattern: 'COLUMNS',
    count: 12,
    gutterSize: 24,
    offset: 48,
    alignment: 'STRETCH',
    sectionSize: 0,
    visible: true,
    color: {r: 0.07, g: 0.4, b: 1, a: 0.08},
  },
];
```

**Mobile** (`gridColumns = 1`, `gridRows = 2`) — same section, stacked layout:

```js
const gridFrame = figma.createFrame();
gridFrame.layoutMode = 'GRID';
gridFrame.gridColumns = 1;
gridFrame.gridRows = 2; // left content row 1, right content row 2
gridFrame.columnGap = 0;
gridFrame.rowGap = 16; // vertical spacing between rows
gridFrame.paddingLeft = 16;
gridFrame.paddingRight = 16;
gridFrame.layoutSizingHorizontal = 'FILL';

// Top child (maps to left on tablet/desktop)
const topChild = figma.createFrame();
gridFrame.appendChild(topChild);
topChild.gridColumnSpan = 1;
topChild.layoutSizingHorizontal = 'FILL';

// Bottom child (maps to right on tablet/desktop)
const bottomChild = figma.createFrame();
gridFrame.appendChild(bottomChild);
bottomChild.gridColumnSpan = 1;
bottomChild.layoutSizingHorizontal = 'FILL';

gridFrame.layoutGrids = [
  {
    pattern: 'COLUMNS',
    count: 1,
    gutterSize: 0,
    offset: 16,
    alignment: 'STRETCH',
    sectionSize: 0,
    visible: true,
    color: {r: 0.07, g: 0.4, b: 1, a: 0.08},
  },
];
```

Form factor values:

| Form factor | Width   | `gridColumns` | `gridRows` | `columnGap` | `paddingLeft/Right` |
| ----------- | ------- | ------------- | ---------- | ----------- | ------------------- |
| Mobile      | 375 px  | 1             | 2          | 0 px        | 16 px               |
| Tablet      | 834 px  | 12            | 1          | 16 px       | 32 px               |
| Desktop     | 1440 px | 12            | 1          | 24 px       | 48 px               |

**Row and gap behaviour.**

- **Tablet and Desktop:** 1 row. All children sit side by side, spaced by `columnGap`.
- **Mobile:** 1 column, 2 rows. The left content from tablet/desktop goes in row 1 (top); the right content
  goes in row 2 (bottom). Use `rowGap` for vertical spacing.

**Column spans.** Set `gridColumnSpan` on each child to match the template:

| Template | Children (left → right)                                                     |
| -------- | --------------------------------------------------------------------------- |
| `6+6`    | content span 6, content span 6                                              |
| `8+4`    | content span 8, content span 4                                              |
| `4+6`    | content span 4, content span 8                                              |
| `5+4`    | spacer span 1, content span 5, spacer span 1, content span 4, spacer span 1 |
| `3+9`    | content span 3, content span 9                                              |
| `10`     | spacer span 1, content span 10, spacer span 1                               |
| `8`      | spacer span 2, content span 8, spacer span 2                                |

For templates with spacers, add invisible spacer frames (`fills = []`, `strokes = []`) with the specified
`gridColumnSpan` values.

**Naming:** name the frame semantically (e.g. `Hero`, `Data Section`). Appending the template convention
(`Hero — Grid/6+6/Desktop`) is optional human annotation — `layoutMode = "GRID"` and `gridColumnSpan` are the
load-bearing signal, not the name.

**Mandatory grid validation.** After creating each grid frame (on every form factor), make a separate
`use_figma` call to verify it before continuing. If the check fails, fix the frame in the same turn — do not
proceed to the next section.

```js
// Run this in a dedicated use_figma call immediately after creating the grid frame.
// Replace NODE_ID with the id returned when you created the grid frame.
const frame = figma.getNodeById('NODE_ID');
const ok = frame.layoutMode === 'GRID';
const colsOk = frame.gridColumns === 12; // 1 on mobile
const rowsOk = frame.gridRows === 1; // 2 on mobile
return {
  layoutMode: frame.layoutMode,
  gridColumns: frame.gridColumns,
  gridRows: frame.gridRows,
  valid: ok && colsOk && rowsOk,
};
```

If `valid` is `false`, the frame was built incorrectly — stop, delete it, and recreate it using the code
snippet above before moving on.

## Component coverage — instance vs. hand-compose

Component names below are written without a suffix. In the Desktop library each name carries a `[D]` suffix,
so search for it that way (a search for `Table` matches `Table [D]`); Mobile uses its own naming. Discover
keys live (scoped to the Mistica library keys from `get_libraries`); don't hardcode them. Icons: instance from
the Mistica Icons library (find by name search) — don't redraw or use `createNodeFromSvg` for brand icons.

Avoid deprecated components — Mistica flags them in the component description (e.g. `Carousel arrows`). Also
avoid `Community/…` components, which are not core to the design system, unless the user explicitly requests
one.

## Slots — extend components instead of hand-composing

Most Mistica components expose a slot: a `Slot` BOOLEAN toggle paired with a `🔄 Replace Slot` INSTANCE_SWAP
property (cards also have a `Footer slot`, the nav bar a `NavBar Slot`, etc.). A slot lets you drop custom
content into a real, DS-linked instance — keeping its padding, radius, theming, and tokens — instead of
rebuilding the container by hand. Treat this as the default path for anything bespoke:

1. **Reuse the component's own layers first.** Set the built-in title / subtitle / description / content /
   text props before reaching for a slot.
2. **Put the rest in the slot.** When content doesn't fit a built-in layer, enable the slot and swap your
   custom node into the `🔄 Replace Slot` INSTANCE_SWAP (build the custom content as a frame/component first,
   then point the swap at it).
3. **Build custom cards on a base, not from scratch.** Prefer a card component as the container and fill it
   via its layers + slot, rather than hand-composing a card frame with raw fills and strokes.

Before deciding to hand-compose anything, probe the candidate component's `componentProperties` for a `Slot` /
`Replace Slot` pair — slots exist across cards, tables, nav bars, and more. Only hand-compose when no
component + slot can carry the content.

### Slot composition recipe

To place composite content into a host, use its slot — not an absolute overlay:

1. Build the slot content as a **local master `COMPONENT`**
2. Enable the host slot and point the swap at that component

**Reset the swapped text after swapping.** Figma carries the placeholder instance's text **override** onto the
matching text node in the swapped-in component, so the wrong text can render silently even when the master
component's own text is correct. After `swapComponent` into a slot, explicitly set the swapped instance's text
node `characters` — do not rely on the master's text.

## Procedure

Load alongside the Figma build skills before any `use_figma` call.

1. `get_libraries({ fileKey })` → confirm which Mistica libraries are subscribed; capture their keys.
2. Resolve assets scoped to the Mistica library keys via
   `search_design_system({ includeLibraryKeys: [...] })`: components, text styles, colour variables, and
   colour styles — always pass both `includeVariables: true` and `includeStyles: true` so tokens published in
   either form are discovered. Cross-check the catalog; update it when keys differ.
3. Probe a component's `componentProperties` once before populating (text props live on TEXT layers like
   `Title`, `Action`, `Text`; toggles are BOOLEAN variant props). See `design-brief-to-figma` Step 3.
4. Build per `figma-use` rules: import by key, instance, set text props, bind tokens, apply text styles.
   Before any `characters` edit, preload the brand font families (or load the variable-resolved family) per
   the Typography section — do not rely on the node's reported `fontName`.

## Multi-brand skins

Brand is driven by Figma variable modes in Skins. Inherit whatever skin/mode the file is set to — do not
switch brands or set an explicit mode. Because text and colour are bound to variables, the same build renders
correctly under any brand the file selects.

## Conventions

- Always load alongside the Figma build skills.
- Discover live, per run — components, text styles, and tokens via `get_libraries` + `search_design_system`
  scoped to the Mistica library keys. Never hardcode keys; there is no static catalog. (Mobile/tablet
  components: discover per run too.)
- Bind colours/radii to Skins variables; apply published text styles or the font-family variable. Never
  hardcode hex / px / font.
- Inherit the file's active skin/mode; don't switch brands.
