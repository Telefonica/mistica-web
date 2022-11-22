import * as React from 'react';
import * as styles from './fade-in.css';

const defaultDuration = '0.3s';

type Props = {
    children?: React.ReactNode;
    className?: string;
    delay?: string;
    duration?: string;
};

const FadeIn: React.FC<Props> = ({children, className = '', duration = defaultDuration, delay = '0'}) => {
    return (
        <div
            className={`${styles.wrapper} ${className}`}
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
