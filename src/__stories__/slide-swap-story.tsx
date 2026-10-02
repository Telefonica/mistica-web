import * as React from 'react';
import {
    Box,
    ButtonPrimary,
    SlideSwap,
    IconCheckRegular,
    Inline,
    ResponsiveLayout,
    Spinner,
    Stack,
    Text2,
    Text3,
    skinVars,
    IconMoonRegular,
    IconSunRegular,
} from '..';

export default {
    title: 'Utilities/Animations/SlideSwap',
    component: SlideSwap,
    parameters: {fullScreen: true},
    argTypes: {
        direction: {
            options: ['up', 'down'],
            control: {type: 'select'},
        },
        align: {
            options: ['left', 'center', 'right'],
            control: {type: 'select'},
        },
        duration: {
            control: {type: 'range', min: 0, max: 2000, step: 100},
        },
        // these are driven by the story itself, not by the controls panel
        children: {table: {disable: true}},
        swappedContent: {table: {disable: true}},
        showSwappedContent: {table: {disable: true}},
        className: {table: {disable: true}},
        dataAttributes: {table: {disable: true}},
    },
};

type Args = {
    direction: 'up' | 'down';
    align: 'left' | 'center' | 'right';
    duration: number;
    unmountSwappedContent: boolean;
};

export const Default: StoryComponent<Args> = ({direction, align, duration, unmountSwappedContent}) => {
    const [showSwappedContent, setShowSwappedContent] = React.useState(false);

    return (
        <ResponsiveLayout fullWidth>
            <Box padding={16}>
                <Stack space={24}>
                    <ButtonPrimary small onPress={() => setShowSwappedContent((value) => !value)}>
                        Toggle
                    </ButtonPrimary>

                    <SlideSwap
                        dataAttributes={{testid: 'slide-swap'}}
                        showSwappedContent={showSwappedContent}
                        direction={direction}
                        align={align}
                        duration={duration}
                        unmountSwappedContent={unmountSwappedContent}
                        swappedContent={
                            <Inline space={8} alignItems="center">
                                <Spinner size={20} delay="0s" />
                                <Text3 regular>Sending…</Text3>
                            </Inline>
                        }
                    >
                        <Text3 regular>Send</Text3>
                    </SlideSwap>

                    <Text2 regular color={skinVars.colors.textSecondary}>
                        Any content can be swapped, not only spinners:
                    </Text2>

                    <SlideSwap
                        showSwappedContent={showSwappedContent}
                        direction={direction}
                        align={align}
                        duration={duration}
                        swappedContent={
                            <Inline space={8} alignItems="center">
                                <IconCheckRegular color={skinVars.colors.success} size={20} />
                                <Text3 regular>Saved</Text3>
                            </Inline>
                        }
                    >
                        <Text3 regular>Save changes</Text3>
                    </SlideSwap>
                    <SlideSwap
                        showSwappedContent={showSwappedContent}
                        direction={direction}
                        align={align}
                        duration={duration}
                        swappedContent={<IconMoonRegular />}
                    >
                        <IconSunRegular />
                    </SlideSwap>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SlideSwap';
Default.args = {
    direction: 'up',
    align: 'center',
    duration: 300,
    unmountSwappedContent: false,
};
