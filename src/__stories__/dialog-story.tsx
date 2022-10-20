import * as React from 'react';
import {
    ButtonPrimary,
    ButtonLayout,
    confirm,
    alert,
    dialog,
    Text1,
    IconInformationUserLight,
    ButtonLink,
    Title1,
    Stack,
    useTheme,
} from '..';

export default {
    title: 'Components/Modals',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <>
            <Stack space={32}>
                <Stack space={8}>
                    <Title1>Alerts</Title1>
                    <ButtonLayout>
                        <ButtonPrimary
                            onPress={() =>
                                alert({
                                    title: 'Profile updated',
                                    message: 'Your changes have been successfully saved',
                                    acceptText: 'Ok',
                                })
                            }
                        >
                            Open one button
                        </ButtonPrimary>
                    </ButtonLayout>
                </Stack>
                <Stack space={8}>
                    <Title1>Confirms</Title1>
                    <ButtonLayout>
                        <ButtonPrimary
                            onPress={() =>
                                confirm({
                                    message:
                                        'Are you sure you want to delete "rainy_day.jpg"? You cant undo this action.',
                                    title: 'Delete media?',
                                })
                            }
                        >
                            Open two buttons
                        </ButtonPrimary>
                    </ButtonLayout>
                    <ButtonLayout>
                        <ButtonPrimary
                            onPress={() =>
                                confirm({
                                    title: 'Delete Account',
                                    message:
                                        'Deleting your account will remove all of your information from our database. This cannot be undone.',
                                    destructive: true,
                                    acceptText: 'Delete account',
                                })
                            }
                        >
                            Open two buttons destructive
                        </ButtonPrimary>
                    </ButtonLayout>
                </Stack>
                <Stack space={8}>
                    <Title1>Dialog</Title1>
                    <ButtonLayout>
                        <ButtonPrimary
                            onPress={() =>
                                dialog({
                                    title: 'Title',
                                    message: 'Message',
                                    acceptText: 'Accept terms and conditions',
                                    extra: <Text1 regular>This is the extra zone</Text1>,
                                    forceWeb: true,
                                    showCancel: true,
                                    link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                                    icon: <IconInformationUserLight color={colors.brand} />,
                                })
                            }
                        >
                            Open dialog
                        </ButtonPrimary>
                    </ButtonLayout>
                </Stack>
            </Stack>
        </>
    );
};
Default.storyName = 'Modals';
