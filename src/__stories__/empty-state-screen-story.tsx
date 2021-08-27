import * as React from 'react';
import {EmptyStateScreen, ButtonPrimary, IconBoxLight, useScreenSize, useTheme, ButtonLink} from '..';
import {DeprecationWarning} from './helpers';

export default {
    title: 'Components/Screens/EmptyStateScreen',
    parameters: {
        fullScreen: true,
    },
};

export const WithImage: StoryComponent = () => (
    <>
        <DeprecationWarning />
        <EmptyStateScreen
            largeImageUrl="https://i.imgur.com/yGFKQOy.png"
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            buttonLink={<ButtonLink onPress={() => {}}>More info</ButtonLink>}
        />
    </>
);
WithImage.storyName = 'With image';

export const WithIcon: StoryComponent = () => {
    const {isTabletOrSmaller} = useScreenSize();
    const {colors} = useTheme();
    return (
        <>
            <DeprecationWarning />
            <EmptyStateScreen
                icon={<IconBoxLight size={isTabletOrSmaller ? 64 : 80} color={colors.brand} />}
                title="Your cart is empty"
                description="Check our marketplaces and find something for you. Check our marketplaces and find something"
                button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
            />
        </>
    );
};
WithIcon.storyName = 'With icon';

export const WithSmallImage: StoryComponent = () => (
    <>
        <DeprecationWarning />
        <EmptyStateScreen
            imageUrl="https://i.imgur.com/o5qympI.png"
            title="Your cart is empty"
            description="Check our marketplaces and find something for you. Check our marketplaces and find something"
            button={<ButtonPrimary onPress={() => {}}>Explore marketplace</ButtonPrimary>}
        />
    </>
);
WithSmallImage.storyName = 'With small image';
