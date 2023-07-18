import * as React from 'react';
import {
    ButtonPrimary,
    ButtonLayout,
    confirm,
    alert,
    dialog,
    IconInformationUserLight,
    ButtonLink,
    Stack,
    skinVars,
    Select,
    Text1,
} from '..';

export default {
    title: 'Components/Modals',
    argTypes: {
        action: {
            options: ['alert', 'confirm', 'confirm destructive', 'dialog'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    action: 'alert' | 'confirm' | 'confirm destructive' | 'dialog';
};

export const Default: StoryComponent<Args> = ({action}) => {
    const dialogAction = {
        alert: () =>
            alert({
                title: 'Profile updated',
                message: 'Your changes have been successfully saved',
                acceptText: 'Ok',
            }),
        confirm: () =>
            confirm({
                message: 'Are you sure you want to delete "rainy_day.jpg"? You cant undo this action.',
                title: 'Delete media?',
            }),
        'confirm destructive': () =>
            confirm({
                title: 'Delete Account',
                message:
                    'Deleting your account will remove all of your information from our database. This cannot be undone.',
                destructive: true,
                acceptText: 'Delete account',
            }),
        dialog: () =>
            dialog({
                title: 'Title',
                subtitle: 'Subtitle',
                message: 'Message',
                acceptText: 'Accept terms and conditions',
                extra: (
                    <Stack space={16}>
                        <Text1 regular>Extra content</Text1>
                        <Select
                            name="fruits"
                            value="orange"
                            label="Select"
                            options={[
                                {value: 'orange', text: 'Orange'},
                                {value: 'banana', text: 'Banana'},
                            ]}
                        />
                    </Stack>
                ),
                forceWeb: true,
                showCancel: true,
                link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                icon: <IconInformationUserLight color={skinVars.colors.brand} />,
            }),
    };

    return (
        <ButtonLayout>
            <ButtonPrimary onPress={dialogAction[action]}>Open</ButtonPrimary>
        </ButtonLayout>
    );
};

Default.storyName = 'Modals';
Default.args = {
    action: 'alert',
};
