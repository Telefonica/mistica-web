import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
    Form,
    Box,
    Stack,
    ResponsiveLayout,
    TextLink,
    Title1,
    Text3,
    TextField,
    EmailField,
    ButtonLayout,
    ButtonPrimary,
    alert,
} from '@telefonica/mistica';

const Home = (): JSX.Element => {
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
                        <Title1>Form example</Title1>
                        <Form onSubmit={handleSubmit}>
                            <Stack space={16}>
                                <TextField id="name" name="name" label="Name" />
                                <EmailField id="email" name="email" label="e-mail" />
                                <ButtonLayout>
                                    <ButtonPrimary submit>Send</ButtonPrimary>
                                </ButtonLayout>
                            </Stack>
                        </Form>
                    </Box>
                    <Box>
                        <Title1>Using links</Title1>
                        <Stack space={16}>
                            <Text3>
                                Inspect the browser network pannel to check that all these links navigate
                                client side (no full page load)
                            </Text3>
                            <Text3>Next link:</Text3>
                            <Link href="/other-page">Go to other page</Link>
                            <Text3>Mistica TextLink:</Text3>
                            <TextLink to="/other-page">Go to other page</TextLink>
                        </Stack>
                    </Box>
                    <Box>
                        <Title1>Dynamic Links</Title1>
                        <Stack space={16}>
                            <Text3>Write a user name to navigate to their page.</Text3>
                            <TextField
                                name="user-name"
                                id="user-name"
                                value={userName}
                                onChangeValue={setUserName}
                                label="User name"
                            />
                            {userName && (
                                <Link href="/user/[name]" as={`/user/${userName}`}>
                                    Go to user page (Next link)
                                </Link>
                            )}
                            {userName && (
                                <ButtonPrimary to={`/user/${userName}`}>
                                    Go to user page (Mistica button)
                                </ButtonPrimary>
                            )}
                            <Text3>
                                Review <Text3>_app.js</Text3> file for more details about how dynamic links
                                work in Next using Mistica <Text3 medium>to</Text3> prop.
                            </Text3>
                        </Stack>
                    </Box>
                </Stack>
            </ResponsiveLayout>
        </>
    );
};

export default Home;
