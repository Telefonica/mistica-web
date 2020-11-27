import * as React from 'react';
import {createUseStyles} from './jss';

const useStyles = createUseStyles((theme) => ({
    grid: {
        display: 'grid',
        [theme.mq.largeDesktop]: {
            gridColumnGap: 24,
            gridTemplateColumns: 'repeat(12, 1fr)',
        },
        [theme.mq.desktop]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridColumnGap: 16,
        },
        [theme.mq.tablet]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridColumnGap: 16,
        },
        [theme.mq.mobile]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridColumnGap: 16,
        },
    },
}));

type Props = {children: React.ReactNode};

const GridLayout: React.FC<Props> = ({children}) => {
    const classes = useStyles();

    return <div className={classes.grid}>{children}</div>;
};

export default GridLayout;
