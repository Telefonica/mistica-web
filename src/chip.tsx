import * as React from 'react';
import {createUseStyles} from './jss';
import {useAriaId, useTheme} from './hooks';
import Box from './box';
import {Text2} from './text';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {pxToRem} from './utils/css';
import {SPACE} from './utils/key-codes';

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
    checked: {
        '& $container': {
            backgroundColor: colors.tagBackgroundActive,
            borderColor: colors.controlActivated,
            color: colors.controlActivated,
        },
        '& $container > span': {
            color: colors.controlActivated,
        },
    },
}));

type ToggleChipProps = {
    children: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange: (checked: boolean) => void;
    classes: ReturnType<typeof useStyles>;
};

const ToggleChip = ({children, checked, defaultChecked, onChange, classes}: ToggleChipProps) => {
    const isControlledByParent = checked !== undefined;

    const labelId = useAriaId();
    const [checkedState, setCheckedState] = React.useState(!!defaultChecked);

    const handleChange = () => {
        if (isControlledByParent) {
            onChange(!checked);
        } else {
            setCheckedState(!checkedState);
            onChange(!checkedState);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const isChecked = isControlledByParent ? checked : checkedState;

    return (
        <div
            role="checkbox"
            aria-checked={isChecked}
            onKeyDown={handleKeyDown}
            onClick={handleChange}
            tabIndex={0}
            aria-labelledby={labelId}
        >
            <div id={labelId} className={isChecked ? classes.checked : ''}>
                {children}
            </div>
        </div>
    );
};

interface ChipBaseProps {
    children: string;
    Icon?: React.FC<IconProps>;
}

interface SimpleChipProps extends ChipBaseProps {
    onClose?: undefined;
    onChange?: undefined;
}

interface CloasableChipProps extends ChipBaseProps {
    onClose: () => void;

    onChange?: undefined;
    checked?: undefined;
    defaultChecked?: undefined;
}

interface ControlledToggleChipProps extends ChipBaseProps {
    checked: boolean;
    onChange: (value: boolean) => void;

    onClose?: undefined;
    defaultChecked?: undefined;
}

interface UncontrolledToggleChipProps extends ChipBaseProps {
    defaultChecked?: boolean;
    onChange: (value: boolean) => void;

    onClose?: undefined;
    checked?: undefined;
}

type ChipProps =
    | SimpleChipProps
    | CloasableChipProps
    | ControlledToggleChipProps
    | UncontrolledToggleChipProps;

const Chip: React.FC<ChipProps> = (props) => {
    const {texts, isDarkMode} = useTheme();
    const classes = useStyles({isDarkMode});

    const {Icon, children} = props;

    const body = (
        <>
            {Icon && (
                <Box paddingRight={4}>
                    <Icon color="currentColor" size={pxToRem(16)} />
                </Box>
            )}
            <Text2 medium truncate={1} color="currentColor">
                {children}
            </Text2>
        </>
    );

    if (props.onClose) {
        return (
            <Box className={classes.container} paddingLeft={Icon ? 8 : 12}>
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
    } else if (props.onChange) {
        return (
            <ToggleChip
                onChange={props.onChange}
                checked={props.checked}
                defaultChecked={props.defaultChecked}
                classes={classes}
            >
                <Box className={classes.container} paddingLeft={Icon ? 8 : 12} paddingRight={12}>
                    {body}
                </Box>
            </ToggleChip>
        );
    } else {
        return (
            <Box className={classes.container} paddingLeft={Icon ? 8 : 12} paddingRight={12}>
                {body}
            </Box>
        );
    }
};

export default Chip;
