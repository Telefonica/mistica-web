import * as React from 'react';
import {Chip, IconLightningFilled, useTheme} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Others/Chip',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <div data-testid="chip-story">
            <StorySection title="Default">
                <Chip value="Chip" />
            </StorySection>
            <StorySection title="Closeable">
                <Chip
                    value="Chip closeable"
                    onClose={() => {
                        window.alert('closed');
                    }}
                />
            </StorySection>
            <StorySection title="With start icon">
                <Chip
                    value="Chip closeable"
                    startIcon={<IconLightningFilled size={16} color={colors.neutralMedium} />}
                />
            </StorySection>
            <StorySection title="With start icon and closeable">
                <Chip
                    value="Chip closeable"
                    startIcon={<IconLightningFilled size={16} color={colors.neutralMedium} />}
                    onClose={() => {
                        window.alert('closed');
                    }}
                />
            </StorySection>
        </div>
    );
};

Default.storyName = 'Chip';
