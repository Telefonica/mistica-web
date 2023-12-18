import * as React from 'react';
import {Switch, Inline, Text3, IconCheckRegular, IconCloseRegular} from '..';

export default {
    title: 'Components/Switch',
};

type Args = {
    disabled: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled}) => {
    const [checked, onChange] = React.useState(false);

    return (
        <div data-testid="switch-wrapper" style={{maxWidth: 'fit-content'}}>
            <Switch name="switch" checked={checked} onChange={onChange} disabled={disabled}>
                switch content
            </Switch>
        </div>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
};

export const Uncontrolled: StoryComponent<Args> = ({disabled}) => {
    return (
        <div data-testid="switch-wrapper" style={{maxWidth: 'fit-content'}}>
            <Switch name="switch" defaultChecked={false} disabled={disabled}>
                switch content
            </Switch>
        </div>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
};

export const CustomRender: StoryComponent<Args> = ({disabled}) => {
    return (
        <div data-testid="switch-wrapper" style={{maxWidth: 'fit-content'}}>
            <Switch
                name="switch"
                disabled={disabled}
                render={({labelId, checked, disabled}) => (
                    <div style={{opacity: disabled ? 0.5 : undefined}}>
                        <Inline alignItems="center" space={16}>
                            {checked ? <IconCheckRegular size={18} /> : <IconCloseRegular size={18} />}
                            {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                switch content
                            </Text3>
                        </Inline>
                    </div>
                )}
            />
        </div>
    );
};

CustomRender.storyName = 'custom render';
CustomRender.args = {
    disabled: false,
};
