// @flow
import * as React from 'react';
import {StorySection} from './helpers';
import {useElementSize} from '../hooks';

export default {
    title: 'Components|Hooks',
};

export const UseElementSize = (): React.Node => {
    const elementRef = React.useRef();
    const {height, width} = useElementSize(elementRef);

    return (
        <StorySection title="Get element size. Resize the red element to see the changes">
            Height: {height}px, Width: {width}px
            <div
                ref={elementRef}
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
    name: 'useElementSize',
};
