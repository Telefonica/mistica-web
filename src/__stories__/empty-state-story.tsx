import * as React from 'react';
import {EmptyState, ButtonPrimary, IconBoxLight, useScreenSize, useTheme, ButtonLink} from '..';

export default {
    title: 'Components/Others/EmptyState',
    parameters: {
        fullScreen: true,
    },
};

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

export const WithIcon: StoryComponent = () => {
    const {isTabletOrSmaller} = useScreenSize();
    const {colors} = useTheme();
    return (
        <EmptyState
            icon={<IconBoxLight size={isTabletOrSmaller ? 64 : 80} color={colors.brand} />}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            dataAttributes={{testid: 'empty-state-with-icon'}}
        />
    );
};
WithIcon.storyName = 'With icon';

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
