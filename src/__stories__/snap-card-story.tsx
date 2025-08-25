import * as React from 'react';
import {
    IconMobileDeviceRegular,
    skinVars,
    Circle,
    ResponsiveLayout,
    Stack,
    Text2,
    Box,
    Text4,
    Carousel,
} from '..';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';
import {SnapCard} from '../card-data';

import type {CardAspectRatio, SlotAlignment} from '../card-internal';

export default {
    title: 'Private/Deprecated Card Stories/SnapCard',
};

type Args = {
    asset: 'icon' | 'icon in circle' | 'image' | 'none';
    title: string;
    subtitle: string;
    description: string;
    actions: 'onPress' | 'href' | 'to' | 'none';
    inverse: boolean;
    slotAlignment?: SlotAlignment;
    extra: boolean;
    aspectRatio: string;
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

export const Default: StoryComponent<Args> = ({
    asset,
    title,
    subtitle,
    description,
    actions,
    inverse,
    slotAlignment,
    extra,
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
                backgroundColor={inverse ? skinVars.colors.brandHigh : skinVars.colors.brandLow}
            >
                <IconMobileDeviceRegular color={inverse ? skinVars.colors.inverse : skinVars.colors.brand} />
            </Circle>
        ),
        none: undefined,
    };

    const aspectRatioValue = fixedAspectRatioValues.includes(aspectRatio)
        ? aspectRatio.replace(' ', ':')
        : aspectRatio;

    const interactiveProps = {
        onPress: actions === 'onPress' ? () => console.log('pressed') : undefined,
        to: actions === 'to' ? '#example' : undefined,
        href: actions === 'href' ? 'https://example.org' : undefined,
    } as {onPress: () => void} | {to: string} | {href: string} | {[key: string]: never};

    return (
        <SnapCard
            asset={assetToIcon[asset]}
            title={title}
            subtitle={subtitle}
            description={description}
            dataAttributes={{testid: 'snap-card'}}
            aria-label="SnapCard card label"
            isInverse={inverse}
            extra={extra ? <Placeholder /> : undefined}
            aspectRatio={aspectRatioValue as CardAspectRatio}
            slotAlignment={slotAlignment}
            {...interactiveProps}
        />
    );
};

Default.storyName = 'SnapCard';
Default.args = {
    asset: 'icon in circle',
    title: 'Some title',
    subtitle: 'Some subtitle',
    description: 'Description',
    actions: 'none',
    inverse: false,
    extra: false,
    slotAlignment: 'bottom',
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
    slotAlignment: {
        options: ['content', 'bottom'],
        control: {type: 'select'},
    },
    actions: {
        options: ['onPress', 'href', 'to', 'none'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Text2 regular>We can group multiple cards and they adjust to the same height.</Text2>
                    <Carousel
                        itemsPerPage={4}
                        items={[
                            <SnapCard
                                title="Title 1"
                                subtitle="Subtitle"
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconMobileDeviceRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                            />,
                            <SnapCard
                                title="Title 2"
                                asset={
                                    <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                        <IconMobileDeviceRegular color={skinVars.colors.brand} />
                                    </Circle>
                                }
                            />,
                            <SnapCard title="Title 3" />,
                            <SnapCard
                                title="Data left"
                                slotAlignment="bottom"
                                extra={
                                    <Stack space={4}>
                                        <Text4 regular>10 GB</Text4>
                                        <Text2 regular>out of 50</Text2>
                                    </Stack>
                                }
                            />,
                        ]}
                    />
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Group.storyName = 'SnapCard group';
Group.parameters = {
    fullScreen: true,
};
