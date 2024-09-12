'use client';
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
    /** @deprecated Use variant = 'inverse' instead */
    isInverse?: boolean;
    variant?: Variant;
    backgroundColor?: string;
    dataAttributes?: DataAttributes;
};

export const InternalResponsiveLayout = ({
    children,
    isInverse = false,
    variant,
    backgroundColor,
    className,
    fullWidth,
    dataAttributes,
    shouldExpandWhenNested = false,
    innerDivClassName,
}: Props & {shouldExpandWhenNested?: boolean | 'desktop'; innerDivClassName?: string}): JSX.Element => {
    // @deprecated @TODO https://jira.tid.es/browse/WEB-1611
    const outsideVariant: Variant = useThemeVariant();
    const internalVariant: Variant | undefined = variant || (isInverse && 'inverse') || undefined;

    return (
        <ThemeVariant variant={internalVariant ?? outsideVariant}>
            <div
                className={classnames(
                    className,
                    internalVariant &&
                        internalVariant !== 'default' &&
                        styles.backgroundVariant[internalVariant],
                    ...(fullWidth
                        ? []
                        : [
                              shouldExpandWhenNested
                                  ? styles.desktopContainer
                                  : styles.forcedMarginDesktopContainer,
                              shouldExpandWhenNested === true
                                  ? styles.mobileContainer
                                  : styles.forcedMarginMobileContainer,
                              styles.responsiveLayoutContainer,
                          ])
                )}
                style={backgroundColor ? {background: backgroundColor} : undefined}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <div
                    className={classnames(
                        fullWidth ? styles.fullWidth : styles.responsiveLayout,
                        innerDivClassName
                    )}
                >
                    {children}
                </div>
            </div>
        </ThemeVariant>
    );
};

const ResponsiveLayout = ({children, ...props}: Props): JSX.Element => (
    <InternalResponsiveLayout {...props} shouldExpandWhenNested>
        {children}
    </InternalResponsiveLayout>
);

export const ResetResponsiveLayout = ({
    children,
    skipMobile = false,
    skipDesktop = false,
}: {
    children: React.ReactNode;
    skipMobile?: boolean;
    skipDesktop?: boolean;
}): JSX.Element => {
    return (
        <div
            className={classnames({
                [styles.resetContainerMobile]: !skipMobile,
                [styles.resetContainerDesktop]: !skipDesktop,
            })}
        >
            <div
                className={classnames({
                    [styles.resetMobile]: !skipMobile,
                    [styles.resetDesktop]: !skipDesktop,
                })}
            >
                {children}
            </div>
        </div>
    );
};
export default ResponsiveLayout;
