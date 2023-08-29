import * as React from 'react';
import {Placeholder} from '..';

export default {
    title: 'Components/Primitives/Placeholder',
    argTypes: {
        height: {
            control: {type: 'range', min: 120, max: 300, step: 10},
        },
    },
};

type Args = {
    height: number;
};

export const Default: StoryComponent<Args> = ({height}) => <Placeholder height={height} />;

Default.storyName = 'Placeholder';
Default.args = {
    height: 120,
};
