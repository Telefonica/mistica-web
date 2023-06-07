import * as React from 'react';
import classnames from 'classnames';
import {useScreenSize, useTheme} from './hooks';
import Badge from './badge';
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
    badge?: boolean | number;
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
    const {Icon, children, id, dataAttributes, active, badge, onClose} = props;
    const {texts, isDarkMode} = useTheme();
    const overAlternative = useThemeVariant() === 'alternative';
    const {isTabletOrSmaller} = useScreenSize();

    const paddingLeft = Icon && isTabletOrSmaller ? 16 : 8 && Icon ? 8 : 20 && isTabletOrSmaller ? 20 : 12;
    const paddingRight = isTabletOrSmaller ? 20 : 12;
    const paddingIcon = isTabletOrSmaller ? 16 : 8;

    const renderBadge = () => {
        if (!badge) {
            return null;
        }
        return <>{badge === true ? <Badge /> : <Badge value={badge} />}</>;
    };

    const body = (
        <>
            {Icon && (
                <Box paddingRight={4} className={active ? styles.iconActive : styles.icon}>
                    <Icon color="currentColor" size={pxToRem(16)} />
                </Box>
            )}
            {onClose || badge ? (
                <Box paddingRight={8}>
                    <Text2 id={id} medium truncate={1} color="currentColor">
                        {children}
                    </Text2>
                </Box>
            ) : (
                <Text2 id={id} medium truncate={1} color="currentColor">
                    {children}
                </Text2>
            )}
        </>
    );

    if (badge && onClose) {
        return (
            <Box
                className={
                    overAlternative ? styles.chipVariants.overAlternative : styles.chipVariants.default
                }
                paddingLeft={paddingLeft}
                paddingRight={paddingIcon}
                {...getPrefixedDataAttributes(dataAttributes, 'Chip')}
            >
                {body}
                <Box>
                    <IconButton
                        size={18}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'default'
                        }}
                        onPress={() => {}}
                    >
                        {renderBadge()}
                    </IconButton>
                </Box>
            </Box>
        );
    }
    if (onClose) {
        return (
            <Box
                className={
                    overAlternative ? styles.chipVariants.overAlternative : styles.chipVariants.default
                }
                paddingLeft={paddingLeft}
                paddingRight={paddingIcon}
                {...getPrefixedDataAttributes(dataAttributes, 'Chip')}
            >
                {body}
                <Box>
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
            paddingRight={paddingRight}
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
