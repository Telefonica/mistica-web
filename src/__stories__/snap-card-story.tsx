import * as React from 'react';
import {
    IconAcademicRegular,
    useTheme,
    Circle,
    SnapCard,
    ResponsiveLayout,
    Stack,
    Text2,
    Inline,
    Box,
    Text4,
} from '..';
import {Placeholder} from '../placeholder';
import {ThemeVariant} from '../theme-variant-context';

export default {
    title: 'Components/Cards/Snap card',
};

type Args = {
    asset: 'icon' | 'icon in circle' | 'image' | 'none';
    title: string;
    subtitle: string;
    touchable: boolean;
    isInverse: boolean;
    withExtra: boolean;
};

export const Default: StoryComponent<Args> = ({asset, title, subtitle, touchable, isInverse, withExtra}) => {
    const {colors} = useTheme();

    const assetToIcon: {
        [asset in Args['asset']]: React.ReactElement | undefined;
    } = {
        icon: <IconAcademicRegular />,
        image: <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />,
        'icon in circle': (
            <Circle size={40} backgroundColor={isInverse ? colors.brandHigh : colors.brand}>
                <ThemeVariant isInverse>
                    <IconAcademicRegular />
                </ThemeVariant>
            </Circle>
        ),
        none: undefined,
    };

    return (
        <SnapCard
            icon={assetToIcon[asset]}
            title={title}
            subtitle={subtitle}
            dataAttributes={{testid: 'snap-card'}}
            aria-label="SnapCard card label"
            isInverse={isInverse}
            extra={withExtra ? <Placeholder /> : undefined}
            onPress={
                touchable
                    ? () => {
                          window.alert('SnapCard clicked');
                      }
                    : undefined
            }
        />
    );
};

Default.storyName = 'Snap card';
Default.args = {
    asset: 'icon in circle',
    title: 'Some title',
    subtitle: 'Some subtitle',
    touchable: true,
    isInverse: false,
    withExtra: false,
};
Default.argTypes = {
    asset: {
        options: ['icon in circle', 'icon', 'image', 'none'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Text2 regular>We can group multiple cards and they adjust to the same height:</Text2>
                    <Inline space={8} fullWidth>
                        <SnapCard
                            title="Title 1"
                            subtitle="Subtitle"
                            icon={
                                <Circle size={40} backgroundColor={colors.brand}>
                                    <ThemeVariant isInverse>
                                        <IconAcademicRegular />
                                    </ThemeVariant>
                                </Circle>
                            }
                        />
                        <SnapCard
                            title="Title 2"
                            icon={
                                <Circle size={40} backgroundColor={colors.brand}>
                                    <ThemeVariant isInverse>
                                        <IconAcademicRegular />
                                    </ThemeVariant>
                                </Circle>
                            }
                        />
                        <SnapCard title="Title 3" />
                        <SnapCard
                            title="Data left"
                            extra={
                                <Stack space={4}>
                                    <Text4 regular>10 GB</Text4>
                                    <Text2 regular>out of 50</Text2>
                                </Stack>
                            }
                        />
                    </Inline>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Group.storyName = 'Snap card group';
Group.parameters = {
    fullScreen: true,
};
