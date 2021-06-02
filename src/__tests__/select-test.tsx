import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../select';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('select happy case', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Select
                label="selectLabel"
                name="selectName"
                options={[
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2'},
                    {value: 'value3', text: 'text3'},
                ]}
            ></Select>
        </ThemeContextProvider>
    );

    userEvent.selectOptions(screen.getByLabelText('selectLabel'), 'value2');

    expect((screen.getByRole('option', {name: 'text1'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text2'}) as HTMLOptionElement).selected).toBe(true);
    expect((screen.getByRole('option', {name: 'text3'}) as HTMLOptionElement).selected).toBe(false);
});
