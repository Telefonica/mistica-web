import * as React from 'react';
import {fruitEntries, countriesList} from './helpers';
import {
    Stack,
    ButtonPrimary,
    ButtonSecondary,
    Form,
    CreditCardFields,
    EmailField,
    Select,
    ButtonLayout,
    PhoneNumberField,
    IntegerField,
    DecimalField,
    Switch,
    Text7,
    Checkbox,
    Inline,
} from '..';

export default {
    title: 'Components/Forms/Example Automatic',
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
            initialValues={{
                email: 'john.doe@gmail.com',
                decimal: '123',
                country: '',
                'save-cc': true,
            }}
            onSubmit={fakeApiCall}
            autoJump
        >
            <Stack space={16}>
                <EmailField name="email" label="email" />

                <PhoneNumberField name="phone" label="phone" />

                <DecimalField name="decimal" label="Decimal" />

                <IntegerField optional autoComplete="off" name="integer" label="Integer" />

                <Select name="country" label="country" options={countryOptions} />

                <Select autoFocus name="fruit" label="fruit" options={fruitOptions} />

                <CreditCardFields />

                <Switch
                    name="save-cc"
                    render={(switchElement) => (
                        <Inline alignItems="center" space={8}>
                            {switchElement}
                            <Text7 regular>Save CC</Text7>
                        </Inline>
                    )}
                />

                <Checkbox
                    name="t&c"
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={8}>
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
