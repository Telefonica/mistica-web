import * as React from 'react';
import {
    Form,
    Box,
    Stack,
    TextField,
    EmailField,
    ButtonLayout,
    ButtonPrimary,
    PhoneNumberField,
    CreditCardFields,
    DateField,
    DecimalField,
    IntegerField,
    PasswordField,
    CreditCardExpirationField,
    CvvField,
    SearchField,
    Select,
} from '../..';

const FormTest: React.FC = () => (
    <Form onSubmit={() => {}}>
        <Box padding={16}>
            <Stack space={16}>
                <TextField name="name" label="Name" />
                <EmailField name="email" label="e-mail" />
                <Select
                    name="fruits"
                    label="Choose a fruit"
                    options={[
                        {value: 'orange', text: 'Orange'},
                        {value: 'banana', text: 'Banana'},
                    ]}
                />
                <PhoneNumberField name="phone" label="Phone" />
                <CreditCardFields />
                <DateField name="date" label="Date" />
                <DecimalField name="decimal" label="Decimal" />
                <IntegerField name="integer" label="Integer" />
                <PasswordField name="password" label="Password" />
                <CreditCardExpirationField name="expiration-date" label="Expiration date" />
                <CvvField name="cvv" label="CVV" />
                <SearchField name="search" label="Search" />
                <ButtonLayout>
                    <ButtonPrimary submit>Send</ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </Box>
    </Form>
);

export default FormTest;
