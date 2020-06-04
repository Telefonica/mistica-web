// @flow
import * as React from 'react';
import {Snackbar, Stack} from '..';
import {StorySection, useTextField, useSelect} from './helpers';

export default {
    title: 'Components|Snackbar',
    component: Snackbar,
};

export const Default = (): React.Node => {
    const [buttonText, buttonTextField] = useTextField('buttonText', 'Action');
    const [message, messageTextField] = useTextField('message', 'Some message');
    const [type, select] = useSelect('type', 'INFORMATIVE', ['INFORMATIVE', 'CRITICAL']);
    return (
        <StorySection title="Snackbar">
            <Stack space={16}>
                {buttonTextField}
                {messageTextField}
                {select}
                <Snackbar buttonText={buttonText} type={(type: any)} message={message} />
            </Stack>
        </StorySection>
    );
};
