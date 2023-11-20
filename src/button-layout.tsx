import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonDanger} from './button';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-layout.css';

import type {DataAttributes, RendersNullableElement} from './utils/types';
import type {NullableButtonElement, ButtonLink} from './button';

type MaybeButtonElement = NullableButtonElement | void | false;

type ButtonLayoutProps = {
    children?: MaybeButtonElement | [MaybeButtonElement, MaybeButtonElement];
    align?: 'center' | 'left' | 'right' | 'full-width';
    link?: RendersNullableElement<typeof ButtonLink>;
    withMargins?: boolean;
    dataAttributes?: DataAttributes;
};

const buttonsRange = [ButtonSecondary, ButtonDanger, ButtonPrimary];

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
    children,
    align = 'full-width',
    link,
    withMargins = false,
    dataAttributes,
}) => {
    const childrenCount = React.Children.count(children);

    const sortedButtons = React.Children.toArray(children as any).sort((b1: any, b2: any) => {
        const range1 = buttonsRange.indexOf(b1.type);
        const range2 = buttonsRange.indexOf(b2.type);
        return range1 - range2;
    });

    const content = (
        <div
            className={classnames(
                styles.baseContainer,
                styles.alignVariant[align],
                align === 'full-width' ? styles.fullWidthContainer : styles.container,
                {
                    [styles.alignMoreThanOneChildren]: childrenCount > 1,
                }
            )}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonLayout')}
        >
            {link ? (
                <div
                    className={classnames(styles.link, {[styles.linkAlignment]: align === 'left'})}
                    data-link="true"
                >
                    {link}
                </div>
            ) : null}
            {sortedButtons}
        </div>
    );

    return withMargins ? <div className={styles.margins}>{content}</div> : content;
};

export default ButtonLayout;
