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
import {getPrefixedDataAttributes} from './utils/dom';
import {useThemeVariant} from './theme-variant-context';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

interface SimpleChipProps {
    children: string;
    Icon?: React.FC<IconProps>;
    id?: string;
    dataAttributes?: DataAttributes;
}

interface ClosableChipProps extends SimpleChipProps {
    onClose: () => void;
}

interface ToggleChipProps extends SimpleChipProps {
    active: boolean;
}

type ChipProps = ExclusifyUnion<SimpleChipProps | ClosableChipProps | ToggleChipProps>;

const Chip: React.FC<ChipProps> = ({Icon, children, id, dataAttributes, active, onClose}: ChipProps) => {
    const {texts, isDarkMode} = useTheme();
    const overAlternative = useThemeVariant() === 'alternative';

    const body = (
        <>
            {Icon && (
                <Box paddingRight={4} className={active ? styles.iconActive : styles.icon}>
                    <Icon color="currentColor" size={pxToRem(16)} />
                </Box>
            )}
            <Text2 id={id} medium truncate={1} color="currentColor">
                {children}
            </Text2>
        </>
    );

    const paddingLeft = Icon ? 8 : 12;

    if (onClose) {
        return (
            <Box
                className={
                    overAlternative ? styles.chipVariants.overAlternative : styles.chipVariants.default
                }
                paddingLeft={paddingLeft}
                {...getPrefixedDataAttributes(dataAttributes, 'Chip')}
            >
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
                        onPress={() => onClose()}
                    >
                        <IconCloseRegular size={16} color={vars.colors.neutralMedium} />
                    </IconButton>
                </Box>
            </Box>
        );
    } else {
        const isInteractive = active !== undefined;
        return (
            <Box
                className={classnames(
                    styles.chipVariants[active ? 'active' : overAlternative ? 'overAlternative' : 'default'],
                    {
                        [styles.chipInteractiveVariants[isDarkMode ? 'dark' : 'light']]: isInteractive,
                    }
                )}
                paddingLeft={paddingLeft}
                paddingRight={12}
                {...getPrefixedDataAttributes(dataAttributes, 'Chip')}
            >
                {body}
            </Box>
        );
    }
};

export default Chip;
