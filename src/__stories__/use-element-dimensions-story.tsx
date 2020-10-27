import * as React from 'react';
import {StorySection} from './helpers';
import {useElementDimensions} from '../hooks';

export default {
    title: 'Hooks/useElementDimensions',
};

export const UseElementSize: StoryComponent = () => {
    const {height, width, ref} = useElementDimensions();

    return (
        <StorySection title="Get element dimensions. Resize the red element to see the changes">
            Height: {height}px, Width: {width}px
            <div
                ref={ref}
                style={{
                    backgroundColor: 'red',
                    width: 100,
                    height: 100,
                    resize: 'both',
                    overflow: 'auto',
                }}
            />
        </StorySection>
    );
};

UseElementSize.story = {
    name: 'useElementDimensions',
};
