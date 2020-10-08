import * as React from 'react';
import {FormCheckbox, Stack} from '..';

export default {
    title: 'Components|Forms/FormCheckbox',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={16}>
            <FormCheckbox name="first" defaultChecked={false} />
            <FormCheckbox
                name="second"
                defaultChecked={false}
                render={(switchElement) => <span>You accept to sell your soul {switchElement}</span>}
            />
            <FormCheckbox
                name="third"
                checked={checked}
                onChange={onChange}
                render={(switchElement) => (
                    <span>
                        You accept to sell your soul: {checked ? 'sure!' : 'nahh'} {switchElement}
                    </span>
                )}
            />
        </Stack>
    );
};

Default.story = {name: 'FormCheckbox'};
