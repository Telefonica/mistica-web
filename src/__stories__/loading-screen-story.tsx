import * as React from 'react';
import Box from '../box';
import {ButtonPrimary} from '../button';
import {LoadingScreen, BrandLoadingScreen} from '../loading-screen';
import ResponsiveLayout from '../responsive-layout';
import Stack from '../stack';
import {Text2} from '../text';

export default {
    title: 'Patterns/Loading',
    parameters: {
        fullScreen: true,
    },
};

type LoadingSreenArgs = {
    title: string;
    description: string;
    inverse: boolean;
    loading: boolean;
    multipleTexts: boolean;
    textDuration: number;
};

export const LoadingScreenStory: StoryComponent<LoadingSreenArgs> = ({
    title,
    description,
    inverse,
    loading,
    multipleTexts,
    textDuration,
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

    const textProps = multipleTexts
        ? {
              texts: [
                  {title, description, duration: textDuration},
                  {title: title + ' 2', description: description + ' 2', duration: textDuration},
                  {title: title + ' 3', description: description + ' 3', duration: textDuration},
              ],
          }
        : {title, description};

    return (
        <LoadingScreen
            {...textProps}
            isInverse={inverse}
            isLoading={loading}
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
    inverse: false,
    loading: true,
    multipleTexts: false,
    textDuration: 5000,
};
LoadingScreenStory.argTypes = {
    textDuration: {if: {arg: 'multipleTexts'}},
};

type BrandLoadingSreenArgs = {
    title: string;
    description: string;
    loading: boolean;
    multipleTexts: boolean;
    textDuration: number;
};

export const BrandLoadingScreenStory: StoryComponent<BrandLoadingSreenArgs> = ({
    title,
    description,
    multipleTexts,
    textDuration,
    loading,
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
    const textProps = multipleTexts
        ? {
              texts: [
                  {title, description, duration: textDuration},
                  {title: title + ' 2', description: description + ' 2', duration: textDuration},
                  {title: title + ' 3', description: description + ' 3', duration: textDuration},
              ],
          }
        : {title, description};
    return (
        <BrandLoadingScreen
            {...textProps}
            isLoading={loading}
            onClose={() => {
                setShowLoadingScreen(false);
            }}
        />
    );
};
BrandLoadingScreenStory.storyName = 'BrandLoadingScreen';
BrandLoadingScreenStory.args = {
    title: 'Title',
    description: 'Description',
    loading: true,
    multipleTexts: false,
    textDuration: 5000,
};
BrandLoadingScreenStory.argTypes = {
    textDuration: {if: {arg: 'multipleTexts'}},
};
