import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {ThemeContextProvider} from '../src';

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

type Props = {children: React.ReactNode; theme: ThemeConfig};

const FrameComponent = ({children, theme}: Props): React.ReactNode => (
    <ThemeOverriderContextProvider>
        {(overridenTheme) => (
            <ThemeContextProvider theme={overridenTheme ?? theme}>{children}</ThemeContextProvider>
        )}
    </ThemeOverriderContextProvider>
);

export default FrameComponent;
