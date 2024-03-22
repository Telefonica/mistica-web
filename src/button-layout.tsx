'use client';
import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-layout.css';

import type {DataAttributes, RendersNullableElement} from './utils/types';
import type {NullableButtonElement, ButtonLink} from './button';

type MaybeButtonElement = NullableButtonElement | void | false;

type ButtonLayoutProps = {
    /** @deprecated Use primaryButton and secondaryButton props */
    children?: MaybeButtonElement | [MaybeButtonElement, MaybeButtonElement];
    align?: 'center' | 'left' | 'right' | 'full-width';
    primaryButton?: RendersNullableElement<typeof ButtonPrimary | typeof ButtonDanger>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    /** @deprecated Use a wrapping Box if you need paddings */
    withMargins?: boolean;
    dataAttributes?: DataAttributes;
};

const buttonsRange = [ButtonPrimary, ButtonDanger, ButtonSecondary];

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
    children,
    primaryButton,
    secondaryButton,
    align = 'full-width',
    link,
    withMargins = false,
    dataAttributes,
}) => {
    const sortedButtons = React.Children.toArray(children as any).sort((b1: any, b2: any) => {
        const range1 = buttonsRange.indexOf(b1.type);
        const range2 = buttonsRange.indexOf(b2.type);
        return range1 - range2;
    });

    const numberOfButtons = children
        ? sortedButtons.length
        : (primaryButton ? 1 : 0) + (secondaryButton ? 1 : 0);

    const content = (
        <div
            className={classnames(styles.container, styles.alignVariant[align], {
                [styles.containerWithTwoButtons]: numberOfButtons > 1,
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonLayout')}
        >
            {children ? (
                sortedButtons
            ) : (
                <>
                    {primaryButton}
                    {secondaryButton}
                </>
            )}
            {link ? (
                <div
                    className={classnames(numberOfButtons > 1 ? styles.linkWithTwoButtons : styles.link)}
                    data-link="true"
                >
                    {link}
                </div>
            ) : null}
        </div>
    );

    return withMargins ? <div className={styles.margins}>{content}</div> : content;
};

export default ButtonLayout;
