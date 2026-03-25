# Stepper

Use stepper to show progress through a linear multi-step flow, highlighting completed and current steps.

## Usage

### Use for

- Communicating where users are within a predefined sequence of steps
- Flows where step order matters and users benefit from seeing completed, current, and upcoming stages
- Processes that have clear, short labels for each step so progress remains understandable
- Interfaces that need accessible step status announcements (current/completed) for assistive technologies

### Don't use for

- Do not use for non-linear navigation where users can jump freely between unrelated sections
- Do not use when there are too many steps or long labels that make progress hard to scan
- Do not use as the only guidance in complex flows; pair it with clear page titles and instructions
- Do not treat it as a clickable navigation menu if the interaction model is only progress indication

## Accessibility

### Accessibility label

Always provide meaningful step labels, even when labels are visually reduced on smaller screens.

- Give the stepper itself a clear accessible name with `aria-label` or `aria-labelledby` (for example,
  "Checkout progress")
- Keep labels short, specific, and consistent across steps

### Heading hierarchy

In addition to the stepper label, include a clear page heading for each step.

- For example, "Step 2: Company details" so users always know where they are in the flow

### Role

Stepper is announced as an ordered list.

- Preserve real sequence semantics and do not use it for unrelated or parallel navigation paths
- If stepper status can change dynamically, ensure surrounding page content and headings are updated
  consistently with the new current step
