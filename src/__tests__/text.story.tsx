import * as React from 'react';
import {Text} from '../text';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import {getVivoSkin} from '../skins/vivo';
import {getMovistarSkin} from '../skins/movistar';

export const Vivinho = ({
    text = 'Ħ',
    vivo = true,
    multiple = false,
}: {
    text?: string;
    vivo?: boolean;
    multiple?: boolean;
}): JSX.Element => {
    const someVar = 'something';
    const vivinhoVar = 'Ħ';
    return (
        <ThemeContextProvider theme={makeTheme({skin: vivo ? getVivoSkin() : getMovistarSkin()})}>
            <a href="/">
                {multiple ? (
                    <Text>
                        Ħ {someVar} {vivinhoVar}
                    </Text>
                ) : (
                    <Text>{text}</Text>
                )}
            </a>
        </ThemeContextProvider>
    );
};
