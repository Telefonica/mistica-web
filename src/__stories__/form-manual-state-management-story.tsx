import * as React from 'react';
import {fruitEntries} from './helpers';
import {
    Stack,
    DoubleField,
    ButtonPrimary,
    Select,
    ButtonLayout,
    IntegerField,
    CreditCardNumberField,
    CreditCardExpirationField,
    CvvField,
    Switch,
    Text2,
    Checkbox,
} from '..';
import {getCvvLength} from '../utils/credit-card';

export default {
    title: 'Patterns/Forms/Form with manual state management',
};

export const Default: StoryComponent = () => {
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
                <Switch name="save-cc" checked={saveCC} onChange={setSaveCC}>
                    Save CC
                </Switch>
                <Checkbox name="t&c" checked={acceptTC} onChange={setAcceptTC}>
                    <Text2 regular>Accept Terms and Conditions</Text2>
                </Checkbox>
                <ButtonLayout>
                    <ButtonPrimary submit loadingText="Sending">
                        Send
                    </ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </form>
    );
};

Default.storyName = 'Form with manual state management';
