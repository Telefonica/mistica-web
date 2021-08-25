import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const useStyles = createUseStyles(() => ({
    inline: {
        display: (p) => (p.fullWidth ? 'flex' : 'inline-flex'),
        flexDirection: 'row',
        '@supports (display: grid)': {
            display: (p) => (p.fullWidth ? 'grid' : 'inline-grid'),
            gridAutoFlow: 'column',
        },
        alignItems: ({alignItems}) => alignItems,
        justifyContent: (p) => {
            switch (p.space) {
                case 'between':
                case 'around':
                case 'evenly':
                    return `space-${p.space}`;
                default:
                    return 'initial';
            }
        },
        '& > div:not(:empty) ~ div:not(:empty)': {
            marginLeft: (p) => (typeof p.space === 'number' ? p.space : undefined),
        },
        '& > div:empty': {
            display: 'none',
        },
    },
}));

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
    const classes = useStyles({space, alignItems, fullWidth: fullWidth || typeof space === 'string'});

    return (
        <div
            className={classnames(className, classes.inline)}
            role={role}
            aria-labelledby={ariaLabelledBy}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {React.Children.map(children, (child) => (!!child || child === 0 ? <div>{child}</div> : null))}
        </div>
    );
};

export default Inline;
