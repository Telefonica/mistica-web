import * as React from 'react';
import {ButtonPrimary, Snackbar, useSnackbar} from '..';

export default {
    title: 'Components/Snackbar',
    component: Snackbar,
};

type Args = {
    buttonText: string;
    message: string;
    persistent: boolean;
    position: 'default' | NonNullable<React.ComponentProps<typeof Snackbar>['position']>;
    type: React.ComponentProps<typeof Snackbar>['type'];
    dismiss: boolean;
};

export const Default: StoryComponent<Args> = ({buttonText, message, persistent, position, type, dismiss}) => {
    const snackbarDuration = persistent ? 'PERSISTENT' : undefined;
    const {openSnackbar} = useSnackbar();
    return (
        <ButtonPrimary
            onPress={() => {
                openSnackbar({
                    message,
                    type,
                    buttonText,
                    duration: snackbarDuration,
                    position: position === 'default' ? undefined : position,
                    withDismiss: dismiss,
                });
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
    dismiss: false,
    persistent: false,
    position: 'default',
};

Default.argTypes = {
    position: {
        options: [
            'default',
            'bottom-center',
            'bottom-left',
            'bottom-right',
            'top-center',
            'top-left',
            'top-right',
        ],
        control: {type: 'select'},
    },
    type: {
        options: ['INFORMATIVE', 'CRITICAL'],
        control: {type: 'select'},
    },
};
