# design-sync notes — @telefonica/mistica (storybook shape)

Target project: `Mística Design System` (`f89f58fb-1a7c-4bea-ac56-84fcdbec0a3e`).

## Build setup

- `yarn build` produces `dist/` (CJS) and `dist-es/` (ESM). Node >= 24.
- Reference storybook: `npx storybook build -c .storybook -o .design-sync/sb-reference`,
  then **`node .design-sync/clean-index.mjs`** (see Private stories below).

## Fixes applied (each maps to a committed file)

- **[GENERAL] `package.json` had no `types` field.** TypeScript infers it from
  `main` → `dist/index.d.ts`, but the converter's `dts.mjs` does not, so it found
  0 exports. Added `"types": "dist/index.d.ts"`. This is the only change outside
  `.design-sync/`.
- **[GENERAL] CJS entry yields 0 enumerable global exports.** esbuild wraps the
  CJS `dist/index.js` under `Mistica.default`. Must bundle from the ESM build.
- **[GENERAL] Icon catalogue is too large for the 5 MB upload cap.** `dist-es/index.js`
  re-exports 2162 `Icon*` components; the full bundle is ~16.8 MB (minified prod
  still 10 MB). Solution: `cfg.entry` points at a slim entry
  (`.design-sync/ds-entry.js`) that re-exports all 286 non-icon symbols + a curated
  ~127-icon common set. Regenerate after the DS adds/removes exports:
  `node .design-sync/gen-entry.mjs` (edit the CONCEPTS/FAMILIES lists there to
  tune which icons ship). Bundle lands at ~4.5 MB.
- **Provider.** `.storybook/preview.tsx` decorators fail to auto-bundle (a `.woff2`
  font import has no esbuild loader). Set `cfg.provider` =
  `ThemeContextProvider({theme: previewTheme}) > OverscrollColorProvider`. The theme
  (`previewTheme`) mirrors storybook's default `Movistar` skin and is supplied by
  `.design-sync/preview-theme.js` via `cfg.extraEntries` + a `$ref`.
- **[GENERAL] Storybook 10.2.19 ignores `main.ts`'s `stories` array in this build
  path.** Setting it to welcome-only still indexes all 261 stories (the SB10
  "manifest" indexer globs every `*-story.tsx`); the `VERCEL_PROD_BUILD` gate that
  should drop `src/__private_stories__/` has no effect. Private titles whose leaf
  collides with a public export (e.g. `Private/Deprecated Card Stories/DataCard`
  vs public `DataCard`) merge their stories into the public component, and
  deprecated stories render old APIs against the current export. Fix: strip
  `Private/*` from the reference index with `node .design-sync/clean-index.mjs`
  after every reference build. (Confirmed `main.ts` IS read — a syntax error there
  fails the build — but its `stories` array is not honored.)
- **Card previews exceeded 5 MB from inlined demo images.** Card stories import 8+
  local JPEGs (some ~1 MB) via `card-common.tsx`'s `imageNameToUrl`; the default
  story loader inlines them as dataurl into every card preview. Fix:
  `cfg.storyImports.loaders {".jpg":"file",".jpeg":"file",".mp4":"file"}` emits them
  as separate assets in `_preview/` (each < 5 MB) which upload normally.
- **[GENERAL] Component CSS mismatch — the big styling fix.** The bundle (from
  dist-es) uses versioned vanilla-extract class names (`v16_67_<hash>`), but the
  converter's `[CSS_FROM_STORYBOOK]` fallback scraped storybook's vite CSS whose
  hashes differ (`_<hash>`) — so every component rendered UNSTYLED (buttons as
  plain text). Fix: `cfg.cssEntry: "dist-es/style.css"` — the 157 KB CSS the
  dist-es build emits, with matching `v16_67_` classes. Skin color tokens are
  injected at runtime by ThemeContextProvider (the provider), not in this file.
- **[GENERAL] story-imports.mjs fork — three rules (see `.design-sync/overrides/`).**
  1. kebab→PascalCase: source files are kebab (`icon-button.tsx`) but export Pascal
     (`IconButton`); map so `../icon-button` shims to the global, not bundles source.
  2. top-level `src/*.tsx` → root-namespace shim: multi-export modules whose
     filename≠export (`button.tsx`→ButtonPrimary/Secondary, `feedback.tsx`→
     ErrorFeedbackScreen) shim to the global. NESTED src dirs are EXCLUDED —
     `src/utils/platform`→isSafari, `src/utils/helpers`→isEqual are internal utils
     NOT on the global; they must bundle from source.
  3. `.css.ts` → compiled `.css-mistica.js`: `import {vars} from '../skins/skin-contract.css'`
     resolved to the `.css.ts` SOURCE throws vanilla-extract runtime errors; dist-es
     ships the runtime-safe compiled mirror (`src/X.css.ts`→`dist-es/X.css-mistica.js`).
