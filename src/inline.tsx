import * as React from 'react';
import classnames from 'classnames';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {getPrefixedDataAttributes} from './utils/dom';
import * as classes from './inline.css';

import type {DataAttributes} from './utils/types';

type Props = {
    space: 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 'between' | 'around' | 'evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
    fullWidth?: boolean;
    dataAttributes?: DataAttributes;
};

const getJustifyContent = (space: Props['space']) => {
    switch (space) {
        case 'between':
        case 'around':
        case 'evenly':
            return `space-${space}`;
        default:
            return 'initial';
    }
};

const Inline: React.FC<Props> = ({
    space,
    className,
    children,
    role,
    alignItems = 'stretch',
    'aria-labelledby': ariaLabelledBy,
    fullWidth,
    dataAttributes,
}) => {
    const isFullWith = fullWidth || typeof space === 'string';

    return (
        <div
            className={classnames(className, {
                [classes.fullWidth]: isFullWith,
                [classes.noFullWidth]: !isFullWith,
            })}
            style={assignInlineVars({
                [classes.space]: typeof space === 'number' ? `${space}px` : '',
                justifyContent: getJustifyContent(space),
                alignItems,
            })}
            role={role}
            aria-labelledby={ariaLabelledBy}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {React.Children.map(children, (child) => (!!child || child === 0 ? <div>{child}</div> : null))}
        </div>
    );
};

export default Inline;
