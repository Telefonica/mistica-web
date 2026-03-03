Typologies: LoadingScreen, BrandLoadingScreen

---

## LoadingScreen

LoadingScreen communicates blocking progress states with a centered loading indicator and short contextual
messaging.

### Use for

- Covering full-screen waits when users must pause before continuing
- Pairing loading motion with clear, task-specific copy that explains what is happening
- Showing one or more short loading messages that can rotate over time during longer waits
- Keeping transition in/out smooth so completion feels continuous instead of abrupt

### Don't use for

- Do not use vague, generic copy when a concrete action can be described
- Do not use a full-screen loader for non-blocking operations that can run inline
- Do not overload the screen with long text; keep messages brief and easy to scan
- Do not keep users waiting without visible feedback changes during long operations

## BrandLoadingScreen

BrandLoadingScreen adds brand-led loading motion and styling to full-screen waiting states while preserving
clear progress messaging.

### Use for

- Showing full-screen loading moments where brand expression is part of the experience
- Combining branded animation with short explanatory text to keep users oriented
- Creating high-recognition wait states for app launch, transitions, or key journey handoffs
- Keeping close transitions coordinated so logo motion and text exit feel unified

### Don't use for

- Do not use branded loading where neutral system feedback is more appropriate
- Do not let brand animation overshadow clarity of the loading message
- Do not introduce custom motion patterns that conflict with the skin-defined loading behavior
- Do not use this pattern for small or local loading states inside page sections
