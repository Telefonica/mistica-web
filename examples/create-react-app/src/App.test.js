import React from 'react';
import {getMovistarSkin, ThemeContextProvider} from '@telefonica/mistica';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', async () => {
    render(
        <ThemeContextProvider
            theme={{skin: getMovistarSkin(), i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
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
