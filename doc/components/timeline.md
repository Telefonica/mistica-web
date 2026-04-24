# Timeline

## Timeline

The Timeline component is used to represent events in a chronological timeline. It can be used to visually and
organizedly display processes,.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Don't use a timeline to guide a user through a step flow use the stepper or
- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## TimelineItem

TimelineItem is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## Accessibility

### Accessibility label

Give the timeline a clear accessible name (`aria-label` or `aria-labelledby`).

- Ensure each `TimelineItem` includes meaningful textual content (step title, status, or event description),
  not only decorative visual assets
- Use short, explicit labels for states and milestones

### Role

Keep item order consistent with real chronology so list navigation matches the expected sequence.

- Mark exactly one current step/event at a time in linear flows
- Keep current status synchronized with the surrounding page content
