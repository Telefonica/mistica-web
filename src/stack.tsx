import * as React from 'react';
import classnames from 'classnames';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {getPrefixedDataAttributes} from './utils/dom';
import * as classes from './stack.css';

import type {DataAttributes} from './utils/types';

type Props = {
    space: 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 'between' | 'around' | 'evenly';
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
    dataAttributes?: DataAttributes;
};

const Stack: React.FC<Props> = (props) => {
    const {space, className, children, role} = props;

    const isNumeric = typeof space === 'number';

    return (
        <div
            className={classnames(className, isNumeric ? classes.marginStack : classes.flexStack)}
            style={assignInlineVars({[classes.space]: isNumeric ? `${space}px` : `space-${space}`})}
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
