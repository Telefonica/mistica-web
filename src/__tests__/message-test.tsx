import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Message from '../message';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import IconCopyRegular from '../generated/mistica-icons/icon-copy-regular';

const renderMessage = (message: React.ReactNode) =>
    render(<ThemeContextProvider theme={makeTheme()}>{message}</ThemeContextProvider>);

test('static messages expose their direction and content without adding a focus target', () => {
    renderMessage(
        <>
            <Message text="Hello" />
            <Message type="outgoing" text="Hi" />
        </>
    );
    expect(screen.getByText('Mensaje:')).toBeInTheDocument();
    expect(screen.getByText('Tú:')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('interactive messages group sender, slot, footer and timestamp in reading order', () => {
    renderMessage(
        <Message
            senderName="Ana"
            senderNameLabel="Ana, support"
            timestamp="13:00"
            timestampLabel="One o'clock"
            footer={<span>Delivered</span>}
            onPress={() => {}}
        >
            <span>Details</span>
        </Message>
    );
    expect(
        screen.getByRole('button', {name: "Mensaje: Ana, support Details Delivered One o'clock"})
    ).toBeInTheDocument();
});

test('asset, bubble and actions have independent keyboard targets', async () => {
    const asset = jest.fn();
    const bubble = jest.fn();
    const action = jest.fn();
    renderMessage(
        <Message
            asset={<span>Avatar</span>}
            onAssetPress={asset}
            assetLabel="Open Ana's profile"
            onPress={bubble}
            text="Hello"
            footerActions={[{Icon: IconCopyRegular, 'aria-label': 'Copy', onPress: action}]}
        />
    );
    await userEvent.tab();
    expect(screen.getByRole('button', {name: "Open Ana's profile"})).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(asset).toHaveBeenCalledTimes(1);
    expect(bubble).not.toHaveBeenCalled();
    await userEvent.tab();
    expect(screen.getByRole('button', {name: 'Mensaje: Hello'})).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(bubble).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    expect(screen.getByRole('button', {name: 'Copy'})).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(action).toHaveBeenCalledTimes(1);
    expect(bubble).toHaveBeenCalledTimes(1);
});

test('decorative assets are excluded from the accessible name', () => {
    renderMessage(
        <Message asset={<span role="img" aria-label="Avatar" />} text="Hello" onPress={() => {}} />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Mensaje: Hello'})).toBeInTheDocument();
});

test('errors announce a custom message, hide the timestamp and can be retried', async () => {
    const retry = jest.fn();
    renderMessage(
        <Message
            type="outgoing"
            text="Hello"
            error
            errorMessage="Try again"
            timestamp="13:00"
            onPress={retry}
        />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Try again');
    expect(screen.queryByText('13:00')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'Tú: Hello Try again'}));
    expect(retry).toHaveBeenCalledTimes(1);
});

test('errors use a localized default and do not assume a retry action', () => {
    renderMessage(<Message type="outgoing" text="Hello" error />);
    expect(screen.getByRole('alert')).toHaveTextContent('No enviado. Toca para reintentar.');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('explicit accessible labels override the generated name', () => {
    renderMessage(<Message text="Details" href="/details" aria-label="Open details" />);
    expect(screen.getByRole('link', {name: 'Open details'})).toHaveAttribute('href', '/details');
});
