import * as React from 'react';
import {StorySection, useTextField, useSelect} from './helpers';
import {EmptyState, Stack, ButtonPrimary, ButtonLink, IconBoxLight, useTheme, useScreenSize} from '..';

export default {
    title: 'Components/EmptyStates/EmptyState',
};

export const Default: StoryComponent = () => {
    const {isMobile} = useScreenSize();
    const {colors} = useTheme();
    const [assetType, assetTypeSelect] = useSelect('asset', 'icon', ['icon', 'image']);
    const [title, titleTextField] = useTextField('title', 'Some title', true);
    const [description, descriptionTextField] = useTextField(
        'description',
        'This is a description for the empty state',
        false
    );
    const [actions, actionsSelect] = useSelect('actions', 'button', ['button', 'link', 'button & link']);

    const assetProps =
        assetType === 'icon'
            ? {
                  icon: <IconBoxLight size={isMobile ? 64 : 80} color={colors.brand} />,
              }
            : {
                  imageUrl: 'https://i.imgur.com/o5qympI.png',
              };

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
                {assetTypeSelect}
                {titleTextField}
                {descriptionTextField}
                {actionsSelect}
            </Stack>
            <StorySection title="EmptyState">
                <div data-testid="empty-state">
                    <EmptyState
                        {...assetProps}
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

Default.storyName = 'EmptyState';
