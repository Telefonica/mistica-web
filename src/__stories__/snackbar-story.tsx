import * as React from 'react';
import {ButtonPrimary, Snackbar, useSnackbar} from '..';

export default {
    title: 'Components/Snackbar',
    component: Snackbar,
};

type Args = {
    buttonText: string;
    message: string;
    duration: string;
    type: React.ComponentProps<typeof Snackbar>['type'];
    dismiss: boolean;
};

export const Default: StoryComponent<Args> = ({buttonText, message, duration, type, dismiss}) => {
    const snackbarDuration = duration !== 'Default' ? +duration : undefined;
    const {openSnackbar} = useSnackbar();
    return (
        <ButtonPrimary
            onPress={() => {
                openSnackbar({message, type, buttonText, duration: snackbarDuration, withDismiss: dismiss});
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
    duration: 'Default',
};

Default.argTypes = {
    duration: {
        options: ['Default', 'Infinity'],
        control: {type: 'select'},
    },
    type: {
        options: ['INFORMATIVE', 'CRITICAL'],
        control: {type: 'select'},
    },
};
