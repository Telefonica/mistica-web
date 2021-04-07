import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

const getStyles = (color: string) => ({
    borderBottom: `1px solid ${color}`,
});

const useStyles = createUseStyles(({colors}) => ({
    divider: getStyles(colors.divider),
    dividerInverse: getStyles(colors.dividerInverse),
}));

const Divider: React.FC = () => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles();
    return <div className={isInverse ? classes.dividerInverse : classes.divider} />;
};

export default Divider;
