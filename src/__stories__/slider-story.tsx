import * as React from 'react';
import { Slider } from '..';


export default {
    title: 'Components/Slider',
   
   
};

type Args = {
    disabled: boolean
    steps: number | Array<number>
    max: number
    min: number
};

export const Default: StoryComponent<Args> = ({disabled,steps,max}) => {
    return <div data-testid="slider">
        <Slider disabled={disabled} steps={steps} max={max} />
    </div>
}


Default.storyName = 'Slider';

Default.args = {
    disabled: false,
    steps: 1,
    max: 100,
    min:0,
};