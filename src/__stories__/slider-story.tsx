import * as React from 'react';
import {Slider} from '..';

export default {
    title: 'Components/Slider',
};

type Args = {
    reverse: boolean;
    progressPercent: number;
};

export const Default: StoryComponent<Args> = ({reverse, progressPercent}) => (
    <div data-testid="slider">
        <Slider  />
    </div>
);

Default.storyName = 'Slider';
