'use client';
import * as React from 'react';
import classnames from 'classnames';
import {sprinkles} from './sprinkles.css';
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

const calcInlineVars = (space: FlexSpace | ByBreakpoint<NumericSpace>) => {
    if (typeof space === 'number' || typeof space === 'string') {
        return {
            [styles.vars.space]: calcSpaceValue(space),
        };
    }
    const vars = {
        [styles.vars.spaceMobile]: calcSpaceValue(space.mobile),
        [styles.vars.spaceDesktop]: calcSpaceValue(space.desktop),
    };
    if (space.tablet) {
        vars[styles.vars.spaceTablet] = calcSpaceValue(space.tablet);
    }
    return vars;
};

type Props = {
    space: FlexSpace | ByBreakpoint<NumericSpace>;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
    fullWidth?: boolean;
    dataAttributes?: DataAttributes;
    wrap?: boolean;
};

const Inline: React.FC<Props> = ({
    space,
    className,
    children,
    role,
    alignItems = 'stretch',
    'aria-labelledby': ariaLabelledBy,
    fullWidth,
    wrap,
    dataAttributes,
}) => {
    const isFullWith = fullWidth;
    const {platformOverrides} = useTheme();

    const isStringSpace = typeof space === 'string';

    return (
        <div
            className={classnames(
                className,
                styles.inline,
                sprinkles({alignItems}),
                wrap ? styles.wrap : isFullWith ? styles.fullWidth : styles.noFullWidth,
                isStringSpace ? styles.stringSpace : styles.marginInline
            )}
            style={applyCssVars(calcInlineVars(space))}
            role={role}
            aria-labelledby={ariaLabelledBy}
            {...getPrefixedDataAttributes(dataAttributes, 'Inline')}
        >
            {React.Children.map(children, (child) =>
                !!child || child === 0 ? (
                    <div
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
                ) : null
            )}
        </div>
    );
};

export default Inline;
