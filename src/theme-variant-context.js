// @flow
import * as React from 'react';

const IsInverseThemeVariant = React.createContext<boolean>(false);

type ThemeVariantProps = {
    isInverse: boolean,
    children: React.Node,
};

export const ThemeVariant = ({isInverse, children}: ThemeVariantProps): React.Node => (
    <IsInverseThemeVariant.Provider value={!!isInverse}>{children}</IsInverseThemeVariant.Provider>
);

export const useIsInverseVariant = (): boolean => React.useContext(IsInverseThemeVariant);
