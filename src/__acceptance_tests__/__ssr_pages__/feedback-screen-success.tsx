import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {SuccessFeedbackScreen, ButtonPrimary} from '../../..';

const SuccessFeedbackScreenTest = (): JSX.Element => (
    <SuccessFeedbackScreen
        title="Some title"
        description="Some description text"
        primaryButton={<ButtonPrimary href="https://google.com">Action</ButtonPrimary>}
    />
);

export default SuccessFeedbackScreenTest;
