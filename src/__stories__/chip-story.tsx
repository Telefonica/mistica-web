import * as React from 'react';
import {
    Box,
    Checkbox,
    Chip,
    IconLightningFilled,
    Inline,
    RadioButton,
    RadioGroup,
    ResponsiveLayout,
} from '..';
import {StorySection} from './helpers';

const badgeOptions = ['false', 'true', 'undefined', '0', '1', '5', '10'];

export default {
    title: 'Components/Chip',
    argTypes: {
        badge: {
            options: badgeOptions,
            control: {type: 'select'},
        },
    },
};

type Args = {
    badge: string;
    isInverse: boolean;
};

export const Default: StoryComponent<Args> = ({badge, isInverse}) => {
    // eslint-disable-next-line no-eval
    const badgeValue = badgeOptions.includes(badge) ? eval(badge) : undefined;

    return (
        <ResponsiveLayout dataAttributes={{testid: 'chip-story'}} fullWidth isInverse={isInverse}>
            <Box padding={16}>
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
                <StorySection title="No icon and badge">
                    <Chip badge={badgeValue} onClose={() => {}}>
                        Chip with icon and badge
                    </Chip>
                </StorySection>
                <StorySection title="With icon and badge">
                    <Chip Icon={IconLightningFilled} badge={badgeValue} onClose={() => {}}>
                        Chip with icon and badge
                    </Chip>
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
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Chip';
Default.args = {
    badge: '5',
    isInverse: false,
};
