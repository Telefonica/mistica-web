import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../select';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('select happy case', async () => {
    const onChangeSpy = jest.fn();

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
                onChangeValue={onChangeSpy}
            />
        </ThemeContextProvider>
    );

    await userEvent.selectOptions(screen.getByLabelText('selectLabel'), 'value2');

    expect((screen.getByRole('option', {name: 'text1'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text2'}) as HTMLOptionElement).selected).toBe(true);
    expect((screen.getByRole('option', {name: 'text3'}) as HTMLOptionElement).selected).toBe(false);

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith('value2');
});

test('select with controlled value', async () => {
    const SelectWrapper = () => {
        const [value, setValue] = React.useState<string>('value2');

        return (
            <Select
                label="selectLabel"
                name="selectName"
                options={[
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2'},
                    {value: 'value3', text: 'text3'},
                ]}
                value={value}
                onChangeValue={setValue}
            />
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SelectWrapper />
        </ThemeContextProvider>
    );

    expect((screen.getByRole('option', {name: 'text1'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text2'}) as HTMLOptionElement).selected).toBe(true);
    expect((screen.getByRole('option', {name: 'text3'}) as HTMLOptionElement).selected).toBe(false);

    await userEvent.selectOptions(screen.getByLabelText('selectLabel'), 'value3');

    expect((screen.getByRole('option', {name: 'text1'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text2'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text3'}) as HTMLOptionElement).selected).toBe(true);
});

test('select with default value', async () => {
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
                defaultValue="value2"
            />
        </ThemeContextProvider>
    );

    expect((screen.getByRole('option', {name: 'text1'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text2'}) as HTMLOptionElement).selected).toBe(true);
    expect((screen.getByRole('option', {name: 'text3'}) as HTMLOptionElement).selected).toBe(false);

    await userEvent.selectOptions(screen.getByLabelText('selectLabel'), 'value3');

    expect((screen.getByRole('option', {name: 'text1'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text2'}) as HTMLOptionElement).selected).toBe(false);
    expect((screen.getByRole('option', {name: 'text3'}) as HTMLOptionElement).selected).toBe(true);
});
