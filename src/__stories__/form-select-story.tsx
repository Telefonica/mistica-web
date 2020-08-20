import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {FormSelect} from '..';

export default {
    title: 'Components|Forms/FormSelect',
    component: FormSelect,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('');

    return (
        <StorySection title="Select">
            <FormSelect
                name="select1"
                value={value}
                onChangeValue={setValue}
                helperText="Helper Text"
                options={fruitOptions}
                optional
            />

            <FormSelect
                name="select2"
                error
                value={value}
                onChangeValue={setValue}
                helperText="With Error"
                label="Select a fruit"
                options={fruitOptions}
            />

            <FormSelect
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

Default.story = {name: 'FormSelect'};
