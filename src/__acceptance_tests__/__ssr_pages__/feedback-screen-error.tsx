import * as React from 'react';
import {ErrorFeedbackScreen, ButtonPrimary} from '../../..';

const ErrorFeedbackScreenTest: React.FC = () => (
    <ErrorFeedbackScreen
        title="Some title"
        description="Some description text"
        primaryButton={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}
    />
);

export default ErrorFeedbackScreenTest;
