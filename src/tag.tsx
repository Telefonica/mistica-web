'use client';

import * as React from 'react';
import Box from './box';
import {Text} from './text';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './tag.css';
import {vars} from './skins/skin-contract.css';
import classNames from 'classnames';
import {useTheme} from './hooks';
import Badge from './badge';

import type {DataAttributes, IconProps} from './utils/types';

export type TagType = 'promo' | 'info' | 'active' | 'inactive' | 'success' | 'warning' | 'error';

export type TagProps = {
    // not using "TagType" and repeating the union to make these props playroom autocomplete friendly
    type?: 'promo' | 'info' | 'active' | 'inactive' | 'success' | 'warning' | 'error';
    children: string;
    Icon?: (props: IconProps) => JSX.Element;
    dataAttributes?: DataAttributes;
    badge?: boolean | number;
    backgroundColor?: string;
    textColor?: string;
    small?: boolean;
};

const {colors} = vars;

const Tag = ({
    Icon,
    children,
    dataAttributes,
    type = 'promo',
    badge,
    backgroundColor: customBackgroundColor,
    textColor: customTextColor,
    small = false,
}: TagProps): JSX.Element | null => {
    const {textPresets} = useTheme();
    const themeVariant = useThemeVariant();
    const isOverBrand = themeVariant === 'brand' || themeVariant === 'media';
    const badgeValue = badge === true ? undefined : badge || 0;

    if (!children) {
        return null;
    }

    const tagTypeToColors = {
        // [textColor, inverseTextColor, backgroundColor, backgroundColorInverse]
        promo: [
            colors.tagTextPromo,
            colors.tagTextPromoBrand,
            colors.tagBackgroundPromo,
            colors.tagBackgroundPromoBrand,
        ],
        info: [
            colors.tagTextInfo,
            colors.tagTextInfoBrand,
            colors.tagBackgroundInfo,
            colors.tagBackgroundInfoBrand,
        ],
        active: [
            colors.tagTextActive,
            colors.tagTextActiveBrand,
            colors.tagBackgroundActive,
            colors.tagBackgroundActiveBrand,
        ],
        inactive: [
            colors.tagTextInactive,
            colors.tagTextInactiveBrand,
            // TODO: remove logic for alternative variant (https://jira.tid.es/browse/WEB-1803)
            themeVariant === 'alternative' ? colors.neutralLowAlternative : colors.tagBackgroundInactive,
            colors.tagBackgroundInactiveBrand,
        ],
        success: [
            colors.tagTextSuccess,
            colors.tagTextSuccessBrand,
            colors.tagBackgroundSuccess,
            colors.tagBackgroundSuccessBrand,
        ],
        warning: [
            colors.tagTextWarning,
            colors.tagTextWarningBrand,
            colors.tagBackgroundWarning,
            colors.tagBackgroundWarningBrand,
        ],
        error: [
            colors.tagTextError,
            colors.tagTextErrorBrand,
            colors.tagBackgroundError,
            colors.tagBackgroundErrorBrand,
        ],
    } as const;

    const [defaultTextColor, inverseTextColor, defaultBackgroundColor, backgroundColorInverse] =
        tagTypeToColors[type];

    const textColor = customTextColor || (isOverBrand ? inverseTextColor : defaultTextColor);
    const backgroundColor =
        customBackgroundColor || (isOverBrand ? backgroundColorInverse : defaultBackgroundColor);

    const size = small ? 'small' : 'default';
    const tagSize = styles.tagSize[size];
    const paddingLeft = Icon ? styles.withIconPadding[size] : undefined;
    const paddingRight = badge ? styles.withBadgePadding[size] : undefined;

    return (
        <span
            {...getPrefixedDataAttributes(dataAttributes, 'Tag')}
            className={classNames(styles.tag, tagSize, paddingLeft, paddingRight)}
            style={{
                background: backgroundColor,
            }}
        >
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color={textColor} size={pxToRem(16)} className={styles.icon} />
                </Box>
            )}
            <ThemeVariant isInverse={false}>
                <Text
                    color={textColor}
                    size={small ? 12 : 14}
                    lineHeight={small ? 16 : 20}
                    weight={textPresets.indicator.weight}
                    truncate
                >
                    {children}
                </Text>
                {badgeValue !== 0 && (
                    <div className={styles.badge}>
                        <Badge value={badgeValue} />
                    </div>
                )}
            </ThemeVariant>
        </span>
    );
};

export default Tag;
