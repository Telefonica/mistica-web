import * as React from 'react';
import {Meter, Stack} from '..';

import type {MeterType} from '../meter';

export default {
    title: 'Components/Meters',
    argTypes: {
        type: {
            options: ['angular', 'circular', 'linear'] as Array<MeterType>,
            control: {type: 'select'},
        },
    },
};

type ProgressBarStoryArgs = {type: MeterType};

export const ProgressBarStory: StoryComponent<ProgressBarStoryArgs> = ({type}) => {
    const [key, setKey] = React.useState(0);
    const segments = 8;
    const [values, setValues] = React.useState(Array.from({length: segments}, () => 0.1));
    return (
        <div
            style={{
                padding: 16,
            }}
        >
            <Meter key={key + type} type={type} values={values} />

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
        </div>
    );
};

ProgressBarStory.storyName = 'Meter';
ProgressBarStory.args = {
    type: 'angular',
};
