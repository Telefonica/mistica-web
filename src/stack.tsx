import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

const useStyles = createUseStyles(() => ({
    marginStack: {
        '& > div:not(:empty) ~ div:not(:empty)': {
            marginTop: (p) => p.space,
        },
    },
    flexStack: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: (p) => `space-${p.space}`,
        '& > div:empty': {
            display: 'none',
        },
    },
}));

type Props = {
    space: 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 'between' | 'around' | 'evenly';
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
};

const Stack: React.FC<Props> = (props) => {
    const {space, className, children, role} = props;
    const classes = useStyles({space});

    const isNumeric = typeof space === 'number';
    return (
        <div
            className={classnames(className, isNumeric ? classes.marginStack : classes.flexStack)}
            role={role}
            aria-labelledby={props['aria-labelledby']}
        >
            {React.Children.map(children, (child) => (
                <div>{child}</div>
            ))}
        </div>
    );
};

export default Stack;
