import * as React from 'react';
import {Circle, skinVars, IconShopRegular} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Primitives/Circle',
    argTypes: {
        size: {
            control: {type: 'range', min: 40, max: 128, step: 4},
        },
        content: {
            options: ['color', 'image', 'icon', 'none'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    content: string;
    size: number;
    border: boolean;
};

export const Default: StoryComponent<Args> = ({content, size, border}) => {
    return (
        <Circle
            size={size}
            dataAttributes={{testid: 'circle'}}
            backgroundColor={
                content === 'color'
                    ? skinVars.colors.brand
                    : content === 'icon'
                    ? skinVars.colors.brandLow
                    : skinVars.colors.background
            }
            backgroundImage={content === 'image' ? avatarImg : undefined}
            border={border}
        >
            {content === 'icon' ? <IconShopRegular color={skinVars.colors.brand} /> : undefined}
        </Circle>
    );
};

Default.storyName = 'Circle';
Default.args = {
    size: 40,
    content: 'color',
    border: true,
};
