import * as React from 'react';
import {FormSwitch, Stack} from '..';

export default {
    title: 'Components|Forms/FormSwitch',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={16}>
            <FormSwitch name="first" defaultChecked={false} />
            <FormSwitch
                name="second"
                defaultChecked={false}
                render={(switchElement) => <span>WiFi {switchElement}</span>}
            />
            <FormSwitch
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

Default.story = {name: 'FormSwitch'};
