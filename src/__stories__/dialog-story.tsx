import * as React from 'react';
import {
    ButtonPrimary,
    ButtonLayout,
    useDialog,
    IconInformationUserLight,
    ButtonLink,
    Stack,
    skinVars,
    Select,
    Text1,
} from '..';

export default {
    title: 'Components/Modals',
};

export const Alert: StoryComponent = () => {
    const {alert} = useDialog();
    return (
        <ButtonLayout
            primaryButton={
                <ButtonPrimary
                    aria-haspopup="dialog"
                    onPress={() =>
                        alert({
                            title: 'Profile updated',
                            message: 'Your changes have been successfully saved',
                            acceptText: 'Ok',
                            onAccept: () => console.log('Accepted'),
                        })
                    }
                >
                    Open
                </ButtonPrimary>
            }
        />
    );
};

export const Confirm: StoryComponent<{destructive: boolean}> = ({destructive}) => {
    const {confirm} = useDialog();
    return (
        <ButtonLayout
            primaryButton={
                <ButtonPrimary
                    aria-haspopup="dialog"
                    onPress={() =>
                        confirm({
                            message:
                                'Are you sure you want to delete "rainy_day.jpg"? You cant undo this action.',
                            title: 'Delete media?',
                            destructive,
                            onAccept: () => console.log('Accepted'),
                            onCancel: () => console.log('Canceled'),
                        })
                    }
                >
                    Open
                </ButtonPrimary>
            }
        />
    );
};

Confirm.args = {
    destructive: false,
};

type DialogArgs = {
    title: string;
    subtitle: string;
    message: string;
    acceptText: string;
    cancelText: string;
    onAccept: boolean;
    onCancel: boolean;
    link: boolean;
    asset: boolean;
    extra: boolean;
};

export const Dialog: StoryComponent<DialogArgs> = ({
    onAccept,
    onCancel,
    link,
    asset,
    extra,
    title,
    subtitle,
    message,
    acceptText,
    cancelText,
}) => {
    const {dialog} = useDialog();
    return (
        <ButtonLayout
            primaryButton={
                <ButtonPrimary
                    aria-haspopup="dialog"
                    onPress={() =>
                        dialog({
                            title,
                            subtitle,
                            message,
                            acceptText,
                            cancelText,
                            extra: extra ? (
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
                            ) : undefined,
                            link: link ? <ButtonLink href="https://google.com">Link</ButtonLink> : undefined,
                            asset: asset ? (
                                <IconInformationUserLight color={skinVars.colors.brand} />
                            ) : undefined,
                            onAccept: onAccept ? () => console.log('Accepted') : undefined,
                            onCancel: onCancel ? () => console.log('Canceled') : undefined,
                        })
                    }
                >
                    Open
                </ButtonPrimary>
            }
        />
    );
};

Dialog.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    message: 'Message',
    acceptText: 'Accept terms and conditions',
    cancelText: 'Cancel',
    onAccept: true,
    onCancel: true,
    link: true,
    asset: true,
    extra: true,
};
