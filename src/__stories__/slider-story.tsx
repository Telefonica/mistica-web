import * as React from 'react';
import {Box, ResponsiveLayout, Slider} from '..';

export default {
    title: 'Components/Slider',
};

type Args = {
    disabled: boolean;
    step: number;
    max: number;
    min: number;
    tooltip: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled, step, max, min, tooltip}) => {
    const [value, setValue] = React.useState(min);
    return (
        <ResponsiveLayout>
            <Box paddingY={48}>
                <Slider
                    name="slider"
                    aria-label="slider"
                    // reset the Slider when min/max/step changes
                    key={`${min} ${max} ${step}`}
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
};

export const Uncontrolled: StoryComponent<Args> = ({disabled, step, max, min, tooltip}) => {
    return (
        <ResponsiveLayout>
            <Box padding={48}>
                <Slider
                    name="slider"
                    // reset the Slider when min/max/step changes
                    key={`${min} ${max} ${step}`}
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
};
