'use client';
import * as React from 'react';
import classnames from 'classnames';
import {useTheme} from './hooks';
import Badge from './badge';
import Box from './box';
import {Text2} from './text';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {pxToRem} from './utils/css';
import * as styles from './chip.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useThemeVariant} from './theme-variant-context';
import Touchable, {BaseTouchable} from './touchable';

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
    const {texts, isDarkMode, textPresets} = useTheme();

    const overAlternative = useThemeVariant() === 'alternative';

    const paddingLeft = Icon ? ({mobile: 16, desktop: 8} as const) : ({mobile: 20, desktop: 12} as const);
    const paddingRight = {mobile: 20, desktop: 12} as const;
    const paddingIcon = {mobile: 16, desktop: 8} as const;

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
            <Box paddingRight={badge ? 8 : 0 || onClose ? 4 : 0}>
                <Text2 id={id} weight={textPresets.indicator.weight} truncate={1} color="currentColor">
                    {children}
                </Text2>
            </Box>
        </>
    );

    if (badge) {
        return (
            <Box
                className={classnames(
                    overAlternative ? styles.chipVariants.overAlternative : styles.chipVariants.default,
                    styles.chipWrapper
                )}
                paddingLeft={paddingLeft}
                paddingRight={paddingIcon}
                {...getPrefixedDataAttributes(dataAttributes, 'Chip')}
            >
                {body}
                {renderBadge()}
            </Box>
        );
    }
    if (onClose) {
        return (
            <Box
                className={classnames(
                    overAlternative ? styles.chipVariants.overAlternative : styles.chipVariants.default,
                    styles.chipWrapper
                )}
                paddingLeft={paddingLeft}
                paddingRight={paddingIcon}
                {...getPrefixedDataAttributes(dataAttributes, 'Chip')}
            >
                {body}
                <Touchable
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: pxToRem(24),
                        height: pxToRem(24),
                    }}
                    aria-label={texts.closeButtonLabel}
                    onPress={() => onClose()}
                >
                    <IconCloseRegular size={pxToRem(16)} color={vars.colors.neutralMedium} />
                </Touchable>
            </Box>
        );
    }
    const isInteractive = active !== undefined || props.href || props.onPress || props.to;

    const chipDataAttributes = {'component-name': 'Chip', ...dataAttributes};

    const renderContent = (dataAttributes?: DataAttributes) => (
        <Box
            className={classnames(
                styles.chipVariants[active ? 'active' : overAlternative ? 'overAlternative' : 'default'],
                // If the chip is wrapped inside a BaseTouchable, we set inline-flex to the Touchable instead
                props.href || props.onPress || props.to ? styles.wrappedContent : styles.chipWrapper,
                {
                    [styles.chipInteractiveVariants[isDarkMode ? 'dark' : 'light']]: isInteractive,
                }
            )}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            dataAttributes={dataAttributes}
        >
            {body}
        </Box>
    );

    if (props.onPress) {
        return (
            <BaseTouchable
                className={classnames(styles.chipWrapper, styles.button)}
                trackingEvent={props.trackingEvent}
                onPress={props.onPress}
                dataAttributes={chipDataAttributes}
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
                dataAttributes={chipDataAttributes}
                className={styles.chipWrapper}
            >
                {renderContent()}
            </BaseTouchable>
        );
    }

    if (props.href) {
        return (
            <BaseTouchable
                trackingEvent={props.trackingEvent}
                href={props.href}
                newTab={props.newTab}
                dataAttributes={chipDataAttributes}
                className={styles.chipWrapper}
            >
                {renderContent()}
            </BaseTouchable>
        );
    }

    return renderContent(chipDataAttributes);
};

export default Chip;
