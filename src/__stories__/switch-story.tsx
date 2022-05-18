import * as React from 'react';
import {Switch, Stack, Inline, Text3, Title1} from '..';

export default {
    title: 'Components/Forms/Switch',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    const [uncontrolledChecked, onUncontrolledChange] = React.useState(false);
    return (
        <Stack space={32}>
            <>
                <Title1 as="h1" id="uncontrolled-label">
                    Uncontrolled
                </Title1>
                <Switch
                    name="uncontrolled"
                    onChange={onUncontrolledChange}
                    aria-labelledby="uncontrolled-label"
                    render={({controlElement}) => (
                        <Inline alignItems="center" space={16}>
                            {controlElement}
                            <Text3 regular transform="uppercase">
                                {uncontrolledChecked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <Title1 as="h1" id="controlled-label">
                    Controlled
                </Title1>
                <Switch
                    name="controlled"
                    checked={checked}
                    onChange={onChange}
                    aria-labelledby="controlled-label"
                    render={({controlElement}) => (
                        <Inline alignItems="center" space={16}>
                            {controlElement}
                            <Text3 regular transform="uppercase">
                                {checked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <Title1 as="h1" id="without-children-label">
                    Without children
                </Title1>
                <Switch name="no-children" aria-labelledby="without-children-label" />
            </>
            <>
                <Title1 as="h1" id="no-switch-label">
                    Without switch
                </Title1>
                <Switch
                    name="no-switch"
                    checked={checked}
                    onChange={onChange}
                    aria-labelledby="no-switch-label"
                    render={() => (
                        <Inline alignItems="center" space={16}>
                            <Text3 regular transform="uppercase">
                                {checked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <Title1 as="h1">Disabled</Title1>
                <Switch name="disabled" checked={checked} onChange={onChange} disabled>
                    <Text3 regular transform="uppercase">
                        {checked ? 'on' : 'off'}
                    </Text3>
                </Switch>
            </>
        </Stack>
    );
};

Default.storyName = 'Switch';
