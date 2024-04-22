import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Text} from '../text';
import {makeTheme} from './test-utils';
import ThemeContextProvider from '../theme-context-provider';
import {getVivoNewSkin} from '../skins/vivo-new';
import {getMovistarSkin} from '../skins/movistar';

test.each([
    {text: 'Ħ', expected: 'Vivo'},
    {text: 'hola Ħ', expected: 'hola Vivo'},
    {text: 'Ħ hola', expected: 'Vivo hola'},
    {text: 'Ħ hola Ħ', expected: 'Vivo hola Vivo'},
])('Text makes vivinho char readable for screen readers: $text', ({text, expected}) => {
    render(
        <ThemeContextProvider theme={makeTheme({skin: getVivoNewSkin()})}>
            <a href="/">
                <Text>{text}</Text>
            </a>
        </ThemeContextProvider>
    );

    // using byRole because dom-testing-library asText doesn't query by accessible name
    expect(screen.getByRole('link', {name: expected})).toBeInTheDocument();
});

test('vivinho char replacement works in Texts with multiple children', () => {
    const someVar = 'something';
    const vivinhoVar = 'Ħ';
    render(
        <ThemeContextProvider theme={makeTheme({skin: getVivoNewSkin()})}>
            <a href="/">
                <Text>
                    Ħ {someVar} {vivinhoVar}
                </Text>
            </a>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('link', {name: 'Vivo something Vivo'})).toBeInTheDocument();
});

test('vivinho char is only replaced in vivo-new skin', () => {
    render(
        <ThemeContextProvider theme={makeTheme({skin: getMovistarSkin()})}>
            <a href="/">
                <Text>Ħ</Text>
            </a>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('link', {name: 'Ħ'})).toBeInTheDocument();
});
