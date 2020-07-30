import * as React from 'react';
import {fruitEntries, countriesList} from './helpers';
import {
    Stack,
    DoubleField,
    ButtonPrimary,
    ButtonSecondary,
    Form,
    FormCreditCardFields,
    FormEmailField,
    FormSelect,
    ButtonLayout,
    FormPhoneNumberField,
    FormIntegerField,
    FormCreditCardNumberField,
    FormCreditCardExpirationField,
    FormCvvField,
    FormDecimalField,
} from '..';
import {getCvvLength} from '../utils/credit-card';

export default {
    title: 'Components|Forms/Form',
};

const fakeApiCall = (data: any): Promise<void> =>
    new Promise((r) =>
        setTimeout(() => {
            r();
            window.alert(JSON.stringify(data, null, 2));
        }, 5000)
    );

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
const countryOptions = countriesList.map((text, i) => ({text, value: '' + i}));

export const AutomaticForm: StoryComponent = () => (
    <Form initialValues={{email: 'john.doe@gmail.com', decimal: '123'}} onSubmit={fakeApiCall} autoJump>
        <Stack space={16}>
            <FormEmailField name="email" label="email" />

            <FormPhoneNumberField name="phone" label="phone" />

            <FormDecimalField name="decimal" label="Decimal" />

            <FormIntegerField optional autoComplete="off" name="integer" label="Integer" />

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

export const ManualForm: StoryComponent = () => {
    const [fruit, setFruit] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [creditCardNumber, setCreditCardNumber] = React.useState('');
    const [creditCardExpiration, setCreditCardExpiration] = React.useState({raw: ''});
    const [creditCardCvv, setCreditCardCvv] = React.useState('');

    const cvvLength = getCvvLength(creditCardNumber);

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
                <FormSelect
                    name="fruit-select"
                    label="Select fruit"
                    value={fruit}
                    onChangeValue={setFruit}
                    options={fruitEntries.map(([text, value]) => ({text, value}))}
                />
                <FormIntegerField
                    name="quantity"
                    label="Quantity"
                    value={quantity}
                    onChangeValue={setQuantity}
                />
                <FormCreditCardNumberField
                    name="cc-field"
                    label="Credit Card Number"
                    value={creditCardNumber}
                    onChangeValue={setCreditCardNumber}
                />
                <DoubleField>
                    <FormCreditCardExpirationField
                        name="cc-expiration"
                        label="Expiration"
                        value={creditCardExpiration.raw}
                        onChangeValue={setCreditCardExpiration}
                    />
                    <FormCvvField
                        name="cc-cvv"
                        label="CVV"
                        value={creditCardCvv}
                        onChangeValue={setCreditCardCvv}
                        maxLength={cvvLength}
                    />
                </DoubleField>
                <ButtonLayout>
                    <ButtonPrimary submit loadingText="Sending">
                        Send
                    </ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </form>
    );
};
