# Timer

## TextTimer

Use text timer for inline countdowns embedded in sentences or short blocks of copy.

### Usage

#### Use for

- Showing a live countdown inside running text without breaking reading flow
- Compact deadline messaging (for example offers or verification windows) where space is limited
- Countdowns that need flexible unit granularity (from seconds up to days) and optional short/long labels
- Contexts where accessible timer announcements are needed while keeping visual output lightweight

#### Don't use for

- Do not use when the timer must be the primary visual element; use the display `Timer` component instead
- Do not combine too many units/long labels in narrow layouts if it harms readability
- Do not use for static date/time display with no countdown behavior
- Do not depend on inline timer text alone for critical task deadlines without supporting explanatory context

## Timer

Use timer for prominent countdown displays with segmented time units, optionally boxed for stronger visual
emphasis.

### Usage

#### Use for

- Highlighting countdowns as a key visual element in a screen or section
- Showing time units in a clear display format (days/hours/minutes/seconds) with configurable min and max
  units
- Promotional, transactional, or time-limited contexts where users must quickly scan remaining time
- Boxed presentation when countdowns need extra contrast or placement over rich backgrounds/images

#### Don't use for

- Do not use for subtle inline references inside paragraph text; use `TextTimer` for that pattern
- Do not display unnecessary units when simpler granularity communicates urgency better
- Do not treat timer styling as decoration without a real time-based behavior
- Do not rely on the visual countdown alone for critical instructions; pair it with explicit contextual
  messaging

## Accessibility

`TextTimer` and `Timer` share the same accessibility considerations.

### Accessibility label

Add an accessibility label (`aria-label`) to provide countdown context.

- For example: "Offer countdown" or "Verification code expires in"
- If no label is provided, assistive technology still announces the remaining time, but users may miss
  context about what the countdown refers to

### Value announcement

Regardless of visual style, screen readers announce the timer in a long countdown format.

- For example: "A label. 0 hours, 0 minutes and 1 second"
- Choose min and max time units that match user decisions (for example, avoid showing days when users only
  need minute-level urgency)

### Content scope

For critical deadlines, pair the timer with clear nearby text that explains consequence and next action.

- For example, "Request a new code when this reaches zero"
