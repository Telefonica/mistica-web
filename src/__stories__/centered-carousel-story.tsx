import * as React from 'react';
import {
    CenteredCarousel,
    PageBullets,
    Stack,
    Box,
    Circle,
    ResponsiveLayout,
    useTheme,
    Text2,
    Callout,
    IconInformationRegular,
    Text10,
    ThemeVariant,
    SectionTitle,
} from '..';

export default {
    title: 'Components/Carousel/CenteredCarousel',
};

const centerStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center'};

type Args = {numItems: number};

export const Default: StoryComponent<Args> = ({numItems}) => {
    const [pageInfo, setPageInfo] = React.useState<{
        pageIndex: number;
        shownItemIndexes: Array<number>;
    } | null>(null);
    const {colors} = useTheme();
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Resize the window to see centerd carousel style in mobile. Arrow controls disappear in touch devices."
                        icon={<IconInformationRegular />}
                    />
                    <CenteredCarousel
                        onPageChange={setPageInfo}
                        renderBullets={(bulletsProps) => (
                            <Stack space={8}>
                                <div style={centerStyle}>
                                    <Text2 regular>Page {bulletsProps.currentIndex}</Text2>
                                </div>
                                <div style={centerStyle}>
                                    <PageBullets {...bulletsProps} />
                                </div>
                            </Stack>
                        )}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    border: `1px solid ${colors.border}`,
                                    ...centerStyle,
                                }}
                            >
                                <div style={{flexShrink: 0}}>
                                    <Circle backgroundColor={colors.brand} size={160}>
                                        <ThemeVariant isInverse>
                                            <Text10>{idx}</Text10>
                                        </ThemeVariant>
                                    </Circle>
                                </div>
                            </div>
                        ))}
                    />
                    <Stack space={8}>
                        <SectionTitle as="h2">Current page info</SectionTitle>
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

Default.storyName = 'CenteredCarousel';
Default.parameters = {fullScreen: true};
Default.args = {
    numItems: 6,
};
