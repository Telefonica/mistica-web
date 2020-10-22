import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

const useStyles = createUseStyles(() => ({
    inline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: ({alignItems}) => alignItems,

        '& > div:not(:empty) ~ div:not(:empty)': {
            marginLeft: (p) => p.space,
        },
    },
}));

type Props = {
    space: 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    children: React.ReactNode;
    className?: string;
    role?: string;
    'aria-labelledby'?: string;
};

const Inline: React.FC<Props> = (props) => {
    const {space, className, children, role, alignItems = 'stretch'} = props;
    const classes = useStyles({space, alignItems});

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
