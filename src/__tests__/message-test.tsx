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
            <Message type="incoming" contentText="Hello" />
            <Message type="outgoing" contentText="Hi" />
        </>
    );
    expect(screen.getByText('Mensaje:')).toBeInTheDocument();
    expect(screen.getByText('Tú:')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('interactive messages group sender, content and timestamp in reading order', () => {
    renderMessage(
        <Message
            type="incoming"
            senderName="Ana"
            senderNameLabel="Ana, support"
            timestamp="13:00"
            timestampLabel="One o'clock"
            footerSlot={<span>Delivered</span>}
            onPress={() => {}}
            contentSlot={<span>Details</span>}
        />
    );
    expect(
        screen.getByRole('button', {name: "Mensaje: Ana, support Details One o'clock"})
    ).toBeInTheDocument();
});

test.each(['side', 'footer'] as const)(
    'asset, bubble and %s actions have independent keyboard targets',
    async (actionsPosition) => {
        const asset = jest.fn();
        const bubble = jest.fn();
        const action = jest.fn();
        renderMessage(
            <Message
                type="incoming"
                asset={<span>Avatar</span>}
                onAssetPress={asset}
                assetLabel="Open Ana's profile"
                onPress={bubble}
                contentText="Hello"
                actionsPosition={actionsPosition}
                actions={[{Icon: IconCopyRegular, 'aria-label': 'Copy', onPress: action}]}
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
    }
);

test('decorative assets are excluded from the accessible name', () => {
    renderMessage(
        <Message
            type="incoming"
            asset={<span role="img" aria-label="Avatar" />}
            contentText="Hello"
            onPress={() => {}}
        />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Mensaje: Hello'})).toBeInTheDocument();
});

test('errors announce a custom message, hide the timestamp and can be retried', async () => {
    const retry = jest.fn();
    renderMessage(
        <Message
            type="outgoing"
            contentText="Hello"
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

test.each([false, true])('errors display the product message regardless of retry action: %s', (retry) => {
    renderMessage(
        retry ? (
            <Message
                type="outgoing"
                contentText="Hello"
                error
                errorMessage="Contact support"
                onPress={() => {}}
            />
        ) : (
            <Message type="outgoing" contentText="Hello" error errorMessage="Contact support" />
        )
    );
    expect(screen.getByRole('alert')).toHaveTextContent(/^Contact support$/);
});

test('explicit accessible labels override the generated name', () => {
    renderMessage(
        <Message type="incoming" contentText="Details" href="/details" aria-label="Open details" />
    );
    expect(screen.getByRole('link', {name: 'Open details'})).toHaveAttribute('href', '/details');
});

test('changing action position or removing actions never duplicates them', () => {
    const actions = [{Icon: IconCopyRegular, 'aria-label': 'Copy', onPress: () => {}}] as const;
    const Example = ({
        position,
        showActions = true,
    }: {
        position?: 'side' | 'footer';
        showActions?: boolean;
    }) => (
        <ThemeContextProvider theme={makeTheme()}>
            <Message
                type="incoming"
                contentText="Hello"
                actions={showActions ? actions : undefined}
                actionsPosition={position}
            />
        </ThemeContextProvider>
    );
    const {rerender} = render(<Example />);
    expect(screen.getAllByRole('button', {name: 'Copy'})).toHaveLength(1);
    rerender(<Example position="side" />);
    expect(screen.getAllByRole('button', {name: 'Copy'})).toHaveLength(1);
    rerender(<Example position="side" showActions={false} />);
    expect(screen.queryByRole('button', {name: 'Copy'})).not.toBeInTheDocument();
});

test.each(['side', 'footer'] as const)(
    'error messages retain content and slots with %s actions',
    async (actionsPosition) => {
        const action = jest.fn();
        const retry = jest.fn();
        renderMessage(
            <Message
                type="outgoing"
                contentText="Hello"
                contentSlot={<span>Details</span>}
                footerSlot={<span>Footer</span>}
                side={<span>Side</span>}
                error
                errorMessage="Try again"
                onPress={retry}
                actionsPosition={actionsPosition}
                actions={[{Icon: IconCopyRegular, 'aria-label': 'Copy', onPress: action}]}
            />
        );
        expect(screen.getByRole('button', {name: 'Tú: Hello Details Try again'})).toBeInTheDocument();
        expect(screen.getByText('Side')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveTextContent('Try again');
        await userEvent.click(screen.getByRole('button', {name: 'Copy'}));
        expect(action).toHaveBeenCalledTimes(1);
        expect(retry).not.toHaveBeenCalled();
    }
);

test('ignores extra actions passed by JavaScript consumers', () => {
    const actions = ['Copy', 'Share', 'Extra'].map((label) => ({
        Icon: IconCopyRegular,
        'aria-label': label,
        onPress: () => {},
    }));
    renderMessage(
        <Message
            type="incoming"
            contentText="Hello"
            actions={actions as unknown as React.ComponentProps<typeof Message>['actions']}
        />
    );
    expect(screen.getByRole('button', {name: 'Copy'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Share'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Extra'})).not.toBeInTheDocument();
});

test.each([true, false])('Footer controls remain independent of the bubble (error: %s)', async (error) => {
    const retry = jest.fn();
    const footerPress = jest.fn();
    renderMessage(
        <Message
            type="outgoing"
            contentText="Hello"
            onPress={retry}
            {...(error ? {error: true as const, errorMessage: 'Try again'} : {error: false as const})}
            footerSlot={<button onClick={footerPress}>Footer action</button>}
        />
    );
    const footer = screen.getByRole('button', {name: 'Footer action'});
    const bubble = screen.getByRole('button', {name: error ? 'Tú: Hello Try again' : 'Tú: Hello'});
    expect(bubble).not.toContainElement(footer);
    await userEvent.click(footer);
    expect(footerPress).toHaveBeenCalledTimes(1);
    expect(retry).not.toHaveBeenCalled();
    footer.focus();
    await userEvent.keyboard('{Enter}');
    expect(footerPress).toHaveBeenCalledTimes(2);
    expect(retry).not.toHaveBeenCalled();
    await userEvent.click(bubble);
    expect(retry).toHaveBeenCalledTimes(1);
});
