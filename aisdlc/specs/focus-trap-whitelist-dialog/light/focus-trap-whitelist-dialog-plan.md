---
TITLE: focusWhiteList prop for Dialog components
VERSION: 0.1.0
DATE: 2026-07-10
SOURCE: GitHub Telefonica/mistica-web#1305
SLUG: focus-trap-whitelist-dialog
---

## Context

`FocusTrap` wraps `react-focus-lock`'s `ReactFocusLock`. The underlying library exposes a `whiteList` prop — a
predicate `(activeElement: HTMLElement) => boolean` — that controls whether a focused element outside the lock
is allowed to keep focus. This prop is currently not surfaced by `FocusTrap` or any dialog component.

The request (GH#1305) is to expose this capability on dialog components so that Capacitor apps can allow an
unlock-screen overlay to capture keyboard input even while a mistica dialog is open.

Decisions made: scope is dialog-only (`alert`, `confirm`, `dialog` via `useDialog`); the public prop name is
`focusWhiteList`; `shards` is out of scope.

## Tasks

1. [x] Thread `focusWhiteList` from `FocusTrap` through `BaseDialogProps` to `ModalDialog`

   **Behaviors**

   - When `focusWhiteList` is provided to a dialog call (`alert`, `confirm`, or `dialog`), `ReactFocusLock`
     receives the predicate as its `whiteList` prop.
   - When `focusWhiteList` is omitted, `ReactFocusLock` renders without `whiteList` (no regression to existing
     behavior).
   - `focusWhiteList` is accepted by all three dialog-initiating variants: `AlertProps`, `ConfirmProps`, and
     `ExtendedDialogProps` (via `BaseDialogProps`).
   - The TypeScript type of `focusWhiteList` is `(activeElement: HTMLElement) => boolean`.

   **Target**

   - `src/focus-trap.tsx`
   - `src/dialog.tsx` (`BaseDialogProps`, `ModalDialog`)

   **Contract**

   ```ts
   // FocusTrap props extension
   focusWhiteList?: (activeElement: HTMLElement) => boolean;

   // BaseDialogProps extension (dialog.tsx)
   focusWhiteList?: (activeElement: HTMLElement) => boolean;
   ```

   `focusWhiteList` is passed as `whiteList` to `ReactFocusLock` inside `FocusTrap`.

   **Steps**

   1. In `src/focus-trap.tsx`, add `focusWhiteList?: (activeElement: HTMLElement) => boolean` to the `Props`
      type. Pass it to `<ReactFocusLock>` as `whiteList={focusWhiteList}`.
   2. In `src/dialog.tsx`, add `focusWhiteList?: (activeElement: HTMLElement) => boolean` to
      `BaseDialogProps`. Destructure it inside `ModalDialog` from `props` and forward it to
      `<FocusTrap focusWhiteList={focusWhiteList}>`.

2. [x] Add Storybook story demonstrating `focusWhiteList`

   **Behaviors**

   - A story named `FocusWhiteList` renders a dialog alongside an external input element that sits outside the
     dialog's DOM subtree.
   - When `focusWhiteList` is configured to return `true` for the external input, that input is reachable via
     Tab while the dialog is open.
   - The story registers `focusWhiteList` in `args` as a boolean toggle (true = allow external input, false =
     standard lock) so that Storybook controls can demonstrate both states.
   - The story registers `focusWhiteList` in `argTypes` so it appears as a control.

   **Target**

   - `src/__stories__/dialog-story.tsx`

   **Contract**

   ```ts
   // Story arg shape
   type FocusWhiteListArgs = {allowExternalFocus: boolean};
   ```

   The story uses `allowExternalFocus` (a boolean) as a Storybook control and derives the actual
   `focusWhiteList` predicate from it.

   **Steps**

   1. Add a `FocusWhiteList` export to `src/__stories__/dialog-story.tsx`.
   2. Render an `<input>` with `data-external="true"` above the dialog trigger button.
   3. When `allowExternalFocus` is `true`, pass `focusWhiteList={(el) => el.dataset['external'] === 'true'}`
      to the dialog call. When `false`, pass no `focusWhiteList`.
   4. Set `FocusWhiteList.args = { allowExternalFocus: true }` and
      `FocusWhiteList.argTypes = { allowExternalFocus: { control: 'boolean' } }`.
