# Loading

## LoadingScreen

LoadingScreen communicates blocking progress states with a centered loading indicator and short contextual
messaging.

### Usage

#### Use for

- Covering full-screen waits when users must pause before continuing
- Pairing loading motion with clear, task-specific copy that explains what is happening
- Showing one or more short loading messages that can rotate over time during longer waits
- Keeping transition in/out smooth so completion feels continuous instead of abrupt

#### Don't use for

- Do not use vague, generic copy when a concrete action can be described
- Do not use a full-screen loader for non-blocking operations that can run inline
- Do not overload the screen with long text; keep messages brief and easy to scan
- Do not keep users waiting without visible feedback changes during long operations

## BrandLoadingScreen

BrandLoadingScreen adds brand-led loading motion and styling to full-screen waiting states while preserving
clear progress messaging.

### Usage

#### Use for

- Showing full-screen loading moments where brand expression is part of the experience
- Combining branded animation with short explanatory text to keep users oriented
- Creating high-recognition wait states for app launch, transitions, or key journey handoffs
- Keeping close transitions coordinated so logo motion and text exit feel unified

#### Don't use for

- Do not use branded loading where neutral system feedback is more appropriate
- Do not let brand animation overshadow clarity of the loading message
- Do not introduce custom motion patterns that conflict with the skin-defined loading behavior
- Do not use this pattern for small or local loading states inside page sections

## LoadingBar

LoadingBar shows a global, indeterminate progress indicator for ongoing background activity while the current
screen remains usable.

### Usage

#### Use for

- Signaling background loading states that affect the page globally but do not require full blocking overlays
- Giving immediate feedback after navigation or async actions when completion time is unknown
- Keeping users informed that work is in progress while allowing them to retain context on screen
- Using a lightweight global loading affordance when skeletons or inline loaders are not appropriate

#### Don't use for

- Do not use LoadingBar as a determinate progress meter for tasks with known completion percentages
- Do not keep the bar visible longer than the real loading state, as this reduces trust in feedback
- Do not replace localized loading indicators when only a specific section is loading
- Do not stack multiple simultaneous global loading bars; aggregate loading signals into one state

## Spinner

spinner. You can see how to apply spinner in buttons here.

### Usage

#### Use for

- Collecting user input with clear labels and contextual help text
- Supporting validation and accessible feedback in form flows

#### Don't use for

- Don't use a spinner when:
- If you don’t want the spinner to be read by a screen reader, it can be deactivated.

## Accessibility

### Announce loading state clearly

Use short, specific loading copy so assistive technologies can communicate what is happening.

- Prefer contextual messages (for example, `Loading your plan details`) over generic-only text
- Keep loading text concise and avoid rapid message churn that causes noisy announcements

### Full-screen loading patterns

`LoadingScreen` and `BrandLoadingScreen` are blocking states and should provide clear status context.

- Keep title/description meaningful so users understand why interaction is paused
- Preserve heading hierarchy when using titles in long page flows
- Avoid adding unrelated interactive controls while the blocking loader is active

### Spinner semantics

Use spinner states as progress feedback, not as decoration.

- Add a clear loading label when context is not already obvious
- Hide spinner from assistive technologies only when equivalent status text is already announced nearby

### LoadingBar behavior

`LoadingBar` is a visual global progress cue and should not be the only accessibility signal.

- Pair it with nearby status text or another announced loading context when users need explicit updates
- Avoid relying on motion/color alone to communicate background activity

### Live region hygiene

Avoid overlapping loading announcements from multiple components at the same time.

- Keep one primary loading announcement per task
- Avoid duplicate announcements when combining loading text and loading indicators
