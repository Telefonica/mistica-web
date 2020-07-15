import * as React from 'react';
import {ButtonPrimary, ResponsiveLayout, SectionTitle} from '@telefonica/mistica';

const OtherPage = () => (
    <ResponsiveLayout>
        <SectionTitle>Other page</SectionTitle>
        <ButtonPrimary to="/">Go home</ButtonPrimary>
    </ResponsiveLayout>
);
export default OtherPage;
