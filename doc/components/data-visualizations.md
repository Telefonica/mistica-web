# Data Visualizations

## Meter

Meter visualizes values within a bounded range using segmented linear, angular, or circular shapes, with
optional extra content for context.

### Usage

#### Use for

- Showing one or multiple quantitative segments inside a fixed 0–100 range
- Comparing distribution across categories when segmented arcs or bars improve readability
- Choosing linear, angular, or circular meter shapes according to available space and emphasis
- Displaying summary value context with optional extra content near the chart

#### Don't use for

- Do not use Meter as a task completion indicator with explicit step progression; use ProgressBar instead
- Do not overload the visualization with too many tiny segments that become visually indistinguishable
- Do not use decorative colors without clear semantic meaning across segments
- Do not hide critical quantitative meaning only in color; provide understandable surrounding context

## Accessibility

### Text alternative for meter information

Ensure the information represented by Meter is also available in nearby text (title, legend, or summary).

- Do not rely only on shape/color to communicate value meaning
- Include explicit context such as metric name, current value, and limit/reference

### Hide from screen readers

Meter can be hidden from assistive technologies with `aria-hidden`. Use this only when equivalent value and
context are already provided in surrounding accessible text.

- If Meter is hidden, ensure adjacent content fully explains the metric
- Example context: `Data Usage` + `You have used 75% of your 100 GB monthly limit`

### Accessibility label

By default, Meter is announced with percentage-based value semantics (for example, progress-style output with
current value and segment breakdown).

- Use `aria-label` to customize announcement wording when the metric uses units like `GB`, `steps`, or
  `tasks completed`
- Use `aria-labelledby` when a visible title/legend should provide the accessible name
