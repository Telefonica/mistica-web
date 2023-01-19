import * as React from 'react';
import {InfoFeedbackScreen, ButtonPrimary} from '../../..';

const InfoFeedbackScreenTest = (): JSX.Element => (
    <InfoFeedbackScreen
        title="Some title"
        description="Some description text"
        primaryButton={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}
    />
);

export default InfoFeedbackScreenTest;
