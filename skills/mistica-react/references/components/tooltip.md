# Tooltip

# Tooltip

Tooltip shows short, contextual helper text near a target on hover, focus, or touch, then dismisses when interaction ends.

## Usage

### Use for

- Providing brief, supplementary clarification for controls, icons, or labels
- Surfacing contextual hints that improve understanding without interrupting task flow
- Supporting non-critical helper content discoverable on hover/focus/tap interactions
- Keeping messages concise so users can parse them quickly in transient surfaces

### Don't use for

- Do not place critical instructions or mandatory requirements only in a tooltip
- Do not use Tooltip for long-form, structured, or interactive content; use Popover instead
- Do not rely on tooltip-only content for accessibility-critical task completion
- Do not attach tooltips to every element when context is already clear without extra help

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| target | `ReactNode` | Yes | - |  |
| centerContent | `boolean` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| content | `ReactNode` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| delay | `boolean` | No | true |  |
| hasPointerInteractionOnly | `boolean` | No | false |  |
| onClose | `() => void` | No | - |  |
| open | `boolean` | No | - |  |
| position | `"top" \| "bottom" \| "left" \| "right"` | No | top |  |
| targetStyle | `CSSProperties` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| width | `number` | No | - |  |
