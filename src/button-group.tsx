'use client';
import * as React from 'react';
import classNames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-group.css';
import {applyCssVars} from './utils/css';
import {borderSize, buttonPaddingX} from './button.css';
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

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    primaryButton,
    secondaryButton,
    link,
    align = 'left',
    dataAttributes,
}) => {
    const linkContainerRef = React.useRef<HTMLDivElement>(null);
    const [hasSmallLink, setHasSmallLink] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (linkContainerRef.current?.querySelector('[data-small-link=true]')) {
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
            className={classNames(styles.inline, styles.container, {
                [styles.centerInDesktop]: alignByBreakpoint.desktop === 'center',
                [styles.centerInTablet]: alignByBreakpoint.tablet === 'center',
                [styles.centerInMobile]: alignByBreakpoint.mobile === 'center',
            })}
            style={{
                ...applyCssVars({
                    [styles.vars.buttonLinkPadding]: `calc(${borderSize} + ${
                        hasSmallLink ? buttonPaddingX.small : buttonPaddingX.default
                    })`,
                }),
            }}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonGroup')}
        >
            {(primaryButton || secondaryButton) && (
                <div className={classNames(styles.inline, styles.buttons)}>
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
