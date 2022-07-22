import * as React from 'react';
import {fruitEntries} from './helpers';
import {Select, Stack, Title1} from '..';

export default {
    title: 'Components/Select',
    component: Select,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('');

    return (
        <>
            <Stack space={16}>
                <Title1>Select</Title1>
                <Select
                    name="normal"
                    value={value}
                    onChangeValue={setValue}
                    helperText="Normal select"
                    options={fruitOptions}
                    label="Select a fruit"
                    optional
                />

                <Select
                    name="with-error"
                    error
                    value={value}
                    onChangeValue={setValue}
                    helperText="With Error"
                    label="Select a fruit"
                    options={fruitOptions}
                />

                <Select
                    name="uncontrolled"
                    onChangeValue={setValue}
                    helperText="Uncontrolled"
                    label="Select a fruit"
                    options={fruitOptions}
                />

                <Select
                    name="disabled"
                    disabled
                    value={value}
                    onChangeValue={setValue}
                    helperText="Disabled"
                    label="Select a fruit"
                    options={fruitOptions}
                />

                <Title1>Native variant</Title1>

                <Select
                    name="native"
                    native
                    value={value}
                    onChangeValue={setValue}
                    label="Select a fruit"
                    helperText="Native select"
                    options={fruitOptions}
                />

                <Select
                    name="native-with-error"
                    native
                    error
                    value={value}
                    onChangeValue={setValue}
                    label="Select a fruit"
                    helperText="Native with error"
                    options={fruitOptions}
                />

                <Select
                    name="native-uncontrolled"
                    native
                    label="Select a fruit"
                    onChangeValue={setValue}
                    helperText="Native select uncontrolled"
                    options={fruitOptions}
                />

                <Select
                    name="native-disabled"
                    native
                    disabled
                    value={value}
                    onChangeValue={setValue}
                    label="Select a fruit"
                    helperText="Native select disabled"
                    options={fruitOptions}
                />
            </Stack>
        </>
    );
};

Default.storyName = 'Select';
