import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {InfoFeedbackScreen, ButtonPrimary} from '../../..';

const InfoFeedbackScreenTest = (): JSX.Element => (
    <InfoFeedbackScreen
        title="Some title"
        description="Some description text"
        primaryButton={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}
    />
);

export default InfoFeedbackScreenTest;
