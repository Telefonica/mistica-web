// @flow
import * as React from 'react';
import {createUseStyles} from './jss';

const useStyles = createUseStyles((theme) => ({
    grid: {
        display: 'grid',
        [theme.mq.largeDesktop]: {
            gridGap: 24,
            gridTemplateColumns: 'repeat(12, 1fr)',
        },
        [theme.mq.desktop]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridGap: 16,
        },
        [theme.mq.tablet]: {
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridGap: 16,
        },
        [theme.mq.mobile]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridGap: 16,
        },
    },
}));

type Props = {children: React.Node};

const GridLayout = ({children}: Props): React.Element<'div'> => {
    const classes = useStyles();

    return <div className={classes.grid}>{children}</div>;
};

export default GridLayout;
