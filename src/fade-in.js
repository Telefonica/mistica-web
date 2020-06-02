// @flow
import * as React from 'react';
import {createUseStyles} from './jss';

const defaultDuration = '0.3s';

const useStyles = createUseStyles(() => ({
    wrapper: {
        animationName: '$fadeIn',
        animationTimingFunction: 'ease',
        animationFillMode: 'both',
    },

    '@keyframes fadeIn': {
        from: {opacity: 0},
        to: {opacity: 1},
    },
}));

type Props = {
    children?: React.Node,
    className?: string,
    delay?: string,
    duration?: string,
};

const FadeIn = ({
    children,
    className = '',
    duration = defaultDuration,
    delay = '0',
}: Props): React.Element<'div'> => {
    const classes = useStyles();

    return (
        <div
            className={`${classes.wrapper} ${className}`}
            style={{
                animationDelay: delay,
                WebkitAnimationDelay: delay,
                animationDuration: duration,
                WebkitAnimationDuration: duration,
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;
