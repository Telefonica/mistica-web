import * as React from 'react';
import {countriesList} from './helpers';
import Autocomplete from '../autocomplete';
import {Box, ResponsiveLayout} from '../../src';

import type {Meta} from '@storybook/react-webpack5';

export default {
    title: 'Components/Input fields/Autocomplete',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
        verticalPosition: {
            options: ['top', 'bottom'],
            control: {type: 'select'},
        },
    },
    args: {
        suggestionEmptyCase: '',
        verticalPosition: 'top',
    },
} satisfies Meta<ControlledArgs>;

const getCountrySuggestions = (value: string) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

type ControlledArgs = {
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
    suggestionEmptyCase?: string;
    verticalPosition?: 'top' | 'bottom';
};

export const Controlled: StoryComponent<ControlledArgs> = ({
    variantOutside,
    suggestionEmptyCase,
    verticalPosition,
}) => {
    const [value, setValue] = React.useState('');

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    alignItems: verticalPosition === 'top' ? 'flex-start' : 'end',
                }}
            >
                <div style={{flexGrow: 1}}>
                    <Box padding={16}>
                        <Autocomplete
                            label="Label"
                            name="label"
                            value={value}
                            onChangeValue={(newValue) => setValue(newValue)}
                            getSuggestions={getCountrySuggestions}
                            suggestionEmptyCase={suggestionEmptyCase}
                        />
                    </Box>
                </div>
            </div>
        </ResponsiveLayout>
    );
};
