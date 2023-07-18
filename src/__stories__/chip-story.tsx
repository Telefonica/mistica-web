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

const badgeOptions = ['0', '2', '14', 'undefined'];

export default {
    title: 'Components/Chip',
    argTypes: {
        badge: {
            options: badgeOptions,
            control: {type: 'select'},
            if: {arg: 'type', eq: 'default'},
        },

        type: {
            options: ['default', 'single selection', 'multiple selection'],
            control: {type: 'select'},
        },

        withIcon: {if: {arg: 'type', eq: 'default'}},
        closable: {if: {arg: 'type', eq: 'default'}},
    },
    parameters: {fullScreen: true},
};

type Args = {
    type: string;
    inverse: boolean;
    withIcon: boolean;
    closable: boolean;
    badge: string;
};

export const Default: StoryComponent<Args> = ({type, inverse, withIcon, closable, badge}) => {
    const props = {
        Icon: withIcon ? IconLightningFilled : undefined,
        badge: badge !== 'undefined' ? +badge : undefined,
    };

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'chip-story'}}>
                <div
                    style={{
                        // prevent line-height from affecting the height of the container;
                        // happens when changing the base font size
                        lineHeight: 0,
                    }}
                >
                    {type === 'default' &&
                        (closable ? (
                            <Chip onClose={() => window.alert('closed')} {...props}>
                                Chip
                            </Chip>
                        ) : (
                            <Chip {...props}>Chip</Chip>
                        ))}

                    {type === 'single selection' && (
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
                    )}

                    {type === 'multiple selection' && (
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
                    )}
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Chip';
Default.args = {
    inverse: false,
    type: 'default',
    badge: '0',
    withIcon: false,
    closable: false,
};
