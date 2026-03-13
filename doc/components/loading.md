
# Loading

## LoadingScreen

LoadingScreen communicates blocking progress states with a centered loading indicator and short contextual messaging.

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

BrandLoadingScreen adds brand-led loading motion and styling to full-screen waiting states while preserving clear progress messaging.

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

LoadingBar shows a global, indeterminate progress indicator for ongoing background activity while the current screen remains usable.

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
