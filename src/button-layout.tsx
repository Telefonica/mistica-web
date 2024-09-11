'use client';
import * as React from 'react';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-layout.css';

import type {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from './button';
import type {DataAttributes, RendersNullableElement} from './utils/types';

type ButtonLayoutProps = {
    align?: 'center' | 'left' | 'right' | 'full-width';
    primaryButton?: RendersNullableElement<typeof ButtonPrimary | typeof ButtonDanger>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
};

const ButtonLayout = ({
    primaryButton,
    secondaryButton,
    align = 'full-width',
    link,
    dataAttributes,
}: ButtonLayoutProps): JSX.Element => {
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
