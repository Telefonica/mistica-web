# Modals

## Sheet

Sheet presents temporary, focus-trapped bottom-sheet content for contextual decisions, actions, and
lightweight task flows.

### Usage

#### Use for

- Presenting contextual options or explanations without navigating away from the current screen
- Supporting mobile-friendly bottom-sheet interactions with clear dismissal behavior
- Hosting short, focused interactions such as single selection, action lists, or informative content
- Keeping temporary decision points consistent across web and hybrid sheet experiences

#### Don't use for

- Do not use Sheet for complex multi-step workflows that require full-page ownership
- Do not overload sheets with dense content that reduces scanability and quick decision making
- Do not hide critical irreversible actions inside transient sheet surfaces without stronger confirmation
  flows
- Do not stack multiple sheet layers at once

## SheetBody

SheetBody structures sheet content with sticky title/actions regions, optional descriptive text, and
scroll-aware dividers.

### Usage

#### Use for

- Composing sheet content with consistent title, subtitle, description, and action areas
- Keeping primary actions persistently reachable through sticky bottom action zones
- Improving readability with structured spacing and optional multi-paragraph description support
- Preserving context during scroll using sticky headers and divider cues

#### Don't use for

- Do not place long unstructured content without hierarchy inside SheetBody
- Do not overload sticky action areas with too many competing controls
- Do not omit clear title context when the sheet drives a user decision
- Do not use SheetBody outside sheet containers as a generic page layout wrapper

## SheetRoot

SheetRoot is the global host that mounts and resolves sheet experiences triggered through showSheet.

### Usage

#### Use for

- Providing a single top-level integration point for imperative sheet orchestration
- Enabling lazy-loaded sheet rendering and promise-based result handling from anywhere in the app
- Supporting optional native sheet delegation in hybrid environments with web fallback behavior
- Keeping sheet lifecycle and focus-return behavior centralized and predictable

#### Don't use for

- Do not mount multiple independent SheetRoot instances for the same experience
- Do not trigger sheets before SheetRoot is mounted in the application tree
- Do not treat SheetRoot as presentational UI; it is an orchestration host
- Do not bypass root-level sheet orchestration with ad-hoc parallel modal systems

## showSheet

showSheet opens a typed sheet flow imperatively and returns a promise with user outcome or dismissal result.

### Usage

#### Use for

- Triggering contextual sheet interactions from events where declarative placement is not practical
- Handling sheet outcomes through explicit result actions (for example submit, dismiss, primary, secondary)
- Coordinating selection and action sheets with a single async control flow
- Integrating native sheet implementations with graceful web fallback when needed

#### Don't use for

- Do not call showSheet when another sheet is already open
- Do not ignore returned outcomes; resolution should drive explicit follow-up behavior
- Do not rely on showSheet without mounting SheetRoot first
- Do not use imperative sheet launching for static always-visible UI content

## NativeSheetImplementation

NativeSheetImplementation is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## ActionsSheet

ActionsSheet presents a short decision block in a bottom sheet using a primary action, optional secondary
action, and optional text link.

### Usage

#### Use for

- Confirming or resolving a focused decision with a clear action hierarchy
- Showing one main action, with optional fallback (secondary) and optional low-emphasis link action
- Supporting quick, modal decisions where selecting any action should complete and close the sheet
- Combining short contextual copy (title/subtitle/description) with immediately actionable choices

#### Don't use for

- Do not use it for long forms or multi-step tasks that require users to stay in context
- Do not add multiple competing primary actions; keep a single clear primary outcome
- Do not use link actions as the primary path when a primary button is expected
- Do not overload the sheet with long explanatory content that delays action

## ActionsListSheet

ActionsListSheet presents a bottom sheet with a clear list of selectable actions, optionally enriched with
icons and destructive emphasis.

### Usage

#### Use for

- Showing a compact list of mutually independent actions in a bottom sheet
- Supporting quick decision flows where tapping an action should immediately execute and close the sheet
- Emphasizing risky actions using the destructive visual treatment
- Adding optional icons (brand/image or UI icon) to improve scanability when action labels alone are not
  enough

#### Don't use for

- Do not use it for long, complex task flows that require persistent context or multi-step forms
- Do not include too many actions; keep the list short enough to scan and decide quickly
- Do not mark multiple actions as destructive unless they are truly high-risk
- Do not rely only on icons to communicate meaning; labels must remain clear on their own

#### Example

```tsx
showSheet({
  type: 'ACTIONS_LIST',
  props: {
    title: 'Options',
    items: [
      {id: 'edit', title: 'Edit'},
      {id: 'share', title: 'Share', icon: {url: '/icons/share.svg'}},
      {id: 'delete', title: 'Delete', style: 'destructive'},
    ],
  },
});
```

> The `icon` field in items accepts `{ url: string; urlDark?: string }`. The `{ Icon: ComponentType }` variant
> is **deprecated** — use `url` instead.

## InfoSheet

InfoSheet presents explanatory content in a modal sheet with a titled context, optional supporting copy, and a
structured list of informational items.

### Usage

#### Use for

- Explaining policies, steps, or conditions in a focused modal context before users continue
- Presenting short, scannable itemized information with icons or bullets and optional item descriptions
- Providing a clear close/acknowledge action when users finish reading the informational content
- Grouping contextual guidance that benefits from temporary emphasis without leaving the current flow

#### Don't use for

- Do not use InfoSheet for complex multi-step task completion that requires full-form interactions
- Do not overload the sheet with long paragraphs or dense legal text that harms scanability
- Do not mix unrelated item types and icon semantics that reduce comprehension consistency
- Do not use it as a generic action menu; it is primarily for informative, explanatory content

## RadioListSheet

RadioListSheet presents single-choice options inside a bottom sheet using radio-list rows, optimized for
responsive selection flows.

### Usage

#### Use for

- Letting users pick one option from a contextual list without leaving the current screen
- Presenting option labels, descriptions, and optional assets in a scan-friendly sheet format
- Supporting mobile quick-select flows where choosing an option can immediately close the sheet
- Supporting desktop confirmation flows where users review selection before pressing a confirm action

#### Don't use for

- Do not use RadioListSheet for multi-select decisions; use checkbox-based patterns instead
- Do not use it when the option set is so large that list-in-sheet scanning becomes inefficient
- Do not hide the selection consequence when the sheet closes automatically on mobile
- Do not split one decision across multiple sheets when one coherent choice list is enough

## Drawer

The drawer component is only meant for web implementations. When designing for native we recommend to use a
modal view.

### Usage

#### Use for

- Presenting secondary tasks or supporting flows without leaving the current page context
- Showing focused dialog-like content with optional title, description, and action area
- Handling web overlay interactions that need dismiss by close button, overlay tap, or ESC when appropriate
- Keeping primary/secondary/link actions anchored at the bottom for clear decision completion

#### Don't use for

- Do not use Drawer for core page journeys that deserve full-page navigation
- Do not overload the panel with long, multi-step flows that exceed a focused side-surface interaction
- Do not remove clear dismissal affordances when the flow is intended to be dismissible
- Do not add manual separators inside title/action boundaries; Drawer already manages contextual dividers on
  scroll

## useDialog

useDialog provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope
