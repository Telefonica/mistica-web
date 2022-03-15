import * as React from 'react';
import {Checkbox, Chip, IconLightningFilled, Inline, RadioButton, RadioGroup} from '..';
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
                <Checkbox
                    name="checkbox"
                    onChange={(value) => {
                        window.alert('value:' + value);
                    }}
                    render={({labelId, checked}) => (
                        <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                            Chip like checkbox
                        </Chip>
                    )}
                />
            </StorySection>

            <StorySection title="Like a controlled checkbox">
                <Checkbox
                    name="controlled-checkbox"
                    checked={checked}
                    onChange={setChecked}
                    render={({labelId, checked}) => (
                        <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                            {checked ? 'Checked' : 'Unchecked'}
                        </Chip>
                    )}
                />
            </StorySection>

            <StorySection title="Like radio buttons" id="radio-seciton">
                <RadioGroup name="radio-group" defaultValue="chip 1" aria-labelledby="radio-section">
                    <Inline space={8}>
                        <RadioButton
                            value="1"
                            render={({checked, labelId}) => (
                                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                    chip 1
                                </Chip>
                            )}
                        />

                        <RadioButton
                            value="2"
                            render={({checked, labelId}) => (
                                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                    chip 2
                                </Chip>
                            )}
                        />

                        <RadioButton
                            value="3"
                            render={({checked, labelId}) => (
                                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                                    chip 3
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
