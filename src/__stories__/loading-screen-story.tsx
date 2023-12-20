import * as React from 'react';
import Box from '../box';
import {ButtonPrimary} from '../button';
import {LoadingScreen, BrandLoadingScreen} from '../loading-screen';
import ResponsiveLayout from '../responsive-layout';
import Stack from '../stack';
import {Text2} from '../text';

export default {
    title: 'Loading/LoadingScreen',
    parameters: {
        fullScreen: true,
    },
};

type LoadingSreenArgs = {
    title: string;
    description: string;
    isInverse: boolean;
    isLoading: boolean;
    multipleTexts: boolean;
    textTime: number;
};

export const LoadingScreenStory: StoryComponent<LoadingSreenArgs> = ({
    title,
    description,
    isInverse,
    isLoading,
    multipleTexts,
    textTime,
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
                  {title, description, time: textTime},
                  {title: title + ' 2', description: description + ' 2', time: textTime},
                  {title: title + ' 3', description: description + ' 3', time: textTime},
              ],
          }
        : {title, description};

    return (
        <LoadingScreen
            {...textProps}
            isInverse={isInverse}
            isLoading={isLoading}
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
    isInverse: false,
    isLoading: true,
    multipleTexts: false,
    textTime: 5000,
};
LoadingScreenStory.argTypes = {
    textTime: {if: {arg: 'multipleTexts'}},
};

type BrandLoadingSreenArgs = {
    title: string;
    description: string;
    isLoading: boolean;
    multipleTexts: boolean;
    textTime: number;
};

export const BrandLoadingScreenStory: StoryComponent<BrandLoadingSreenArgs> = ({
    title,
    description,
    multipleTexts,
    textTime,
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
    const textProps = multipleTexts
        ? {
              texts: [
                  {title, description, time: textTime},
                  {title: title + ' 2', description: description + ' 2', time: textTime},
                  {title: title + ' 3', description: description + ' 3', time: textTime},
              ],
          }
        : {title, description};
    return (
        <BrandLoadingScreen
            {...textProps}
            isLoading={isLoading}
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
    isLoading: true,
    multipleTexts: false,
    textTime: 5000,
};
BrandLoadingScreenStory.argTypes = {
    textTime: {if: {arg: 'multipleTexts'}},
};
