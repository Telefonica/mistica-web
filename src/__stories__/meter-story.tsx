import * as React from 'react';
import {Box, Meter, ResponsiveLayout, Stack, ThemeVariant} from '..';

import type {MeterType} from '../meter';

export default {
    title: 'Components/Meters',
    argTypes: {
        type: {
            options: ['angular', 'circular', 'linear'] as Array<MeterType>,
            control: {type: 'select'},
        },
        themeVariant: {
            options: ['default', 'inverse', 'media'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type MeterStoryArgs = {
    type: MeterType;
    reverse: boolean;
    themeVariant: 'default' | 'inverse' | 'media';
};

export const MeterStory: StoryComponent<MeterStoryArgs> = ({type, reverse, themeVariant}) => {
    const [key, setKey] = React.useState(0);
    const segments = 8;
    const [values, setValues] = React.useState(Array.from({length: segments}, () => 0.1));
    return (
        <ResponsiveLayout variant={themeVariant}>
            <ThemeVariant variant={themeVariant}>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Meter key={key} type={type} reverse={reverse} values={values} />

                        <Stack space={16}>
                            <input
                                type="range"
                                style={{width: 400}}
                                value={values[0] * 1000 * segments}
                                max={1000}
                                onChange={(e) => {
                                    const v = +e.currentTarget.value / 1000 / segments;
                                    setValues(Array.from({length: segments}, () => v));
                                }}
                            />
                            <div>{values[0]}</div>
                            <button onClick={() => setKey(Date.now())}>Reset</button>
                        </Stack>
                    </Stack>
                </Box>
            </ThemeVariant>
        </ResponsiveLayout>
    );
};

MeterStory.storyName = 'Meter';
MeterStory.args = {
    type: 'angular',
    reverse: false,
    themeVariant: 'default',
};
