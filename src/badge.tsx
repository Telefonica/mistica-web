'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as classes from './badge.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {Text1} from './text';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import {useIsInverseOrMediaVariant} from './theme-variant-context';

import type {DataAttributes} from './utils/types';

type Props = {
    children?: React.ReactNode;
    value?: number;
    right?: number | string;
    top?: number | string;
    dataAttributes?: DataAttributes;
};

/**
 * This Component is decorative and won't be read by screenreaders, to make it accessible,
 * set the label to the child element
 *
 * <Badge value={2}>
 *   <IconButton aria-label="Shopping Cart with 2 items" Icon={IconShoppingCartFilled}/>
 * </Badge>
 */
const Badge = ({children, value, right, top, dataAttributes}: Props): JSX.Element | null => {
    const isInverse = useIsInverseOrMediaVariant();
    const {textPresets} = useTheme();
    if (children && value === 0) {
        return <>{children}</>;
    }

    if (value === 0) {
        return null;
    }

    const isBigNumber = value && value > 9;
    const hasBorder = isInverse || !!children;

    return (
        <div className={classes.container} {...getPrefixedDataAttributes(dataAttributes, 'Badge')}>
            {children}
            {value ? (
                <div
                    role="presentation"
                    aria-hidden="true" // otherwise OSX VoiceOver reads this number
                    className={classnames(classes.badgeNumber, {
                        [classes.badgeWithChildren]: !!children,
                        [classes.badgeBigNumber]: isBigNumber,
                        [classes.badgeBorder]: hasBorder,
                    })}
                    style={{right, top}}
                >
                    <Text1
                        forceMobileSizes
                        weight={textPresets.indicator.weight}
                        color={vars.colors.textPrimaryInverse}
                    >
                        {isBigNumber ? '+9' : value}
                    </Text1>
                </div>
            ) : (
                <div
                    style={{right, top}}
                    className={classnames(classes.badge, {
                        [classes.badgeWithChildren]: !!children,
                        [classes.badgeBorder]: hasBorder,
                    })}
                />
            )}
        </div>
    );
};

export default Badge;
