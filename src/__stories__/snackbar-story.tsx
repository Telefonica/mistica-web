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
    type: React.ComponentProps<typeof Snackbar>['type'];
    withDismiss: boolean;
};

export const Default: StoryComponent<Args> = ({buttonText, message, persistent, type, withDismiss}) => {
    const snackbarDuration = persistent ? 'PERSISTENT' : undefined;
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
    persistent: false,
};

Default.argTypes = {
    type: {
        options: ['INFORMATIVE', 'CRITICAL'],
        control: {type: 'select'},
    },
};
