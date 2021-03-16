import * as React from 'react';
import {StorySection} from './helpers';
import {useElementDimensions, Text2} from '..';

export default {
    title: 'Hooks/useElementDimensions',
};

export const UseElementSize: StoryComponent = () => {
    const {height, width, ref} = useElementDimensions();

    return (
        <StorySection title="Get element dimensions. Resize the red element to see the changes">
            <Text2 regular>
                Height: {height}px, Width: {width}px
            </Text2>
            <div
                ref={ref}
                style={{
                    backgroundColor: 'gray',
                    width: 100,
                    height: 100,
                    resize: 'both',
                    overflow: 'auto',
                }}
            />
        </StorySection>
    );
};

UseElementSize.storyName = 'useElementDimensions';
