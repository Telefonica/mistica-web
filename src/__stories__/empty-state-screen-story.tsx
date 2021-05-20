import * as React from 'react';
import {EmptyStateScreen, ButtonPrimary, IconBoxLight, useScreenSize, useTheme, ButtonLink} from '..';

export default {
    title: 'Components/Screens/EmptyStateScreen',
    parameters: {
        fullScreen: true,
    },
};

export const WithImage: StoryComponent = () => (
    <EmptyStateScreen
        largeImageUrl="https://i.imgur.com/yGFKQOy.png"
        title="Your cart is empty"
        description="Check our marketplaces and find something for you. Check our marketplaces and find something"
        button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
    />
);
WithImage.storyName = 'With image';

export const WithIcon: StoryComponent = () => {
    const {isMobile} = useScreenSize();
    const {colors} = useTheme();
    return (
        <EmptyStateScreen
            icon={<IconBoxLight size={isMobile ? 64 : 80} color={colors.brand} />}
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        />
    );
};
WithIcon.storyName = 'With icon';

export const WithSmallImage: StoryComponent = () => (
    <EmptyStateScreen
        imageUrl="https://i.imgur.com/o5qympI.png"
        title="Your cart is empty"
        description="Check our marketplaces and find something for you. Check our marketplaces and find something"
        button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
    />
);
WithSmallImage.storyName = 'With small image';

export const WithLink: StoryComponent = () => (
    <EmptyStateScreen
        largeImageUrl="https://i.imgur.com/yGFKQOy.png"
        title="Your cart is empty"
        description="Check our marketplaces and find something for you. Check our marketplaces and find something"
        buttonLink={<ButtonLink onPress={() => {}}>Explore marketplace</ButtonLink>}
    />
);
WithLink.storyName = 'With link';
