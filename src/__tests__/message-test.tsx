import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Message from '../message';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import IconCopyRegular from '../generated/mistica-icons/icon-copy-regular';

const renderMessage = (message: React.ReactNode) =>
    render(<ThemeContextProvider theme={makeTheme()}>{message}</ThemeContextProvider>);

test('static messages expose their direction and are skipped by keyboard navigation', async () => {
    renderMessage(
        <>
            <Message type="incoming" contentText="Hello" />
            <Message type="outgoing" contentText="Hi" />
            <button>Next control</button>
        </>
    );
    expect(screen.getByText('Mensaje:')).toBeInTheDocument();
    expect(screen.getByText('Tú:')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();

    await userEvent.tab();
    expect(screen.getByRole('button', {name: 'Next control'})).toHaveFocus();
});

test.each(['span', 'p', 'h2'] as const)(
    'static messages expose label overrides without duplicate text: %s',
    (senderNameAs) => {
        renderMessage(
            <Message
                type="incoming"
                senderName="Ana"
                senderNameAs={senderNameAs}
                senderNameLabel="Ana, support"
                timestamp="13:00"
                timestampLabel="One o'clock"
                contentText="Hello"
            />
        );
        expect(screen.getByText('Ana')).toHaveAttribute('aria-hidden', 'true');
        expect(screen.getByText('13:00')).toHaveAttribute('aria-hidden', 'true');
        expect(screen.getByText('Ana, support')).not.toHaveAttribute('aria-hidden', 'true');
        expect(screen.getByText("One o'clock")).not.toHaveAttribute('aria-hidden', 'true');
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    }
);

test('sender label overrides preserve heading semantics', () => {
    renderMessage(
        <Message type="incoming" senderName="Ana" senderNameAs="h2" senderNameLabel="Ana, support" />
    );
    expect(screen.getByRole('heading', {name: 'Ana, support', level: 2})).toBeInTheDocument();
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

test('outgoing errors announce a custom message, hide the timestamp and can be retried', async () => {
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

test('incoming errors retain the timestamp and include it in the accessible name', () => {
    renderMessage(
        <Message
            type="incoming"
            contentText="Hello"
            error
            errorMessage="Try again"
            timestamp="13:00"
            onPress={() => {}}
        />
    );
    expect(screen.getByText('13:00')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Mensaje: Hello 13:00 Try again'})).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Try again');
});

test.each([
    {
        name: 'static',
        message: <Message type="outgoing" contentText="Hello" error errorMessage="Contact support" />,
    },
    {
        name: 'interactive',
        message: (
            <Message
                type="outgoing"
                contentText="Hello"
                error
                errorMessage="Contact support"
                onPress={() => {}}
            />
        ),
    },
])('errors display the product message for $name messages', ({message}) => {
    renderMessage(message);
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
        messageActions,
    }: {
        position?: 'side' | 'footer';
        messageActions?: React.ComponentProps<typeof Message>['actions'];
    }) => (
        <ThemeContextProvider theme={makeTheme()}>
            <Message
                type="incoming"
                contentText="Hello"
                actions={messageActions}
                actionsPosition={position}
            />
        </ThemeContextProvider>
    );

    const {rerender} = render(<Example messageActions={actions} />);
    expect(screen.getAllByRole('button', {name: 'Copy'})).toHaveLength(1);

    rerender(<Example position="side" messageActions={actions} />);
    expect(screen.getAllByRole('button', {name: 'Copy'})).toHaveLength(1);

    rerender(<Example position="side" />);
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
                sideSlot={<span>Side</span>}
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

test.each([
    {name: 'error', errorProps: {error: true, errorMessage: 'Try again'}, bubbleName: 'Tú: Hello Try again'},
    {name: 'default', errorProps: {error: false}, bubbleName: 'Tú: Hello'},
] as const)('Footer controls remain independent of the bubble ($name)', async ({errorProps, bubbleName}) => {
    const retry = jest.fn();
    const footerPress = jest.fn();

    renderMessage(
        <Message
            type="outgoing"
            contentText="Hello"
            onPress={retry}
            {...errorProps}
            footerSlot={<button onClick={footerPress}>Footer action</button>}
        />
    );

    const footer = screen.getByRole('button', {name: 'Footer action'});
    const bubble = screen.getByRole('button', {name: bubbleName});

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
