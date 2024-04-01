import * as React from 'react';
import {FocusTrap, ButtonPrimary, ButtonSecondary, ButtonLayout, Stack, Text6, Text2, skinVars} from '..';

export default {
    title: 'Utilities/Accesibility/FocusTrap',
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Text6 as="h2">FocusTrap demo</Text6>
            <Text2 medium color={skinVars.colors.textSecondary}>
                Click the tab key in your keyboard. You'll notice the focus is trapped inside the FocusTrap.
                This is useful for some components like modals.
            </Text2>
            <FocusTrap>
                <ButtonLayout
                    primaryButton={<ButtonPrimary onPress={() => alert('clicked')}>Inside 1</ButtonPrimary>}
                    secondaryButton={
                        <ButtonSecondary onPress={() => alert('clicked')}>Inside 2</ButtonSecondary>
                    }
                />
            </FocusTrap>
            <ButtonLayout
                primaryButton={<ButtonPrimary onPress={() => alert('clicked')}>Outside 1</ButtonPrimary>}
                secondaryButton={
                    <ButtonSecondary onPress={() => alert('clicked')}>Outside 2</ButtonSecondary>
                }
            />
        </Stack>
    );
};

Default.storyName = 'FocusTrap';
