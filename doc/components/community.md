
# Community

## AdvancedDataCard

AdvancedDataCard is an extended data card that combines structured content (title hierarchy, description) with composable extra blocks, optional footer actions, and touchable behavior in a single card surface.

### Usage

#### Use for

- Displaying data-rich summaries that need composable extra content blocks (value blocks, progress blocks, etc.)
- Building modular cards that combine text hierarchy with structured data visualizations
- Presenting detailed information with optional footer actions (buttons, images, links)

#### Don't use for

- Simple data presentations where a standard DataCard is sufficient
- Layouts that don't require composable extra blocks — prefer DataCard instead
- Non-card contexts where a list row or standalone block is more appropriate

## HighlightedValueBlock

HighlightedValueBlock displays prominent numeric or text values with optional headline, pretitle, strikethrough pricing, and supporting descriptions. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Highlighting key values (prices, scores, quantities) with large typography emphasis
- Showing price comparisons with strikethrough values and promotional headlines
- Displaying multiple heading-value pairs with supporting descriptions

#### Don't use for

- Simple single-line value display — use ValueBlock instead
- Content that doesn't need visual emphasis on numeric values

## InformationBlock

InformationBlock presents a title and description alongside a right-aligned value with optional secondary strikethrough value. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing labeled data with a corresponding value (e.g., plan details with pricing)
- Displaying value comparisons with a secondary strikethrough value

#### Don't use for

- Standalone information display outside of a card context
- Complex data that requires more than a single value pair

## ProgressBlock

ProgressBlock combines a title, progress bar, heading value, and optional description in a single block. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing progress toward a goal with a visual progress bar and numeric value
- Displaying consumption or usage metrics with contextual descriptions

#### Don't use for

- Standalone progress indicators outside of a card — use ProgressBar directly
- Simple percentage display without supporting context

## RowBlock

RowBlock displays a title with either a right-aligned description or a stacking group in a horizontal row layout. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Displaying key-value pairs in a horizontal layout within a card
- Showing a label with a right-aligned stacking group (e.g., avatars, icons)

#### Don't use for

- Complex multi-line content — use InformationBlock or other blocks instead
- Standalone rows outside of a card context — use Row or BoxedRow instead

## SimpleBlock

SimpleBlock displays an image alongside a description with an optional right-aligned text. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing a small image with a text description inside a card
- Displaying brand logos or icons with accompanying labels

#### Don't use for

- Image-heavy layouts — use MediaCard or CoverCard instead
- Content without an image — use RowBlock instead

## ValueBlock

ValueBlock displays a title with a large prominent value and optional description lines. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing a single key metric or value with a label and optional description
- Displaying currency amounts, scores, or quantities with emphasis

#### Don't use for

- Multiple values with comparison — use HighlightedValueBlock instead
- Values that need a progress indicator — use ProgressBlock instead
