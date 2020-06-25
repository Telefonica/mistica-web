import * as React from 'react';

const IsInverseThemeVariant = React.createContext<boolean>(false);

type ThemeVariantProps = {
    isInverse: boolean;
    children: React.ReactNode;
};

export const ThemeVariant: React.FC<ThemeVariantProps> = ({isInverse, children}) => (
    <IsInverseThemeVariant.Provider value={!!isInverse}>{children}</IsInverseThemeVariant.Provider>
);

export const useIsInverseVariant = (): boolean => React.useContext(IsInverseThemeVariant);
