import * as React from 'react';
import {ButtonPrimary, ResponsiveLayout, Title1} from '@telefonica/mistica';

const OtherPage = (): JSX.Element => (
    <ResponsiveLayout>
        <Title1>Other page</Title1>
        <ButtonPrimary to="/">Go home</ButtonPrimary>
    </ResponsiveLayout>
);
export default OtherPage;
