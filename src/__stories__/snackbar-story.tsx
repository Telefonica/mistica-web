import * as React from 'react';
import {Snackbar, Stack} from '..';
import {StorySection, useTextField, useSelect} from './helpers';

export default {
    title: 'Components/Dialogs/Snackbar',
    component: Snackbar,
};

export const Default: StoryComponent = () => {
    const [buttonText, buttonTextField] = useTextField('buttonText', 'Action');
    const [message, messageTextField] = useTextField('message', 'Some message', true);
    const [type, select] = useSelect('type', 'INFORMATIVE', ['INFORMATIVE', 'CRITICAL']);
    return (
        <StorySection title="Snackbar">
            <Stack space={16}>
                {buttonTextField}
                {messageTextField}
                {select}
                <Snackbar buttonText={buttonText} type={type as any} message={message} />
            </Stack>
        </StorySection>
    );
};

Default.storyName = 'Snackbar';
