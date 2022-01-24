import * as React from 'react';
import {EmptyState, ButtonPrimary, IconBoxLight, useTheme, ButtonLink, Image} from '..';

export default {
    title: 'Components/Others/EmptyState',
    parameters: {
        fullScreen: true,
    },
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
            largeImageUrl="https://i.imgur.com/yGFKQOy.png"
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            buttonLink={<ButtonLink onPress={() => {}}>More info</ButtonLink>}
        />
    </div>
);
WithImage.storyName = 'With image';

export const WithIcon: StoryComponent<Args> = ({asset}) => {
    const {colors} = useTheme();

    let assetProps;
    if (asset === 'Icon') {
        assetProps = {
            icon: <IconBoxLight size="100%" color={colors.brand} />,
        };
    } else if (asset === 'Image') {
        assetProps = {
            icon: <Image src="https://i.imgur.com/o5qympI.png" />,
        };
    } else {
        assetProps = {
            icon: <img src="https://i.imgur.com/o5qympI.png" width="100%" />,
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
            imageUrl="https://i.imgur.com/o5qympI.png"
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        />
    </div>
);
WithSmallImage.storyName = 'With small image';
