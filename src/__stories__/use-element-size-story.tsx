import * as React from 'react';
import {DeprecationWarning, StorySection} from './helpers';
import {useElementSize} from '../hooks';

export default {
    title: 'Hooks/useElementSize',
};

export const UseElementSize: StoryComponent = () => {
    const elementRef = React.useRef(null);
    const {height, width} = useElementSize(elementRef);

    return (
        <StorySection title="Get element size. Resize the red element to see the changes">
            <DeprecationWarning />
            Height: {height}px, Width: {width}px
            <div
                ref={elementRef}
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

UseElementSize.storyName = 'useElementSize';
