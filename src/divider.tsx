import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

type StylesProps = {
    isInverse: boolean;
};

const useStyles = createUseStyles(({colors}) => ({
    divider: {
        height: 1,
        borderBottom: ({isInverse}: StylesProps) =>
            `1px solid ${isInverse ? colors.dividerInverse : colors.divider}`,
    },
}));

const Divider: React.FC = () => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse} as StylesProps);
    return <div className={classes.divider} />;
};

export default Divider;
