import * as React from 'react';
import {Switch, Stack, Inline, Text3, SectionTitle} from '..';

export default {
    title: 'Components/Forms/Switch',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    const [uncontrolledChecked, onUncontrolledChange] = React.useState(false);
    return (
        <Stack space={32}>
            <>
                <SectionTitle>Uncontrolled</SectionTitle>
                <Switch
                    name="uncontrolled"
                    onChange={onUncontrolledChange}
                    render={(switchElement, labelId) => (
                        <Inline alignItems="center" space={16}>
                            {switchElement}
                            <Text3 regular uppercase id={labelId}>
                                {uncontrolledChecked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle>Controlled</SectionTitle>
                <Switch
                    name="controlled"
                    checked={checked}
                    onChange={onChange}
                    render={(switchElement, labelId) => (
                        <Inline alignItems="center" space={16}>
                            {switchElement}
                            <Text3 regular uppercase id={labelId}>
                                {checked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle>Without children</SectionTitle>
                <Switch name="no-children" />
            </>
            <>
                <SectionTitle>Without switch</SectionTitle>
                <Switch
                    name="no-switch"
                    checked={checked}
                    onChange={onChange}
                    render={(_, labelId) => (
                        <Inline alignItems="center" space={16}>
                            <Text3 regular uppercase id={labelId}>
                                {checked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle>Disabled</SectionTitle>
                <Switch name="disabled" checked={checked} onChange={onChange} disabled>
                    <Text3 regular uppercase>
                        {checked ? 'on' : 'off'}
                    </Text3>
                </Switch>
            </>
        </Stack>
    );
};

Default.storyName = 'Switch';
