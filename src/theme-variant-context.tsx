'use client';
import * as React from 'react';

export type NonDeprecatedVariant = 'default' | 'brand' | 'negative' | 'alternative' | 'media';

export type Variant =
    | 'default'
    | 'brand'
    | 'negative'
    | 'alternative'
    | 'media'
    /** @deprecated use 'brand' instead */
    | 'inverse';

export const normalizeVariant = <T extends Variant>(variant: T): T extends 'inverse' ? 'brand' : T => {
    if (variant === 'inverse') {
        return 'brand' as T extends 'inverse' ? 'brand' : T;
    }
    return variant as T extends 'inverse' ? 'brand' : T;
};

const ThemeVariantContext = React.createContext<Variant>('default');

type ThemeVariantProps = {
    variant?: Variant;
    children: React.ReactNode;
};

export const ThemeVariant = ({variant, children}: ThemeVariantProps): JSX.Element => (
    <ThemeVariantContext.Provider value={variant ?? 'default'}>{children}</ThemeVariantContext.Provider>
);

export const useThemeVariant = (): NonDeprecatedVariant =>
    normalizeVariant(React.useContext(ThemeVariantContext));
