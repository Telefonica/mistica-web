'use client';
import * as React from 'react';
import classnames from 'classnames';
import {ThemeVariant, normalizeVariant, useThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars} from './skins/skin-contract.css';
import * as styles from './boxed.css';
import {applyCssVars} from './utils/css';

import type {Variant} from './theme-variant-context';
import type {ByBreakpoint, DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    /** @deprecated use variant="brand" instead */
    isInverse?: boolean;
    variant?: Variant;
    className?: string;
    role?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    width?: ByBreakpoint<number | string>;
    maxWidth?: ByBreakpoint<number | string>;
    minWidth?: ByBreakpoint<number | string>;
    height?: ByBreakpoint<number | string>;
    minHeight?: ByBreakpoint<number | string>;
};

type InternalProps = {
    borderRadius?: typeof vars.borderRadii.container | string;
    border?: string;
    desktopOnly?: boolean;
    background?: string;
    overflow?: 'hidden' | 'visible';
};

const getBorderStyle = (internalVariant: Variant, externalVariant: Variant) => {
    if (
        internalVariant === 'default' &&
        (externalVariant === 'default' || externalVariant === 'alternative')
    ) {
        return styles.boxBorder;
    }
    return styles.noBorder;
};

const normalizeDimension = (value: number | string | undefined) => {
    if (typeof value === 'number') {
        return `${value}px`;
    }
    return value ?? 'initial';
};

const calcCssVars = (
    varName: 'width' | 'height' | 'minHeight' | 'maxWidth' | 'minWidth',
    value: ByBreakpoint<string | number> | undefined
) => {
    if (typeof value === 'number' || typeof value === 'string' || typeof value === 'undefined') {
        return {
            [styles.vars[varName]]: normalizeDimension(value),
        };
    }
    const vars = {
        [styles.vars.mobile[varName]]: normalizeDimension(value.mobile),
        [styles.vars.desktop[varName]]: normalizeDimension(value.desktop),
    };
    if (value.tablet) {
        vars[styles.vars.tablet[varName]] = normalizeDimension(value.tablet);
    }
    return vars;
};

export const InternalBoxed = React.forwardRef<HTMLDivElement, Props & InternalProps>(
    (
        {
            children,
            isInverse = false,
            className,
            role,
            dataAttributes,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            width,
            maxWidth,
            minWidth,
            height,
            minHeight,
            borderRadius = vars.borderRadii.container,
            background,
            desktopOnly,
            variant,
            overflow,
            border,
        },
        ref
    ) => {
        const externalVariant = normalizeVariant(useThemeVariant());
        const internalVariant = normalizeVariant(variant ?? (isInverse ? 'brand' : 'default'));

        return (
            <div
                ref={ref}
                style={{
                    ...applyCssVars({
                        ...calcCssVars('width', width),
                        ...calcCssVars('maxWidth', maxWidth),
                        ...calcCssVars('minWidth', minWidth),
                        ...calcCssVars('height', height),
                        ...calcCssVars('minHeight', minHeight),
                        [styles.vars.background]:
                            background ??
                            {
                                default: vars.colors.backgroundContainer,
                                brand:
                                    externalVariant === 'brand' ||
                                    externalVariant === 'negative' ||
                                    externalVariant === 'media'
                                        ? vars.colors.backgroundContainerBrandOverBrand
                                        : vars.colors.backgroundContainerBrand,
                                negative: vars.colors.backgroundContainerNegative,
                                alternative: vars.colors.backgroundContainerAlternative,
                                media: vars.colors.backgroundContainer,
                            }[internalVariant],
                        [styles.vars.borderRadius]: borderRadius,
                    }),
                    background,
                    border,
                }}
                className={classnames(
                    className,
                    styles.boxed,
                    getBorderStyle(internalVariant, externalVariant),
                    {
                        [styles.desktopOnly]: desktopOnly,
                        [styles.overflowHidden]: overflow !== 'visible',
                    }
                )}
                role={role}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <ThemeVariant variant={internalVariant}>{children}</ThemeVariant>
            </div>
        );
    }
);

export const Boxed = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return <InternalBoxed {...props} ref={ref} />;
});
