import * as React from 'react';
import {StorySection, useTextField, useSelect, useCheckbox} from './helpers';
import {
    Callout,
    Stack,
    ButtonPrimary,
    ButtonLink,
    IconBoxLight,
    useTheme,
    ThemeVariant,
    ResponsiveLayout,
    Box,
} from '..';

export default {
    title: 'Components/Dialogs/Callout',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    const [title, titleTextField] = useTextField('title', 'Some title', true);
    const [description, descriptionTextField] = useTextField(
        'description',
        'This is a description for the callout',
        false
    );
    const [actions, actionsSelect] = useSelect('actions', 'button & link', [
        'button & link',
        'button',
        'link',
        'none',
    ]);
    const [withIcon, iconCheckbox] = useCheckbox('With icon', true);
    const [isClosable, closableCheckbox] = useCheckbox('Is closable', true);
    const [isOverInverse, inverseCheckbox] = useCheckbox('Over inverse', false);

    const button = actions.includes('button') ? (
        <ButtonPrimary small onPress={() => {}}>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink onPress={() => {}}>Link</ButtonLink>
    ) : undefined;

    return (
        <ThemeVariant isInverse={isOverInverse}>
            <div style={{background: isOverInverse ? colors.backgroundBrand : colors.background}}>
                <ResponsiveLayout>
                    <Box paddingY={24}>
                        <Stack space={16}>
                            {titleTextField}
                            {descriptionTextField}
                            {actionsSelect}
                            {iconCheckbox}
                            {closableCheckbox}
                            {inverseCheckbox}
                        </Stack>
                        <StorySection title="Callout">
                            <Callout
                                icon={withIcon ? <IconBoxLight /> : undefined}
                                onClose={isClosable ? () => {} : undefined}
                                title={title}
                                description={description}
                                button={button}
                                buttonLink={buttonLink}
                            />
                        </StorySection>
                    </Box>
                </ResponsiveLayout>
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Callout';
Default.parameters = {fullScreen: true};
