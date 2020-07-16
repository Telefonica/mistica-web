import React from 'react';
import {
    Form,
    Box,
    Stack,
    FormTextField,
    FormEmailField,
    ButtonLayout,
    ButtonPrimary,
    alert,
} from '@telefonica/mistica';

const App = () => (
    <Form
        onSubmit={(formData) =>
            alert({
                title: 'This is your data',
                message: JSON.stringify(formData, null, 2),
            })
        }
    >
        <Box padding={16}>
            <Stack space={16}>
                <FormTextField name="name" label="Name" />
                <FormEmailField name="email" label="e-mail" />
                <ButtonLayout>
                    <ButtonPrimary submit>Send</ButtonPrimary>
                </ButtonLayout>
            </Stack>
        </Box>
    </Form>
);

export default App;
