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
                <SectionTitle as="h1" id="uncontrolled-label">
                    Uncontrolled
                </SectionTitle>
                <Switch
                    name="uncontrolled"
                    onChange={onUncontrolledChange}
                    aria-labelledby="uncontrolled-label"
                    render={({controlElement, labelId}) => (
                        <Inline alignItems="center" space={16}>
                            {controlElement}
                            <Text3 regular transform="uppercase" id={labelId}>
                                {uncontrolledChecked ? 'on' : 'off'}
                            </Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle as="h1" id="controlled-label">
                    Controlled
                </SectionTitle>
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
                <SectionTitle as="h1" id="without-children-label">
                    Without children
                </SectionTitle>
                <Switch name="no-children" aria-labelledby="without-children-label" />
            </>
            <>
                <SectionTitle as="h1" id="no-switch-label">
                    Without switch
                </SectionTitle>
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
                <SectionTitle as="h1">Disabled</SectionTitle>
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
