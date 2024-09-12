import * as React from 'react';
import {useModalState, Stack, Text2, useDialog} from '..';
import {ButtonPrimary} from '../button';

export default {
    title: 'Hooks/useModalState',
};

export const UseModalState: StoryComponent = () => {
    const {isModalOpen} = useModalState();
    const {alert} = useDialog();
    return (
        <div aria-hidden={isModalOpen}>
            <Stack space={32}>
                <Text2 regular>This won't be read by screen readers when the modal is open</Text2>
                <ButtonPrimary
                    onPress={() =>
                        alert({
                            title: 'Title',
                            message: 'Message',
                        })
                    }
                >
                    Open modal alert
                </ButtonPrimary>
            </Stack>
        </div>
    );
};

UseModalState.storyName = 'useModalState';
