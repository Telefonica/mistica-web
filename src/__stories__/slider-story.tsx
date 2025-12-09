import * as React from 'react';
import {Box, ResponsiveLayout, Slider} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Slider',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    disabled: boolean;
    step: number;
    max: number;
    min: number;
    tooltip: boolean;
    variantOutside: Variant;
};

export const Controlled: StoryComponent<Args> = ({disabled, step, max, min, tooltip, variantOutside}) => {
    const [value, setValue] = React.useState(min);
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingX={16} paddingY={64}>
                <Slider
                    name="slider"
                    aria-label="slider"
                    dataAttributes={{testid: 'slider'}}
                    disabled={disabled}
                    step={step}
                    max={max}
                    min={min}
                    tooltip={tooltip}
                    value={value}
                    onChangeValue={(value) => setValue(value)}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
    step: 1,
    max: 100,
    min: 0,
    tooltip: false,
    variantOutside: 'default',
};

export const Uncontrolled: StoryComponent<Args> = ({disabled, step, max, min, tooltip, variantOutside}) => {
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingX={16} paddingY={64}>
                <Slider
                    name="slider"
                    aria-label="slider"
                    dataAttributes={{testid: 'slider'}}
                    disabled={disabled}
                    step={step}
                    max={max}
                    min={min}
                    tooltip={tooltip}
                    defaultValue={min}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
    step: 1,
    max: 100,
    min: 0,
    tooltip: false,
    variantOutside: 'default',
};
