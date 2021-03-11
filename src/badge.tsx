import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';

const useStyles = createUseStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    badge: {
        position: ({hasChildren}) => (hasChildren ? 'absolute' : 'static'),
        top: -2,
        right: -6,
        width: 8,
        height: 8,
        background: theme.colors.badge,
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
    children?: React.ReactNode;
    value?: number;
};

const Badge: React.FC<Props> = ({children, value}) => {
    const hasChildren = !!children;
    const classes = useStyles({hasChildren});

    if (children && value === 0) {
        return <>{children}</>;
    }

    if (value === 0) {
        return null;
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
