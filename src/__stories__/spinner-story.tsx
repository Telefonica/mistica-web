import * as React from 'react';
import {Spinner} from '..';

export default {
    title: 'Components/Spinner',
    component: Spinner,
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 100, step: 4},
        },
    },
};

type Args = {
    size: number;
};

export const Default: StoryComponent<Args> = ({size}) => {
    return <Spinner size={size} />;
};

Default.storyName = 'Spinner';
Default.args = {
    size: 24,
};
