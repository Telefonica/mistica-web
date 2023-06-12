import * as React from 'react';
import { Slider } from '..';


export default {
    title: 'Components/Slider',
};

type Args = {
    
};

export const Default: StoryComponent<Args> = () => {
   
   

    


    return <div data-testid="slider">
        <Slider />
    </div>
}


Default.storyName = 'Slider';
