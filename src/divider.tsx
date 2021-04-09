import classnames from 'classnames';
import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

const useStyles = createUseStyles(({colors}) => ({
    divider: {
        borderBottom: `1px solid ${colors.divider}`,
    },
    dividerInverse: {
        borderBottom: `1px solid ${colors.dividerInverse}`,
    },
}));

const Divider: React.FC = () => {
    const classes = useStyles();
    const isInverse = useIsInverseVariant();
    return <div className={classnames(classes.divider, {[classes.dividerInverse]: isInverse})} />;
};

export default Divider;
