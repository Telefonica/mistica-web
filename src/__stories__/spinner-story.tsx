import * as React from 'react';
import {Spinner, Stack} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Spinner',
    component: Spinner,
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 128, step: 4},
        },
    },
    parameters: {fullScreen: false},
};

type Args = {
    size: number;
};

export const Default: StoryComponent<Args> = ({size}) => {
    return (
        <StorySection title="Spinner">
            <Stack space={16}>
                <Spinner size={size} />
            </Stack>
        </StorySection>
    );
};

Default.storyName = 'Spinner';
Default.args = {
    size: 24,
};
