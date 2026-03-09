---
category: Input Fields
---

# Input Fields

## TextField

Use text field as the default Mística input for free-text entry, with built-in form integration, validation support, and optional suggestions.

### Usage

#### Use for

- Most user-facing single-line text inputs in forms
- Multiline free-text entry when users need to write longer content
- Form flows that need consistent label, helper/error messaging, validation, and optional/required behavior
- Inputs that benefit from controlled suggestions/autocomplete guidance
- Scenarios where you want a ready-to-use field component instead of building directly on `TextFieldBase`

#### Don't use for

- Do not use for read-only display data
- Do not rely on placeholder text as the only label
- Do not hide helper/error context users need to complete a form correctly
- Do not choose this component when a more specific field type (for example email, password, phone, or
  numeric) better matches the input constraints
- Do not use uncontrolled patterns for suggestion-driven inputs

## TextFieldBase

Foundation primitive used to build Mística text-input fields, including labeling, helper/error feedback, and shared interaction states.

### Usage

#### Use for

- Creating or extending custom Mística field components on top of the shared text-input foundation
- Collecting typed user input with a persistent label, placeholder support, and helper/error text
- Fields that benefit from additional affordances such as prefix text, start/end icons, or optional copy
  protection
- Multiline inputs where users need character-count feedback against a maximum length
- Guided entry scenarios with controlled suggestions/autocomplete behavior
- Building consistent form fields that adapt to focus, filled, disabled, error, and read-only states

#### Don't use for

- Do not use as a passive display container for non-editable content
- Do not choose this base primitive first when a specialized Mística field already covers the use case
- Do not rely on placeholder text as the only field label; keep labels explicit and persistent
- Do not hide validation/help context users need to recover from errors
- Do not add suggestions in uncontrolled mode; suggestion-driven fields must keep input state controlled
- Do not overload a single field with too many visual affordances if they reduce readability or input clarity

## EmailField

EmailField captures email addresses with email-optimized input behavior and built-in format validation.

### Usage

#### Use for

- Collecting user email addresses in signup, login recovery, and contact flows
- Providing email-specific keyboard/input mode support to reduce entry friction
- Validating basic address structure early to prevent malformed submissions
- Keeping identity/contact inputs consistent across forms with clear error feedback

#### Don't use for

- Do not use EmailField for usernames or identifiers that are not email addresses
- Do not accept invalid email formatting without visible guidance to correct it
- Do not hide required context (for example, why email is needed) in sensitive flows
- Do not rely only on placeholder text; provide a clear, persistent field label

## PasswordField

PasswordField captures sensitive credentials with masked input, accessible show/hide control, and form validation support.

### Usage

#### Use for

- Collecting account credentials and other sensitive secrets in authentication or security flows
- Allowing users to reveal/hide password text when they need to verify typed content
- Preserving editing continuity when toggling visibility so users can correct input confidently
- Integrating with form-level validation, helper text, and optional state handling

#### Don't use for

- Do not use PasswordField for non-sensitive text inputs that should stay visible by default
- Do not remove clear visibility-toggle affordance in contexts where typing errors are common
- Do not expose sensitive values by default; visibility should remain user-controlled
- Do not hide password requirements or error guidance when users need them to succeed

## SearchField

SearchField captures query input for discovery flows with optional search icon, clear action, and autosuggest integration.

### Usage

#### Use for

- Capturing free-text queries in search and filtering experiences
- Supporting suggestion-driven discovery when users need guidance while typing
- Providing quick reset behavior through a clear control to restart search intent
- Keeping search affordance recognizable with optional leading search icon

#### Don't use for

- Do not use SearchField for strict structured data inputs that require fixed formats
- Do not overload search with heavy validation patterns that block exploratory typing
- Do not hide no-results or empty-suggestion feedback when discovery relies on it
- Do not remove clear affordance in long-query contexts where users need fast reset

## IntegerField

IntegerField captures whole-number input with digit-only sanitization and numeric keypad support on mobile devices.

### Usage

#### Use for

- Collecting whole-number values such as quantities, counts, ages, or integer limits
- Reducing input errors by automatically filtering non-numeric characters during typing
- Supporting form flows where mobile numeric keyboard entry improves speed and accuracy
- Pairing integer entry with helper text and validation feedback for allowed ranges or business rules

#### Don't use for

- Do not use IntegerField for decimal, currency, or formatted values that require separators
- Do not use it for identifiers that may include letters or symbols
- Do not rely on digit filtering alone when domain constraints also require min/max or rule-based validation
- Do not hide range expectations; users should understand valid numeric boundaries before submission

## DecimalField

DecimalField captures numeric values with fractional precision, adapting decimal separator behavior to the user locale.

### Usage

#### Use for

- Entering amounts, measurements, or rates that require decimal precision
- Supporting international users with locale-appropriate decimal separator input behavior
- Limiting fractional precision when business rules require fixed decimal scale
- Reducing formatting errors by allowing only numeric and decimal-separator characters

#### Don't use for

