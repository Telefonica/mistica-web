import * as React from 'react';
import {Stack, RadioGroup, RadioButton, Inline, Text3, IconHandRightRegular, ResponsiveLayout, Box} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Radio Button',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    disabled: boolean;
    variantOutside: Variant;
};

export const Controlled: StoryComponent<Args> = ({disabled, variantOutside}) => {
    const [value, setValue] = React.useState('first');
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <div data-testid="radio-group-wrapper" style={{maxWidth: 'fit-content'}}>
                    <RadioGroup name="radio-group" disabled={disabled} onChange={setValue} value={value}>
                        <Stack space={16}>
                            <RadioButton value="first">
                                <Text3 regular>First option</Text3>
                            </RadioButton>
                            <RadioButton value="second">
                                <Text3 regular>Second option</Text3>
                            </RadioButton>
                        </Stack>
                    </RadioGroup>
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
    variantOutside: 'default',
};

export const Uncontrolled: StoryComponent<Args> = ({disabled, variantOutside}) => {
    const [value, setValue] = React.useState('first');
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <div data-testid="radio-group-wrapper" style={{maxWidth: 'fit-content'}}>
                    <RadioGroup
                        name="radio-group"
                        disabled={disabled}
                        onChange={setValue}
                        defaultValue={value}
                    >
                        <Stack space={16}>
                            <RadioButton value="first">
                                <Text3 regular>First option</Text3>
                            </RadioButton>
                            <RadioButton value="second">
                                <Text3 regular>Second option</Text3>
                            </RadioButton>
                        </Stack>
                    </RadioGroup>
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
    variantOutside: 'default',
};

export const CustomRender: StoryComponent<Args> = ({disabled, variantOutside}) => {
    const [value, setValue] = React.useState('first');
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <div data-testid="radio-group-wrapper" style={{maxWidth: 'fit-content'}}>
                    <RadioGroup
                        name="radio-group"
                        disabled={disabled}
                        onChange={setValue}
                        defaultValue={value}
                    >
                        <Stack space={16}>
                            <RadioButton
                                value="first"
                                render={({labelId, disabled}) => (
                                    <div style={{opacity: disabled ? 0.5 : undefined}}>
                                        <Inline space={16}>
                                            <div
                                                style={{visibility: value === 'first' ? 'visible' : 'hidden'}}
                                            >
                                                <IconHandRightRegular size={20} />
                                            </div>

                                            {/* set the text id to match the radio button name, so this text can be linked as label for accessibility */}
                                            <Text3 regular id={labelId}>
                                                First option
                                            </Text3>
                                        </Inline>
                                    </div>
                                )}
                            />
                            <RadioButton
                                value="second"
                                render={({labelId, disabled}) => (
                                    <div style={{opacity: disabled ? 0.5 : undefined}}>
                                        <Inline alignItems="center" space={16}>
                                            <div
                                                style={{
                                                    visibility: value === 'second' ? 'visible' : 'hidden',
                                                }}
                                            >
                                                <IconHandRightRegular size={20} />
                                            </div>
                                            {/* set the text id to match the radio button name, so this text can be linked as label for accessibility */}
                                            <Text3 regular id={labelId}>
                                                Second option
                                            </Text3>
                                        </Inline>
                                    </div>
                                )}
                            />
                        </Stack>
                    </RadioGroup>
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

CustomRender.storyName = 'custom render';
CustomRender.args = {
    disabled: false,
    variantOutside: 'default',
};
