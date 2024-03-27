'use client';

import * as React from 'react';
import Box from './box';
import {Text} from './text';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as classes from './tag.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import classNames from 'classnames';
import {useTheme} from './hooks';
import Badge from './badge';

import type {DataAttributes, IconProps} from './utils/types';

export type TagType = 'promo' | 'active' | 'inactive' | 'success' | 'warning' | 'error';

export type TagProps = {
    // not using "TagType" and repeating the union to make these props playroom autocomplete friendly
    type?: 'promo' | 'active' | 'inactive' | 'success' | 'warning' | 'error';
    children: string;
    Icon?: React.FC<IconProps>;
    dataAttributes?: DataAttributes;
    badge?: boolean | number;
};

const {colors} = vars;

const Tag: React.FC<TagProps> = ({Icon, children, dataAttributes, type = 'promo', badge}) => {
    const {textPresets} = useTheme();
    const themeVariant = useThemeVariant();
    const isInverse = themeVariant === 'inverse';
    const badgeValue = badge === true ? undefined : badge || 0;

    if (!children) {
        return null;
    }

    const tagTypeToColors = {
        // [textColor, backgroundColor]
        promo: [colors.tagTextPromo, colors.tagBackgroundPromo],
        active: [colors.tagTextActive, colors.tagBackgroundActive],
        inactive: [
            colors.tagTextInactive,
            themeVariant === 'alternative' ? colors.neutralLowAlternative : colors.tagBackgroundInactive,
        ],
        success: [colors.tagTextSuccess, colors.tagBackgroundSuccess],
        warning: [colors.tagTextWarning, colors.tagBackgroundWarning],
        error: [colors.tagTextError, colors.tagBackgroundError],
    } as const;

    const [textColor, backgroundColor] = tagTypeToColors[type];

    return (
        <span
            {...getPrefixedDataAttributes(dataAttributes, 'Tag')}
            className={classNames(
                classes.tag,
                sprinkles({
                    paddingLeft: Icon ? 8 : 12,
                    paddingRight: badgeValue !== 0 ? 8 : 12,
                    background: backgroundColor,
                })
            )}
        >
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color={textColor} size={pxToRem(16)} className={sprinkles({display: 'block'})} />
                </Box>
            )}
            <ThemeVariant isInverse={false}>
                <Text
                    color={textColor}
                    size={14}
                    lineHeight={20}
                    weight={textPresets.indicator.weight}
                    truncate
                >
                    {children}
                </Text>
                {badgeValue !== 0 && (
                    <Box paddingLeft={4} className={sprinkles({display: 'inline-flex'})}>
                        <Badge value={badgeValue} />
                    </Box>
                )}
            </ThemeVariant>
        </span>
    );
};

export default Tag;
