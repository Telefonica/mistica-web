import * as React from 'react';
import {Tooltip, Placeholder, ResponsiveLayout, IconShopRegular, Touchable} from '..';

export default {
    title: 'Components/Tooltip',
    argTypes: {
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
    },
    parameters: {fullScreen: true},
};

type Args = {
    targetHorizontalPosition: 'left' | 'center' | 'right';
    targetVerticalPosition: 'top' | 'center' | 'bottom';
    position: 'top' | 'bottom' | 'left' | 'right';
    title: string;
    description: string;
    extra: boolean;
    delay: boolean;
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({
    targetHorizontalPosition,
    targetVerticalPosition,
    position,
    title,
    description,
    extra,
    delay,
    inverse,
}) => {
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
                <Tooltip
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
                    delay={delay}
                    description={description}
                    extra={extra ? <Placeholder /> : undefined}
                />
            </div>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tooltip';

Default.args = {
    targetHorizontalPosition: 'center',
    targetVerticalPosition: 'center',
    position: 'top',
    title: 'Title',
    description: 'A description',
    extra: false,
    delay: false,
    inverse: false,
};
