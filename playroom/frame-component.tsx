import '../css/roboto.css';
import '../.storybook/css/vivo-font.css';
import '../.storybook/css/telefonica-font.css';
import '../.storybook/css/onair-font.css';
import '../css/reset.css';
import * as React from 'react';
import {
    ThemeContextProvider,
    SheetRoot,
    useModalState,
    OverscrollColorProvider,
    skinVars,
    VIVO_NEW_SKIN,
    TELEFONICA_SKIN,
    O2_SKIN,
    O2_NEW_SKIN,
    TU_SKIN,
    MOVISTAR_SKIN,
    ESIMFLAG_SKIN,
    VIVO_SKIN,
    BLAU_SKIN,
} from '../src';

import type {ThemeConfig} from '../src';

type OverrideTheme = (theme: ThemeConfig) => void;

const ThemeOverriderContext = React.createContext<OverrideTheme>(() => {});

type ThemeOverriderContextProviderProps = {
    children: (theme: ThemeConfig | null) => React.ReactNode;
};

const ThemeOverriderContextProvider = ({children}: ThemeOverriderContextProviderProps) => {
    const [theme, setTheme] = React.useState<ThemeConfig | null>(null);

    return (
        <ThemeOverriderContext.Provider value={setTheme}>{children(theme)}</ThemeOverriderContext.Provider>
    );
};

export const useOverrideTheme = (): OverrideTheme => React.useContext(ThemeOverriderContext);

/**
 * The language cannot be fully determined from the skin name because
 * some skins are used in multiple countries.
 *
 * This is a best effort.
 * The only OB that has shown interest in having their own lang is Vivo,
 */
const skinToLang: Record<string, string> = {
    [VIVO_NEW_SKIN]: 'pt-BR',
    [VIVO_SKIN]: 'pt-BR',
    [BLAU_SKIN]: 'de-DE',
    [TELEFONICA_SKIN]: 'es-ES',
    [MOVISTAR_SKIN]: 'es-ES',
};

const App = ({children, skinName}: {children: React.ReactNode; skinName: string}) => {
    const {isModalOpen} = useModalState();
    const lang = skinToLang[skinName] || 'en';

    React.useEffect(() => {
        // set lang attribute in html tag
        document.documentElement.lang = lang;
    }, [lang]);

    const styles = `
        body {background: ${skinVars.colors.background}}

        ${skinName === VIVO_NEW_SKIN ? 'body {font-family: "Vivo Type"}' : ''}
        ${skinName === TELEFONICA_SKIN || skinName === TU_SKIN ? 'body {font-family: "Telefonica Sans"}' : ''}
        ${
            skinName === MOVISTAR_SKIN ||
            skinName === O2_SKIN ||
            skinName === O2_NEW_SKIN ||
            skinName === ESIMFLAG_SKIN
                ? 'body {font-family: "On Air"}'
                : ''
        }


        *[class^='_1fu0koy1'] {
            display: none;
        }
    `;

    return (
        <main lang={lang} aria-hidden={isModalOpen}>
            <style>{styles}</style>
            {children}
        </main>
    );
};

type Props = {children: React.ReactNode; theme: ThemeConfig};

const FrameComponent = ({children, theme}: Props): React.ReactNode => (
    <React.StrictMode>
        <ThemeOverriderContextProvider>
            {(overridenTheme) => (
                <ThemeContextProvider theme={overridenTheme ?? theme}>
                    <SheetRoot />
                    <OverscrollColorProvider>
                        <App skinName={(overridenTheme ?? theme).skin.name}>{children}</App>
                    </OverscrollColorProvider>
                </ThemeContextProvider>
            )}
        </ThemeOverriderContextProvider>
    </React.StrictMode>
);

export default FrameComponent;
