// @flow
import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {Select} from '..';

export default {
    title: 'Components|Select',
    component: Select,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

export const Examples = (): React.Node => {
    const [value, setValue] = React.useState('');

    return (
        <StorySection title="Select">
            <Select
                value={value}
                onChangeValue={setValue}
                helperText="Helper Text"
                label="Select a fruit"
                options={fruitOptions}
            />

            <Select
                error
                value={value}
                onChangeValue={setValue}
                helperText="With Error"
                label="Select a fruit"
                options={fruitOptions}
            />

            <Select
                disabled
                value={value}
                onChangeValue={setValue}
                helperText="Disabled"
                label="Select a fruit"
                options={fruitOptions}
            />
        </StorySection>
    );
};
