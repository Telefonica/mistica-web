import * as React from 'react';
import {Checkbox, Text3, Inline, IconCheckRegular, IconCloseRegular, ResponsiveLayout, Box} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Checkbox',
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
    const [checked, onChange] = React.useState(false);
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <div data-testid="checkbox-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Checkbox name="checkbox" checked={checked} onChange={onChange} disabled={disabled}>
                        checkbox content
                    </Checkbox>
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
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <div data-testid="checkbox-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Checkbox name="checkbox" defaultChecked={false} disabled={disabled}>
                        checkbox content
                    </Checkbox>
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
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <div data-testid="checkbox-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Checkbox
                        name="checkbox"
                        disabled={disabled}
                        render={({labelId, checked, disabled}) => (
                            <div style={{opacity: disabled ? 0.5 : undefined}}>
                                <Inline alignItems="center" space={16}>
                                    {checked ? (
                                        <IconCheckRegular size={18} />
                                    ) : (
                                        <IconCloseRegular size={18} />
                                    )}
                                    {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                                    <Text3 regular id={labelId}>
                                        checkbox content
                                    </Text3>
                                </Inline>
                            </div>
                        )}
                    />
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
