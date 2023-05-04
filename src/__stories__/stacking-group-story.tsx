import * as React from 'react';
import {skinVars} from '..';
import {ThemeVariant} from '../theme-variant-context';
import StackingGroup from '../stacking-group';

export default {
    title: 'Components/StackingGroup',
    argTypes: {
        size: {
            options: [24, 32, 64],
            control: {type: 'select'},
        },
        type: {
            options: ['avatar', 'image'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    size: 24 | 32 | 64;
    data: object[];
    type: 'avatar' | 'image';
    stacked?: boolean;
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({size = 24, data, type, stacked, inverse}) => {
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    padding: 16,
                    width: 'fit-content',
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                    lineHeight: 0,
                }}
                data-testid="stacking-group"
            >
                <StackingGroup size={size} type={type} stacked={stacked} data={data} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Stacking Group';
Default.args = {
    size: 24,
    data: [
        {
            src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            initials: 'maria',
        },
        {
            src: '',
            initials: 'joão',
        },
        {
            src: 'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=594&q=80',
            initials: 'Carlos',
        },
        {
            src: '',
            initials: '',
        },
        {
            src: '',
            initials: '',
        },
        {
            src: '',
            initials: '',
        },
    ],
    type: 'avatar',
    stacked: false,
    inverse: false,
};
