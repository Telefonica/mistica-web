import * as React from 'react';
import {FocusTrap, ButtonPrimary, ButtonSecondary, ButtonLayout, Stack, Text} from '..';
import {useTheme} from '../hooks';

export default {
    title: 'Components|Accesibility/FocusTrap',
};

export const Default: StoryComponent = () => {
    const theme = useTheme();
    return (
        <Stack space={16}>
            <Text as="h2" size={24} weight="medium">
                FocusTrap demo
            </Text>
            <Text size={16} color={theme.colors.textSecondary}>
                Click the tab key in your keyboard. You'll notice the focus is trapped inside the FocusTrap.
                This is useful for some components like modals.
            </Text>
            <FocusTrap>
                <ButtonLayout>
                    <ButtonPrimary onPress={() => alert('clicked')}>Inside 1</ButtonPrimary>
                    <ButtonSecondary onPress={() => alert('clicked')}>Inside 2</ButtonSecondary>
                </ButtonLayout>
            </FocusTrap>
            <ButtonLayout>
                <ButtonPrimary onPress={() => alert('clicked')}>Outside 1</ButtonPrimary>
                <ButtonSecondary onPress={() => alert('clicked')}>Outside 2</ButtonSecondary>
            </ButtonLayout>
        </Stack>
    );
};

Default.story = {name: 'FocusTrap'};
