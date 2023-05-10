import * as React from 'react';
import {Checkbox, Chip, IconLightningFilled, Inline, RadioButton, RadioGroup, skinVars} from '..';
import {StorySection} from './helpers';

const badgeOptions = ['false', 'undefined', '0', '1', '5', '10'];

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
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({badge, inverse}) => {
    // eslint-disable-next-line no-eval
    const badgeValue = badgeOptions.includes(badge) ? eval(badge) : undefined;
    const [isClosed, setIsClosed] = React.useState(true);

    React.useEffect(() => {
        setIsClosed(badgeValue);
    }, [badgeValue]);

    return (
        <div
            style={{
                padding: 16,
                width: 'fit-content',
                background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                // prevent line-height from affecting the height of the container;
                // happens when changing the base font size
                lineHeight: 0,
            }}
            data-testid="chip-story"
        >
            <StorySection title="Default">
                <Chip>Chip</Chip>
            </StorySection>
            <StorySection title="Closeable">
                <Chip
                    onClose={() => {
                        window.alert('closed badge');
                    }}
                >
                    Chip closeable
                </Chip>
            </StorySection>
            <StorySection title="With icon">
                <Chip Icon={IconLightningFilled}>Chip with icon</Chip>
            </StorySection>
            <StorySection title="No icon and badge">
                <Chip
                    badge={isClosed}
                    onClose={() => {
                        setIsClosed(false);
                    }}
                >
                    Chip with icon and badge
                </Chip>
            </StorySection>
            <StorySection title="With icon and badge">
                <Chip
                    Icon={IconLightningFilled}
                    badge={isClosed}
                    onClose={() => {
                        setIsClosed(false);
                    }}
                >
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
                            <Chip alternative active={checked} id={labelId} Icon={IconLightningFilled}>
                                Chip 1
                            </Chip>
                        )}
                    />
                    <Checkbox
                        name="chip-checkbox-2"
                        render={({labelId, checked}) => (
                            <Chip alternative active={checked} id={labelId} Icon={IconLightningFilled}>
                                Chip 2
                            </Chip>
                        )}
                    />
                    <Checkbox
                        name="chip-checkbox-3"
                        render={({labelId, checked}) => (
                            <Chip alternative active={checked} id={labelId} Icon={IconLightningFilled}>
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
                                <Chip alternative active={checked} id={labelId} Icon={IconLightningFilled}>
                                    Chip 1
                                </Chip>
                            )}
                        />
                        <RadioButton
                            value="2"
                            render={({checked, labelId}) => (
                                <Chip alternative active={checked} id={labelId} Icon={IconLightningFilled}>
                                    Chip 2
                                </Chip>
                            )}
                        />
                        <RadioButton
                            value="3"
                            render={({checked, labelId}) => (
                                <Chip alternative active={checked} id={labelId} Icon={IconLightningFilled}>
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

Default.args = {
    badge: '5',
    inverse: false,
};
