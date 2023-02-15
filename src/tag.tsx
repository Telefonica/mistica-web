import * as React from 'react';
import Box from './box';
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
    const isInverse = useIsInverseVariant();

    if (!children) {
        return null;
    }

    const tagTypeToColors = {
        promo: [colors.promoHigh, colors.promoHighInverse, colors.promoLow],
        active: [colors.brand, colors.brand, colors.brandLow],
        inactive: [colors.neutralMedium, colors.neutralMediumInverse, colors.neutralLow],
        success: [colors.successHigh, colors.successHighInverse, colors.successLow],
        warning: [colors.warningHigh, colors.warningHighInverse, colors.warningLow],
        error: [colors.errorHigh, colors.errorHighInverse, colors.errorLow],
    } as const;

    const [textColor, inverseTextColor, backgroundColor] = tagTypeToColors[type];

    return (
        <span
            {...getPrefixedDataAttributes(dataAttributes, 'Tag')}
            className={classNames(
                classes.tag,
                sprinkles({
                    paddingLeft: Icon ? 8 : 12,
                    background: isInverse ? colors.inverse : backgroundColor,
                })
            )}
        >
            {Icon && (
                <Box paddingRight={4}>
                    <Icon
                        color={isInverse ? inverseTextColor : textColor}
                        size={pxToRem(16)}
                        className={sprinkles({display: 'block'})}
                    />
                </Box>
            )}
            <ThemeVariant isInverse={false}>
                <Text
                    color={isInverse ? inverseTextColor : textColor}
                    size={14}
                    lineHeight={20}
                    weight="medium"
                    truncate
                >
                    {children}
                </Text>
            </ThemeVariant>
        </span>
    );
};

export default Tag;
