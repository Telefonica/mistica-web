import * as React from 'react';
import {Meter, Stack} from '..';

export default {
    title: 'Components/Meters',
    argTypes: {
        // color: {
        //     options: ['default', 'error'],
        //     control: {type: 'select'},
        // },
    },
};

type ProgressBarStoryArgs = {foo: 'bar'};

export const ProgressBarStory: StoryComponent<ProgressBarStoryArgs> = () => {
    const [key, setKey] = React.useState(0);
    const [values, setValues] = React.useState(Array.from({length: 8}, () => 0.1));
    return (
        <div
            style={{
                padding: 16,
            }}
        >
            <div key={key}>
                <Meter values={values} />
            </div>
            <Stack space={16}>
                <input
                    type="range"
                    style={{width: 400}}
                    value={values[0] * 1000 * 8}
                    max={1000}
                    onChange={(e) => {
                        const v = +e.currentTarget.value / 1000 / 8;
                        setValues(Array.from({length: 8}, () => v));
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
    foo: 'bar',
};
