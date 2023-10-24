import * as React from 'react';
import {Snackbar} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Snackbar',
    component: Snackbar,
};

type Args = {
    buttonText: string;
    message: string;
    duration: string;
    type: React.ComponentProps<typeof Snackbar>['type'];
    withDismiss: boolean;
};

export const Default: StoryComponent<Args> = ({buttonText, message, duration, type, withDismiss}) => {
    const snackbarDuration = duration !== 'Default' ? +duration : undefined;
    return (
        <StorySection title="Snackbar">
            <Snackbar
                buttonText={buttonText}
                type={type}
                message={message}
                duration={snackbarDuration}
                withDismiss={withDismiss}
            />
        </StorySection>
    );
};

Default.storyName = 'Snackbar';

Default.args = {
    buttonText: 'Action',
    message: 'Some message',
    type: 'INFORMATIVE',
    duration: 'Default',
    withDismiss: false,
};

Default.argTypes = {
    duration: {
        options: ['Default', '5000', '10000', 'Infinity'],
        control: {type: 'select'},
    },
    type: {
        options: ['INFORMATIVE', 'CRITICAL'],
        control: {type: 'select'},
    },
};
