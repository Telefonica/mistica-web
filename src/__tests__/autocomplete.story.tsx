import * as React from 'react';
import Autocomplete from '../autocomplete';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';

const DEFAULT_SUGGESTIONS = ['Alpha', 'Bravo', 'Charlie'];
export const Suggestions = ({
    empty = false,
    suggestionEmptyCase,
    themeEmptyCase,
}: {
    empty?: boolean;
    suggestionEmptyCase?: string;
    themeEmptyCase?: string;
}): JSX.Element => {
    const [value, setValue] = React.useState('');
    return (
        <ThemeContextProvider theme={makeTheme({texts: {autocompleteEmptyCase: themeEmptyCase}})}>
            <Autocomplete
                label="City"
                name="city"
                value={value}
                onChangeValue={setValue}
                getSuggestions={(value) =>
                    empty || value.toLowerCase().startsWith('no') || value.toLowerCase().startsWith('zzz')
                        ? []
                        : DEFAULT_SUGGESTIONS
                }
                suggestionEmptyCase={suggestionEmptyCase}
            />
        </ThemeContextProvider>
    );
};
