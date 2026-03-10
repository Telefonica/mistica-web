# Avatar

Avatar is the visual representation of a user or entity, using photo, initials, or icon depending on available identity content.

## Usage

### Use for

- Identifying people or entities in lists, headers, cards, and profile-related surfaces
- Showing profile photos when available, with initials or a generic user icon as fallback
- Indicating lightweight status or new activity with a small badge when relevant

### Don't use for

- Do not use avatar style differences to communicate critical meaning without supporting text
- Do not mix unrelated avatar sizes and treatments in the same content group without hierarchy intent
- Do not overuse badges on avatars when there is no clear notification or status purpose

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `number` | Yes | - |  |
| aria-label | `string` | No | - |  |
| backgroundColor | `string` | No | - |  |
| badge | `number \| boolean` | No | - |  |
| border | `boolean` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| Icon | `(props: IconProps) => Element` | No | - |  |
| initials | `string` | No |  |  |
| src | `string` | No | - |  |
| textColor | `string` | No | - |  |
