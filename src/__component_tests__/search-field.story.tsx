import * as React from 'react';
import SearchField from '../search-field';

const getSuggestions = (value: string) =>
    ['Apple', 'Banana', 'Orange'].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
export const Suggestions = ({
    shouldShowSuggestions = 'focus',
    withSuggestionsEmptyCase,
}: {
    shouldShowSuggestions?: 'focus' | number;
    withSuggestionsEmptyCase?: boolean;
}): JSX.Element => (
    <SearchField
        getSuggestions={getSuggestions}
        shouldShowSuggestions={shouldShowSuggestions}
        withSuggestionsEmptyCase={withSuggestionsEmptyCase}
        label="Search"
        name="search"
    />
);
