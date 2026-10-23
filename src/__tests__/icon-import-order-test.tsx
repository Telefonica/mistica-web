import * as React from 'react';
import {render, screen} from '@testing-library/react';

/**
 * An icon imports @telefonica/mistica/icon-runtime, and that entry point exports leaf modules only,
 * so an icon never waits for a half initialized module. The entry point of this package would close
 * a cycle instead, because it exports the components that render an icon, and a module level read of
 * an icon inside that cycle captures undefined.
 *
 * This file loads the icon first, because that is the order that fails, so it must not import the
 * entry point at the top.
 */
test('a component renders when its icon module loads before the entry point', async () => {
    await import('@telefonica/mistica-icons/icon-credit-card-visa-regular');

    const {CreditCardNumberField} = await import('..');
    const {default: ThemeContextProvider} = await import('../theme-context-provider');
    const {makeTheme} = await import('./test-utils');

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <CreditCardNumberField name="ccNum" label="Card number" />
        </ThemeContextProvider>
    );

    await screen.findByLabelText('Card number');
});
