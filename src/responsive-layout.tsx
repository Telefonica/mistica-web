import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './responsive-layout.css';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';

import type {Variant} from './theme-variant-context';
import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    isInverse?: boolean;
    variant?: Variant;
    backgroundColor?: string;
    dataAttributes?: DataAttributes;
};

const ResponsiveLayout: React.FC<Props> = ({
    children,
    isInverse = false,
    variant,
    backgroundColor,
    className,
    fullWidth,
    dataAttributes,
}) => {
    const outsideVariant: Variant = useThemeVariant();
    const internalVariant: Variant | undefined = variant || (isInverse && 'inverse') || undefined;

    return (
        <ThemeVariant variant={internalVariant ?? outsideVariant}>
            <div
                className={classnames(
                    styles.container,
                    className,
                    internalVariant &&
                        internalVariant !== 'default' &&
                        styles.backgroundVariant[internalVariant]
                )}
                style={backgroundColor ? {background: backgroundColor} : undefined}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <div className={fullWidth ? styles.fullWidth : styles.responsiveLayout}>{children}</div>
            </div>
        </ThemeVariant>
    );
};

export default ResponsiveLayout;
