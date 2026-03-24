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

## Rating

Rating captures user feedback through an interactive icon scale, supporting quantitative and qualitative
evaluation patterns.

### Usage

#### Use for

- Capturing user sentiment or score input as an explicit interactive choice
- Using quantitative ratings (for example, stars) when users evaluate intensity on a numeric scale
- Using qualitative ratings (for example, emotion icons) when users express satisfaction categories
- Collecting feedback in moments where immediate, low-friction selection is preferable to text entry

#### Don't use for

- Do not use Rating to display static historical scores; use InfoRating for read-only display
- Do not use unlabeled or unclear icon sets that make score meaning ambiguous
- Do not force rating input when feedback is optional and users need a neutral skip path
- Do not mix qualitative and quantitative semantics in the same user task without a clear rationale

## InfoRating

InfoRating displays read-only scores with rating icons, including accessible value narration for assistive
technologies.

### Usage

#### Use for

- Displaying existing ratings in product cards, lists, and summaries without enabling user editing
- Communicating score magnitude quickly with compact iconography, including optional half values
- Supporting accessible reading of score context when no visible textual score is present
- Reusing the same rating visual language as input ratings while keeping the state non-interactive

#### Don't use for

- Do not use InfoRating to collect user feedback; use Rating when interaction is required
- Do not present decorative ratings without meaningful value context for assistive technologies
- Do not over-precision score displays when the source data does not justify half-step granularity
- Do not use rating visuals as the only trust signal; pair with enough surrounding product context
