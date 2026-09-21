import * as React from 'react';
import * as styles from './fade-out.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const defaultDuration = '0.3s';

type Props = {
    children?: React.ReactNode;
    className?: string;
    delay?: string;
    duration?: string;
    dataAttributes?: DataAttributes;
};

const FadeOut = ({
    children,
    className = '',
    duration = defaultDuration,
    delay = '0',
    dataAttributes,
}: Props): JSX.Element => {
    return (
        <div
            {...getPrefixedDataAttributes({testid: 'FadeOut', ...dataAttributes})}
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

export default FadeOut;
