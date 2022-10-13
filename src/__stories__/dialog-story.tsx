import * as React from 'react';
import {
    ButtonPrimary,
    ButtonLayout,
    confirm,
    alert,
    dialog,
    Text1,
    IconInformationRegular,
    ButtonLink,
} from '..';

export default {
    title: 'Components/Dialog',
};

export const Default: StoryComponent = () => (
    <>
        <ButtonLayout>
            <ButtonPrimary
                onPress={() =>
                    alert({
                        title: 'Title',
                        message: 'Message',
                        acceptText: 'Accept terms and conditions',
                    })
                }
            >
                Open one button
            </ButtonPrimary>
        </ButtonLayout>
        <ButtonLayout>
            <ButtonPrimary onPress={() => confirm({message: 'Message', title: 'Title'})}>
                Open two buttons
            </ButtonPrimary>
        </ButtonLayout>
        <ButtonLayout>
            <ButtonPrimary
                onPress={() =>
                    confirm({
                        title: 'Title',
                        message: 'This is the dialog message',
                        icon: <IconInformationRegular />,
                    })
                }
            >
                Open two buttons (with icon)
            </ButtonPrimary>
        </ButtonLayout>
        <ButtonLayout>
            <ButtonPrimary onPress={() => confirm({message: 'Message', destructive: true})}>
                Open two buttons destructive
            </ButtonPrimary>
        </ButtonLayout>
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
                    })
                }
            >
                Open dialog
            </ButtonPrimary>
        </ButtonLayout>
    </>
);

Default.storyName = 'Dialog';
