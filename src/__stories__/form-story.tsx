import * as React from 'react';
import {fruitEntries, countriesList} from './helpers';
import {
    Stack,
    DoubleField,
    ButtonPrimary,
    ButtonSecondary,
    Form,
    CreditCardFields,
    EmailField,
    Select,
    ButtonLayout,
    PhoneNumberField,
    IntegerField,
    CreditCardNumberField,
    CreditCardExpirationField,
    CvvField,
    DecimalField,
    Switch,
    Text7,
    Checkbox,
    Inline,
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

export const AutomaticForm: StoryComponent = () => {
    return (
        <Form
            initialValues={{email: 'john.doe@gmail.com', decimal: '123', 'save-cc': true}}
            onSubmit={fakeApiCall}
            autoJump
        >
            <Stack space={16}>
                <EmailField name="email" label="email" />

                <PhoneNumberField name="phone" label="phone" />

                <DecimalField name="decimal" label="Decimal" />

                <IntegerField optional autoComplete="off" name="integer" label="Integer" />

                <Select name="country" label="country" options={countryOptions} />

                <Select autoFocus name="fruit" label="fruit" optional options={fruitOptions} />

                <CreditCardFields />

                <Switch
                    name="save-cc"
                    render={(switchElement) => (
                        <Inline alignItems="center" space={16}>
                            <Text7 regular>Save CC</Text7>
                            {switchElement}
                        </Inline>
                    )}
                />

                <Checkbox
                    name="t&c"
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={16}>
                            {checkboxElement}
                            <Text7 regular>Accept Terms and Conditions</Text7>
                        </Inline>
                    )}
                />

                <ButtonLayout>
                    <ButtonSecondary onPress={() => window.alert('hello')}>Hello</ButtonSecondary>
                    <ButtonPrimary submit loadingText="Sending">
                        Send
                    </ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </Form>
    );
};

export const ManualForm: StoryComponent = () => {
    const [fruit, setFruit] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [creditCardNumber, setCreditCardNumber] = React.useState('');
    const [creditCardExpiration, setCreditCardExpiration] = React.useState({raw: ''});
    const [creditCardCvv, setCreditCardCvv] = React.useState('');
    const [saveCC, setSaveCC] = React.useState(true);
    const [acceptTC, setAcceptTC] = React.useState(true);

    const cvvLength = getCvvLength(creditCardNumber);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                window.alert(
                    JSON.stringify(
                        {
                            fruit,
                            quantity,
                            creditCardNumber,
                            creditCardExpiration,
                            creditCardCvv,
                            saveCC,
                            acceptTC,
                        },
                        null,
                        2
                    )
                );
            }}
        >
            <Stack space={16}>
                <Select
                    name="fruit-select"
                    label="Select fruit"
                    value={fruit}
                    onChangeValue={setFruit}
                    options={fruitEntries.map(([text, value]) => ({text, value}))}
                />
                <IntegerField name="quantity" label="Quantity" value={quantity} onChangeValue={setQuantity} />
                <CreditCardNumberField
                    name="cc-field"
                    label="Credit Card Number"
                    value={creditCardNumber}
                    onChangeValue={setCreditCardNumber}
                />
                <DoubleField>
                    <CreditCardExpirationField
                        name="cc-expiration"
                        label="Expiration"
                        value={creditCardExpiration.raw}
                        onChangeValue={setCreditCardExpiration}
                    />
                    <CvvField
                        name="cc-cvv"
                        label="CVV"
                        value={creditCardCvv}
                        onChangeValue={setCreditCardCvv}
                        maxLength={cvvLength}
                    />
                </DoubleField>
                <Switch
                    name="save-cc"
                    checked={saveCC}
                    onChange={setSaveCC}
                    render={(switchElement) => (
                        <Inline alignItems="center" space={16}>
                            <Text7 regular>Save CC</Text7>
                            {switchElement}
                        </Inline>
                    )}
                />
                <Checkbox
                    name="t&c"
                    checked={acceptTC}
                    onChange={setAcceptTC}
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={16}>
                            {checkboxElement}
                            <Text7 regular>Accept Terms and Conditions</Text7>
                        </Inline>
                    )}
                />
                <ButtonLayout>
                    <ButtonPrimary submit loadingText="Sending">
                        Send
                    </ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </form>
    );
};