- **[GENERAL] Curated icons MUST include every story-referenced icon.** Stories import
  icons from the barrel; the preview shims them to the global, so a non-curated icon
  is `undefined` and throws, blanking the preview. `gen-entry.mjs` scans all story
  files for `Icon*` identifiers and includes those that are real exports (163 icons total).
- **Icons shim to the global (no `storyImports.bundle` for mistica-icons).** Forcing
  icon-source bundling dragged in the icon base component's `theme-variant-context`
  → `skin-contract.css.ts` → vanilla-extract crash. Shimming avoids it; the 6
  subpath-imported story icons are all curated.
- **`cfg.overrides` cardMode for product-card layout.** 25 components → `column`
  (stories wider than a grid cell: input fields, ButtonPrimary, layout primitives,
  Select/Sheet/Popover/Tooltip), 6 → `single` (fixed/portal escape: FeedbackScreen,
  nav bars, FixedToTop, LoadingBar). These are presentation-only (grades carry).

## Scope decisions

- **Icons:** only ~127 curated common icons are on `window.Mistica` (full catalogue
  cannot fit the cap). Documented for the design agent in conventions.md.
- **Community components** (`Community/Vivo/AdvancedDataCard`, `AiCard`, `Blocks`,
  `ExampleComponent`) are excluded (`titleMap` null) — they are not exported from the
  main package (`dist-es/index.js`); they ship via a separate `community.js` entry.
  Possible follow-up: add the community entry to `cfg.extraEntries` to sync them.
- Non-components dropped via `titleMap` null: Welcome, Icons/Catalog, Patterns/Loading,
  Modals (imperative dialog fns), Form pattern variants (kept one → Form),
  Input-field-with-custom-formatter, OverscrollColor, skinVars, hooks.
- Representative mappings: Buttons→ButtonPrimary, Lists→RowList, Titles→Title1,
  Mosaic→HorizontalMosaic, Breadcrumbs→NavigationBreadcrumbs, Accordions→Accordion,
  Progressbars→ProgressBar, layout multi-word titles → their PascalCase exports.

## Grading observations (fan-out)

- **Tall components and full-screen feedback screens** (Form, FeedbackScreen and its
  variants) render MORE than the storybook reference capture shows — the reference
  capture is shorter and crops bottom elements (action buttons, lower form fields)
  below the fold while the preview shows the full content. This is a capture-height
  artifact, not a compiled-component defect; graded match/close.
- **Overlays** (Drawer, Sheet, Tooltip, Popover) render their closed trigger state on
  BOTH reference and preview → matching closed states grade match.
- `[REFERENCE_STALE?]` during compare is expected here: the bundle was rebuilt many
  times while `.design-sync/sb-reference` (built once from unchanged DS source) stayed
  put. The reference is still valid because the DS source did not change.

## Known per-component issues

- **Tag — variant colors do NOT render (graded `mismatch`).** Storybook shows the 7
  `type` variants (promo/info/active/inactive/success/warning/error) with distinct
  semantic colors; the preview renders them all uniform dark-navy (`rgb(11,39,57)`).
  The per-type semantic color tokens are not resolving in the preview/design context,
  while all other components' colors (buttons, cards, etc.) render correctly. Tried
  `colorScheme: 'light'` — no effect, so it is not a color-scheme issue. Root cause not
  isolated (likely a skin semantic-color injection gap specific to Tag). Workaround for
  the design agent: Tag accepts explicit `backgroundColor` / `textColor` props — set them
  when an on-brand variant color is needed. Worth revisiting on a future sync.
- **Video — fixed via `.vtt` loader.** The Video story imports `.vtt` subtitle files;
  without a loader the preview build failed (floor card). `cfg.storyImports.loaders
  ".vtt": "file"` resolves it; Video now renders the player + controls + captions (match).
- **LoadingBar — renders via Portal to page top, hard to capture.** Compare reports
  `sb-error` (the reference storybook story also portals out of `#storybook-root`), and
  the product card shows a 0–4px sliver. The component is present and functional in the
  bundle; it is just not cleanly capturable in a static card. Graded `close` on that basis.

## Re-sync risks (watch these)

- `clean-index.mjs` MUST run after every reference rebuild, or private/deprecated
  stories re-pollute public components. Not automatic — it is a manual post-step.
- `ds-entry.js` is a generated allowlist. If the DS adds new public components, they
  will NOT sync until `gen-entry.mjs` is re-run (it re-reads `dist-es/index.js`).
  If the DS renames/removes an export the entry lists, the build errors — re-run gen.
- Curated icon set is hand-tuned to stay under 5 MB; adding components or icons can
  push the bundle over the cap. Re-check `_ds_bundle.js` size after DS growth.
- `package.json` `types` field is required for the converter; if a future merge drops
  it, exports collapse to 0 again.
