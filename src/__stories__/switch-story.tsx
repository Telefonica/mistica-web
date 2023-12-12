import * as React from 'react';
import {Switch, Inline, Text3} from '..';

export default {
    title: 'Components/Switch',
};

type Args = {
    disabled: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled}) => {
    const [checked, onChange] = React.useState(false);

    return (
        <Switch name="switch" checked={checked} onChange={onChange} disabled={disabled}>
            switch content
        </Switch>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
};

export const Uncontrolled: StoryComponent<Args> = ({disabled}) => {
    return (
        <Switch name="switch" defaultChecked={false} disabled={disabled}>
            switch content
        </Switch>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
};

export const CustomRender: StoryComponent<Args> = ({disabled}) => {
    return (
        <Switch
            name="switch"
            disabled={disabled}
            render={({controlElement, labelId}) => (
                <Inline alignItems="center" space={16}>
                    {controlElement}
                    {/* set the text id to match the switch name, so this text can be linked as label for accessibility */}
                    <Text3 regular id={labelId}>
                        switch content
                    </Text3>
                </Inline>
            )}
        />
    );
};

CustomRender.storyName = 'custom render';
CustomRender.args = {
    disabled: false,
};
