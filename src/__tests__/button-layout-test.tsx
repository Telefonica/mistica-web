import * as React from 'react';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonLayout from '../button-layout';
import {render, screen} from '@testing-library/react';
import {ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

test('One button is rendered', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonLayout withMargins>
                <ButtonPrimary onPress={() => {}}>Button1</ButtonPrimary>
            </ButtonLayout>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Two buttons are rendered', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonLayout withMargins>
                <ButtonPrimary onPress={() => {}}>Button1</ButtonPrimary>
                <ButtonSecondary onPress={() => {}}>Button2</ButtonSecondary>
            </ButtonLayout>
        </ThemeContextProvider>
    );

    expect(screen.queryAllByRole('button')).toHaveLength(2);
});
