import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './stack.css';
import {applyCssVars} from './utils/css';

import type {ByBreakpoint, DataAttributes} from './utils/types';

type NumericSpace = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;
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
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
    'aria-live'?: 'polite' | 'off' | 'assertive';
    'aria-atomic'?: boolean;
    dataAttributes?: DataAttributes;
};

const Stack = ({
    space,
    className,
    children,
    role,
    'aria-labelledby': ariaLabelledby,
    'aria-live': ariaLive,
    'aria-atomic': ariaAtomic,
    dataAttributes,
}: Props): JSX.Element => {
    const isFlexStack = typeof space === 'string';

    return (
        <div
            className={classnames(className, isFlexStack ? styles.flexStack : styles.marginStack)}
            style={applyCssVars(calcInlineVars(space))}
            role={role}
            aria-labelledby={ariaLabelledby}
            aria-live={ariaLive}
            aria-atomic={ariaAtomic}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {React.Children.map(children, (child) => (
                <div role={role === 'list' ? 'listitem' : undefined}>{child}</div>
            ))}
        </div>
    );
};

export default Stack;
