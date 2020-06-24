import * as React from 'react';
import {RowList, Row} from '../list';
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

    const switchEl = screen.getByLabelText('Title');

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

    const checkboxEl = screen.getByLabelText('Title');

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
