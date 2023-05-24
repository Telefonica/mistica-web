import * as React from 'react';
import classNames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './button-group.css';

import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {DataAttributes, RendersNullableElement} from './utils/types';

export interface ButtonGroupProps {
    primaryButton?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({primaryButton, secondaryButton, link, dataAttributes}) => {
    const anyAction = !!primaryButton || !!secondaryButton || !!link;
    const bothButtons = !!primaryButton && !!secondaryButton;

    return anyAction ? (
        <div
            className={classNames(styles.inline, styles.container)}
            {...getPrefixedDataAttributes(dataAttributes, 'ButtonGroup')}
        >
            {(primaryButton || secondaryButton) && (
                <div className={classNames(styles.inline, styles.buttons)}>
                    {primaryButton && <div className={styles.buttonChild}>{primaryButton}</div>}
                    {secondaryButton && <div className={styles.buttonChild}>{secondaryButton}</div>}
                </div>
            )}
            {link && (
                <div className={styles.buttonChild} style={{width: bothButtons ? '100%' : 'auto'}}>
                    {link}
                </div>
            )}
        </div>
    ) : null;
};

export default ButtonGroup;
