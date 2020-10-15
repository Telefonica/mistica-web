import * as React from 'react';
import {Switch, Stack, createUseStyles, Inline, Text6} from '..';

export default {
    title: 'Components|Forms/Switch',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={16}>
            <Switch name="first" defaultChecked={false} />
            <Switch
                name="second"
                defaultChecked={false}
                render={(switchElement) => (
                    <Inline space={16}>
                        <Text6 regular>WiFi</Text6>
                        {switchElement}
                    </Inline>
                )}
            />
            <Switch
                name="third"
                checked={checked}
                onChange={onChange}
                render={(switchElement) => (
                    <Inline space={16}>
                        <Text6 regular>{checked ? 'on' : 'off'}</Text6>
                        {switchElement}
                    </Inline>
                )}
            />
        </Stack>
    );
};

Default.story = {name: 'Switch'};
