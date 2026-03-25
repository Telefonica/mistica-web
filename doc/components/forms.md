# Forms

## Form

Form orchestrates field registration, validation, submission state, and accessibility error announcements for
Mística form flows.

### Usage

#### Use for

- Handling form submission with validated values and normalized raw values
- Keeping field validation, required checks, and error state consistent across inputs
- Coordinating multi-field flows with optional auto-jump behavior and next-field progression
- Managing submit/loading state so fields are automatically disabled while sending
- Announcing grouped submit errors to screen readers in a single form-level summary

#### Don't use for

- Do not bypass Form when fields need shared validation/submission behavior
- Do not submit forms without clear field labels; error summaries use registered field labels
- Do not rely only on visual errors; preserve screen-reader error announcements
- Do not keep disabled fields as required validation targets; disabled fields are excluded from
  validation/submission

## useForm

useForm exposes Form context state and actions for advanced field orchestration and custom form components.

### Usage

#### Use for

- Reading form status (`filling`/`sending`) and current values from custom field components
- Triggering form validation/submission or custom navigation flows (`jumpToNext`)
- Registering custom focusable controls and setting field-level errors programmatically
- Integrating non-text controls with form state while preserving shared behavior

#### Don't use for

- Do not use it outside a Form context for production logic
- Do not duplicate context state manually when Form already provides it
- Do not skip field registration in custom controls that need validation, focus, or summary integration

## useFieldProps

useFieldProps connects text-like inputs to Form with value processing, validation, labeling, and error
handling.

### Usage

#### Use for

- Wiring custom text inputs to Form state (`rawValues` and processed `values`)
- Reusing blur validation rules (required + custom validator)
- Keeping helper text/error messaging and disabled/sending states synchronized
- Registering input references so Form can focus and summarize fields with errors

#### Don't use for

- Do not use it for controls that are not input-like text fields
- Do not mix incompatible controlled/uncontrolled patterns in the same field
- Do not override label/error semantics in ways that break error summary announcements

## Accessibility

### Accessibility label

Give every field a clear label users can understand quickly.

- Use helper/error text to explain constraints and recovery steps, not as decoration

### Error announcements

Plan error feedback at two levels:

- Field-level: immediate feedback near the affected input
- Form-level: one summary when multiple fields fail on submit

By default, the summary starts with:

- "Check the following errors:" (localized in supported languages)

Customize the summary text when default wording is not specific enough for your flow.

### Focus and navigation on errors

- Move users to the first blocking issue after submit
- Avoid aggressive auto-focus behavior that causes unexpected picker popups

### Disabled fields

- Do not expect disabled fields to be completed or validated
- Keep disabled state intentional and clearly explained when needed
