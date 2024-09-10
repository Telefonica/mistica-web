'use client';
import * as React from 'react';
import classnames from 'classnames';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars} from './skins/skin-contract.css';
import * as styles from './boxed.css';
import {sprinkles} from './sprinkles.css';
import {applyCssVars} from './utils/css';

import type {Variant} from './theme-variant-context';
import type {ByBreakpoint, DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    isInverse?: boolean;
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
    borderRadius?: typeof vars.borderRadii.container | typeof vars.borderRadii.legacyDisplay;
    desktopOnly?: boolean;
    background?: string;
    variant?: Variant;
};

const getBorderStyle = (isInverseOutside: boolean, isInverseInside: boolean) => {
    if (isInverseOutside || isInverseInside) {
        return sprinkles({border: 'none'});
    }
    return styles.boxBorder;
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
            isInverse: isInverseInside = false,
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
        },
        ref
    ) => {
        const isInverseOutside = useIsInverseVariant();

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
                    }),
                    background,
                }}
                className={classnames(
                    className,
                    styles.boxed,
                    getBorderStyle(isInverseOutside, isInverseInside),
                    sprinkles({
                        borderRadius,
                        overflow: 'hidden',
                        background:
                            background ?? isInverseInside
                                ? isInverseOutside
                                    ? vars.colors.backgroundContainerBrandOverInverse
                                    : vars.colors.backgroundContainerBrand
                                : vars.colors.backgroundContainer,
                    }),
                    {[styles.desktopOnly]: desktopOnly}
                )}
                role={role}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <ThemeVariant variant={variant} isInverse={isInverseInside}>
                    {children}
                </ThemeVariant>
            </div>
        );
    }
);

export const Boxed = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return <InternalBoxed {...props} ref={ref} />;
});
