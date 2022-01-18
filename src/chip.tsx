import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import Box from './box';
import {Text2} from './text';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';

const useStyles = createUseStyles(({colors}) => ({
    container: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
    },
}));

type ChipProps = {
    children: string;
    icon?: React.ReactNode;
    onClose?: (value: string) => void;
};

const Chip: React.FC<ChipProps> = ({children, icon, onClose}) => {
    const classes = useStyles();
    const {colors, texts} = useTheme();

    return (
        <Box
            className={classes.container}
            paddingY={4}
            paddingLeft={icon ? 8 : 12}
            paddingRight={onClose ? 8 : 12}
        >
            {icon && <Box paddingRight={4}>{icon}</Box>}
            <Text2 medium>{children}</Text2>
            {onClose ? (
                <Box paddingLeft={8}>
                    <IconButton size={16} onPress={() => onClose(children)}>
                        <IconCloseRegular
                            size={16}
                            color={colors.neutralHigh}
                            aria-label={texts.closeButtonLabel}
                        />
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default Chip;
