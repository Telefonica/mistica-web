import * as React from 'react';
import {Slider} from '..';

export default {
    title: 'Components/Slider',
    component: Slider,
};

type SliderArgs = {
    disabled: boolean;
    steps: number;
    max: number;
    min: number;
    field: boolean;
    stepsInArray: boolean;
    invalidText: string;
};

export const Default: StoryComponent<SliderArgs> = ({
    disabled,
    steps,
    max,
    min,
    field,
    stepsInArray,
    invalidText,
}) => {
    const step = stepsInArray ? [0, 8, 12, 16, 24, 40] : steps;

    return (
        <div data-testid="slider">
            <div style={{marginTop: 54}}>
                <Slider
                    invalidText={invalidText}
                    disabled={disabled}
                    steps={step}
                    max={max}
                    min={min}
                    field={field}
                />
            </div>
        </div>
    );
};

Default.storyName = 'Slider';

Default.args = {
    disabled: false,
    steps: 1,
    max: 100,
    min: 0,
    field: false,
    stepsInArray: false,
    invalidText: 'Invalid',
};
