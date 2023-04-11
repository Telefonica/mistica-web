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
};

export const Default: StoryComponent<Args> = ({buttonText, message, duration, type}) => {
    const snackbarDuration = duration !== 'Default' ? +duration : undefined;
    return (
        <StorySection title="Snackbar">
            <Snackbar
                buttonText={buttonText}
                type={type as any}
                message={message}
                duration={snackbarDuration}
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
};

Default.argTypes = {
    duration: {
        options: ['Default', '5000', '10000'],
        control: {type: 'select'},
    },
    type: {
        options: ['INFORMATIVE', 'CRITICAL'],
        control: {type: 'select'},
    },
};
