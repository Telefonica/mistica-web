import * as React from 'react';
import { Slider } from '..';


export default {
    title: 'Components/Slider',
   
};

type Args = {
    disabled: boolean
};

export const Default: StoryComponent<Args> = ({disabled}) => {
    return <div data-testid="slider">
        <Slider disabled={disabled} />
    </div>
}


Default.storyName = 'Slider';

Default.args = {
    disabled: false
};