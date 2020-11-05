import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {Select} from '..';

export default {
    title: 'Components/Forms/Select',
    component: Select,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('');

    return (
        <StorySection title="Select">
            <Select
                name="select1"
                value={value}
                onChangeValue={setValue}
                helperText="Helper Text"
                options={fruitOptions}
                optional
            />

            <Select
                name="select2"
                error
                value={value}
                onChangeValue={setValue}
                helperText="With Error"
                label="Select a fruit"
                options={fruitOptions}
            />

            <Select
                name="select3"
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

Default.storyName = 'Select';
