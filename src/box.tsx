import * as React from 'react';
import classnames from 'classnames';
import * as styles from './box.css';
import {applyCssVars} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {ByBreakpoint, DataAttributes} from './utils/types';

export type PadSize = 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

export type BoxProps = {
    width?: number | string;
    padding?: ByBreakpoint<PadSize>;
    paddingX?: ByBreakpoint<PadSize>;
    paddingY?: ByBreakpoint<PadSize>;
    paddingTop?: ByBreakpoint<PadSize>;
    paddingBottom?: ByBreakpoint<PadSize>;
    paddingLeft?: ByBreakpoint<PadSize>;
    paddingRight?: ByBreakpoint<PadSize>;
    as?: React.ComponentType<any> | string;
    children?: React.ReactNode;
    /**
     * @deprecated this component is meant to be used only to add padding.
     * Consider using a div (or similar) instead if you need to add extra styles
     */
    className?: string;
    role?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-hidden'?: React.HTMLAttributes<HTMLAnchorElement>['aria-hidden'];
    id?: string;
};

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
    (
        {
            className,
            children,
            as: Component = 'div',
            width,
            padding = 0,
            paddingX = padding,
            paddingY = padding,
            paddingTop = paddingY,
            paddingBottom = paddingY,
            paddingLeft = paddingX,
            paddingRight = paddingX,
            role,
            id,
            dataAttributes,
            'aria-label': ariaLabel,
            'aria-hidden': ariaHidden,
        },
        ref
    ) => {
        const paddingTopValues =
            typeof paddingTop === 'object'
                ? paddingTop
                : {mobile: paddingTop, tablet: paddingTop, desktop: paddingTop};

        const paddingBottomValues =
            typeof paddingBottom === 'object'
                ? paddingBottom
                : {mobile: paddingBottom, tablet: paddingBottom, desktop: paddingBottom};

        const paddingLeftValues =
            typeof paddingLeft === 'object'
                ? paddingLeft
                : {mobile: paddingLeft, tablet: paddingLeft, desktop: paddingLeft};

        const paddingRightValues =
            typeof paddingRight === 'object'
                ? paddingRight
                : {mobile: paddingRight, tablet: paddingRight, desktop: paddingRight};

        const applyPaddingVars = (
            vars: (typeof styles.vars)[keyof typeof styles.vars],
            values: {mobile: PadSize; tablet?: PadSize; desktop: PadSize}
        ) => {
            return applyCssVars({
                [vars.mobile]: `${values.mobile}px`,
                [vars.tablet]: `${values.tablet ?? values.mobile}px`,
                [vars.desktop]: `${values.desktop}px`,
            });
        };

        return (
            <Component
                {...getPrefixedDataAttributes(dataAttributes)}
                role={role}
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
                ref={ref}
                className={classnames(className, styles.box)}
                style={{
                    ...applyPaddingVars(styles.vars.paddingTop, paddingTopValues),
                    ...applyPaddingVars(styles.vars.paddingBottom, paddingBottomValues),
                    ...applyPaddingVars(styles.vars.paddingLeft, paddingLeftValues),
                    ...applyPaddingVars(styles.vars.paddingRight, paddingRightValues),
                    ...(width !== undefined ? {width, boxSizing: 'border-box'} : {}),
                }}
                id={id}
            >
                {children}
            </Component>
        );
    }
);

export default Box;
