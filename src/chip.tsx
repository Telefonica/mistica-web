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
    value: string;
    startIcon?: React.ReactNode;
    onClose?: (value: string) => void;
};

const Chip: React.FC<ChipProps> = ({value, startIcon, onClose}) => {
    const classes = useStyles();
    const {colors} = useTheme();

    return (
        <Box
            className={classes.container}
            paddingY={4}
            paddingLeft={startIcon ? 8 : 12}
            paddingRight={onClose ? 8 : 12}
        >
            {startIcon && <Box paddingRight={4}>{startIcon}</Box>}
            <Text2 medium>{value}</Text2>
            {onClose ? (
                <Box paddingLeft={8}>
                    <IconButton size={16} onPress={() => onClose(value)}>
                        <IconCloseRegular size={16} color={colors.neutralHigh} />
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default Chip;
