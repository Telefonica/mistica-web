# Chip

## Chip

Chip is a compact label-action element used for navigation, selection state, or removable contextual metadata.

### Usage

#### Use for

- Offering compact navigation entry points in horizontal groups or dense UI areas
- Showing selectable/toggled state in lightweight filter or option sets
- Displaying removable tags with a close action when users need to dismiss applied context
- Adding optional iconography or badge counters to improve discoverability and status signaling

#### Don't use for

- Do not use chips as the primary call-to-action for critical task completion
- Do not overload chips with long labels; keep text short and scannable
- Do not mix too many chip behaviors (navigation, toggle, close) in one group without clear intent
- Do not rely on badge or icon alone to convey meaning; label text should stay self-explanatory

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| active | `boolean` | No | - |  |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| badge | `number \| boolean` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| Icon | `(props: IconProps) => Element` | No | - |  |
| id | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => void` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| small | `boolean` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
