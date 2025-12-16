import * as React from 'react';
import {ResponsiveLayout, Box, Counter} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Counter',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
    component: Counter,
};

type Args = {
    min: number;
    max: number;
    defaultValue: number;
    removable: boolean;
    variantOutside: Variant;
    disabled: boolean;
};

export const Default: StoryComponent<Args> = ({
    min,
    max,
    defaultValue,
    removable,
    variantOutside,
    disabled,
}) => {
    return (
        <ResponsiveLayout fullWidth variant={variantOutside}>
            <Box padding={16}>
                <Counter
                    min={min}
                    max={max}
                    dataAttributes={{testid: 'counter'}}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    {...(removable ? {onRemove: () => alert('removed!')} : {})}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Counter';
Default.args = {
    min: 0,
    max: 10,
    defaultValue: 0,
    disabled: false,
    removable: false,
    variantOutside: 'default',
};
