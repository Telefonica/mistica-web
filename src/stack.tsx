import * as React from 'react';
import classnames from 'classnames';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './stack.css';

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
    dataAttributes?: DataAttributes;
};

const Stack: React.FC<Props> = (props) => {
    const {space, className, children, role} = props;

    const isFlexStack = typeof space === 'string';

    return (
        <div
            className={classnames(className, isFlexStack ? styles.flexStack : styles.marginStack)}
            style={assignInlineVars(calcInlineVars(space))}
            role={role}
            aria-labelledby={props['aria-labelledby']}
            {...getPrefixedDataAttributes(props.dataAttributes)}
        >
            {React.Children.map(children, (child) => (
                <div>{child}</div>
            ))}
        </div>
    );
};

export default Stack;
