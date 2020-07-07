import * as React from 'react';
import {useRouter} from 'next/router';
import {ButtonPrimary, Stack, Text, ResponsiveLayout, SectionTitle} from '@telefonica/mistica';

const User = (props) => {
    const {query} = useRouter();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <SectionTitle>User page</SectionTitle>
                <Text>hello {query.name}</Text>
                <ButtonPrimary to="/">Go home</ButtonPrimary>
            </Stack>
        </ResponsiveLayout>
    );
};
export default User;
