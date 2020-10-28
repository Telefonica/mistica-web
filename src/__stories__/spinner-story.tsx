import * as React from 'react';
import Spinner from '../spinner';
import {StorySection} from './helpers';

export default {
    title: 'Components/Feedbacks/Spinner',
    component: Spinner,
};

export const Default: StoryComponent = () => {
    const [size, setSize] = React.useState(24);
    return (
        <StorySection title="Spinner">
            <label>
                Size:{' '}
                <input type="number" value={String(size)} onChange={(e) => setSize(Number(e.target.value))} />
            </label>
            <div style={{margin: 16}} />
            <Spinner size={size} />
        </StorySection>
    );
};

Default.storyName = 'Spinner';
