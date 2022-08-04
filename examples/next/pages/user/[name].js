import * as React from 'react';
import {useRouter} from 'next/router';
import {ButtonPrimary, Stack, Text, ResponsiveLayout, Title1} from '@telefonica/mistica';

const User = (props) => {
    const {query} = useRouter();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Title1>User page</Title1>
                <Text>hello {query.name}</Text>
                <ButtonPrimary to="/">Go home</ButtonPrimary>
            </Stack>
        </ResponsiveLayout>
    );
};
export default User;
