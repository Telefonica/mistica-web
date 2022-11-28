import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './responsive-layout.css';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';

import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    isInverse?: boolean;
    backgroundColor?: string;
    dataAttributes?: DataAttributes;
};

const ResponsiveLayout: React.FC<Props> = ({
    children,
    isInverse = false,
    backgroundColor,
    className,
    fullWidth,
    dataAttributes,
}) => {
    const isInverseOutside = useIsInverseVariant();
    return (
        <ThemeVariant isInverse={isInverse || isInverseOutside}>
            <div
                className={classnames(styles.container, className, {
                    [styles.inverseBackground]: isInverse && !backgroundColor,
                })}
                style={backgroundColor ? {background: backgroundColor} : undefined}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <div className={fullWidth ? styles.fullWidth : styles.responsiveLayout}>{children}</div>
            </div>
        </ThemeVariant>
    );
};

export default ResponsiveLayout;
