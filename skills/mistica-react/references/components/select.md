# Select

Allow users to make a single selection between multiple options.

## Usage

### Use for

- Capturing one choice from a predefined list when users should select, not type
- Presenting compact option sets in forms where vertical space is limited
- Supporting platform-native picker behavior on mobile devices for familiar interaction
- Providing a controlled dropdown experience with clear selected-state feedback on desktop

### Don't use for

- Do not use Select for multi-select decisions; use checkbox or dedicated multi-select patterns instead
- Do not use it for very long option catalogs where search/filter interaction is needed
- Do not hide labels or helper text when option meaning is ambiguous
- Do not force custom dropdown behavior when native mobile selection is more usable

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | `string` | Yes | - |  |
| name | `string` | Yes | - |  |
| options | `readonly { readonly value: string; readonly text: string; }[]` | Yes | - |  |
| autoFocus | `boolean` | No | false |  |
| dataAttributes | `DataAttributes` | No | - |  |
| defaultValue | `string` | No | - |  |
| disabled | `boolean` | No | - |  |
| error | `boolean` | No | - |  |
| fullWidth | `boolean` | No | - |  |
| helperText | `string` | No | - |  |
| id | `string` | No | - |  |
| native | `boolean` | No | - |  |
| onBlur | `(event: FocusEvent<any, Element>) => void` | No | - |  |
| onChangeValue | `(value: string) => void` | No | - |  |
| optional | `boolean` | No | - |  |
| showOptionalLabel | `boolean` | No | - |  |
| validate | `(value: string \| void, rawValue: string \| void) => string \| void` | No | - |  |
| value | `string` | No | - |  |
