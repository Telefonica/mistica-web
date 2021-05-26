import * as React from 'react';
import {fruitEntries, countriesList} from './helpers';
import {
    Stack,
    ButtonPrimary,
    Form,
    CreditCardFields,
    EmailField,
    Select,
    ButtonLayout,
    PhoneNumberField,
    IbanField,
    IntegerField,
    DecimalField,
    Switch,
    Checkbox,
    TextLink,
    alert,
    RadioGroup,
    RadioButton,
    Text3,
    useTheme,
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
    const {colors} = useTheme();
    return (
        <Form
            initialValues={{
                email: 'john.doe@gmail.com',
                decimal: '123',
                country: '',
                fruit: '',
                'save-cc': true,
            }}
            onSubmit={fakeApiCall}
            autoJump
        >
            <Stack space={16}>
                <EmailField name="email" label="email" />
                <PhoneNumberField name="phone" label="phone" />
                <IbanField name="bankAccount" label="IBAN" />
                <DecimalField name="decimal" label="Decimal" />
                <IntegerField optional autoComplete="off" name="integer" label="Integer" />
                <Select name="country" label="country" options={countryOptions} />
                <Select autoFocus name="fruit" label="fruit (autofocus)" options={fruitOptions} />
                <CreditCardFields />
                <Switch name="save-cc">Save CC</Switch>
                <Checkbox name="t&c">
                    Accept{' '}
                    <TextLink
                        onPress={(e) => {
                            e.stopPropagation();
                            alert({message: 'TOS'});
                        }}
                    >
                        Terms and Conditions
                    </TextLink>
                </Checkbox>

                <Text3 regular color={colors.textSecondary} id="fruit-label">
                    ¿What is your favourite fruit?
                </Text3>
                <RadioGroup name="juicy-fruit" aria-labelledby="fruit-label" defaultValue="banana">
                    <Stack space={16}>
                        <RadioButton value="banana">Banana</RadioButton>
                        <RadioButton value="apple">Apple</RadioButton>
                    </Stack>
                </RadioGroup>

                <ButtonLayout>
                    <ButtonPrimary submit loadingText="Sending">
                        Send
                    </ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </Form>
    );
};
