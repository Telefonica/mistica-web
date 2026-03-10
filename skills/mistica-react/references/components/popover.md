# Popover

Popover presents richer contextual content in a dismissible anchored surface, suitable for guidance that needs more space than a tooltip.

## Usage

### Use for

- Showing contextual explanations that need title, description, media, or extra content blocks
- Presenting supplementary information that should remain visible until the user dismisses it
- Anchoring richer helper content to a specific target without navigating away from current context
- Offering non-primary actions or extended guidance where tooltip brevity is insufficient

### Don't use for

- Do not use Popover for very short hints where Tooltip is more lightweight and appropriate
- Do not overload popovers with complex workflows that should be full dialogs or pages
- Do not hide mandatory, high-risk decisions inside contextual popovers without clearer flow ownership
- Do not allow content growth that compromises readability or positioning near the target

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| target | `ReactNode` | Yes | - |  |
| asset | `ReactNode` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| extra | `ReactNode` | No | - |  |
| onClose | `() => void` | No | () => {} |  |
| open | `boolean` | No | - |  |
| position | `"top" \| "bottom" \| "left" \| "right"` | No | - |  |
| targetStyle | `CSSProperties` | No | - |  |
| title | `string` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| width | `number` | No | - |  |
