import * as React from 'react';
import {StorySection, useTextField, useSelect, useCheckbox} from './helpers';
import {Callout, Stack, ButtonPrimary, ButtonLink, IconBoxLight} from '..';

export default {
    title: 'Components/Dialogs/Callout',
};

export const Default: StoryComponent = () => {
    const [withIcon, iconCheckbox] = useCheckbox('With icon', true);
    const [isClosable, closableCheckbox] = useCheckbox('Is closable', true);
    const [title, titleTextField] = useTextField('title', 'Some title', true);
    const [description, descriptionTextField] = useTextField(
        'description',
        'This is a description for the callout',
        false
    );
    const [actions, actionsSelect] = useSelect('actions', 'button', [
        'button',
        'link',
        'button & link',
        'none',
    ]);

    const button = actions.includes('button') ? (
        <ButtonPrimary small onPress={() => {}}>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink onPress={() => {}}>Link</ButtonLink>
    ) : undefined;

    return (
        <>
            <Stack space={16}>
                {titleTextField}
                {descriptionTextField}
                {actionsSelect}
                {iconCheckbox}
                {closableCheckbox}
            </Stack>
            <StorySection title="Callout">
                <div data-testid="callout">
                    <Callout
                        icon={withIcon ? <IconBoxLight /> : undefined}
                        onClose={isClosable ? () => {} : undefined}
                        title={title}
                        description={description}
                        button={button}
                        buttonLink={buttonLink}
                    />
                </div>
            </StorySection>
        </>
    );
};

Default.storyName = 'Callout';
