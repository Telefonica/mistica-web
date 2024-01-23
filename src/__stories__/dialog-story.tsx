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
        <ButtonLayout>
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
        </ButtonLayout>
    );
};

export const Confirm: StoryComponent<{destructive: boolean}> = ({destructive}) => {
    const {confirm} = useDialog();
    return (
        <ButtonLayout>
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
        </ButtonLayout>
    );
};

export const Dialog: StoryComponent = () => {
    const {dialog} = useDialog();
    return (
        <ButtonLayout>
            <ButtonPrimary
                aria-haspopup="dialog"
                onPress={() =>
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
                        link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                        icon: <IconInformationUserLight color={skinVars.colors.brand} />,
                        onAccept: () => console.log('Accepted'),
                        onCancel: () => console.log('Canceled'),
                    })
                }
            >
                Open
            </ButtonPrimary>
        </ButtonLayout>
    );
};

Confirm.args = {
    destructive: false,
};
