# Empty States

EmptyState communicates full-page absence scenarios with clear messaging, supportive imagery, and optional recovery actions.

## Usage

### Use for

- Handling full-view no-content or first-use scenarios that need explanation and guidance
- Combining clear title + short description with one focused action path
- Supporting visual reinforcement through icon, small image, or large illustrative image variants
- Guiding users toward next steps without leaving the current context

### Don't use for

- Do not use EmptyState for temporary loading or transient errors that need other feedback patterns
- Do not overload the screen with long emotional copy and multiple competing actions
- Do not use decorative imagery without clear explanatory message and actionable next step
- Do not mix multiple empty-state visual styles in one flow without a clear hierarchy rationale

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| asset | `ReactNode` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| imageUrl | `string` | No | - |  |
| largeImageUrl | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | h1 |  |
