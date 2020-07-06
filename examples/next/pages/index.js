import * as React from 'react';
import Head from 'next/head';
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

const Home = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                        <FormTextField id="name" name="name" label="Name" />
                        <FormEmailField id="email" name="email" label="e-mail" />
                        <ButtonLayout>
                            <ButtonPrimary submit>Send</ButtonPrimary>
                        </ButtonLayout>
                    </Stack>
                </Box>
            </Form>
        </div>
    );
};

export default Home;
