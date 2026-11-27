import * as React from 'react';
import {render, screen} from '@testing-library/react';
import DateField from '../date-field';
import DateTimeField from '../date-time-field';
import MonthField from '../month-field';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test.each([
    {componentName: 'DateField', Component: DateField, inputType: 'date'},
    {componentName: 'DateTimeField', Component: DateTimeField, inputType: 'datetime-local'},
    {componentName: 'MonthField', Component: MonthField, inputType: 'month'},
])('$componentName native picker follows theme changes', ({Component, inputType}) => {
    const theme = makeTheme();
    const {rerender} = render(
        <ThemeContextProvider theme={{...theme, colorScheme: 'light'}}>
            <Component name="date" label="Date" />
        </ThemeContextProvider>
    );

    const field = screen.getByLabelText('Date');
    expect(field).toHaveAttribute('type', inputType);
    expect(field).toHaveStyle({colorScheme: 'light'});

    rerender(
        <ThemeContextProvider theme={{...theme, colorScheme: 'dark'}}>
            <Component name="date" label="Date" />
        </ThemeContextProvider>
    );

    expect(field).toHaveStyle({colorScheme: 'dark'});
});
