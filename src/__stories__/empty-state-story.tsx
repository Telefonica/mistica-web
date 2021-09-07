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
    <EmptyState
        largeImageUrl="https://i.imgur.com/yGFKQOy.png"
        title="Your cart is empty"
        description="Check our marketplaces and find something for you. Check our marketplaces and find something"
        button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        buttonLink={<ButtonLink onPress={() => {}}>More info</ButtonLink>}
        dataAttributes={{testid: 'empty-state-with-image'}}
    />
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
            icon: <Image url="https://i.imgur.com/o5qympI.png" />,
        };
    } else {
        assetProps = {
            icon: <img src="https://i.imgur.com/o5qympI.png" width="100%" />,
        };
    }

    return (
        <EmptyState
            {...assetProps}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            dataAttributes={{testid: 'empty-state-with-icon'}}
        />
    );
};
WithIcon.storyName = 'With icon';
WithIcon.args = {
    asset: 'Icon',
};

export const WithSmallImage: StoryComponent = () => (
    <EmptyState
        imageUrl="https://i.imgur.com/o5qympI.png"
        title="Your cart is empty"
        description="Check our marketplaces and find something for you. Check our marketplaces and find something"
        button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        dataAttributes={{testid: 'empty-state-with-small-image'}}
    />
);
WithSmallImage.storyName = 'With small image';
