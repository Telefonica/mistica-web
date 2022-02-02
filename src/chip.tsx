import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import Box from './box';
import {Text2} from './text';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {pxToRem} from './utils/css';

import type {IconProps} from './utils/types';

const useStyles = createUseStyles(({colors, mq}) => ({
    container: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${colors.border}`,
        borderRadius: 20,
        backgroundColor: colors.backgroundContainer,
        minHeight: 32,
        minWidth: 56,

        color: colors.neutralMedium, // Giving color to icons

        '& > span': {
            color: colors.textPrimary, // Giving color to text
        },

        [mq.supportsHover]: {
            '&:hover': {
                borderColor: ({isDarkMode}) => (isDarkMode ? colors.background : colors.tagBackgroundActive),
                color: colors.controlActivated, // Giving color to icons on hover
                backgroundColor: colors.tagBackgroundActive,
            },
            '&:hover > span': {
                color: colors.textLink, // Giving color to text on hover
            },
        },
    },
}));

type ChipProps = {
    children: string;
    Icon?: React.FC<IconProps>;
    onClose?: () => void;
};

const Chip: React.FC<ChipProps> = ({children, Icon, onClose}) => {
    const {texts, isDarkMode} = useTheme();
    const classes = useStyles({isDarkMode});

    return (
        <Box className={classes.container} paddingLeft={Icon ? 8 : 12} paddingRight={onClose ? 0 : 12}>
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color="currentColor" size={pxToRem(16)} />
                </Box>
            )}
            <Text2 medium truncate={1} color="currentColor">
                {children}
            </Text2>
            {onClose ? (
                <Box paddingLeft={4}>
                    <IconButton
                        size={24}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        aria-label={texts.closeButtonLabel}
                        onPress={() => onClose()}
                    >
                        <IconCloseRegular size={16} color="currentColor" />
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default Chip;
