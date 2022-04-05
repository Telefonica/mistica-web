import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {ThemeContextProvider, useTheme, useModalState, OverscrollColorProvider} from '../src';

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

const App: React.FC = ({children}) => {
    const {isModalOpen} = useModalState();
    const {colors} = useTheme();
    const styles = `
        body {background: ${colors.background}}

        ${isModalOpen ? 'body {overflow-y: hidden}' : ''}

        *[class^='SplashScreen__'] {
            display: none;
        }
    `;

    return (
        <div aria-hidden={isModalOpen}>
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
