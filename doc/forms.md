# Forms

<!-- TOC depthFrom:2 -->

- [Form example](#form-example)
  - [Important notes](#important-notes)
- [Form fields](#form-fields)
  - [CreditCardFields](#creditcardfields)
  - [CreditCardNumberField](#creditcardnumberfield)
  - [CreditCardExpirationField](#creditcardexpirationfield)
  - [CvvField](#cvvfield)
  - [DateField](#datefield)
  - [DecimalField](#decimalfield)
  - [IntegerField](#integerfield)
  - [PasswordField](#passwordfield)
  - [EmailField](#emailfield)
  - [Select](#select)
  - [PhoneNumberField](#phonenumberfield)
  - [IbanField](#ibanfield)
- [DoubleField](#doublefield)
- [useForm Hook](#useform-hook)

<!-- /TOC -->

You can build complex forms with automatic state handling using the components provided by this library

## Form example

Let's see a quick example to see how it works

```js
import {Form, TextField, ButtonPrimary} from '@telefonica/mistica';

const validateName = (name) => (/^\w+$/.test(name) ? '' : 'bad username');

const LoginForm = () => {
  // {user, pass} contains field values for inputs named "user" and "pass"
  const handleSubmit = ({user, pass}) =>
    api.login({user, pass}).then(() => {
      document.location.href = '/home';
    });

  return (
    <Form onSubmit={handleSubmit}>
      <TextField name="user" label="Username" validate={validateName} />
      <TextField name="pass" label="Password" type="password" />
      <ButtonPrimary submit>Log in</ButtonPrimary>
    </Form>
  );
};
```

### Important notes

- Submit button must include the `submit` prop
- :warning: Submit handler automatically prevents default submit event (calls to `event.preventDefault()`).
  So, for now, you can't use this component to send a `POST` request to `action` attribute URL.
- Form fields are required by default. If a required field is empty it will be marked as error on submit or
  blur. Add the `optional` prop to mark a field as optional.
- `Form`'s `onSubmit` prop is a `function` that receives an `object` whose keys are the names of the form
  fields and the values are the values of the form fields. This function must return a promise.
- When the form is submitting (while the `onSubmit` promise is not resolved or rejected), all fields are
  automatically disabled and a spinner is shown inside submit button.
- Form fields accept a `validate` prop that can be used to validate field values before submitting. This
  validation is executed on blur or submit. Validation function must return a string with the error message or
  empty string if succeeded.
- Form optionally accepts an object of `initialValues` e.g. `<Form initialValues={{email: prevEmail}}`
- You can also use FormField components outside a `<Form>` component but you will lose the magic: automatic
  form validation, disable fields when sending, show spinner on submit button, etc.

## Form fields

### CreditCardFields

- Use it if you want to request credit card information
- This component will render 3 fields:
  - `CreditCardNumberField`
  - `CreditCardExpirationField`
  - `CvvField`
- When used inside a `<Form>` component, these fields have built-in validations:
  - Simple validation is performed in credit card number
  - CVV length depends on card type
  - Expiration date must be a future date

### CreditCardNumberField

- To request a Credit Card number
- Use `acceptedCards` prop to set accepted cards. By default:
  - `{americanExpress: true, visa: true, masterCard: true}`
- An icon will hint the card type based on the card number

### CreditCardExpirationField

- To request a Credit Card expiration date
- Format as you write (MM/YY)

### CvvField

- To request the Credit Card Verification value

### DateField

- To select dates
- Uses device/browser native date picker

### DecimalField

- Shows a numeric keypad in mobile devices
- Values restricted to decimal values
- Decimal separator characted (comma or dot) depends on context locale

### IntegerField

- Shows a numeric keypad in mobile devices
- Values restricted to integer values

### PasswordField

- Use this field to request a password
- Includes an "eye" icon to show/hide password
- Use the `autoComplete` prop to autocomplete to an existing password (`"current-password"`) or request a new
  one (`"new-password"`)

### EmailField

- Use this field to request an email address
- Has built-in email address validation (naive)
- Uses an email keypad on mobile
- Autocompletes to current email, to disable, set `autoComplete` to `"off"`

### Select

Use this component to create a `Select`

```js
const options = [
  {value: 1, text: 'orange'},
  {value: 2, text: 'apple'},
];

//...

<Select options={options} />;
```

### PhoneNumberField

To enter phone numbers

- Uses Google's `libphonenumber` library to format numbers as you type (uses `locale` from theme context to
  format numbers accordingly)

### IbanField

To enter bank accounts using the IBAN format

- Formats the IBAN number as you type
- Validates the number using the checksum

## DoubleField

Use this component to place two fields at the same row

```js
<DoubleField>
  <TextField name="foo" label="Foo" />
  <TextField name="bar" label="Bar" />
</DoubleField>
```

## useForm Hook

With `useForm` you can access the form context. See `form-context.tsx`.

This allows you to implement advanced form logic. See form stories for examples.

Please open an issue if your use case is not covered or you need additional examples.
