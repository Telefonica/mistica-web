import * as React from 'react';
import {Meter} from '..';

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
    return (
        <>
            <Meter value={0.25} key={key} />
            <div>
                <button onClick={() => setKey(Date.now())}>Reset</button>
            </div>
        </>
    );
};

ProgressBarStory.storyName = 'Meter';
ProgressBarStory.args = {
    foo: 'bar',
};
