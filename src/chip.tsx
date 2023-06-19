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
import {BaseTouchable} from './touchable';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps, TrackingEvent} from './utils/types';

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

interface HrefChipProps extends SimpleChipProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    href: string;
    newTab?: boolean;
    active?: boolean;
}

interface ToChipProps extends SimpleChipProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    active?: boolean;
}

interface OnPressChipProps extends SimpleChipProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    onPress: () => void;
    active?: boolean;
}

type ClickableChipProps = ExclusifyUnion<HrefChipProps | ToChipProps | OnPressChipProps>;

type ChipProps = ExclusifyUnion<SimpleChipProps | ClosableChipProps | ToggleChipProps | ClickableChipProps>;

const Chip: React.FC<ChipProps> = (props: ChipProps) => {
    const {Icon, children, id, dataAttributes, active, onClose} = props;
    const {texts, isDarkMode, textPresets} = useTheme();
    const overAlternative = useThemeVariant() === 'alternative';

    const body = (
        <>
            {Icon && (
                <Box paddingRight={4} className={active ? styles.iconActive : styles.icon}>
                    <Icon color="currentColor" size={pxToRem(16)} />
                </Box>
            )}
            <Text2 id={id} weight={textPresets.indicator.weight} truncate={1} color="currentColor">
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
    }
    const isInteractive = active !== undefined || props.href || props.onPress || props.to;

    const renderContent = () => (
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

    if (props.onPress) {
        return (
            <BaseTouchable
                className={styles.button}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
            >
                {renderContent()}
            </BaseTouchable>
        );
    }

    if (props.to) {
        return (
            <BaseTouchable
                trackingEvent={props.trackingEvent}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
            >
                {renderContent()}
            </BaseTouchable>
        );
    }

    if (props.href) {
        return (
            <BaseTouchable trackingEvent={props.trackingEvent} href={props.href} newTab={props.newTab}>
                {renderContent()}
            </BaseTouchable>
        );
    }

    return renderContent();
};

export default Chip;
