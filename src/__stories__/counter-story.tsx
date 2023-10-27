import * as React from 'react';
import {ResponsiveLayout, Box, Counter} from '..';

export default {
    title: 'Components/Primitives/Counter',
    parameters: {fullScreen: true},
};

type Args = {
    min: number;
    max: number;
    defaultValue: number;
    removable: boolean;
    inverse: boolean;
    disabled: boolean;
};

export const Default: StoryComponent<Args> = ({min, max, defaultValue, removable, inverse, disabled}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <Counter
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    {...(removable ? {onRemove: () => alert('removed!')} : {})}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Circle';
Default.args = {
    min: 0,
    max: 10,
    defaultValue: 0,
    disabled: false,
    removable: false,
    inverse: false,
};
