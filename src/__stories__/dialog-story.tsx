import * as React from 'react';
import {ButtonPrimary} from '../button';
import {confirm, alert} from '../dialog';
import ButtonLayout from '../button-layout';
import IcnInfo from '../icons/icon-info';

export default {
    title: 'Components/Dialogs/Alert',
};

export const Alert: StoryComponent = () => (
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
                        icon: <IcnInfo />,
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
    </>
);
