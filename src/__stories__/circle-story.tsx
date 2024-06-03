import * as React from 'react';
import {Circle, skinVars, IconShopRegular} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Primitives/Circle',
    argTypes: {
        size: {
            control: {type: 'range', min: 40, max: 128, step: 4},
        },
        background: {
            options: ['color', 'image', 'custom'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    background: string;
    size: number;
    border: boolean;
    icon: boolean;
};

export const Default: StoryComponent<Args> = ({size, border, background, icon}) => {
    if (background === 'custom') {
        return (
            <Circle
                size={size}
                dataAttributes={{testid: 'circle'}}
                background="linear-gradient(yellow, red)"
                border={border}
            >
                {!!icon && <IconShopRegular color={skinVars.colors.inverse} />}
            </Circle>
        );
    }

    return (
        <Circle
            size={size}
            dataAttributes={{testid: 'circle'}}
            backgroundColor={background === 'color' ? skinVars.colors.brand : skinVars.colors.background}
            backgroundImage={background === 'image' ? avatarImg : undefined}
            border={border}
        >
            {!!icon && <IconShopRegular color={skinVars.colors.inverse} />}
        </Circle>
    );
};

Default.storyName = 'Circle';
Default.args = {
    size: 40,
    background: 'color',
    border: true,
    icon: false,
};
