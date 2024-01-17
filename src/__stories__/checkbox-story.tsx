import * as React from 'react';
import {Checkbox, Text3, Inline, IconCheckRegular, IconCloseRegular} from '..';

export default {
    title: 'Components/Checkbox',
};

type Args = {
    disabled: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled}) => {
    const [checked, onChange] = React.useState(false);
    return (
        <div data-testid="checkbox-wrapper" style={{maxWidth: 'fit-content'}}>
            <Checkbox name="checkbox" checked={checked} onChange={onChange} disabled={disabled}>
                checkbox content
            </Checkbox>
        </div>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
};

export const Uncontrolled: StoryComponent<Args> = ({disabled}) => {
    return (
        <div data-testid="checkbox-wrapper" style={{maxWidth: 'fit-content'}}>
            <Checkbox name="checkbox" defaultChecked={false} disabled={disabled}>
                checkbox content
            </Checkbox>
        </div>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
};

export const CustomRender: StoryComponent<Args> = ({disabled}) => {
    return (
        <div data-testid="checkbox-wrapper" style={{maxWidth: 'fit-content'}}>
            <Checkbox
                name="checkbox"
                disabled={disabled}
                render={({labelId, checked, disabled}) => (
                    <div style={{opacity: disabled ? 0.5 : undefined}}>
                        <Inline alignItems="center" space={16}>
                            {checked ? <IconCheckRegular size={18} /> : <IconCloseRegular size={18} />}
                            {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                checkbox content
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
