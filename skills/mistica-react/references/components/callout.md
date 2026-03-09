# Callout

## Callout

A snippet of information that draws attention to important content. Always includes a description.

### Usage

#### Use for

- Informative type: Drawing attention to useful information, tips, or non-urgent recommendations
- Warning type: Alerting users about situations that require attention but are not blocking
- Critical type: Notifying users about critical information or important consequences they should be aware of

#### Don't use for

- Never use as a substitute for form or system error messages
- Never use as a substitute for feedback after a user action

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| description | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| asset | `ReactNode` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| onClose | `() => void` | No | - |  |
| role | `string` | No | - |  |
| secondaryButton | `RendersNullableElement<Button>` | No | - |  |
| title | `string \| { text: string; 'aria-label'?: string \| undefined; as?: HeadingType \| undefined; }` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | h2 |  |
| variant | `"default" \| "brand" \| "inverse"` | No | default |  |
