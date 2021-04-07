import * as React from 'react';
import {StorySection} from './helpers';
import {useElementDimensions, Text2, ButtonPrimary} from '..';

export default {
    title: 'Hooks/useElementDimensions',
};

const SomeComponent = ({innerRef}: {innerRef?: (node: HTMLElement | null) => void}) => {
    return (
        <div
            ref={innerRef}
            style={{
                backgroundColor: 'gray',
                width: 100,
                height: 100,
                resize: 'both',
                overflow: 'auto',
            }}
        ></div>
    );
};

export const UseElementSize: StoryComponent = () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const {height, width, ref} = useElementDimensions();

    return (
        <StorySection title="Get element dimensions. Resize the red element to see the changes">
            <Text2 regular>
                Height: {height}px, Width: {width}px
            </Text2>
            <br />
            {isVisible && <SomeComponent innerRef={ref} />}
            <br />
            <ButtonPrimary onPress={() => setIsVisible((prev) => !prev)}>
                {isVisible ? 'Unmount' : 'Mount'}
            </ButtonPrimary>
        </StorySection>
    );
};

UseElementSize.storyName = 'useElementDimensions';
