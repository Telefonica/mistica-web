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
    const handleSubmit = async (formData) => {
        // see /pages/api/hello.js
        const response = await fetch(
            `/api/hello?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`
        );
        const responseData = await response.json();

        alert({
            title: 'Server response',
            message: responseData.message,
        });
    };

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Form onSubmit={handleSubmit}>
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
