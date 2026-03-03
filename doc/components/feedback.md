Typologies (by type): FeedbackScreen, ErrorFeedbackScreen, InfoFeedbackScreen, SuccessFeedbackScreen, SuccessFeedback

---

## FeedbackScreen

FeedbackScreen is the base full-screen feedback pattern for communicating important status moments with
  message hierarchy and optional actions.

### Use for

- Building focused status screens with clear structure: visual asset, title, description, optional extra
  context
- Presenting decisive moments where users need explicit guidance before continuing
- Keeping action completion accessible with anchored footer actions on smaller viewports
- Supporting responsive feedback layouts with optional media support and consistent message hierarchy

### Don't use for

- Do not use a full feedback screen for minor status updates that can be communicated inline
- Do not overload the screen with long copy and multiple competing actions
- Do not mix feedback intent (success, info, error) in one message block without a clear dominant outcome
- Do not remove clear next-step actions when the user must recover or continue

## ErrorFeedbackScreen

ErrorFeedbackScreen presents a dedicated full-screen error state with clear explanation and recovery
  actions when in-flow error handling is not enough.

### Use for

- Handling blocking failures where users cannot continue without explicit recovery guidance
- Showing clear error context with optional reference details for support or troubleshooting
- Providing focused next steps through one primary recovery action and optional secondary options
- Communicating critical failure states with strong visual signal and consistent layout hierarchy

### Don't use for

- Do not use full-screen error feedback for minor inline validation or non-blocking issues
- Do not overload the screen with technical detail that prevents fast user recovery
- Do not present multiple competing actions when one clear recovery path is available
- Do not hide contextual information users need to understand what failed and what to do next

## InfoFeedbackScreen

InfoFeedbackScreen presents neutral, informative full-screen feedback with optional actions to help users
  decide the next step.

### Use for

- Explaining important neutral states that need user attention but are not errors or explicit success outcomes
- Providing contextual information plus one clear action to continue, learn more, or retry later
- Presenting policy, status, or eligibility messages that require acknowledgment in a focused layout
- Keeping informational communication consistent with the broader feedback-screen family

### Don't use for

- Do not use this pattern for destructive failures that require error-oriented feedback
- Do not use it for celebratory completion states that should use success feedback patterns
- Do not overload informational screens with long content better suited to dedicated pages
- Do not present ambiguous messaging without a clear user next step

## SuccessFeedbackScreen

SuccessFeedbackScreen communicates completion of an important action with positive visual reinforcement and
  optional follow-up actions.

### Use for

- Confirming meaningful task completion when users benefit from an explicit success moment
- Reinforcing positive outcomes with clear title, supportive description, and optional next-step actions
- Handling end-of-flow confirmations where users need certainty before moving on
- Providing a consistent success pattern across skins and responsive layouts

### Don't use for

- Do not use a dedicated success screen for routine actions that can be acknowledged inline
- Do not interrupt user flow with celebratory feedback when immediate continuation is expected
- Do not add excessive messaging once success is already clear from context
- Do not present too many post-success actions that dilute the primary next step

## SuccessFeedback

Use success feedback for inline or section-level confirmation after a completed action, with optional
  supporting text, actions, and image.

### Use for

- Confirming that an operation finished successfully without taking over the whole screen
- Showing a clear success message with optional description, extra contextual content, and follow-up actions
- Embedding success feedback inside longer pages or flows where additional content remains visible below
- Reinforcing positive completion states with success iconography and optional brand/image treatment

### Don't use for

- Do not use for error or neutral informational states; use the corresponding feedback variant
- Do not use when users must pause on a dedicated completion screen; choose the full-screen feedback pattern
  instead
- Do not overload the component with dense content or many actions; keep completion messaging concise
- Do not rely on visual treatment alone for next steps; provide explicit action labels when continuation is
  required
