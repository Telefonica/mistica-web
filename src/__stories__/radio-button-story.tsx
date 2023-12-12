import * as React from 'react';
import {Stack, Title1, RadioGroup, RadioButton, Inline, Text3, IconHandLeftRegular} from '..';

export default {
    title: 'Components/Radio Button',
};

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('banana');
    const [uncontrolledValue, setUncontrolledValue] = React.useState('apple');
    return (
        <Stack space={32}>
            <>
                <Title1 id="uncontrolled">Uncontrolled: {uncontrolledValue}</Title1>
                <RadioGroup
                    name="uncontrolled"
                    aria-labelledby="uncontrolled"
                    onChange={setUncontrolledValue}
                    defaultValue="apple"
                >
                    <Stack space={16}>
                        <RadioButton value="banana">
                            <Text3 regular>Banana</Text3>
                        </RadioButton>
                        <RadioButton value="apple">
                            <Text3 regular>Apple</Text3>
                        </RadioButton>
                    </Stack>
                </RadioGroup>
            </>
            <>
                <Title1 id="controlled">Selected fruit: {value}</Title1>
                <RadioGroup name="group1" aria-labelledby="controlled" value={value} onChange={setValue}>
                    <Stack space={16}>
                        <RadioButton value="banana">
                            <Text3 regular>Banana</Text3>
                        </RadioButton>
                        <RadioButton value="apple">
                            <Text3 regular>Apple</Text3>
                        </RadioButton>
                    </Stack>
                </RadioGroup>
            </>
            <>
                <Title1 id="custom-render">Custom render - Selected fruit: {value}</Title1>
                <RadioGroup name="group2" aria-labelledby="custom-render" value={value} onChange={setValue}>
                    <Stack space={16}>
                        <RadioButton
                            value="banana"
                            render={() => (
                                <Inline space={16}>
                                    <Text3 regular>Banana</Text3>
                                    {value === 'banana' && <IconHandLeftRegular size={20} />}
                                </Inline>
                            )}
                        />
                        <RadioButton
                            value="apple"
                            render={() => (
                                <Inline space={16}>
                                    <Text3 regular>Apple</Text3>
                                    {value === 'apple' && <IconHandLeftRegular size={20} />}
                                </Inline>
                            )}
                        />
                    </Stack>
                </RadioGroup>
            </>
            <>
                <Title1 id="disabled">Disabled</Title1>
                <RadioGroup
                    disabled
                    name="group3"
                    aria-labelledby="disabled"
                    value={value}
                    onChange={setValue}
                >
                    <Stack space={16}>
                        <RadioButton value="banana">
                            <Text3 regular>Banana</Text3>
                        </RadioButton>
                        <RadioButton value="apple">
                            <Text3 regular>Apple</Text3>
                        </RadioButton>
                    </Stack>
                </RadioGroup>
            </>
            <>
                <Title1 id="multiline">Multiline</Title1>
                <RadioGroup name="group4" aria-labelledby="multiline" value={value} onChange={setValue}>
                    <Stack space={16}>
                        <RadioButton value="banana">
                            <Text3 regular>
                                Checkbox with a very large very large very large very large very large very
                                large very large very large very large text that falls
                            </Text3>
                        </RadioButton>
                        <RadioButton value="apple">
                            <Text3 regular>
                                Checkbox with a very large very large very large very large very large very
                                large very large very large very large text that falls
                            </Text3>
                        </RadioButton>
                    </Stack>
                </RadioGroup>
            </>
        </Stack>
    );
};

Default.storyName = 'Radio Button';

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
                    render={() => (
                        <Inline space={16}>
                            <Text3 regular>First option</Text3>
                            {value === 'first' && <IconHandLeftRegular size={20} />}
                        </Inline>
                    )}
                />
                <RadioButton
                    value="second"
                    render={() => (
                        <Inline space={16}>
                            <Text3 regular>Second option</Text3>
                            {value === 'second' && <IconHandLeftRegular size={20} />}
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
