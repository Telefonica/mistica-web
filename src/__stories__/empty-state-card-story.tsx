import * as React from 'react';
import {EmptyStateCard, ButtonPrimary, ButtonLink, IconBoxLight, useTheme, useScreenSize} from '..';

export default {
    title: 'Components/Cards/EmptyStateCard',
    argTypes: {
        asset: {
            options: ['icon', 'image'],
            control: {type: 'select'},
        },
        actions: {
            options: ['button', 'link', 'button and link'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    actions: string;
    title: string;
    asset: string;
    description: string;
};

export const Default: StoryComponent<Args> = ({actions, title, description, asset}) => {
    const {isMobile} = useScreenSize();
    const {colors} = useTheme();

    const assetProps =
        asset === 'icon'
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
        <EmptyStateCard
            {...assetProps}
            title={title}
            description={description}
            button={button}
            buttonLink={buttonLink}
            aria-label="Empty state card label"
            dataAttributes={{testid: 'empty-state-card'}}
        />
    );
};

Default.storyName = 'EmptyStateCard';
Default.args = {
    asset: 'icon',
    actions: 'button',
    title: 'Some title',
    description: 'This is a description for the empty state',
};
