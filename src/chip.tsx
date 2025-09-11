'use client';
import * as React from 'react';
import classnames from 'classnames';
import {useTheme} from './hooks';
import Badge from './badge';
import {Text2} from './text';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {pxToRem} from './utils/css';
import * as styles from './chip.css';
import {vars} from './skins/skin-contract.css';
import {useThemeVariant} from './theme-variant-context';
import Touchable, {BaseTouchable} from './touchable';
import * as tokens from './text-tokens';
import {getPrefixedDataAttributes} from './utils/dom';

import type {TouchableComponentProps} from './touchable';
import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

interface SimpleChipProps {
    children: string;
    Icon?: (props: IconProps) => JSX.Element;
    id?: string;
    dataAttributes?: DataAttributes;
    badge?: boolean | number;
}

interface ClosableChipProps extends SimpleChipProps {
    onClose: () => void;
    closeButtonLabel?: string;
}

interface ToggleChipProps extends SimpleChipProps {
    active: boolean;
}

interface ToggleChipProps extends SimpleChipProps {
    active: boolean;
}

type ClickableChipProps = TouchableComponentProps<SimpleChipProps & {active?: boolean}>;

type ChipProps = ExclusifyUnion<ClosableChipProps | ToggleChipProps | ClickableChipProps>;

const Chip = (props: ChipProps): JSX.Element => {
    const {Icon, children, id, dataAttributes, badge, active, onClose, closeButtonLabel} = props;
    const {texts, textPresets, t} = useTheme();
    const themeVariante = useThemeVariant();
    const overAlternative = themeVariante === 'alternative';
    const overInverse = themeVariante === 'inverse';

    const isTouchable = props.href || props.onPress || props.to;
    const isInteractive = active !== undefined || isTouchable;

    const body = (
        <>
            {Icon && (
                <div
                    className={
                        active
                            ? isTouchable
                                ? overInverse
                                    ? styles.iconNavigationInverse
                                    : styles.iconNavigation
                                : styles.iconActive
                            : styles.icon
                    }
                >
                    <Icon color="currentColor" size={pxToRem(16)} />
                </div>
            )}
            <div style={{paddingRight: badge ? 8 : 0 || onClose ? 4 : 0, display: 'flex'}}>
                <Text2 id={id} weight={textPresets.indicator.weight} color="currentColor">
                    {children}
                </Text2>
            </div>
        </>
    );

    const chipDataAttributes = {'component-name': 'Chip', testid: 'Chip', ...dataAttributes};

    if (onClose) {
        return (
            <div
                className={classnames(
                    overAlternative ? styles.chipVariants.overAlternative : styles.chipVariants.default,
                    styles.chipWrapper,
                    Icon ? styles.leftPadding.withIcon : styles.leftPadding.default,
                    styles.rightPadding.withIcon
                )}
                {...getPrefixedDataAttributes(chipDataAttributes)}
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
                    aria-label={closeButtonLabel || texts.closeButtonLabel || t(tokens.closeButtonLabel)}
                    onPress={() => onClose()}
                >
                    <IconCloseRegular size={pxToRem(16)} color={vars.colors.neutralMedium} />
                </Touchable>
            </div>
        );
    }

    const renderBadge = () => {
        if (!badge) {
            return null;
        }
        return badge === true ? <Badge /> : <Badge value={badge} />;
    };

    const renderContent = (dataAttributes?: DataAttributes) => (
        <div
            className={classnames(
                styles.chipVariants[
                    active
                        ? isTouchable
                            ? overInverse
                                ? 'navigationActiveInverse'
                                : 'navigationActive'
                            : 'active'
                        : overAlternative
                          ? 'overAlternative'
                          : 'default'
                ],

                isTouchable ? styles.wrappedContent : styles.chipWrapper,
                {
                    [styles.interactive]: isInteractive,
                },
                Icon ? styles.leftPadding.withIcon : styles.leftPadding.default,
                badge ? styles.rightPadding.withIcon : styles.rightPadding.default
            )}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {isInteractive && <div className={styles.interactiveChipOverlay} />}
            {body}
            {renderBadge()}
        </div>
    );

    if (isTouchable) {
        return (
            <BaseTouchable
                {...props}
                className={classnames(styles.chipWrapper, styles.button)}
                dataAttributes={chipDataAttributes}
            >
                {renderContent()}
            </BaseTouchable>
        );
    }

    return renderContent(chipDataAttributes);
};

export default Chip;
