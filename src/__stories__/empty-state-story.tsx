import * as React from 'react';
import {EmptyState, ButtonPrimary, IconBoxLight, skinVars, ButtonLink, Image} from '..';
import avatars4Img from './images/avatars4.png';
import emptyStateImg from './images/empty-state.png';

export default {
    title: 'Patterns/Empty states/EmptyState',
    argTypes: {
        asset: {
            options: ['Icon', 'Image', 'img'],
            control: {type: 'select'},
        },
    },
};

type Args = {asset: string};

export const WithImage: StoryComponent = () => (
    <div data-testid="empty-state-with-image">
        <EmptyState
            largeImageUrl={emptyStateImg}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            buttonLink={<ButtonLink onPress={() => {}}>More info</ButtonLink>}
        />
    </div>
);
WithImage.storyName = 'With image';

export const WithIcon: StoryComponent<Args> = ({asset}) => {
    let assetProps;
    if (asset === 'Icon') {
        assetProps = {
            icon: <IconBoxLight size="100%" color={skinVars.colors.brand} />,
        };
    } else if (asset === 'Image') {
        assetProps = {
            icon: <Image src={avatars4Img} />,
        };
    } else {
        assetProps = {
            icon: <img src={avatars4Img} width="100%" />,
        };
    }

    return (
        <div data-testid="empty-state-with-icon">
            <EmptyState
                {...assetProps}
                title="Your cart is empty"
                description="Check our marketplaces and find something for you. Check our marketplaces and find something"
                button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            />
        </div>
    );
};
WithIcon.storyName = 'With icon';
WithIcon.args = {
    asset: 'Icon',
};

export const WithSmallImage: StoryComponent = () => (
    <div data-testid="empty-state-with-small-image">
        <EmptyState
            imageUrl={avatars4Img}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        />
    </div>
);
WithSmallImage.storyName = 'With small image';
