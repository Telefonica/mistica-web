import * as React from 'react';
import {ButtonPrimary, Snackbar, useSnackbar} from '..';

export default {
    title: 'Components/Snackbar',
    component: Snackbar,
};

type Args = {
    buttonText: string;
    message: string;
    duration: 'PERSISTENT' | 'undefined';
    type: React.ComponentProps<typeof Snackbar>['type'];
    withDismiss: boolean;
};

export const Default: StoryComponent<Args> = ({buttonText, message, duration, type, withDismiss}) => {
    const snackbarDuration = duration === 'PERSISTENT' ? duration : undefined;
    const {openSnackbar} = useSnackbar();
    return (
        <ButtonPrimary
            onPress={() => {
                openSnackbar({message, type, buttonText, duration: snackbarDuration, withDismiss});
            }}
        >
            Open Snackbar
        </ButtonPrimary>
    );
};

Default.storyName = 'Snackbar';

Default.args = {
    type: 'INFORMATIVE',
    message: 'Some message',
    buttonText: 'Action',
    withDismiss: false,
    duration: 'undefined',
};

Default.argTypes = {
    duration: {
        options: ['PERSISTENT', 'undefined'],
        control: {type: 'select'},
    },
    type: {
        options: ['INFORMATIVE', 'CRITICAL'],
        control: {type: 'select'},
    },
};
