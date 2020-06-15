// @flow
import * as React from 'react';
import {fruitEntries, countriesList} from './helpers';
import {
    Stack,
    TextField,
    Select,
    DoubleField,
    ButtonPrimary,
    ButtonSecondary,
    Form,
    FormCreditCardFields,
    FormEmailField,
    FormSelect,
    FormTextField,
    ButtonLayout,
    FormPhoneNumberField,
} from '..';

export default {
    title: 'Components|Forms/Form',
};

const fakeApiCall = (data) =>
    new Promise((r) =>
        setTimeout(() => {
            r();
            window.alert(JSON.stringify(data, null, 2));
        }, 5000)
    );

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
const countryOptions = countriesList.map((text, i) => ({text, value: '' + i}));

export const AutomaticForm = (): React.Node => (
    <Form initialValues={{email: 'john.doe@gmail.com', decimal: '123'}} onSubmit={fakeApiCall} autoJump>
        <Stack space={16}>
            <FormEmailField name="email" label="email" />

            <FormPhoneNumberField name="phone" label="phone" />

            <FormTextField type="decimal" name="decimal" label="Decimal" />

            <FormTextField type="integer" optional autoComplete="off" name="integer" label="Integer" />

            <FormSelect name="country" label="country" options={countryOptions} />

            <FormSelect autoFocus name="fruit" label="fruit" optional options={fruitOptions} />

            <FormCreditCardFields />

            <ButtonLayout>
                <ButtonSecondary onPress={() => window.alert('hello')}>Hello</ButtonSecondary>
                <ButtonPrimary submit loadingText="Sending">
                    Send
                </ButtonPrimary>
            </ButtonLayout>
        </Stack>
    </Form>
);

export const ManualForm = (): React.Element<'form'> => {
    const [fruit, setFruit] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [creditCardNumber, setCreditCardNumber] = React.useState('');
    const [creditCardExpiration, setCreditCardExpiration] = React.useState({raw: ''});
    const [creditCardCvv, setCreditCardCvv] = React.useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                window.alert(
                    JSON.stringify(
                        {fruit, quantity, creditCardNumber, creditCardExpiration, creditCardCvv},
                        null,
                        2
                    )
                );
            }}
        >
            <Stack space={16}>
                <Select
                    required
                    label="Select fruit"
                    value={fruit}
                    onChangeValue={setFruit}
                    options={fruitEntries.map(([text, value]) => ({text, value}))}
                />
                <TextField
                    required
                    type="integer"
                    label="Quantity"
                    value={quantity}
                    onChangeValue={setQuantity}
                />
                <TextField
                    required
                    type="credit-card-number"
                    label="Credit Card Number"
                    value={creditCardNumber}
                    onChangeValue={setCreditCardNumber}
                />
                <DoubleField>
                    <TextField
                        required
                        type="credit-card-expiration"
                        label="Expiration"
                        value={creditCardExpiration.raw}
                        onChangeValue={setCreditCardExpiration}
                    />
                    <TextField
                        required
                        type="credit-card-cvv"
                        label="CVV"
                        value={creditCardCvv}
                        onChangeValue={setCreditCardCvv}
                    />
                </DoubleField>
            </Stack>
        </form>
    );
};
