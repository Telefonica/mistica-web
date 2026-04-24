import * as React from 'react';
import {Square, skinVars, Icon} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Primitives/Square',
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
    children: boolean;
};

export const Default: StoryComponent<Args> = ({size, border, background, children}) => {
    if (background === 'custom') {
        return (
            <Square
                size={size}
                dataAttributes={{testid: 'square'}}
                background="linear-gradient(yellow, red)"
                border={border}
            >
                {!!children && <Icon name="shop-regular" color={skinVars.colors.inverse} />}
            </Square>
        );
    }

    return (
        <Square
            size={size}
            dataAttributes={{testid: 'square'}}
            backgroundColor={background === 'color' ? skinVars.colors.brand : skinVars.colors.background}
            backgroundImage={background === 'image' ? avatarImg : undefined}
            border={border}
        >
            {!!children && <Icon name="shop-regular" color={skinVars.colors.inverse} />}
        </Square>
    );
};

Default.storyName = 'Square';
Default.args = {
    size: 40,
    background: 'color',
    border: false,
    children: false,
};
