import * as React from 'react';
import {SuccessFeedbackScreen, ButtonPrimary} from '../../..';

const SuccessFeedbackScreenTest = (): JSX.Element => (
    <SuccessFeedbackScreen
        title="Some title"
        description="Some description text"
        primaryButton={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}
    />
);

export default SuccessFeedbackScreenTest;
