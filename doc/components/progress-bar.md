Typologies: ProgressBar, ProgressBarStepped

---

## ProgressBar

ProgressBar provides continuous linear feedback for task completion progress as a percentage.

### Use for

- Showing completion progress for ongoing tasks in a clear linear direction
- Communicating percent-based progress when users need reassurance that work is advancing
- Reflecting continuous progression where completion can be expressed on a 0–100 scale
- Keeping users informed during long-running operations with incremental completion updates

### Don't use for

- Do not use ProgressBar to compare multiple category values; use Meter for segmented value visualization
- Do not use ProgressBar for milestone-based step journeys; use ProgressBarStepped instead
- Do not show misleading precision when underlying progress is approximate or uncertain
- Do not leave progress indicators static without updates during long operations
- Do not use reverse or directional effects to imply discrete step changes in wizard-like flows

## ProgressBarStepped

ProgressBarStepped shows progress across discrete milestones, highlighting completed and current steps in
  multi-step flows.

### Use for

- Representing multi-step journeys where each stage is a meaningful milestone
- Showing users their current step position and completed steps at a glance
- Communicating both forward and backward movement between steps in editable flows
- Reinforcing orientation in onboarding, checkout, and wizard-like task sequences

### Don't use for

- Do not use ProgressBarStepped for continuous percentage-based progress without discrete stages
- Do not define too many tiny steps that make milestone progress hard to perceive
- Do not use it when step boundaries are unclear or can change unpredictably for users
- Do not hide the step context from surrounding content; users should understand what each stage means
