import * as React from 'react';
import {
    CenteredCarousel,
    PageBullets,
    Stack,
    Box,
    Circle,
    ResponsiveLayout,
    skinVars,
    Text2,
    Callout,
    IconInformationRegular,
    Text10,
    ThemeVariant,
    Title1,
    CarouselContextProvider,
    CarouselContextConsumer,
    Inline,
    ButtonLink,
    useScreenSize,
} from '..';

export default {
    title: 'Components/Carousels/CenteredCarousel',
};

const centerStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center'};

type Args = {numItems: number; initialActiveItem: number};

export const Default: StoryComponent<Args> = ({numItems, initialActiveItem}) => {
    const [pageInfo, setPageInfo] = React.useState<{
        pageIndex: number;
        shownItemIndexes: Array<number>;
    } | null>(null);

    const {isTablet, isDesktopOrBigger} = useScreenSize();

    const getPagesCount = (numPages: number | {desktop: number; tablet?: number; mobile: number}) =>
        typeof numPages === 'number'
            ? numPages
            : isDesktopOrBigger
              ? numPages.desktop
              : isTablet
                ? numPages.tablet ?? numPages.mobile
                : numPages.mobile;

    return (
        <Box paddingY={24}>
            <CarouselContextProvider>
                <ResponsiveLayout>
                    <Stack space={16}>
                        <Callout
                            description="Resize the window to see centerd carousel style in mobile."
                            asset={<IconInformationRegular />}
                        />
                        <CenteredCarousel
                            onPageChange={setPageInfo}
                            items={Array.from({length: numItems}, (_, idx) => (
                                <div
                                    aria-label={`Carousel item ${idx}`}
                                    key={idx}
                                    style={{
                                        border: `1px solid ${skinVars.colors.border}`,
                                        ...centerStyle,
                                    }}
                                >
                                    <div style={{flexShrink: 0}}>
                                        <Circle backgroundColor={skinVars.colors.brand} size={160}>
                                            <ThemeVariant isInverse>
                                                <Text10>{idx}</Text10>
                                            </ThemeVariant>
                                        </Circle>
                                    </div>
                                </div>
                            ))}
                            initialActiveItem={initialActiveItem}
                            withControls={false}
                        />
                        <CarouselContextConsumer>
                            {({goNext, goPrev, bulletsProps}) => (
                                <Inline space="between" alignItems="center">
                                    <ButtonLink small bleedLeft onPress={goPrev}>
                                        Prev
                                    </ButtonLink>
                                    <Stack space={8}>
                                        <div style={centerStyle}>
                                            <Text2 regular>Page {bulletsProps.currentIndex}</Text2>
                                        </div>
                                        <div style={centerStyle}>
                                            {getPagesCount(bulletsProps.numPages) > 1 && (
                                                <PageBullets {...bulletsProps} />
                                            )}
                                        </div>
                                    </Stack>
                                    <ButtonLink small bleedRight onPress={goNext}>
                                        Next
                                    </ButtonLink>
                                </Inline>
                            )}
                        </CarouselContextConsumer>
                        <Stack space={8}>
                            <Title1 as="h2">Current page info</Title1>
                            {pageInfo && (
                                <Text2 regular as="pre">
                                    {JSON.stringify(pageInfo, null, 2)}
                                </Text2>
                            )}
                        </Stack>
                    </Stack>
                </ResponsiveLayout>
            </CarouselContextProvider>
        </Box>
    );
};

Default.storyName = 'Centered Carousel with context';
Default.parameters = {fullScreen: true};
Default.args = {
    numItems: 6,
    initialActiveItem: 0,
};

type WithControlsStoryArgs = {
    numItems: number;
    initialActiveItem: number;
    withControls: boolean;
    withBullets: boolean;
};

export const WithControls: StoryComponent<WithControlsStoryArgs> = ({
    numItems,
    initialActiveItem,
    withBullets,
    withControls,
}) => {
    const [pageInfo, setPageInfo] = React.useState<{
        pageIndex: number;
        shownItemIndexes: Array<number>;
    } | null>(null);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Resize the window to see centerd carousel style in mobile."
                        asset={<IconInformationRegular />}
                    />
                    <CenteredCarousel
                        onPageChange={setPageInfo}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <div
                                aria-label={`Carousel item ${idx}`}
                                key={idx}
                                style={{
                                    border: `1px solid ${skinVars.colors.border}`,
                                    ...centerStyle,
                                }}
                            >
                                <div style={{flexShrink: 0}}>
                                    <Circle backgroundColor={skinVars.colors.brand} size={160}>
                                        <ThemeVariant isInverse>
                                            <Text10>{idx}</Text10>
                                        </ThemeVariant>
                                    </Circle>
                                </div>
                            </div>
                        ))}
                        initialActiveItem={initialActiveItem}
                        withControls={withControls}
                        withBullets={withBullets}
                    />
                    <Stack space={8}>
                        <Title1 as="h2">Current page info</Title1>
                        {pageInfo && (
                            <Text2 regular as="pre">
                                {JSON.stringify(pageInfo, null, 2)}
                            </Text2>
                        )}
                    </Stack>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

WithControls.storyName = 'Centered Carousel with controls';
WithControls.parameters = {fullScreen: true};
WithControls.args = {
    numItems: 6,
    initialActiveItem: 0,
    withBullets: true,
    withControls: true,
};
