import * as React from 'react';
import {EmptyState, ButtonPrimary, IconBoxLight, skinVars, ButtonLink, Image} from '..';
import avatars4Img from './images/avatars4.png';
import emptyStateImg from './images/empty-state.png';

export default {
    title: 'Patterns/Empty states/EmptyState',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        actions: {
            options: ['button and link', 'button', 'link', 'none'],
            control: {type: 'select'},
        },
    },
    args: {
        actions: 'button and link',
    },
};

interface Args {
    actions: 'button and link' | 'button' | 'link' | 'none';
}

export const WithImage: StoryComponent<Args> = ({actions}) => (
    <div data-testid="empty-state-with-image">
        <EmptyState
            largeImageUrl={emptyStateImg}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={
                actions.includes('button') ? (
                    <ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>
                ) : undefined
            }
            buttonLink={
                actions.includes('link') ? <ButtonLink onPress={() => {}}>More info</ButtonLink> : undefined
            }
        />
    </div>
);
WithImage.storyName = 'With image';

interface WithIconArgs extends Args {
    asset: string;
}

export const WithIcon: StoryComponent<WithIconArgs> = ({actions, asset}) => {
    let assetProps;
    if (asset === 'Icon') {
        assetProps = {
            asset: <IconBoxLight size="100%" color={skinVars.colors.brand} />,
        };
    } else if (asset === 'Image') {
        assetProps = {
            asset: <Image src={avatars4Img} />,
        };
    } else {
        assetProps = {
            asset: <img src={avatars4Img} width="100%" />,
        };
    }

    return (
        <div data-testid="empty-state-with-icon">
            <EmptyState
                {...assetProps}
                title="Your cart is empty"
                description="Check our marketplaces and find something for you. Check our marketplaces and find something"
                button={
                    actions.includes('button') ? (
                        <ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>
                    ) : undefined
                }
                buttonLink={
                    actions.includes('link') ? (
                        <ButtonLink onPress={() => {}}>More info</ButtonLink>
                    ) : undefined
                }
            />
        </div>
    );
};
WithIcon.storyName = 'With icon';
WithIcon.argTypes = {
    asset: {
        options: ['Icon', 'Image', 'img'],
        control: {type: 'select'},
    },
};
WithIcon.args = {
    asset: 'Icon',
    actions: 'button and link',
};

export const WithSmallImage: StoryComponent<Args> = ({actions}) => (
    <div data-testid="empty-state-with-small-image">
        <EmptyState
            imageUrl={avatars4Img}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={
                actions.includes('button') ? (
                    <ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>
                ) : undefined
            }
            buttonLink={
                actions.includes('link') ? <ButtonLink onPress={() => {}}>More info</ButtonLink> : undefined
            }
        />
    </div>
);
WithSmallImage.storyName = 'With small image';
