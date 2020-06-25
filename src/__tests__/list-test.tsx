import * as React from 'react';
import {RowList, Row} from '../list';
import {RadioGroup} from '../radio-button';
import {screen, fireEvent, render} from '@testing-library/react';

test('Row which navigates', () => {
    render(
        <RowList>
            <Row title="Title" href="/some/url" />
        </RowList>
    );

    const anchor = screen.getByRole('link');

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', '/some/url');
});

test('Row as a button', () => {
    const spy = jest.fn();
    render(
        <RowList>
            <Row title="Title" onPress={spy} />
        </RowList>
    );

    const button = screen.getByRole('button', {name: 'Title'});
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
});

test('Row with switch', () => {
    render(
        <RowList>
            <Row title="Title" switch={{defaultValue: false}} />
        </RowList>
    );

    const switchEl = screen.getByRole('checkbox', {name: 'Title'});

    expect(switchEl).not.toBeChecked();

    fireEvent.click(switchEl);

    expect(switchEl).toBeChecked();
});

test('Row with checkbox', () => {
    render(
        <RowList>
            <Row title="Title" checkbox={{defaultValue: false}} />
        </RowList>
    );

    const checkboxEl = screen.getByRole('checkbox', {name: 'Title'});

    expect(checkboxEl).not.toBeChecked();

    fireEvent.click(checkboxEl);

    expect(checkboxEl).toBeChecked();
});

test('Row with custom right element', () => {
    render(
        <RowList>
            <Row title="Title" right={<div>custom</div>} />
        </RowList>
    );

    expect(screen.getByText('custom')).toBeInTheDocument();
});

test('Row list with radio buttons', () => {
    render(
        <RadioGroup>
            <RowList>
                <Row title="Banana" radioValue="banana" />
                <Row title="Apple" radioValue="apple" />
            </RowList>
        </RadioGroup>
    );

    const radioBanana = screen.getByRole('radio', {name: 'Banana'});
    const radioApple = screen.getByRole('radio', {name: 'Apple'});

    expect(radioBanana).not.toBeChecked();
    expect(radioApple).not.toBeChecked();

    fireEvent.click(radioBanana);

    expect(radioBanana).toBeChecked();
    expect(radioApple).not.toBeChecked();

    fireEvent.click(radioApple);

    expect(radioBanana).not.toBeChecked();
    expect(radioApple).toBeChecked();
});
