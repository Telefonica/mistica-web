# Forms

## Form

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| onSubmit | `(values: FormValues, rawValues: FormValues) => void \| Promise<void>` | Yes | - |  |
| autoJump | `boolean` | No | false |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| getErrorMessageForScreenReader | `(errors: FormErrors) => string` | No | - |  |
| id | `string` | No | - |  |
| initialValues | `FormValues` | No | {} |  |
| onValidationErrors | `(errors: FormErrors) => void` | No | - |  |

## useForm

useForm provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## useFieldProps

useFieldProps provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | `string` | Yes | - |  |
| name | `string` | Yes | - |  |
| processValue | `(value: string) => unknown` | Yes | - |  |
| defaultValue | `string` | No | - |  |
| disabled | `boolean` | No | - |  |
| error | `boolean` | No | - |  |
| helperText | `string` | No | - |  |
| onBlur | `FocusEventHandler<Element>` | No | - |  |
| onChange | `(event: ChangeEvent<HTMLInputElement>) => void` | No | - |  |
| onChangeValue | `(value: any, rawValue: string) => void` | No | - |  |
| optional | `boolean` | No | - |  |
| validate | `(value: any, rawValue: string) => string \| undefined` | No | - |  |
| validateOnBlurInsideForm | `boolean` | No | true |  |
| value | `string` | No | - |  |
