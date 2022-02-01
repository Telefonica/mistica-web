import * as React from 'react';
import {Chip, IconLightningFilled} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Others/Chip',
};

export const Default: StoryComponent = () => (
    <div data-testid="chip-story">
        <StorySection title="Default">
            <Chip>Chip</Chip>
        </StorySection>
        <StorySection title="Closeable">
            <Chip
                onClose={() => {
                    window.alert('closed');
                }}
            >
                Chip closeable
            </Chip>
        </StorySection>
        <StorySection title="With icon">
            <Chip Icon={IconLightningFilled}>Chip with icon</Chip>
        </StorySection>
        <StorySection title="With icon and closeable">
            <Chip
                Icon={IconLightningFilled}
                onClose={() => {
                    window.alert('closed');
                }}
            >
                Chip with icon and closeable
            </Chip>
        </StorySection>
    </div>
);

Default.storyName = 'Chip';
