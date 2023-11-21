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
    tooltip: boolean;
};

export const Default: StoryComponent<Args> = ({disabled, steps, max, min, tooltip}) => {
    const [a, set] = React.useState(0);
    return (
        <Box paddingY={48} dataAttributes={{testid: 'slider'}}>
            <Stack space={24}>
                <Slider
                    disabled={disabled}
                    step={steps}
                    max={max}
                    min={min}
                    tooltip={tooltip}
                    value={a}
                    onChangeValue={(value) => {
                        set(value);
                        console.log('changed', value);
                    }}
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
    tooltip: false,
};
