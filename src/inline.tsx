import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

const useStyles = createUseStyles(() => ({
    inline: {
        display: 'flex',
        flexDirection: 'row',

        '& > div:not(:empty) ~ div:not(:empty)': {
            marginLeft: (p) => p.space,
        },
    },
}));

type Props = {
    space: 0 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64;
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
};

const Inline: React.FC<Props> = (props) => {
    const {space, className, children, role} = props;
    const classes = useStyles({space});

    return (
        <div
            className={classnames(className, classes.inline)}
            role={role}
            aria-labelledby={props['aria-labelledby']}
        >
            {React.Children.map(children, (child) => (
                <div>{child}</div>
            ))}
        </div>
    );
};

export default Inline;
