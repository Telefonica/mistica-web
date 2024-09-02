'use client';
import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-layout.css';
import {borderSize, buttonPaddingX} from './button.css';
import {applyCssVars} from './utils/css';
import {useIsomorphicLayoutEffect} from './hooks';

import type {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from './button';
import type {DataAttributes, RendersNullableElement} from './utils/types';

type ButtonLayoutProps = {
    align?: 'center' | 'left' | 'right' | 'full-width';
    primaryButton?: RendersNullableElement<typeof ButtonPrimary | typeof ButtonDanger>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
};

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
    primaryButton,
    secondaryButton,
    align = 'full-width',
    link,
    dataAttributes,
}) => {
    const linkContainerRef = React.useRef<HTMLDivElement>(null);
    const [hasSmallLink, setHasSmallLink] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (linkContainerRef.current?.querySelector('[data-small-link=true]')) {
            setHasSmallLink(true);
        }
    }, []);

    const numberOfButtons = (primaryButton ? 1 : 0) + (secondaryButton ? 1 : 0);

    const buttons =
        align === 'right' ? (
            <>
                {secondaryButton}
                {primaryButton}
            </>
        ) : (
            <>
                {primaryButton}
                {secondaryButton}
            </>
        );

    const linkContainer = link ? (
        <div
            ref={linkContainerRef}
            className={classnames(numberOfButtons !== 1 ? styles.linkInNewLine : styles.link)}
            data-link="true"
        >
            {link}
        </div>
    ) : null;

    return (
        <div
            className={classnames(styles.container, styles.alignVariant[align], {
                [styles.containerWithTwoButtons]: numberOfButtons > 1,
            })}
            style={{
                ...applyCssVars({
                    [styles.vars.buttonLinkPadding]: `calc(${borderSize} + ${
                        hasSmallLink ? buttonPaddingX.small : buttonPaddingX.default
                    })`,
                }),
            }}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonLayout')}
        >
            {align !== 'right' || numberOfButtons > 1 ? (
                <>
                    {buttons}
                    {linkContainer}
                </>
            ) : (
                <>
                    {linkContainer}
                    {buttons}
                </>
            )}
        </div>
    );
};

export default ButtonLayout;
