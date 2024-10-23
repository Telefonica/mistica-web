import * as React from 'react';
import {Switch, Inline, Text3, IconCheckRegular, IconCloseRegular, ResponsiveLayout, Box} from '..';

export default {
    title: 'Components/Switch',
    parameters: {fullScreen: true},
};

type Args = {
    disabled: boolean;
    inverse: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled, inverse}) => {
    const [checked, onChange] = React.useState(false);

    return (
        <ResponsiveLayout variant={inverse ? 'inverse' : undefined} fullWidth>
            <Box padding={16}>
                <div data-testid="switch-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Switch name="switch" checked={checked} onChange={onChange} disabled={disabled}>
                        switch content
                    </Switch>
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
    inverse: false,
};

export const Uncontrolled: StoryComponent<Args> = ({disabled, inverse}) => {
    return (
        <ResponsiveLayout variant={inverse ? 'inverse' : undefined} fullWidth>
            <Box padding={16}>
                <div data-testid="switch-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Switch name="switch" defaultChecked={false} disabled={disabled}>
                        switch content
                    </Switch>
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
    inverse: false,
};

export const CustomRender: StoryComponent<Args> = ({disabled, inverse}) => {
    return (
        <ResponsiveLayout variant={inverse ? 'inverse' : undefined} fullWidth>
            <Box padding={16}>
                <div data-testid="switch-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Switch
                        name="switch"
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
                                        switch content
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
    inverse: false,
};
