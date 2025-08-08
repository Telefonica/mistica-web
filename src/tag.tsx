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
}: TagProps): JSX.Element | null => {
    const {textPresets} = useTheme();
    const themeVariant = useThemeVariant();
    const isInverse = themeVariant === 'inverse' || themeVariant === 'media';
    const badgeValue = badge === true ? undefined : badge || 0;

    if (!children) {
        return null;
    }

    const tagTypeToColors = {
        // [textColor, inverseTextColor, backgroundColor, backgroundColorInverse]
        promo: [
            colors.tagTextPromo,
            colors.tagTextPromoInverse,
            colors.tagBackgroundPromo,
            colors.tagBackgroundPromoInverse,
        ],
        info: [
            colors.tagTextInfo,
            colors.tagTextInfoInverse,
            colors.tagBackgroundInfo,
            colors.tagBackgroundInfoInverse,
        ],
        active: [
            colors.tagTextActive,
            colors.tagTextActiveInverse,
            colors.tagBackgroundActive,
            colors.tagBackgroundActiveInverse,
        ],
        inactive: [
            colors.tagTextInactive,
            colors.tagTextInactiveInverse,
            // TODO: remove logic for alternative variant (https://jira.tid.es/browse/WEB-1803)
            themeVariant === 'alternative' ? colors.neutralLowAlternative : colors.tagBackgroundInactive,
            colors.tagBackgroundInactiveInverse,
        ],
        success: [
            colors.tagTextSuccess,
            colors.tagTextSuccessInverse,
            colors.tagBackgroundSuccess,
            colors.tagBackgroundSuccessInverse,
        ],
        warning: [
            colors.tagTextWarning,
            colors.tagTextWarningInverse,
            colors.tagBackgroundWarning,
            colors.tagBackgroundWarningInverse,
        ],
        error: [
            colors.tagTextError,
            colors.tagTextErrorInverse,
            colors.tagBackgroundError,
            colors.tagBackgroundErrorInverse,
        ],
    } as const;

    const [defaultTextColor, inverseTextColor, defaultBackgroundColor, backgroundColorInverse] =
        tagTypeToColors[type];

    const textColor = customTextColor || (isInverse ? inverseTextColor : defaultTextColor);
    const backgroundColor =
        customBackgroundColor || (isInverse ? backgroundColorInverse : defaultBackgroundColor);

    return (
        <span
            {...getPrefixedDataAttributes(dataAttributes, 'Tag')}
            className={classNames(styles.tag)}
            style={{
                paddingLeft: Icon ? 8 : 12,
                paddingRight: badgeValue !== 0 ? 8 : 12,
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
                    size={14}
                    lineHeight={20}
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
