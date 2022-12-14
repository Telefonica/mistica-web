import * as React from 'react';
import classnames from 'classnames';
import {useTheme} from './hooks';
import Box from './box';
import {Text2} from './text';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {pxToRem} from './utils/css';
import * as styles from './chip.css';
import {vars} from './skins/skin-contract.css';

import type {IconProps} from './utils/types';

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

    const {Icon, children, id} = props;

    const body = (
        <>
            {Icon && (
                <Box paddingRight={4} className={props.active ? styles.iconActive : styles.icon}>
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
            <Box className={styles.chipVariants.default} paddingLeft={paddingLeft}>
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
                        <IconCloseRegular size={16} color={vars.colors.neutralMedium} />
                    </IconButton>
                </Box>
            </Box>
        );
    } else {
        const isInteractive = props.active !== undefined;
        return (
            <Box
                className={classnames(styles.chipVariants[props.active ? 'active' : 'default'], {
                    [styles.chipInteractiveVariants[isDarkMode ? 'dark' : 'light']]: isInteractive,
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
