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
                <Chip icon={<IconLightningFilled size={16} color={colors.neutralMedium} />}>
                    Chip with icon
                </Chip>
            </StorySection>
            <StorySection title="With icon and closeable">
                <Chip
                    icon={<IconLightningFilled size={16} color={colors.neutralMedium} />}
                    onClose={() => {
                        window.alert('closed');
                    }}
                >
                    Chip with icon and closeable
                </Chip>
            </StorySection>
        </div>
    );
};

Default.storyName = 'Chip';
