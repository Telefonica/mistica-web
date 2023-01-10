import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {ThemeContextProvider, useModalState, OverscrollColorProvider, skinVars} from '../src';

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

const App = ({children}: {children: React.ReactNode}) => {
    const {isModalOpen} = useModalState();
    const styles = `
        body {background: ${skinVars.colors.background}}

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
    <ThemeOverriderContextProvider>
        {(overridenTheme) => (
            <ThemeContextProvider theme={overridenTheme ?? theme}>
                <OverscrollColorProvider>
                    <App>{children}</App>
                </OverscrollColorProvider>
            </ThemeContextProvider>
        )}
    </ThemeOverriderContextProvider>
);

export default FrameComponent;
