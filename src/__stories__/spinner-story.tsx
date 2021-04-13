import * as React from 'react';
import {Spinner, IntegerField, Stack} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Feedbacks/Spinner',
    component: Spinner,
};

export const Default: StoryComponent = () => {
    const [size, setSize] = React.useState(24);
    return (
        <StorySection title="Spinner">
            <Stack space={16}>
                <IntegerField
                    name="size"
                    label="Size"
                    value={String(size)}
                    onChangeValue={(newValue) => setSize(Number(newValue))}
                />
                <Spinner size={size} />
            </Stack>
        </StorySection>
    );
};

Default.storyName = 'Spinner';
