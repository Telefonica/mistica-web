import * as React from 'react';
import {SuccessFeedbackScreen, ButtonPrimary} from '../../..';

const SuccessFeedbackScreenTest: React.FC = () => (
    <SuccessFeedbackScreen
        title="Some title"
        description="Some description text"
        primaryButton={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}
    />
);

export default SuccessFeedbackScreenTest;
