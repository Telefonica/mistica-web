import * as React from 'react';
import {Circle, skinVars, IconShopRegular, Box} from '..';
import avatarImg from './images/avatar.jpg';

const borderOptions = ['none', 'default', 'red'];
const typeOptions = ['color', 'empty', 'avatar', 'icon'];

export default {
    title: 'Components/Primitives/Circle',
    argTypes: {
        type: {
            options: typeOptions,
            control: {type: 'select'},
        },
        border: {
            options: borderOptions,
            control: {type: 'select'},
        },
        size: {
            control: {type: 'range', min: 40, max: 128, step: 4},
        },
    },
};

type Args = {
    border: string;
    type: string;
    size: number;
};

export const Default: StoryComponent<Args> = ({type, border, size}) => {
    return (
        <Box padding={16} dataAttributes={{testid: 'circle'}}>
            <Circle
                size={size}
                backgroundColor={
                    type === 'color'
                        ? skinVars.colors.brand
                        : type === 'icon'
                        ? skinVars.colors.brandLow
                        : skinVars.colors.background
                }
                backgroundImage={type === 'avatar' ? avatarImg : undefined}
                border={border === 'default' ? true : border === 'none' ? false : border}
            >
                {type === 'icon' ? (
                    <IconShopRegular color={skinVars.colors.brand} size={size - 16} />
                ) : undefined}
            </Circle>
        </Box>
    );
};

Default.storyName = 'Circle';

Default.args = {
    type: 'color',
    border: 'none',
    size: 40,
};
