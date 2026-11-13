---
name: mistica-playroom
description: >
  Generate ready-to-paste JSX code for Mistica's hosted Playroom web editor
  (https://mistica-web.vercel.app/playroom). Use it whenever the user asks to build, edit, or fix a Playroom
  example with Mistica components. Triggers on mentions of Playroom, mistica-web.vercel.app, or prototyping
  Mistica UI.
compatibility: Requires mistica-react skill
license: MIT
metadata:
  author: telefonica
  version: '2.1.0'
---

# Mistica Playroom (web editor)

Playroom is Mistica's hosted live-prototyping tool at **https://mistica-web.vercel.app/playroom**. The left
panel is a code editor; the right panel renders the result instantly across the configured widths. This skill
covers the peculiarities of writing Playroom-compatible JSX so the code renders on the first try when pasted
into the editor.

## When to apply

- The user asks to build or edit a Playroom example for Mistica.
- Prototyping a Mistica component, screen, or interaction (not in a local repo).
- Force Mobile/desktop variants of the URL also apply: `/playroom-mobile` and `/playroom-desktop`.

## Output format

Deliver a **single fenced `jsx` code block** containing the complete, paste-ready JSX. The block must be
self-contained: select-all + paste into the Playroom editor is the only action the user needs to take. Do not
split the output across multiple code blocks.

Always accompany the code block with a link to the editor so the user can paste it straight away:
https://mistica-web.vercel.app/playroom. If the user is working on a forced mobile or desktop view, link
`/playroom-mobile` or `/playroom-desktop` instead.

## Pair with the `mistica-react` skill

The JSX written here must be as faithful to the design system as production code. Invoke `mistica-react` via
the Skill tool before generating component code and treat it as the source of truth for _what_ to build:
component choice, valid props and variants, layout primitives, spacing and color tokens, accessibility. If it
is not available in the session, say so in your reply and flag that design-system fidelity was not verified.

This skill governs _how_ the code must be shaped to run in Playroom, and wins on every Playroom mechanic
below.

## Hard rules — why Playroom code differs from normal React

Playroom evaluates the editor content as a **single JSX expression** inside a frame that already mounts the
theme provider, `SheetRoot`, and overscroll provider. Consequences:

1. **No imports, ever.** Every Mistica component, icon, and imperative API is already in scope. Write
   `<ButtonPrimary>`, `<Text3>`, `<IconLightningRegular />` directly. An `import` line breaks the editor.

2. **No `export`, no `function`/component declarations, no `return`.** The code _is_ the JSX. Begin with a tag
   or a fragment. To render multiple siblings at the top level, wrap them in a fragment `<>...</>`.

3. **No React hooks.** `React.useState` / `useEffect` do not work in a bare expression. Use the injected state
   helpers below for any interactivity.

4. **Do not add a theme provider or `SheetRoot`.** The frame provides them. Skin, platform, and color scheme
   are switched by the on-page controls — never hardcode a theme wrapper.

## What is in scope (available with no import)

The Playroom scope re-exports the whole public Mistica API plus `src/community` — so community skins such as
`CYBER_SKIN` are in scope too — and adds the helpers below.

State (the replacement for `useState`):

- `getState(key, defaultValue?)` — read persisted state.
- `setState(key, value)` — write state. It is **curried** and event-aware: `setState('foo')` returns a
  handler, and when handed a DOM event it extracts `currentTarget.checked` (checkbox) or
  `currentTarget.value`.
- `resetState(...keys)` — clear given keys, or all state when called with no arguments.

Theme / tokens:

- `colors` (= `skinVars.colors`), `rawColors` (= `skinVars.rawColors`), `theme` (full theme object). In
  Playroom use the in-scope `colors.brand`, not `skinVars.colors.brand`.

Imperative dialogs / sheets (already wired to the frame's `SheetRoot` — do **not** call `useDialog()`):

- `alert({title, message, acceptText})`
- `confirm({title, message, destructive?, acceptText?})`
- `dialog({title, message, asset?, link?, extra?, showCancel?})`
- `showSheet({type, props})`

Screen size flags: `isMobile`, `isTablet`, `isTabletOrBigger`, `isTabletOrSmaller`, `isDesktopOrBigger`,
`isLargeDesktop`, `isExtraLargeDesktop`.

Icon metadata: `iconKeywords`, `iconCategories`.

## Playroom-only components

`Loader` and `Animation` exist **only in Playroom** — they are not part of `@telefonica/mistica`:

- `<Loader load={urlOrFn} render={(data) => ...} renderLoading? renderError? />` — fetches and renders async
  data, the only way to do asynchronous work without hooks.
- `<Animation animationUrl="..." />` or `<Animation animationData={...} />` — Lottie player.

Use them freely in prototypes, but flag it if the user plans to port the code to a real app: there they need
their own data fetching and `lottie-react`.

## Reference examples

Take the component API (choice, props, variants, tokens) from `mistica-react`. Use the snippets below only as
a secondary, targeted lookup for _how_ a given component is shaped in Playroom — mainly state and interaction
patterns with `getState`/`setState`.

`playroom/snippets.tsx` holds ~190 snippets grouped by component (`Cards`, `Forms`, `Headers`, `Sheet`,
`Tabs`…), all proven to render in the editor. The file is large (~150 KB), so never read it whole: grep for
the specific component you need.

- **Local** (preferred when the repo is cloned): grep `playroom/snippets.tsx`.
- **Fallback** (no local repo, and only if the Playroom pattern is unclear): fetch
  `https://raw.githubusercontent.com/Telefonica/mistica-web/master/playroom/snippets.tsx` and extract just the
  relevant component's snippets.

## Patterns

Open/close with state:

```jsx
<>
  <ButtonPrimary onPress={() => setState('openDrawer', true)}>Open Drawer</ButtonPrimary>
  {getState('openDrawer', false) && (
    <Drawer title="Title" onClose={() => setState('openDrawer', false)}>
      <Placeholder height={300} />
    </Drawer>
  )}
</>
```

**The currying trap.** `setState('key')` is a handler only because the value is still missing. Pass the value
and it is no longer a handler — it is a call:

- `onPress={setState('open', true)}` runs during render and sets the state immediately. Wrong. Use
  `onPress={() => setState('open', true)}`.
- `onPress={setState('open')}` does nothing useful either: the press handler gets no argument, so it stores
  `undefined`.
- Bare `setState('key')` is only correct for callbacks whose first argument _is_ the value you want to store
  (`onChangeValue`, `onChange`) or a DOM event (from which `currentTarget.value`/`.checked` is extracted).

Curried `setState` as an onChange handler (no wrapper arrow needed):

```jsx
<TextField name="search" label="Search" value={getState('search') ?? ''} onChangeValue={setState('search')} />
```

Persisted tab selection:

```jsx
<Tabs
  selectedIndex={getState('selectedTab', 0)}
  onChange={setState('selectedTab')}
  tabs={[{text: 'One'}, {text: 'Two'}]}
/>
```

Imperative dialog:

```jsx
<ButtonPrimary
  onPress={() =>
    dialog({title: 'Title', message: 'Message', asset: <IconInformationUserLight color={colors.brand} />})
  }
>
  Open dialog
</ButtonPrimary>
```

## Useful conventions

- For filler content use the `Placeholder` component (e.g. `<Placeholder height={300} />`).
- For example media, a plain public image/video URL works (e.g. a `picsum.photos` image URL).
- Compose layouts with Mistica primitives (`Box`, `Stack`, `Inline`, `ResponsiveLayout`) rather than raw
  `div` + inline styles, so spacing and theming stay correct.
- Never hardcode a color value: use `colors.*` so the example survives a skin or color-scheme switch.
- Adapt to viewport with the screen-size flags, not CSS media queries — the preview renders the same code at
  several widths at once.

## Self-check before declaring done

- No `import` / `export` / `function` / top-level `return` in the code.
- Any interactivity uses `getState`/`setState`, not `React.useState`.
- Every `setState` in an event handler is either wrapped in an arrow or receives the value as its first
  argument — no `setState('k', v)` sitting bare in a prop.
- No `ThemeContextProvider` / `SheetRoot` wrapper added by hand.
- The reply includes a link to the Playroom editor (https://mistica-web.vercel.app/playroom or its
  mobile/desktop variant).
- The full JSX is delivered as a single paste-ready fenced code block so the user can select-all and paste it
  directly into the Playroom editor.
