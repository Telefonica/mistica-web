import * as React from 'react';
import classnames from 'classnames';
import * as classes from './badge.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type Props = {
    children?: React.ReactNode;
    value?: number;
    right?: number;
    top?: number;
    dataAttributes?: DataAttributes;
};

/**
 * This Component is decorative and won't be read by screenreaders, to make it accessible,
 * set the label to the child element
 *
 * <Badge value={2}>
 *   <IconButton aria-label="Shopping Cart with 2 items">
 *     <IconShoppingCartFilled />
 *   </IconButton>
 * </Badge>
 */
const Badge: React.FC<Props> = ({children, value, right, top, dataAttributes}) => {
    if (children && value === 0) {
        return <>{children}</>;
    }

    if (value === 0) {
        return null;
    }

    const isBigNumber = value && value > 9;

    return (
        <div className={classes.container} {...getPrefixedDataAttributes(dataAttributes, 'Badge')}>
            {value ? (
                <div
                    role="presentation"
                    aria-hidden="true" // otherwise OSX VoiceOver reads this number
                    className={classnames(classes.badgeNumber, {
                        [classes.badgeWithChildren]: !!children,
                        [classes.badgeBigNumber]: isBigNumber,
                    })}
                    style={{right, top}}
                >
                    {isBigNumber ? '+9' : value}
                </div>
            ) : (
                <div
                    style={{right, top}}
                    className={classnames(classes.badge, {
                        [classes.badgeWithChildren]: !!children,
                    })}
                />
            )}
            {children}
        </div>
    );
};

export default Badge;
