import * as React from 'react';
import {
    Popover,
    skinVars,
    IconMobileDeviceRegular,
    IconShopRegular,
    Circle,
    Placeholder,
    ResponsiveLayout,
    Touchable,
} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Popover',
    component: Popover,
    parameters: {fullScreen: true},
};

type PopoverArgs = {
    asset: 'icon' | 'image' | 'none';
    position: 'top' | 'bottom' | 'left' | 'right';
    title: string;
    description: string;
    extra: boolean;
    targetHorizontalPosition: 'left' | 'center' | 'right';
    targetVerticalPosition: 'top' | 'center' | 'bottom';
    inverse: boolean;
};

export const Default: StoryComponent<PopoverArgs> = ({
    asset,
    position,
    title,
    description,
    extra,
    targetHorizontalPosition,
    targetVerticalPosition,
    inverse,
}) => {
    let icon;
    if (asset === 'icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconMobileDeviceRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'image') {
        icon = <Circle size={40} backgroundImage={avatarImg} />;
    }

    let left,
        right,
        top,
        bottom,
        translateX = '0',
        translateY = '0';

    switch (targetHorizontalPosition) {
        case 'left':
            left = '0';
            break;
        case 'right':
            right = '0';
            break;
        case 'center':
            left = '50%';
            translateX = '-50%';
            break;
        default:
    }

    switch (targetVerticalPosition) {
        case 'top':
            top = '0';
            break;
        case 'bottom':
            bottom = '0';
            break;
        case 'center':
            top = '50%';
            translateY = '-50%';
            break;
        default:
    }

    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <div style={{width: '100vw', height: '100vh'}}>
                <Popover
                    asset={icon}
                    position={position}
                    target={
                        <div
                            style={{
                                position: 'absolute',
                                left,
                                right,
                                top,
                                bottom,
                                transform: `translate(${translateX}, ${translateY})`,
                            }}
                        >
                            <Touchable onPress={() => {}} dataAttributes={{testid: 'target'}}>
                                <IconShopRegular style={{display: 'block'}} />
                            </Touchable>
                        </div>
                    }
                    title={title}
                    description={description}
                    extra={extra ? <Placeholder /> : undefined}
                />
            </div>
        </ResponsiveLayout>
    );
};

Default.args = {
    targetHorizontalPosition: 'center',
    targetVerticalPosition: 'center',
    position: 'top',
    title: 'Title',
    description: 'A description',
    extra: false,
    inverse: false,
    asset: 'icon',
};

Default.argTypes = {
    targetHorizontalPosition: {
        options: ['left', 'center', 'right'],
        control: {type: 'select'},
    },
    targetVerticalPosition: {
        options: ['top', 'center', 'bottom'],
        control: {type: 'select'},
    },
    position: {
        options: ['top', 'bottom', 'left', 'right'],
        control: {type: 'select'},
    },
    asset: {
        options: ['icon', 'image', 'none'],
        control: {type: 'select'},
    },
};

Default.storyName = 'Popover';
