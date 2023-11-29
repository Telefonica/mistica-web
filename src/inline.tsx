import * as React from 'react';
import classnames from 'classnames';
import {sprinkles} from './sprinkles.css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './inline.css';
import {applyCssVars} from './utils/css';

import type {DataAttributes} from './utils/types';

type Props = {
    space:
        | -16
        | -12
        | -8
        | -4
        | -2
        | 0
        | 2
        | 4
        | 8
        | 12
        | 16
        | 24
        | 32
        | 40
        | 48
        | 56
        | 64
        | 'between'
        | 'around'
        | 'evenly';
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
    const isFullWith = fullWidth || typeof space === 'string';

    return (
        <div
            className={classnames(
                className,
                sprinkles({alignItems}),
                wrap ? styles.wrap : isFullWith ? styles.fullWidth : styles.noFullWidth,
                typeof space !== 'number' && styles.justifyVariants[space]
            )}
            style={typeof space === 'number' ? applyCssVars({[styles.vars.space]: `${space}px`}) : undefined}
            role={role}
            aria-labelledby={ariaLabelledBy}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {React.Children.map(children, (child) => (!!child || child === 0 ? <div>{child}</div> : null))}
        </div>
    );
};

export default Inline;
