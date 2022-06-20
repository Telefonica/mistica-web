import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import Box from './box';
import {Text2} from './text';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {pxToRem} from './utils/css';
import classNames from 'classnames';

import type {IconProps} from './utils/types';

const useStyles = createUseStyles(({colors, mq}) => ({
    container: {
        display: 'inline-flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${colors.border}`,
        borderRadius: 20,
        backgroundColor: colors.backgroundContainer,
        minHeight: 32,
        minWidth: 56,
        cursor: 'default',

        color: colors.neutralMedium, // Giving color to icons

        '& > span': {
            color: colors.textPrimary, // Giving color to text
        },
    },
    interactive: {
        userSelect: 'none',
        [mq.supportsHover]: {
            '&:hover:not($active)': {
                borderColor: ({isDarkMode}) => (isDarkMode ? colors.background : colors.brandLow),
                color: colors.controlActivated, // Giving color to icons on hover
                backgroundColor: colors.brandLow,
            },
            '&:hover > span': {
                color: colors.controlActivated, // Giving color to text on hover
            },
        },
    },
    active: {
        borderColor: colors.controlActivated,
        color: colors.controlActivated,
        backgroundColor: colors.brandLow,
        '& > span': {
            color: colors.controlActivated,
        },
    },
}));

interface ChipBaseProps {
    children: string;
    Icon?: React.FC<IconProps>;
    id?: string;
}

interface SimpleChipProps extends ChipBaseProps {
    onClose?: undefined;
    active?: undefined;
}

interface ClosableChipProps extends ChipBaseProps {
    onClose: () => void;

    active?: undefined;
}

interface ToggleChipProps extends ChipBaseProps {
    active: boolean;

    onClose?: undefined;
}

type ChipProps = SimpleChipProps | ClosableChipProps | ToggleChipProps;

const Chip: React.FC<ChipProps> = (props) => {
    const {texts, isDarkMode} = useTheme();
    const classes = useStyles({isDarkMode});

    const {Icon, children, id} = props;

    const body = (
        <>
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color="currentColor" size={pxToRem(16)} />
                </Box>
            )}
            <Text2 id={id} medium truncate={1} color="currentColor">
                {children}
            </Text2>
        </>
    );

    const paddingLeft = Icon ? 8 : 12;

    if (props.onClose) {
        return (
            <Box className={classes.container} paddingLeft={paddingLeft}>
                {body}
                <Box paddingLeft={4}>
                    <IconButton
                        size={24}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        aria-label={texts.closeButtonLabel}
                        onPress={() => props.onClose()}
                    >
                        <IconCloseRegular size={16} color="currentColor" />
                    </IconButton>
                </Box>
            </Box>
        );
    } else {
        const isInteractive = props.active !== undefined;
        return (
            <Box
                className={classNames(classes.container, {
                    [classes.interactive]: isInteractive,
                    [classes.active]: props.active,
                })}
                paddingLeft={paddingLeft}
                paddingRight={12}
            >
                {body}
            </Box>
        );
    }
};

export default Chip;
