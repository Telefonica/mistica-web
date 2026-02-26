---
name: ProgressBar
description: 'ProgressBar provides continuous linear feedback for task completion progress as a percentage.'
---

## Usage

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
