import * as React from 'react';
import {Stack, RadioGroup, RadioButton, Inline, Text3} from '..';

export default {
    title: 'Components/Radio Button',
};

type Args = {
    disabled: boolean;
};

export const Controlled: StoryComponent<Args> = ({disabled}) => {
    const [value, setValue] = React.useState('first');
    return (
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
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    disabled: false,
};

export const Uncontrolled: StoryComponent<Args> = ({disabled}) => {
    const [value, setValue] = React.useState('first');
    return (
        <RadioGroup name="radio-group" disabled={disabled} onChange={setValue} defaultValue={value}>
            <Stack space={16}>
                <RadioButton value="first">
                    <Text3 regular>First option</Text3>
                </RadioButton>
                <RadioButton value="second">
                    <Text3 regular>Second option</Text3>
                </RadioButton>
            </Stack>
        </RadioGroup>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    disabled: false,
};

export const CustomRender: StoryComponent<Args> = ({disabled}) => {
    const [value, setValue] = React.useState('first');
    return (
        <RadioGroup name="radio-group" disabled={disabled} onChange={setValue} defaultValue={value}>
            <Stack space={16}>
                <RadioButton
                    value="first"
                    render={({controlElement, labelId}) => (
                        <Inline space={16}>
                            {/* Text3 wrapper added to have the same line-height and center radio button with text and -2px to perfect pixel center icon */}
                            <Text3 regular as="div">
                                <div style={{position: 'relative', top: -2}}>{controlElement}</div>
                            </Text3>
                            {/* set the text id to match the radio button name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                First option
                            </Text3>
                        </Inline>
                    )}
                />
                <RadioButton
                    value="second"
                    render={({controlElement, labelId}) => (
                        <Inline space={16}>
                            {/* Text3 wrapper added to have the same line-height and center radio button with text and -2px to perfect pixel center icon */}
                            <Text3 regular as="div">
                                <div style={{position: 'relative', top: -2}}>{controlElement}</div>
                            </Text3>
                            {/* set the text id to match the radio button name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                Second option
                            </Text3>
                        </Inline>
                    )}
                />
            </Stack>
        </RadioGroup>
    );
};

CustomRender.storyName = 'custom render';
CustomRender.args = {
    disabled: false,
};
