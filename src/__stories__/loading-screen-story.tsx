import * as React from 'react';
import Box from '../box';
import {ButtonPrimary} from '../button';
import {LoadingScreen, BrandLoadingScreen} from '../loading-screen';
import ResponsiveLayout from '../responsive-layout';
import Stack from '../stack';
import {Text2} from '../text';

export default {
    title: 'Patterns/Loading/LoadingScreen',
    parameters: {
        fullScreen: true,
    },
};

type LoadingSreenArgs = {
    title: string;
    description: string;
    animateText: boolean;
    animateBackground: boolean;
    isInverse: boolean;
    isLoading: boolean;
};

export const LoadingScreenStory: StoryComponent<LoadingSreenArgs> = ({
    title,
    description,
    animateText,
    animateBackground,
    isInverse,
    isLoading,
}) => {
    const [showLoadingScreen, setShowLoadingScreen] = React.useState(true);

    if (!showLoadingScreen) {
        return (
            <ResponsiveLayout>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Text2 regular as="p">
                            Loading completed
                        </Text2>
                        <ButtonPrimary
                            onPress={() => {
                                location.reload();
                            }}
                        >
                            Restart story
                        </ButtonPrimary>
                    </Stack>
                </Box>
            </ResponsiveLayout>
        );
    }

    return (
        <LoadingScreen
            title={title}
            description={description}
            isInverse={isInverse}
            isLoading={isLoading}
            animateText={animateText}
            animateBackground={animateBackground}
            onClose={() => {
                setShowLoadingScreen(false);
            }}
        />
    );
};
LoadingScreenStory.storyName = 'LoadingScreen';
LoadingScreenStory.args = {
    title: 'Title',
    description: 'Description',
    animateText: false,
    animateBackground: false,
    isInverse: false,
    isLoading: true,
};

type BrandLoadingSreenArgs = {
    title: string;
    description: string;
    isLoading: boolean;
};

export const BrandLoadingScreenStory: StoryComponent<BrandLoadingSreenArgs> = ({
    title,
    description,
    isLoading,
}) => {
    const [showLoadingScreen, setShowLoadingScreen] = React.useState(true);
    if (!showLoadingScreen) {
        return (
            <ResponsiveLayout>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Text2 regular as="p">
                            Loading completed
                        </Text2>
                        <ButtonPrimary
                            onPress={() => {
                                location.reload();
                            }}
                        >
                            Restart story
                        </ButtonPrimary>
                    </Stack>
                </Box>
            </ResponsiveLayout>
        );
    }
    return (
        <BrandLoadingScreen
            title={title}
            description={description}
            isLoading={isLoading}
            onClose={() => {
                setShowLoadingScreen(false);
            }}
        />
    );
};
BrandLoadingScreenStory.storyName = 'BrandLoadingScreen';
BrandLoadingScreenStory.args = {title: 'Title', description: 'Description', isLoading: true};
