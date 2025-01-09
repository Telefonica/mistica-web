import * as React from 'react';
import {makeTheme} from './test-utils';
import {render, screen, waitFor} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Drawer from '../drawer';
import userEvent from '@testing-library/user-event';

const DrawerTest = ({
    onDismiss,
    onButtonPrimaryPress,
    onButtonSecondaryPress,
    onButtonLinkPress,
}: {
    onDismiss?: () => void;
    onButtonPrimaryPress?: () => void;
    onButtonSecondaryPress?: () => void;
    onButtonLinkPress?: () => void;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <button onClick={() => setIsOpen(true)}>open</button>
            {isOpen && (
                <Drawer
                    dismissLabel="CustomDismissLabel"
                    onDismiss={onDismiss}
                    onClose={() => setIsOpen(false)}
                    button={{text: 'Primary', onPress: onButtonPrimaryPress}}
                    secondaryButton={{text: 'Secondary', onPress: onButtonSecondaryPress}}
                    buttonLink={{text: 'Link', onPress: onButtonLinkPress}}
                />
            )}
        </ThemeContextProvider>
    );
};

test.each(['esc', 'overlay', 'x'])('Drawer dismiss: %s', async (dismissMethod: string) => {
    const onDismissSpy = jest.fn();
    render(<DrawerTest onDismiss={onDismissSpy} />);

    const openButton = screen.getByRole('button', {name: 'open'});
    await userEvent.click(openButton);

    const drawer = await screen.findByRole('dialog');

    switch (dismissMethod) {
        case 'esc':
            await userEvent.keyboard('{Escape}');
            break;
        case 'overlay':
            await userEvent.click(screen.getByTestId('drawerOverlay'));
            break;
        case 'x':
            await userEvent.click(screen.getByRole('button', {name: 'CustomDismissLabel'}));
            break;
        default:
            throw new Error('unexpected dismiss method');
    }

    await waitFor(() => {
        expect(onDismissSpy).toHaveBeenCalledTimes(1);
        expect(drawer).not.toBeInTheDocument();
    });
});

test.each(['primary', 'secondary', 'link'])('Drawer close: %s', async (closeMethod: string) => {
    const onButtonPrimaryPress = jest.fn();
    const onButtonSecondaryPress = jest.fn();
    const onButtonLinkPress = jest.fn();

    render(
        <DrawerTest
            onButtonPrimaryPress={onButtonPrimaryPress}
            onButtonSecondaryPress={onButtonSecondaryPress}
            onButtonLinkPress={onButtonLinkPress}
        />
    );

    const openButton = screen.getByRole('button', {name: 'open'});
    await userEvent.click(openButton);

    const drawer = await screen.findByRole('dialog');

    switch (closeMethod) {
        case 'primary':
            await userEvent.click(screen.getByRole('button', {name: 'Primary'}));
            break;
        case 'secondary':
            await userEvent.click(screen.getByRole('button', {name: 'Secondary'}));
            break;
        case 'link':
            await userEvent.click(screen.getByRole('button', {name: 'Link'}));
            break;
        default:
            throw new Error('unexpected dismiss method');
    }

    await waitFor(() => {
        expect(drawer).not.toBeInTheDocument();
    });

    switch (closeMethod) {
        case 'primary':
            expect(onButtonPrimaryPress).toHaveBeenCalledTimes(1);
            break;
        case 'secondary':
            expect(onButtonSecondaryPress).toHaveBeenCalledTimes(1);
            break;
        case 'link':
            expect(onButtonLinkPress).toHaveBeenCalledTimes(1);
            break;
        default:
            throw new Error('unexpected dismiss method');
    }
});
