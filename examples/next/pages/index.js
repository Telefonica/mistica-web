import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
    Form,
    Box,
    Stack,
    ResponsiveLayout,
    TextLink,
    SectionTitle,
    Text,
    FormTextField,
    FormEmailField,
    ButtonLayout,
    ButtonPrimary,
    alert,
} from '@telefonica/mistica';

const Home = () => {
    const [userName, setUserName] = React.useState('');
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
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ResponsiveLayout>
                <Stack space={32}>
                    <Box>
                        <SectionTitle>Form example</SectionTitle>
                        <Form onSubmit={handleSubmit}>
                            <Stack space={16}>
                                <FormTextField id="name" name="name" label="Name" />
                                <FormEmailField id="email" name="email" label="e-mail" />
                                <ButtonLayout>
                                    <ButtonPrimary submit>Send</ButtonPrimary>
                                </ButtonLayout>
                            </Stack>
                        </Form>
                    </Box>
                    <Box>
                        <SectionTitle>Using links</SectionTitle>
                        <Stack space={16}>
                            <Text>
                                Inspect the browser network pannel to check that all these links navigate
                                client side (no full page load)
                            </Text>
                            <Text>Next link:</Text>
                            <Link href="/other-page">
                                <a>Go to other page</a>
                            </Link>
                            <Text>Mistica TextLink:</Text>
                            <TextLink to="/other-page">Go to other page</TextLink>
                        </Stack>
                    </Box>
                    <Box>
                        <SectionTitle>Dynamic Links</SectionTitle>
                        <Stack space={16}>
                            <Text>Write a user name to navigate to their page.</Text>
                            <FormTextField
                                name="user-name"
                                id="user-name"
                                value={userName}
                                onChangeValue={setUserName}
                                label="User name"
                            />
                            {userName && (
                                <Link href="/user/[name]" as={`/user/${userName}`}>
                                    <a>Go to user page (Next link)</a>
                                </Link>
                            )}
                            {userName && (
                                <ButtonPrimary to={`/user/${userName}`}>
                                    Go to user page (Mistica button)
                                </ButtonPrimary>
                            )}
                            <Text>
                                Review <Text weight="bold">_app.js</Text> file for more details about how
                                dynamic links work in Next using Mistica <Text weight="bold">to</Text> prop.
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
            </ResponsiveLayout>
        </>
    );
};

export default Home;
