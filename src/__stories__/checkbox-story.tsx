import * as React from 'react';
import {Checkbox, Stack, Text3, Inline, Title1} from '..';

export default {
    title: 'Components/Forms/Checkbox',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={32}>
            <>
                <Title1>Uncontrolled (render prop)</Title1>
                <Checkbox
                    name="uncontrolled-render"
                    defaultChecked={false}
                    render={({controlElement, labelId}) => (
                        <Inline alignItems="center" space={16}>
                            {controlElement}
                            {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                You accept to sell your soul
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <Title1>Uncontrolled (children)</Title1>
                <Checkbox name="uncontrolled-children" defaultChecked={false}>
                    You accept to sell your soul
                </Checkbox>
            </>
            <>
                <Title1>Controlled (render prop)</Title1>
                <Checkbox
                    name="controlled-render"
                    checked={checked}
                    onChange={onChange}
                    render={({controlElement, labelId}) => (
                        <Inline alignItems="center" space={16}>
                            {controlElement}
                            {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                You accept to sell your soul: {checked ? 'sure!' : 'nahh'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <Title1>Controlled (children)</Title1>
                <Checkbox name="controlled-children" checked={checked} onChange={onChange}>
                    You accept to sell your soul: {checked ? 'sure!' : 'nahh'}
                </Checkbox>
            </>
            <>
                <Title1>Without box</Title1>
                <Checkbox
                    name="no-box"
                    checked={checked}
                    onChange={onChange}
                    render={({labelId}) => (
                        <Inline alignItems="center" space={16}>
                            {/* set the text id to match the checkbox name, so this text can be linked as label for accessibility */}
                            <Text3 regular id={labelId}>
                                You accept to sell your soul: {checked ? 'sure!' : 'nahh'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <Title1>Disabled</Title1>
                <Checkbox name="disabled-children" checked={checked} onChange={onChange} disabled>
                    You accept to sell your soul
                </Checkbox>
            </>
            <>
                <Title1>Multiline</Title1>
                <Checkbox name="multiline" checked={checked} onChange={onChange}>
                    <Text3 regular>
                        Checkbox with a very large very large very large very large very large very large very
                        large very large very large text that falls
                    </Text3>
                </Checkbox>
            </>
        </Stack>
    );
};

Default.storyName = 'Checkbox';
