import * as React from 'react';
import {
    Form,
    Box,
    Stack,
    FormTextField,
    FormEmailField,
    ButtonLayout,
    ButtonPrimary,
    FormPhoneNumberField,
    FormCreditCardFields,
    FormDateField,
    FormDecimalField,
    FormIntegerField,
    FormPasswordField,
    FormCreditCardExpirationField,
    FormCvvField,
    FormSearchField,
} from '../..';

const FormTest: React.FC = () => (
    <Form onSubmit={() => {}}>
        <Box padding={16}>
            <Stack space={16}>
                <FormTextField name="name" label="Name" />
                <FormEmailField name="email" label="e-mail" />
                {/* TODO: Make FormSelect work with SSR */}
                {/* <FormSelect
                    name="fruits"
                    label="Choose a fruit"
                    options={[
                        {value: 'orange', text: 'Orange'},
                        {value: 'banana', text: 'Banana'},
                    ]}
                /> */}
                <FormPhoneNumberField name="phone" label="Phone" />
                <FormCreditCardFields />
                <FormDateField name="date" label="Date" />
                <FormDecimalField name="decimal" label="Decimal" />
                <FormIntegerField name="integer" label="Integer" />
                <FormPasswordField name="password" label="Password" />
                <FormCreditCardExpirationField name="expiration-date" label="Expiration date" />
                <FormCvvField name="cvv" label="CVV" />
                <FormSearchField name="search" label="Search" />
                <ButtonLayout>
                    <ButtonPrimary submit>Send</ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </Box>
    </Form>
);

export default FormTest;
