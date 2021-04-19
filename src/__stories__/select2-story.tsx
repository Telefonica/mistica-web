import * as React from 'react';
import {fruitEntries} from './helpers';
import {Select2, Stack, Text3, Text2, Box} from '..';
import SectionTitle from '../section-title';

export default {
    title: 'Components/Forms/Select2',
    component: Select2,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('');

    return (
        <>
            <Stack space={16}>
                <SectionTitle>Select</SectionTitle>
                <Select2
                    autoFocus
                    name="normal"
                    value={value}
                    onChangeValue={setValue}
                    helperText="Normal select"
                    options={fruitOptions}
                    label="Select a fruit"
                    optional
                />

                <Select2
                    name="with-error"
                    error
                    value={value}
                    onChangeValue={setValue}
                    helperText="With Error"
                    label="Select a fruit"
                    options={fruitOptions}
                />

                <Select2
                    name="uncontrolled"
                    onChangeValue={setValue}
                    helperText="Uncontrolled"
                    label="Select a fruit"
                    options={fruitOptions}
                />

                <Select2
                    name="disabled"
                    disabled
                    value={value}
                    onChangeValue={setValue}
                    helperText="Disabled"
                    label="Select a fruit"
                    options={fruitOptions}
                />

                <Select2
                    autoFocus
                    name="with-render-option"
                    value={value}
                    onChangeValue={setValue}
                    helperText="Custom render option"
                    options={fruitOptions}
                    label="Select a fruit"
                    renderOption={(text) => (
                        <Box paddingY={8}>
                            <Text3 medium as="p">
                                {text}
                            </Text3>
                            <Text2 regular as="p">
                                {text}
                            </Text2>
                        </Box>
                    )}
                />

                <SectionTitle>Native variant</SectionTitle>

                <Select2
                    name="native"
                    native
                    value={value}
                    onChangeValue={setValue}
                    label="Select a fruit"
                    helperText="Native select"
                    options={fruitOptions}
                />

                <Select2
                    name="native-with-error"
                    native
                    error
                    value={value}
                    onChangeValue={setValue}
                    label="Select a fruit"
                    helperText="Native with error"
                    options={fruitOptions}
                />

                <Select2
                    name="native-uncontrolled"
                    native
                    label="Select a fruit"
                    onChangeValue={setValue}
                    helperText="Native select uncontrolled"
                    options={fruitOptions}
                />

                <Select2
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

Default.storyName = 'Select2';
