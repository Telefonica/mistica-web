import * as React from 'react';
import {EmptyStateCard, ButtonPrimary, ButtonLink, IconBoxLight, useTheme, Image} from '..';

export default {
    title: 'Components/Cards/EmptyStateCard',
    argTypes: {
        asset: {
            options: ['Icon', 'icon as Image', 'icon as img', 'image'],
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
    const {colors} = useTheme();

    let assetProps;

    if (asset === 'Icon') {
        assetProps = {
            icon: <IconBoxLight size="100%" color={colors.brand} />,
        };
    } else if (asset === 'icon as Image') {
        assetProps = {
            icon: <Image url="https://i.imgur.com/o5qympI.png" />,
        };
    } else if (asset === 'icon as img') {
        assetProps = {
            icon: <img src="https://i.imgur.com/o5qympI.png" width="100%" />,
        };
    } else {
        assetProps = {
            imageUrl: 'https://i.imgur.com/o5qympI.png',
        };
    }

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
    asset: 'Icon',
    actions: 'button',
    title: 'Some title',
    description: 'This is a description for the empty state',
};
