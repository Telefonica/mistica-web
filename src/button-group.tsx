'use client';
import * as React from 'react';
import classNames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-group.css';
import * as buttonStyles from './button.css';
import {useIsomorphicLayoutEffect} from './hooks';

import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {ByBreakpoint, DataAttributes, RendersNullableElement} from './utils/types';

export interface ButtonGroupProps {
    primaryButton?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    align?: ByBreakpoint<'center' | 'left'>;
}

const ButtonGroup = ({
    primaryButton,
    secondaryButton,
    link,
    align = 'left',
    dataAttributes,
}: ButtonGroupProps): JSX.Element | null => {
    const linkContainerRef = React.useRef<HTMLDivElement>(null);
    const [hasSmallLink, setHasSmallLink] = React.useState(false);

    // In modern browsers we rely on CSS has() selector in order to add bleed to the ButtonLink.
    // In old browsers, we use this effect as a polyfill (https://caniuse.com/css-has)
    useIsomorphicLayoutEffect(() => {
        if (linkContainerRef.current?.getElementsByClassName(buttonStyles.smallLink)?.length) {
            setHasSmallLink(true);
        }
    }, []);

    const anyAction = !!primaryButton || !!secondaryButton || !!link;
    const bothButtons = !!primaryButton && !!secondaryButton;

    const alignByBreakpoint =
        typeof align === 'string'
            ? {
                  mobile: align,
                  tablet: align,
                  desktop: align,
              }
            : {
                  mobile: align.mobile ?? 'left',
                  tablet: align.tablet ?? align.mobile ?? 'left',
                  desktop: align.desktop ?? 'left',
              };

    return anyAction ? (
        <div
            className={classNames(
                styles.inline,
                hasSmallLink ? styles.containerWithSmallLink : styles.container,
                {
                    [styles.centerInDesktop]: alignByBreakpoint.desktop === 'center',
                    [styles.centerInTablet]: alignByBreakpoint.tablet === 'center',
                    [styles.centerInMobile]: alignByBreakpoint.mobile === 'center',
                }
            )}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonGroup')}
        >
            {(primaryButton || secondaryButton) && (
                <div
                    className={classNames(
                        styles.inline,
                        hasSmallLink ? styles.buttonsWithSmallLink : styles.buttons
                    )}
                >
                    {primaryButton && <div className={styles.buttonChild}>{primaryButton}</div>}
                    {secondaryButton && <div className={styles.buttonChild}>{secondaryButton}</div>}
                </div>
            )}
            {link && (
                <div
                    ref={linkContainerRef}
                    className={styles.buttonChild}
                    style={{width: bothButtons ? '100%' : 'auto'}}
                >
                    {link}
                </div>
            )}
        </div>
    ) : null;
};

export default ButtonGroup;
