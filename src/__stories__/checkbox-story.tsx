import * as React from 'react';
import {Checkbox, Stack, Text6, Inline} from '..';

export default {
    title: 'Components|Forms/Checkbox',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={16}>
            <Checkbox name="first" defaultChecked={false} />
            <Checkbox
                name="second"
                defaultChecked={false}
                render={(checkboxElement) => (
                    <Inline alignItems="center" space={16}>
                        {checkboxElement}
                        <Text6 regular>You accept to sell your soul</Text6>
                    </Inline>
                )}
            />
            <Checkbox
                name="third"
                checked={checked}
                onChange={onChange}
                render={(checkboxElement) => (
                    <Inline alignItems="center" space={16}>
                        {checkboxElement}
                        <Text6 regular>You accept to sell your soul: {checked ? 'sure!' : 'nahh'}</Text6>
                    </Inline>
                )}
            />
        </Stack>
    );
};

Default.story = {name: 'Checkbox'};
