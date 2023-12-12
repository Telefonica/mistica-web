import * as React from 'react';
import {Checkbox, Text3, Inline} from '..';

export default {
    title: 'Components/Checkbox',
};

type Args = {
    disabled: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled}) => {
    const [checked, onChange] = React.useState(false);
    return (
        <Checkbox name="checkbox" checked={checked} onChange={onChange} disabled={disabled}>
            checkbox content
        </Checkbox>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
};

export const Uncontrolled: StoryComponent<Args> = ({disabled}) => {
    return (
        <Checkbox name="checkbox" defaultChecked={false} disabled={disabled}>
            checkbox content
        </Checkbox>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
};

export const CustomRender: StoryComponent<Args> = ({disabled}) => {
    return (
        <Checkbox
            name="checkbox"
            disabled={disabled}
            render={({controlElement, labelId}) => (
                <Inline space={16}>
                    {/* Text3 wrapper added to have the same line-height and center checkbox with text and -2px to perfect pixel center icon */}
                    <Text3 regular as="div">
                        <div style={{position: 'relative', top: -2}}>{controlElement}</div>
                    </Text3>
                    {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                    <Text3 regular id={labelId}>
                        checkbox content
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
