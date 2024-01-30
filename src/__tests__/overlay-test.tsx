import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import {Overlay} from '..';

test('Overlay click should not be propagated', async () => {
    const handleParentClick = jest.fn();
    const handleOverlayPress = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onClick={handleParentClick}>
                <Overlay onPress={handleOverlayPress} dataAttributes={{testid: 'overlay'}} />
            </div>
        </ThemeContextProvider>
    );

    const overlay = screen.getByTestId('overlay');

    expect(overlay).toBeInTheDocument();
    await userEvent.click(overlay);
    expect(handleOverlayPress).toHaveBeenCalled();
    expect(handleParentClick).not.toHaveBeenCalled();
});
