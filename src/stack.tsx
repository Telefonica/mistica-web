import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

const useStyles = createUseStyles(() => ({
    stack: {
        '& > div:not(:empty) ~ div:not(:empty)': {
            marginTop: (p) => p.space,
        },
    },
}));

type Props = {
    space: 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64;
    children: React.ReactNode;
    className?: string;
    role?: string;
    ariaLabelledby?: string;
};

const Stack: React.FC<Props> = ({space, className, children, role, ariaLabelledby}) => {
    const classes = useStyles({space});

    return (
        <div className={classnames(className, classes.stack)} role={role} aria-labelledby={ariaLabelledby}>
            {React.Children.map(children, (child) => (
                <div>{child}</div>
            ))}
        </div>
    );
};

export default Stack;
