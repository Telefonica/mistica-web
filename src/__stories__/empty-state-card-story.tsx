import * as React from 'react';
import {EmptyStateCard, ButtonPrimary, ButtonLink, IconBoxLight, skinVars, Image, ButtonSecondary} from '..';
import avatars4Img from './images/avatars4.png';

export default {
    title: 'Patterns/Empty states/EmptyStateCard',
    argTypes: {
        asset: {
            options: ['Icon', 'icon as Image', 'icon as img', 'image'],
            control: {type: 'select'},
        },
        actions: {
            options: ['button', 'link', 'button and secondary', 'button and link'],
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
    let assetProps;

    if (asset === 'Icon') {
        assetProps = {
            asset: <IconBoxLight size="100%" color={skinVars.colors.brand} />,
        };
    } else if (asset === 'icon as Image') {
        assetProps = {
            asset: <Image src={avatars4Img} />,
        };
    } else if (asset === 'icon as img') {
        assetProps = {
            asset: <img src={avatars4Img} width="100%" />,
        };
    } else {
        assetProps = {
            imageUrl: avatars4Img,
        };
    }

    const button = actions.includes('button') ? (
        <ButtonPrimary small onPress={() => {}}>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink small onPress={() => {}}>
            Link
        </ButtonLink>
    ) : undefined;

    const secondaryButton = actions.includes('secondary') ? (
        <ButtonSecondary small onPress={() => {}}>
            Secondary Action
        </ButtonSecondary>
    ) : undefined;

    return (
        <EmptyStateCard
            {...assetProps}
            title={title}
            description={description}
            button={button}
            secondaryButton={secondaryButton}
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