- Do not use DecimalField for integer-only values when no fractional part is allowed
- Do not allow unlimited decimals in flows that require strict precision consistency
- Do not use this field for identifiers (for example card numbers or IDs) that are not numeric quantities
- Do not hide expected number format when locale differences can create ambiguity

## PhoneNumberField

PhoneNumberField captures phone numbers with robust as-you-type international formatting and optional E.164 normalization.

### Usage

#### Use for

- Capturing phone numbers in products that require reliable international formatting behavior
- Guiding users with region-aware as-you-type formatting to reduce entry errors
- Normalizing values to E.164 when backend systems require canonical phone formats
- Supporting form validation and suggestion flows for contact and account verification journeys

#### Don't use for

- Do not use PhoneNumberField when lightweight local formatting is enough; use PhoneNumberFieldLite instead
- Do not hide country/prefix expectations when users can enter numbers from multiple regions
- Do not rely only on visual formatting as validation for number correctness
- Do not use it for non-telephone identifiers that may include unrelated symbols or patterns

## PhoneNumberFieldLite

PhoneNumberFieldLite captures phone numbers with a lightweight formatter for a limited country set and common numbering patterns.

### Usage

#### Use for

- Capturing phone numbers in performance-sensitive flows where a simplified formatter is sufficient
- Supporting common phone patterns for the built-in country subset (for example ES, BR, DE, GB)
- Keeping phone entry lightweight while still offering structured formatting and optional E.164 output
- Handling products with constrained regional scope and predictable numbering conventions

#### Don't use for

- Do not use PhoneNumberFieldLite for broad international support with complex numbering rules; use
  PhoneNumberField instead
- Do not assume all national formats are covered; Lite intentionally handles a subset of cases
- Do not use it when strict telecom-grade formatting fidelity is required across many countries
- Do not hide regional limitations from product requirements and validation strategy

## IbanField

IbanField captures IBAN account identifiers with automatic formatting, uppercase normalization, and built-in IBAN validity checks.

### Usage

#### Use for

- Capturing bank account identifiers specifically in IBAN format inside payment and account forms
- Reducing entry errors with automatic grouping and uppercase normalization while users type
- Providing immediate validation feedback when IBAN structure or checksum is invalid
- Integrating with form flows that require label, helper text, optional state, and validation messaging

#### Don't use for

- Do not use IbanField for non-IBAN identifiers such as local account numbers without IBAN rules
- Do not replace it with a generic text field when IBAN-specific validation is required
- Do not hide or delay error guidance in critical payment steps where correction speed matters
- Do not overload the field with unrelated instructions; keep helper text focused on IBAN entry

## PinField

PinField captures short verification codes in segmented digit inputs, with optional masked display and SMS one-time-code autofill support.

### Usage

#### Use for

- Entering OTP, PIN, or verification codes where each digit should be clear and easy to scan
- Supporting fast code completion with paste/autocomplete behavior across segmented inputs
- Enabling SMS one-time-code autofill in flows where automatic code retrieval is expected
- Using masked code presentation for higher-sensitivity verification steps

#### Don't use for

- Do not use PinField for long passwords or arbitrary free-text input
- Do not hide helper/error feedback when code requirements or failures need clarification
- Do not force SMS autofill in security contexts where code visibility must remain fully user-controlled
- Do not use segmented code input when the journey does not rely on fixed-length numeric verification

## Autocomplete

Autocomplete helps users choose a valid value from suggested options while typing, with fast keyboard and touch interaction.

### Usage

#### Use for

- Helping users find and select from a known set of values without scanning a long list
- Reducing typing effort in fields where valid options can be suggested from partial input
- Supporting fast keyboard flows (arrow navigation, enter to select, tab to confirm)
- Providing a clear empty-state message when no suggestions match

#### Don't use for

- Do not use it for free-text fields when users should be allowed to submit any value
- Do not provide ambiguous or very similar suggestions that are hard to distinguish
- Do not hide critical options behind autocomplete when users need a full browsable list
- Do not rely only on placeholder text; always provide a clear field label and context

## DateField

DateField captures calendar dates with platform-appropriate picker behavior and optional range constraints.

### Usage

#### Use for

- Collecting single date values in forms where calendar precision is required
- Guiding users with familiar native date-picking experiences when supported by the platform
- Enforcing valid date windows (minimum and maximum) for business rules such as booking or eligibility
- Keeping date entry consistent across browsers through fallback picker behavior when native support differs

#### Don't use for

- Do not use DateField for date-time capture when time selection is also required
- Do not allow out-of-range dates without clear user feedback
- Do not replace date pickers with free-text formats that increase entry errors
- Do not use this field for non-date identifiers that only look numeric

## DateTimeField

DateTimeField captures a combined date and time value with platform-appropriate picker behavior and range validation.

### Usage

#### Use for

- Scheduling scenarios where users must provide both calendar date and exact time in one step
- Enforcing valid datetime windows for booking, delivery, reservation, or eligibility constraints
- Providing native date-time selection when available while preserving cross-browser consistency through
  fallback picker support
- Keeping temporal input unified to reduce context switching between separate date and time fields

