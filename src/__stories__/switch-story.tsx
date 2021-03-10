import * as React from 'react';
import {Switch, Stack, Inline, Text6, SectionTitle} from '..';

export default {
    title: 'Components/Forms/Switch',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={32}>
            <>
                <SectionTitle id="label">Uncontrolled</SectionTitle>
                <Switch
                    name="uncontrolled"
                    render={(switchElement) => (
                        <Inline alignItems="center" space={16}>
                            {switchElement}
                            <Text6 regular>Switch</Text6>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Controlled</SectionTitle>
                <Switch
                    name="controlled"
                    checked={checked}
                    onChange={onChange}
                    render={(switchElement) => (
                        <Inline alignItems="center" space={16}>
                            {switchElement}
                            <Text6 regular uppercase>
                                {checked ? 'on' : 'off'}
                            </Text6>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Without children</SectionTitle>
                <Switch name="no-children" />
            </>
            <>
                <SectionTitle id="label">Without switch</SectionTitle>
                <Switch
                    name="no-switch"
                    checked={checked}
                    onChange={onChange}
                    render={() => (
                        <Inline alignItems="center" space={16}>
                            <Text6 regular uppercase>
                                {checked ? 'on' : 'off'}
                            </Text6>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Disabled</SectionTitle>
                <Switch name="disabled" checked={checked} onChange={onChange} disabled>
                    <Text6 regular uppercase>
                        {checked ? 'on' : 'off'}
                    </Text6>
                </Switch>
            </>
        </Stack>
    );
};

Default.storyName = 'Switch';
