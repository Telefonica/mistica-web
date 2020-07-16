import React from 'react';
import {ThemeContextProvider} from '@telefonica/mistica';
import {render, screen, within, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', async () => {
    const {getByText} = render(
        <ThemeContextProvider
            theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
        >
            <App />
        </ThemeContextProvider>
    );
    userEvent.type(screen.getByLabelText('Name'), 'Abel');
    userEvent.type(screen.getByLabelText('e-mail'), 'atoledano@tuenti.com');

    userEvent.click(screen.getByRole('button', {name: 'Send'}));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole('heading', {name: 'This is your data'})).toBeInTheDocument();
    expect(within(dialog).getByText(/Abel/)).toBeInTheDocument();
    expect(within(dialog).getByText(/atoledano@tuenti.com/)).toBeInTheDocument();

    const acceptButton = within(dialog).getByRole('button', {name: 'Aceptar'});
    userEvent.click(acceptButton);
});
