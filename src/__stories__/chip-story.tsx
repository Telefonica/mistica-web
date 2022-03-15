import * as React from 'react';
import {Checkbox, Chip, IconLightningFilled, Inline, RadioButton, RadioGroup} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Others/Chip',
};

export const Default: StoryComponent = () => {
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

            <StorySection title="Multiple selection">
                <Inline space={8}>
                    <Checkbox
                        name="chip-checkbox-1"
                        render={({labelId, checked}) => (
                            <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                Chip 1
                            </Chip>
                        )}
                    />
                    <Checkbox
                        name="chip-checkbox-2"
                        render={({labelId, checked}) => (
                            <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                Chip 2
                            </Chip>
                        )}
                    />
                    <Checkbox
                        name="chip-checkbox-3"
                        render={({labelId, checked}) => (
                            <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                Chip 3
                            </Chip>
                        )}
                    />
                </Inline>
            </StorySection>

            <StorySection title="Single selection">
                <RadioGroup name="chip-group" defaultValue="1">
                    <Inline space={8}>
                        <RadioButton
                            value="1"
                            render={({checked, labelId}) => (
                                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                    Chip 1
                                </Chip>
                            )}
                        />
                        <RadioButton
                            value="2"
                            render={({checked, labelId}) => (
                                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                    Chip 2
                                </Chip>
                            )}
                        />
                        <RadioButton
                            value="3"
                            render={({checked, labelId}) => (
                                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                    Chip 3
                                </Chip>
                            )}
                        />
                    </Inline>
                </RadioGroup>
            </StorySection>
        </div>
    );
};

Default.storyName = 'Chip';
