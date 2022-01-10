import * as React from 'react';
import Box from './box';
import {useTheme} from './hooks';
import {createUseStyles} from './jss';
import {Text} from './text';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';

import type {IconProps} from './utils/types';

const useStyles = createUseStyles(() => ({
    tag: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        minWidth: 56,
        padding: ({hasIcon}) => `4px 12px 4px ${hasIcon ? 8 : 12}px`,

        // FIXME: remove this style and use an inline style for the icon once WEB-338 gets merged
        '& svg': {
            display: 'block',
        },
    },
}));

type TagType = 'promo' | 'active' | 'inactive' | 'success' | 'warning' | 'error';

export type TagProps = {
    // not using "TagType" and repeating the union to make these props playroom autocomplete friendly
    type?: 'promo' | 'active' | 'inactive' | 'success' | 'warning' | 'error';
    children: string;
    Icon?: React.FC<IconProps>;

    /** @deprecated use type prop */
    color?: string;
};

const Tag: React.FC<TagProps> = ({Icon, children, type = 'promo', color}) => {
    const classes = useStyles({hasIcon: !!Icon});
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();

    if (!children) {
        return null;
    }

    /**
     * Legacy implementation
     *
     * @deprecated to be removed in the next major version
     */
    if (color) {
        // Hardcode black text in darkmode because there isn't a black text color constant that we can use in dark mode
        const blackText = isDarkMode ? '#313235' : colors.textPrimary;

        const textColor = color === colors.inverse ? blackText : colors.textPrimaryInverse;
        return (
            <ThemeVariant isInverse={false}>
                <span className={classes.tag} style={{background: color}}>
                    <Text color={textColor} size={14} lineHeight={20} weight="medium" truncate>
                        {children}
                    </Text>
                </span>
            </ThemeVariant>
        );
    }

    const tagTypeToColors: Record<TagType, [string, string]> = {
        promo: [colors.textTagPromo, colors.tagBackgroundPromo],
        active: [colors.textTagActive, colors.tagBackgroundActive],
        inactive: [colors.textTagInactive, colors.tagBackgroundInactive],
        success: [colors.textTagSuccess, colors.tagBackgroundSuccess],
        warning: [colors.textTagWarning, colors.tagBackgroundWarning],
        error: [colors.textTagError, colors.tagBackgroundError],
    };
    const [textColor, backgroundColor] = tagTypeToColors[type];

    const shouldUseInverseBackground = isInverse && !isDarkMode;

    return (
        <span
            className={classes.tag}
            style={{background: shouldUseInverseBackground ? colors.inverse : backgroundColor}}
        >
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color={textColor} size={pxToRem(16)} />
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
