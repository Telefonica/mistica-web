import * as React from 'react';
import {Checkbox, Stack, Text3, Inline, SectionTitle} from '..';

export default {
    title: 'Components/Forms/Checkbox',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={32}>
            <>
                <SectionTitle>Uncontrolled (render prop)</SectionTitle>
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
                <SectionTitle>Uncontrolled (children)</SectionTitle>
                <Checkbox name="uncontrolled-children" defaultChecked={false}>
                    You accept to sell your soul
                </Checkbox>
            </>
            <>
                <SectionTitle>Controlled (render prop)</SectionTitle>
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
                <SectionTitle>Controlled (children)</SectionTitle>
                <Checkbox name="controlled-children" checked={checked} onChange={onChange}>
                    You accept to sell your soul: {checked ? 'sure!' : 'nahh'}
                </Checkbox>
            </>
            <>
                <SectionTitle>Without box</SectionTitle>
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
                <SectionTitle>Disabled</SectionTitle>
                <Checkbox name="disabled-children" checked={checked} onChange={onChange} disabled>
                    You accept to sell your soul
                </Checkbox>
            </>
            <>
                <SectionTitle>Multiline</SectionTitle>
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
