import * as React from 'react';
import {
    IconMobileDeviceRegular,
    skinVars,
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
import avatarImg from './images/avatar.jpg';

import type {AspectRatio} from '../card';

export default {
    title: 'Components/Cards/SnapCard',
};

type Args = {
    asset: 'icon' | 'icon in circle' | 'image' | 'none';
    title: string;
    subtitle: string;
    touchable: boolean;
    isInverse: boolean;
    withExtra: boolean;
    aspectRatio: AspectRatio;
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

export const Default: StoryComponent<Args> = ({
    asset,
    title,
    subtitle,
    touchable,
    isInverse,
    withExtra,
    aspectRatio,
}) => {
    const assetToIcon: {
        [asset in Args['asset']]: React.ReactElement | undefined;
    } = {
        icon: <IconMobileDeviceRegular />,
        image: <Circle size={40} backgroundImage={avatarImg} />,
        'icon in circle': (
            <Circle
                size={40}
                backgroundColor={isInverse ? skinVars.colors.brandHigh : skinVars.colors.brandLow}
            >
                <IconMobileDeviceRegular
                    color={isInverse ? skinVars.colors.inverse : skinVars.colors.brand}
                />
            </Circle>
        ),
        none: undefined,
    };

    const aspectRatioValue = fixedAspectRatioValues.includes(aspectRatio)
        ? aspectRatio.replace(' ', ':')
        : aspectRatio;

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
            aspectRatio={aspectRatioValue as AspectRatio}
        />
    );
};

Default.storyName = 'SnapCard';
Default.args = {
    asset: 'icon in circle',
    title: 'Some title',
    subtitle: 'Some subtitle',
    touchable: true,
    isInverse: false,
    withExtra: false,
    aspectRatio: 'auto',
};
Default.argTypes = {
    asset: {
        options: ['icon in circle', 'icon', 'image', 'none'],
        control: {type: 'select'},
    },
    aspectRatio: {
        options: ['auto', '1 1', '16 9', '7 10', '9 10'],
        control: {
            type: 'select',
            labels: {
                '1 1': '1:1',
                '16 9': '16:9',
                '7 10': '7:10',
                '9 10': '9:10',
            },
        },
    },
};

export const Group: StoryComponent = () => {
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
                                <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                    <IconMobileDeviceRegular color={skinVars.colors.brand} />
                                </Circle>
                            }
                        />
                        <SnapCard
                            title="Title 2"
                            icon={
                                <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                    <IconMobileDeviceRegular color={skinVars.colors.brand} />
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

Group.storyName = 'SnapCard group';
Group.parameters = {
    fullScreen: true,
};
