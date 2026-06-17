---
name: mistica-figma
description: >
  Teaches the agent how to build Figma screens with Mistica — Telefonica's design system. Captures Mistica's
  library layout, component keys, text-preset scale, colour tokens and icons. Use this skill alongside the
  generic Figma build skills.
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
remember: higher N = larger (the opposite of most ramps). Discover the presets live and pick by size.

All text must use Mistica typography — never a hardcoded font. Either apply a published text style
(`node.textStyleId = style.id`) or bind the Mistica font-family variable. Both are wired to the active brand
via Figma variables, so switching skin changes the font automatically. You still must `loadFontAsync` whatever
font the style/variable currently resolves to before setting `characters` — just never hardcode the family
name.

## Colour, surface & radii tokens

All colour, surface, and radius values come from Skins variables — bind them (`setBoundVariableForPaint` for
colour, `setBoundVariable` for radii), never hardcode hex/px. Discover them live per run. Common ones:
`textPrimary`, `textSecondary` (text); `borderLow`, `divider` (lines); `controlActivated` (accent /
selection); and `backgroundContainer` for the fill of cards and any boxed container — use it instead of a
white fill. Radii are exported by Skins too; bind the relevant radius token rather than a literal corner
value.

### Theme context

Set the theme context to match the background underneath: use alternative over `backgroundAlternative`, brand
over `backgroundBrand`, negative over `backgroundNegative`, and media over an image or video.

## Component coverage — instance vs. hand-compose

Component names below are written without a suffix. In the Desktop library each name carries a `[D]` suffix,
so search for it that way (a search for `Table` matches `Table [D]`); Mobile uses its own naming. Discover
keys live (scoped to the Mistica library keys from `get_libraries`); don't hardcode them. Icons: instance from
the Mistica Icons library (find by name search) — don't redraw or use `createNodeFromSvg` for brand icons.

Avoid deprecated components — Mistica flags them in the component description (e.g. `Carousel arrows`). Also
avoid `Community/…` blocks, which are not core to the design system, unless the user explicitly requests one.

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
3. **Build custom cards on a base, not from scratch.** Prefer a card component (e.g. `Data Card`, or a
   boxed/primitive card) as the container and fill it via its layers + slot, rather than hand-composing a card
   frame with raw fills and strokes.

Before deciding to hand-compose anything, probe the candidate component's `componentProperties` for a `Slot` /
`Replace Slot` pair — slots exist across cards, tables, nav bars, and more. Only hand-compose when no
component + slot can carry the content.

## Procedure

Load alongside the Figma build skills before any `use_figma` call.

1. `get_libraries({ fileKey })` → confirm which Mistica libraries are subscribed; capture their keys.
2. Resolve assets scoped to the Mistica library keys via
   `search_design_system({ includeLibraryKeys: [...] })`: components, text styles (`includeStyles`), colour
   variables (`includeVariables`). Cross-check the catalog; update it when keys differ.
3. Probe a component's `componentProperties` once before populating (text props live on TEXT layers like
   `Title`, `Action`, `Text`; toggles are BOOLEAN variant props). See `design-brief-to-figma` Step 3.
4. Build per `figma-use` rules: import by key, instance, set text props, bind tokens, apply text styles. Load
   the brand font (from the style's `fontName`) before any `characters` edit.

## Multi-brand skins

Brand (Movistar / O2 / Vivo / Blau / Telefonica) is driven by Figma variable modes in Skins. Inherit whatever
skin/mode the file is set to — do not switch brands or set an explicit mode. Because text and colour are bound
to variables, the same build renders correctly under any brand the file selects.

## Conventions

- Always load alongside the Figma build skills.
- Discover live, per run — components, text styles, and tokens via `get_libraries` + `search_design_system`
  scoped to the Mistica library keys. Never hardcode keys; there is no static catalog. (Mobile/tablet
  components: discover per run too.)
- Bind colours/radii to Skins variables; apply published text styles or the font-family variable. Never
  hardcode hex / px / font.
- Inherit the file's active skin/mode; don't switch brands.
