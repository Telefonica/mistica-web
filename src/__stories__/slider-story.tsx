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
    field: boolean
};

export const Default: StoryComponent<Args> = (props) => {
    return <div data-testid="slider">
        <Slider {...props}  />
    </div>
}


Default.storyName = 'Slider';

Default.args = {
    disabled: false,
    steps: 1,
    max: 100,
    min:0,
    field:false,
};