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
    /** @deprecated Use variant = 'brand' instead */
    isInverse?: boolean;
    variant?: Variant;
    children: React.ReactNode;
};

export const ThemeVariant = ({isInverse, variant, children}: ThemeVariantProps): JSX.Element => (
    <ThemeVariantContext.Provider value={variant ?? (isInverse ? 'brand' : 'default')}>
        {children}
    </ThemeVariantContext.Provider>
);

export const useThemeVariant = (): NonDeprecatedVariant =>
    normalizeVariant(React.useContext(ThemeVariantContext));

/**
 * @deprecated use `useThemeVariant` instead
 */
export const useIsInverseVariant = (): boolean => useThemeVariant() === 'brand';

/**
 * @deprecated use `useThemeVariant` instead
 */
export const useIsInverseOrMediaVariant = (): boolean => {
    const variant = useThemeVariant();
    return variant === 'brand' || variant === 'media';
};
