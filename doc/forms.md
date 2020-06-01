# Forms

<!-- TOC depthFrom:2 -->

- [Form example](#form-example)
- [Form fields](#form-fields)
  - [FormCreditCardFields](#formcreditcardfields)
  - [FormEmailField](#formemailfield)
  - [FormSelect](#formselect)
  - [FormTextField](#formtextfield)
  - [FormPhoneNumberField](#formphonenumberfield)
  - [DoubleField](#doublefield)
- [Primitive fields](#primitive-fields)

<!-- /TOC -->

You can build complex forms with automatic state handling using the components provided by this library

## Form example

Let's see a quick example to see how it works

```js
import {Form, FormTextField, ButtonPrimary} from '@telefonica/mistica-web';

const validateName = (name) => (/^\w+$/.test(name) ? '' : 'bad username');

const LoginForm = () => {
  // {user, pass} contains field values for inputs named "user" and "pass"
  const handleSubmit = ({user, pass}) =>
    api.login({user, pass}).then(() => {
      document.location.href = '/home';
    });

  return (
    <Form onSubmit={handleSubmit}>
      <FormTextField name="user" label="Username" validate={validateName} />
      <FormTextField name="pass" label="Password" type="password" />
      <ButtonPrimary submit>Log in</ButtonPrimary>
    </Form>
  );
};
```

Important notes:

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

## Form fields

### FormCreditCardFields

This component will render 3 fields:

- `FormCreditCardNumberField`
- `FormCreditCardExpirationField`
- `FormCvvField`

Use it if you want to request credit card information

These fields have built-in validations:

- Simple validation is performed in credit card number
- CVV length depends on card type
- Expiration date must be a future date

### FormEmailField

Field for emails.

- Has built-in email address validation (naive)
- Uses an email keypad on mobile

### FormSelect

Use this component to create a `Select`

```js
const options = [
  {value: 1, text: 'orange'},
  {value: 2, text: 'apple'},
];

//...

<FormSelect options={options} />;
```

### FormTextField

This field accepts a `type` prop to change its behavior

- `text`: this is the default
- `password`: to enter passwords, with an "eye" icon to show/hide password
- `integer`: only accepts integer numbers. Uses an integer keypad on mobile
- `decimal`: only allows decimal numbers. Uses a decimal keypad on mobile
- `date`: for dates

### FormPhoneNumberField

To enter phone numbers

- Uses Google's `libphonenumber` library to format numbers as you type (uses `locale` from theme context to
  format numbers accordingly)

## DoubleField

Use this component to place two fields at the same row

```js
<DoubleField>
  <FormTextField name="foo" label="Foo" />
  <FormTextField name="bar" label="Bar" />
</DoubleField>
```

## Primitive fields

Usage of the following components is discouraged and future versions of this library could stop exporting them

- `TextField`
- `PhoneInput`
- `Select`
