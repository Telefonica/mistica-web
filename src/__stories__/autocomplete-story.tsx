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
        verticalPosition: {
            options: ['top', 'bottom'],
            control: {type: 'select'},
        },
    },
    args: {
        suggestionEmptyCase: '',
        verticalPosition: 'top',
        small: false,
    },
};

const getCountrySuggestions = (value: string) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

type ControlledArgs = {
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
    suggestionEmptyCase?: string;
    verticalPosition?: 'top' | 'bottom';
    small: boolean;
};

export const Controlled: StoryComponent<ControlledArgs> = ({
    variantOutside,
    suggestionEmptyCase,
    verticalPosition,
    small,
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
                            small={small}
                        />
                    </Box>
                </div>
            </div>
        </ResponsiveLayout>
    );
};