#### Don't use for

- Do not use DateTimeField when only a date or only a time is required
- Do not allow out-of-range datetime values without explicit error feedback
- Do not split tightly coupled date/time decisions across distant form areas
- Do not replace picker interactions with ambiguous free-text datetime entry

## TimeField

information that the user needs to enter in the field.

### Usage

#### Use for

- For a better understanding of input usage in forms read our forms documentation.
- Collecting user input with clear labels and contextual help text
- Supporting validation and accessible feedback in form flows

#### Don't use for

- Do not use this component to display read-only information
- Do not hide validation context that users need to complete the task

## MonthField

MonthField captures month-and-year values with calendar affordance, range validation, and adaptive native/fallback picker behavior.

### Usage

#### Use for

- Collecting month/year inputs such as billing cycle, subscription period, or contract start month
- Restricting selection to allowed date ranges when business rules define valid periods
- Providing consistent month selection experience across devices with native picker when available
- Supporting form flows where users need clear validation feedback for out-of-range values

#### Don't use for

- Do not use MonthField when day-level precision is required; use a date field instead
- Do not use it for free-form date text entry patterns that expect arbitrary formats
- Do not hide min/max constraints from users when only specific months are valid
- Do not use month selection for non-temporal categorical choices

## CreditCardFields

CreditCardFields groups card number, expiration date, and CVV into a single, optimized payment input block.

### Usage

#### Use for

- Building checkout forms where core card inputs should be presented as one coherent unit
- Preserving a familiar payment flow: card number first, then expiration and CVV together
- Improving scanability and completion speed through structured spacing and paired secondary fields
- Adapting security-code expectations to card type so users enter the right CVV length

#### Don't use for

- Do not split these fields across distant sections when users are expected to complete payment in one step
- Do not rearrange the input order in ways that break common checkout expectations
- Do not remove contextual labels for expiration and CVV; users need immediate field clarity
- Do not use this grouped pattern outside card-payment scenarios

## CreditCardNumberField

CreditCardNumberField captures payment card numbers with guided spacing, card-type recognition, and validity-aware progression.

### Usage

#### Use for

- Entering payment card numbers in checkout and billing flows with reduced input friction
- Helping users scan and verify long numbers through automatic 4-digit grouping
- Providing immediate brand cues (Visa, Mastercard, Amex) to increase confidence while typing
- Enforcing accepted-card and validity constraints before moving users to the next field

#### Don't use for

- Do not use it for generic numeric identifiers outside card-payment contexts
- Do not remove card validation feedback when accepted brands are restricted
- Do not break familiar card-number grouping patterns with custom formatting
- Do not auto-advance to the next step unless card length and validation are complete

## CreditCardExpirationField

CreditCardExpirationField captures card expiry in a guided `MM/YY` format with built-in validity checks.

### Usage

#### Use for

- Capturing payment card expiration dates in a standardized and familiar format
- Reducing input friction with automatic formatting and month normalization as users type
- Validating expiry in context (month/year completeness and non-expired dates)
- Supporting checkout flows where valid expiry should move users smoothly to the next step

#### Don't use for

- Do not use this field for generic date entry outside credit-card expiration use cases
- Do not request full-date patterns (day/month/year) when only month and year are needed
- Do not hide expiration errors; users should clearly understand when a card date is invalid or expired
- Do not break the expected `MM/YY` interaction pattern with custom masking behavior

## CvvField

CvvField captures the card security code with numeric input, card-aware guidance, and strict length validation.

### Usage

#### Use for

- Collecting card security codes in payment forms where CVV is required
- Helping users locate the CVV with contextual visual guidance (info popover)
- Enforcing the expected security-code length for the selected card context
- Supporting smooth checkout progression when a valid CVV is completed

#### Don't use for

- Do not use this field for generic PIN or password entry outside card-payment flows
- Do not hide CVV help when card-location confusion is likely for users
- Do not accept incomplete or mismatched code lengths without clear feedback
- Do not auto-advance to the next step unless CVV length and validation are satisfied

## DoubleField

DoubleField arranges two related form inputs side by side to reduce vertical space and keep paired data entry coherent.

### Usage

#### Use for

- Pairing strongly related fields that users typically complete together
- Building compact form sections where two inputs should be read and completed in one row
- Applying intentional width ratios (`50/50`, `40/60`, `60/40`) when one field needs more horizontal space
- Supporting payment and profile scenarios where grouped field relationships improve completion speed

#### Don't use for

- Do not pair unrelated fields just to save space
- Do not use narrow ratios when both fields require long values or complex helper/error text
- Do not stack many DoubleField rows in dense forms if readability and scanning suffer
- Do not use this pattern when responsive or accessibility needs call for independent full-width inputs

## formatPhoneLite

formatPhoneLite allows users to enter and validate form information in a consistent and accessible way.

### Usage

#### Use for

- Collecting user input with clear labels and contextual help text
- Supporting validation and accessible feedback in form flows

#### Don't use for

- Do not use this component to display read-only information
- Do not hide validation context that users need to complete the task
