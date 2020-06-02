// @flow
import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';

const useStyles = createUseStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -6,
        width: 8,
        height: 8,
        background: theme.colors.badgeBackground,
        borderRadius: '50%',
        boxShadow: `0px 0px 0px 1.5px ${theme.colors.borderLight}`,
    },
    badgeNumber: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: -8,
        right: -9,
        width: 18,
        height: 18,
        fontSize: 12,
        fontWeight: 500,
        color: theme.colors.textPrimaryInverse,
    },
    badgeBigNumber: {
        right: -14,
        width: 24,
        borderRadius: 24,
    },
}));

type Props = {
    children: React.Node,
    value?: number,
};

const Badge = ({children, value}: Props): React.Node => {
    const classes = useStyles();

    if (value === 0) {
        return children;
    }

    return (
        <div className={classes.container}>
            {value ? (
                <div
                    className={classnames(classes.badge, classes.badgeNumber, {
                        [classes.badgeBigNumber]: value > 9,
                    })}
                >
                    {value > 9 ? '+9' : value}
                </div>
            ) : (
                <div className={classes.badge} />
            )}
            {children}
        </div>
    );
};

export default Badge;
