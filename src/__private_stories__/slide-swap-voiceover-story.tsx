import * as React from 'react';
import {
    Box,
    ButtonPrimary,
    Inline,
    ResponsiveLayout,
    ScreenReaderOnly,
    SlideSwap,
    Spinner,
    Stack,
    Text2,
    Text3,
    TextLink,
    skinVars,
} from '..';

export default {
    title: 'Private/SlideSwap VoiceOver announcements',
    parameters: {fullScreen: true},
};

const getAnnouncement = (swapped?: boolean): string => {
    if (swapped === undefined) {
        return '';
    }
    return swapped ? 'Sending…' : 'Send';
};

const sendingContent = (
    <Inline space={8} alignItems="center">
        <Spinner size={20} delay="0s" />
        <Text3 regular>Sending…</Text3>
    </Inline>
);

type VariantProps = {
    number: number;
    title: string;
    children: (swapped?: boolean) => React.ReactNode;
};

// swapped is undefined until the first toggle, so the live regions that don't use SlideSwap start empty too
const Variant = ({number, title, children}: VariantProps) => {
    const [swapped, setSwapped] = React.useState<boolean>();

    return (
        <Stack space={8}>
            <Text2 medium>
                {number}. {title}
            </Text2>
            {children(swapped)}
            <ButtonPrimary small onPress={() => setSwapped((value) => !value)}>
                {`Toggle ${number}`}
            </ButtonPrimary>
        </Stack>
    );
};

export const Default: StoryComponent = () => {
    // VoiceOver reads polite live regions twice inside iframes, and Storybook renders stories inside one
    const isInIframe = window.self !== window.top;

    return (
        <ResponsiveLayout fullWidth>
            <Box padding={16}>
                <Stack space={32}>
                    <Stack space={8}>
                        <Text2 regular color={skinVars.colors.textSecondary}>
                            {isInIframe ? 'Rendered inside an iframe' : 'Rendered as a top level page'}
                        </Text2>
                        {isInIframe && (
                            <Text2 regular>
                                <TextLink href={window.location.href} newTab>
                                    Open this story without the iframe
                                </TextLink>
                            </Text2>
                        )}
                    </Stack>

                    <Variant number={1} title='role="status" alone, without SlideSwap'>
                        {(swapped) => (
                            <ScreenReaderOnly>
                                <div role="status">{getAnnouncement(swapped)}</div>
                            </ScreenReaderOnly>
                        )}
                    </Variant>

                    <Variant number={2} title="SlideSwap with announceSwap, text only">
                        {(swapped) => (
                            <SlideSwap
                                announceSwap
                                showSwappedContent={!!swapped}
                                swappedContent={<Text3 regular>Sending…</Text3>}
                            >
                                <Text3 regular>Send</Text3>
                            </SlideSwap>
                        )}
                    </Variant>

                    <Variant number={3} title="SlideSwap with announceSwap and Spinner">
                        {(swapped) => (
                            <SlideSwap
                                announceSwap
                                showSwappedContent={!!swapped}
                                swappedContent={sendingContent}
                            >
                                <Text3 regular>Send</Text3>
                            </SlideSwap>
                        )}
                    </Variant>

                    <Variant number={4} title="SlideSwap without announceSwap, with Spinner">
                        {(swapped) => (
                            <SlideSwap showSwappedContent={!!swapped} swappedContent={sendingContent}>
                                <Text3 regular>Send</Text3>
                            </SlideSwap>
                        )}
                    </Variant>

                    <Variant number={5} title="SlideSwap with announceSwap and aria-hidden Spinner">
                        {(swapped) => (
                            <SlideSwap
                                announceSwap
                                showSwappedContent={!!swapped}
                                swappedContent={
                                    <Inline space={8} alignItems="center">
                                        <Spinner size={20} delay="0s" aria-hidden />
                                        <Text3 regular>Sending…</Text3>
                                    </Inline>
                                }
                            >
                                <Text3 regular>Send</Text3>
                            </SlideSwap>
                        )}
                    </Variant>

                    <Variant
                        number={6}
                        title='SlideSwap without announceSwap, with Spinner and an external role="log"'
                    >
                        {(swapped) => (
                            <>
                                <SlideSwap showSwappedContent={!!swapped} swappedContent={sendingContent}>
                                    <Text3 regular>Send</Text3>
                                </SlideSwap>
                                <ScreenReaderOnly>
                                    <div role="log" aria-live="polite" aria-relevant="additions">
                                        {swapped !== undefined && (
                                            <div key={String(swapped)}>{getAnnouncement(swapped)}</div>
                                        )}
                                    </div>
                                </ScreenReaderOnly>
                            </>
                        )}
                    </Variant>

                    <Variant
                        number={7}
                        title='Visible role="status" (no ScreenReaderOnly), without SlideSwap'
                    >
                        {(swapped) => (
                            <div role="status">
                                <Text3 regular>{getAnnouncement(swapped)}</Text3>
                            </div>
                        )}
                    </Variant>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SlideSwap VoiceOver announcements';
