'use client';
import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './inline.css';
import {applyCssVars} from './utils/css';
import {isIos, isRunningAcceptanceTest} from './utils/platform';
import {useTheme} from './hooks';

import type {ByBreakpoint, DataAttributes} from './utils/types';

type NumericSpace = -16 | -12 | -8 | -4 | -2 | 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64;
type FlexSpace = 'between' | 'around' | 'evenly';

const calcSpaceValue = (space: NumericSpace | FlexSpace) => {
    if (typeof space === 'number') {
        return `${space}px`;
    } else {
        return `space-${space}`;
    }
};

const calcInlineVars = (
    space: FlexSpace | ByBreakpoint<NumericSpace>,
    verticalSpace?: ByBreakpoint<NumericSpace>
) => {
    const calcSpaceVars = (
        space: FlexSpace | ByBreakpoint<NumericSpace>,
        varNames: {default: string; mobile: string; tablet: string; desktop: string}
    ) => {
        if (typeof space === 'number' || typeof space === 'string') {
            return {
                [varNames.default]: calcSpaceValue(space),
            };
        }
        const vars = {
            [varNames.mobile]: calcSpaceValue(space.mobile),
            [varNames.desktop]: calcSpaceValue(space.desktop),
        };
        if (space.tablet) {
            vars[varNames.tablet] = calcSpaceValue(space.tablet);
        }
        return vars;
    };

    const spaceVars = calcSpaceVars(space, {
        default: styles.vars.space,
        mobile: styles.vars.spaceMobile,
        tablet: styles.vars.spaceTablet,
        desktop: styles.vars.spaceDesktop,
    });

    if (verticalSpace) {
        const verticalSpaceVars = calcSpaceVars(verticalSpace, {
            default: styles.vars.verticalSpace,
            mobile: styles.vars.verticalSpaceMobile,
            tablet: styles.vars.verticalSpaceTablet,
            desktop: styles.vars.verticalSpaceDesktop,
        });

        return {
            ...spaceVars,
            ...verticalSpaceVars,
        };
    }

    return spaceVars;
};

type Props = {
    space: FlexSpace | ByBreakpoint<NumericSpace>;
    verticalSpace?: ByBreakpoint<NumericSpace>;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    fullWidth?: boolean;
    dataAttributes?: DataAttributes;
    wrap?: boolean;
    /**
     * Index or indexes of the children that should grow to fill the available space.
     * Indexes refer to entries in `React.Children.toArray(children)`, so empty nodes
     * (`null`, `undefined` and booleans) are ignored, but React elements still count
     * even if they ultimately render no content.
     *
     * This prop has no effect when `wrap` is enabled.
     */
    expand?: number | ReadonlyArray<number>;
};

const shouldExpandItem = (expand: Props['expand'], index: number): boolean => {
    if (expand === undefined) {
        return false;
    }

    return Array.isArray(expand) ? expand.includes(index) : expand === index;
};

const Inline = ({
    space,
    verticalSpace,
    className,
    children,
    role,
    alignItems = 'stretch',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    fullWidth,
    wrap,
    dataAttributes,
    expand,
}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();
    const isStringSpace = typeof space === 'string';
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    const hasExpandItem = childrenArray.some((_, index) => shouldExpandItem(expand, index));
    const shouldExpand = hasExpandItem && !wrap;
    return (
        <div
            className={classnames(
                className,
                styles.inline,
                wrap ? styles.wrap : fullWidth || shouldExpand ? styles.fullWidth : styles.noFullWidth,
                isStringSpace
                    ? wrap
                        ? styles.stringSpaceWithWrap
                        : styles.stringSpace
                    : styles.marginInline,
                shouldExpand && styles.expand
            )}
            style={{...applyCssVars(calcInlineVars(space, verticalSpace)), alignItems}}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
            {...getPrefixedDataAttributes({testid: 'Inline', ...dataAttributes})}
        >
            {React.Children.map(childrenArray, (child, index) => {
                return (
                    <div
                        role={role === 'list' ? 'listitem' : undefined}
                        className={classnames(shouldExpandItem(expand, index) && styles.expandItem)}
                        style={{
                            // Hack to fix https://jira.tid.es/browse/WEB-1683
                            // In iOS the inline component sometimes cuts the last line of the content
                            paddingBottom:
                                isIos(platformOverrides) && !isRunningAcceptanceTest(platformOverrides)
                                    ? 1
                                    : undefined,
                        }}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
};

export default Inline;
