import * as React from 'react';
import {FocusTrap, ButtonPrimary, ButtonSecondary, ButtonLayout, Stack, Text3, Text7} from '..';
import {useTheme} from '../hooks';

export default {
    title: 'Components|Accesibility/FocusTrap',
};

export const Default: StoryComponent = () => {
    const theme = useTheme();
    return (
        <Stack space={16}>
            <Text3 as="h2">FocusTrap demo</Text3>
            <Text7 color={theme.colors.textSecondary}>
                Click the tab key in your keyboard. You'll notice the focus is trapped inside the FocusTrap.
                This is useful for some components like modals.
            </Text7>
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
