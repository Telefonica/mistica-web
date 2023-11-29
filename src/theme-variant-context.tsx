'use client';
import * as React from 'react';

export type Variant = 'default' | 'inverse' | 'alternative';

const ThemeVariantContext = React.createContext<Variant>('default');

type ThemeVariantProps = {
    isInverse?: boolean;
    variant?: Variant;
    children: React.ReactNode;
};

export const ThemeVariant: React.FC<ThemeVariantProps> = ({isInverse, variant, children}) => (
    <ThemeVariantContext.Provider value={variant ?? (isInverse ? 'inverse' : 'default')}>
        {children}
    </ThemeVariantContext.Provider>
);

export const useThemeVariant = (): Variant => React.useContext(ThemeVariantContext);
export const useIsInverseVariant = (): boolean => useThemeVariant() === 'inverse';
