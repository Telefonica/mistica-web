import * as React from 'react';
import {Box, Stack, Slider} from '..';

export default {
    title: 'Components/Slider',
};

type Args = {
    disabled: boolean;
    steps: number;
    max: number;
    min: number;
    field: boolean;
    tooltip: boolean;
};

export const Default: StoryComponent<Args> = ({disabled, steps, max, min, field, tooltip}) => {
    return (
        <Box paddingY={48} dataAttributes={{testid: 'slider'}}>
            <Stack space={24}>
                <Slider
                    disabled={disabled}
                    steps={steps}
                    max={max}
                    min={min}
                    field={field}
                    tooltip={tooltip}
                />
            </Stack>
        </Box>
    );
};

Default.storyName = 'Slider';

Default.args = {
    disabled: false,
    steps: 1,
    max: 100,
    min: 0,
    field: false,
    tooltip: false,
};
