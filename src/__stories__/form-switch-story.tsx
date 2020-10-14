import * as React from 'react';
import {Switch, Stack} from '..';

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
                render={(switchElement) => <span>WiFi {switchElement}</span>}
            />
            <Switch
                name="third"
                checked={checked}
                onChange={onChange}
                render={(switchElement) => (
                    <span>
                        {checked ? 'on' : 'off'} {switchElement}
                    </span>
                )}
            />
        </Stack>
    );
};

Default.story = {name: 'Switch'};
