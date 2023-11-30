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
    TU_SKIN,
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

const App = ({children, skinName}: {children: React.ReactNode; skinName: string}) => {
    const {isModalOpen} = useModalState();
    const styles = `
        body {background: ${skinVars.colors.background}}

        ${skinName === VIVO_NEW_SKIN ? 'body {font-family: "Vivo Type"}' : ''}
        ${skinName === TELEFONICA_SKIN ? 'body {font-family: "Telefonica Sans"}' : ''}
        ${skinName === O2_SKIN ? 'body {font-family: "On Air"}' : ''}
        ${skinName === O2_SKIN || skinName === TU_SKIN ? 'body {font-family: "On Air"}' : ''}

        ${isModalOpen ? 'body {overflow-y: hidden}' : ''}

        *[class^='_1fu0koy1'] {
            display: none;
        }
    `;

    return (
        <div lang="en" aria-hidden={isModalOpen}>
            <style>{styles}</style>
            {children}
        </div>
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
