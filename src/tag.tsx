import * as React from 'react';
import Box from './box';
import {useTheme} from './hooks';
import {Text} from './text';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as classes from './tag.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import classNames from 'classnames';

import type {DataAttributes, IconProps} from './utils/types';

export type TagType = 'promo' | 'active' | 'inactive' | 'success' | 'warning' | 'error';

export type TagProps = {
    // not using "TagType" and repeating the union to make these props playroom autocomplete friendly
    type?: 'promo' | 'active' | 'inactive' | 'success' | 'warning' | 'error';
    children: string;
    Icon?: React.FC<IconProps>;
    dataAttributes?: DataAttributes;
};

const {colors} = vars;

const Tag: React.FC<TagProps> = ({Icon, children, dataAttributes, type = 'promo'}) => {
    const {isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();

    if (!children) {
        return null;
    }

    const tagTypeToColors = {
        promo: [colors.promoHigh, colors.promoLow],
        active: [colors.brand, colors.brandLow],
        inactive: [colors.neutralMedium, colors.neutralLow],
        success: [colors.successHigh, colors.successLow],
        warning: [colors.warningHigh, colors.warningLow],
        error: [colors.errorHigh, colors.errorLow],
    } as const;

    const [textColor, backgroundColor] = tagTypeToColors[type];

    const shouldUseInverseBackground = isInverse && !isDarkMode;

    return (
        <span
            {...getPrefixedDataAttributes(dataAttributes)}
            className={classNames(
                classes.tag,
                sprinkles({
                    paddingLeft: Icon ? 8 : 12,
                    background: shouldUseInverseBackground ? colors.inverse : backgroundColor,
                })
            )}
        >
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color={textColor} size={pxToRem(16)} className={sprinkles({display: 'block'})} />
                </Box>
            )}
            <ThemeVariant isInverse={false}>
                <Text color={textColor} size={14} lineHeight={20} weight="medium" truncate>
                    {children}
                </Text>
            </ThemeVariant>
        </span>
    );
};

export default Tag;
