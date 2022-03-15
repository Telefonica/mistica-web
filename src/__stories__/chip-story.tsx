import * as React from 'react';
import {Chip, IconLightningFilled} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Others/Chip',
};

export const Default: StoryComponent = () => {
    const [checked, setChecked] = React.useState<boolean>(false);
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

            <StorySection title="Like a checkbox">
                <Chip
                    Icon={IconLightningFilled}
                    onChange={(value) => {
                        window.alert('value:' + value);
                    }}
                >
                    Chip like checkbox
                </Chip>
            </StorySection>

            <StorySection title="Like a controlled checkbox">
                <Chip Icon={IconLightningFilled} checked={checked} onChange={setChecked}>
                    {checked ? 'Checked' : 'Unchecked'}
                </Chip>
            </StorySection>
        </div>
    );
};

Default.storyName = 'Chip';
