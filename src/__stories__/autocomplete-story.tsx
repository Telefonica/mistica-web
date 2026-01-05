import * as React from 'react';
import {countriesList} from './helpers';
import Autocomplete from '../autocomplete';
import {Box, ResponsiveLayout} from '../../src';

export default {
    title: 'Components/Input fields/Autocomplete',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

const getCountrySuggestions = (value: string) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

type AutocompleteStoryArgs = {
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
};

export const AutocompleteStory: StoryComponent<AutocompleteStoryArgs> = ({variantOutside}) => {
    const [value, setValue] = React.useState('');

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Autocomplete
                    label="Country"
                    name="country"
                    value={value}
                    onChangeValue={(newValue) => setValue(newValue)}
                    getSuggestions={getCountrySuggestions}
                />
            </Box>
        </ResponsiveLayout>
    );
};
