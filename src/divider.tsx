import classnames from 'classnames';
import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

const useStyles = createUseStyles((theme) => ({
    divider: {
        height: 1,
        background: theme.colors.divider,
    },
    dividerInverse: {
        background: theme.colors.dividerInverse,
    },
}));

const Divider: React.FC = () => {
    const classes = useStyles();
    const isInverse = useIsInverseVariant();
    return <div className={classnames(classes.divider, {[classes.dividerInverse]: isInverse})} />;
};

export default Divider;
