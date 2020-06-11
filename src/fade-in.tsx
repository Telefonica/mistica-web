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
    children?: React.ReactNode;
    className?: string;
    delay?: string;
    duration?: string;
};

const FadeIn: React.FC<Props> = ({children, className = '', duration = defaultDuration, delay = '0'}) => {
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
