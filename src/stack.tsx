import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

const useStyles = createUseStyles(() => ({
    stack: {
        '& > div:not(:empty) ~ div:not(:empty)': {
            marginTop: (p) => p.space,
        },
    },
    stackInline: {
        display: 'flex',
        flexDirection: 'row',

        '& > div:not(:empty) ~ div:not(:empty)': {
            marginLeft: (p) => p.space,
        },
    },
}));

type Props = {
    space: 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64;
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
    align?: 'vertical' | 'horizontal';
};

const Stack: React.FC<Props> = (props) => {
    const {space, className, children, role, align = 'vertical'} = props;
    const classes = useStyles({space});
    const classNames = classnames(className, align === 'vertical' ? classes.stack : classes.stackInline);

    return (
        <div className={classNames} role={role} aria-labelledby={props['aria-labelledby']}>
            {React.Children.map(children, (child) => (
                <div>{child}</div>
            ))}
        </div>
    );
};

export default Stack;
