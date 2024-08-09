'use client';
import * as React from 'react';
import Inline from './inline';
import {IconStarFilled, IconStarRegular} from '../playroom/components';
import {vars} from './skins/skin-contract.css';
import Touchable from './touchable';
import {useThemeVariant} from './theme-variant-context';
import * as styles from './rating.css';
import classNames from 'classnames';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

type RatingIconProps = {
    ActiveIcon: React.FC<IconProps>;
    InactiveIcon: React.FC<IconProps>;
    color: string;
};

const DEFAULT_RATING_SIZE = 32;
const DEFAULT_INFO_RATING_SIZE = 16;
const DEFAULT_RATING_ICON_COUNT = 5;

const DEFAULT_RATING_ICON: RatingIconProps = {
    ActiveIcon: IconStarFilled,
    InactiveIcon: IconStarRegular,
    color: vars.colors.controlActivated,
};

const DEFAULT_INFO_RATING_ICON: RatingIconProps = {
    ActiveIcon: IconStarFilled,
    InactiveIcon: IconStarRegular,
    color: vars.colors.warning,
};

// TODO: get real icons
const DEFAULT_QUALITATIVE_ICONS: Array<RatingIconProps> = Array.from({length: 5}, () => ({
    ActiveIcon: IconStarFilled,
    InactiveIcon: IconStarRegular,
    color: vars.colors.controlActivated,
}));

interface BaseRatingProps {
    size?: number;
    dataAttributes?: DataAttributes;
}

interface QuantitativeRatingProps extends BaseRatingProps {
    type?: 'quantitative';
    icon?: RatingIconProps;
    count?: number;
    icons?: never;
}

interface QualitativeRatingProps extends BaseRatingProps {
    type: 'qualitative';
    icons?: Array<RatingIconProps>;
    icon?: never;
    count?: never;
}

type RatingProps = ExclusifyUnion<QualitativeRatingProps | QuantitativeRatingProps> & {
    value?: number;
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    disabled?: boolean;
};

type InfoRatingProps = Omit<QuantitativeRatingProps, 'type'> & {
    value?: number;
};

type InternalRatingProps = ExclusifyUnion<RatingProps | InfoRatingProps> & {
    isInteractive: boolean;
};

const useRatingState = ({
    value,
    defaultValue,
    iconsCount,
    onChangeValue,
}: {
    value?: number;
    defaultValue?: number;
    iconsCount: number;
    onChangeValue?: (value: number) => void;
}): [number, (value: number) => void] => {
    const isControlledByParent = value !== undefined;

    const getValueInRange = React.useCallback(
        (value?: number) => {
            return value === undefined ? 0 : Math.max(0, Math.min(iconsCount, value));
        },
        [iconsCount]
    );

    const [currentValue, setCurrentValue] = React.useState<number>(getValueInRange(defaultValue));

    const updateValue = (newValue: number) => {
        if (!isControlledByParent) {
            setCurrentValue(newValue);
        }
        onChangeValue?.(newValue);
    };

    return [isControlledByParent ? getValueInRange(value) : currentValue, updateValue];
};

const InternalRating: React.FC<InternalRatingProps> = ({
    icons = DEFAULT_QUALITATIVE_ICONS,
    count = DEFAULT_RATING_ICON_COUNT,
    icon = DEFAULT_RATING_ICON,
    size = DEFAULT_RATING_SIZE,
    type = 'quantitative',
    dataAttributes,
    onChangeValue,
    defaultValue,
    value,
    isInteractive = false,
    disabled,
}) => {
    const iconList = type === 'qualitative' ? icons : Array.from({length: count}, () => icon);
    const iconSpacing = isInteractive ? 16 : size <= 16 ? 2 : size <= 24 ? 4 : 8;
    const variant = useThemeVariant();

    const [currentValue, setCurrentValue] = useRatingState({
        value,
        defaultValue,
        iconsCount: iconList.length,
        onChangeValue,
    });

    const getIconType = (index: number) => {
        if (type === 'qualitative') {
            return index === currentValue ? 'active' : 'inactive';
        }

        if (isInteractive) {
            return index <= currentValue ? 'active' : 'inactive';
        }

        if (index - 0.75 <= currentValue && currentValue <= index - 0.25) {
            return 'half';
        }

        if (index - 0.25 <= currentValue) {
            return 'active';
        }

        return 'inactive';
    };

    const getIconElement = (icon: RatingIconProps, index: number) => {
        const activeColor = variant === 'inverse' ? vars.colors.inverse : iconList[0].color;
        const inactiveColor =
            variant === 'inverse'
                ? vars.colors.inverse
                : isInteractive
                  ? vars.colors.control
                  : iconList[0].color;

        switch (getIconType(index)) {
            case 'active':
                return <icon.ActiveIcon size={size} color={activeColor} />;

            case 'inactive':
                return <icon.InactiveIcon size={size} color={inactiveColor} />;

            case 'half':
            default:
                return (
                    <div className={styles.halfIconContainer}>
                        <div className={styles.halfIconInactive}>
                            <icon.InactiveIcon size={size} color={inactiveColor} />
                        </div>
                        <div className={styles.halfIconActive}>
                            <icon.ActiveIcon size={size} color={activeColor} />
                        </div>
                    </div>
                );
        }
    };

    const renderIcon = (icon: RatingIconProps, index: number) => {
        const iconElement = getIconElement(icon, index);

        if (!isInteractive) {
            return iconElement;
        }

        return (
            <Touchable
                onPress={() => setCurrentValue(index)}
                disabled={disabled}
                className={classNames(styles.touchable, {[styles.disabled]: disabled})}
            >
                {iconElement}
            </Touchable>
        );
    };

    return (
        <Inline space={iconSpacing} dataAttributes={dataAttributes}>
            {iconList.map((icon, index) => renderIcon(icon, index + 1))}
        </Inline>
    );
};

export const Rating: React.FC<RatingProps> = ({dataAttributes, ...props}) => (
    <InternalRating
        isInteractive
        dataAttributes={{'component-name': 'Rating', ...dataAttributes}}
        {...props}
    />
);

export const InfoRating: React.FC<InfoRatingProps> = ({dataAttributes, icon, size, ...props}) => (
    <InternalRating
        isInteractive={false}
        size={size ?? DEFAULT_INFO_RATING_SIZE}
        icon={icon ?? DEFAULT_INFO_RATING_ICON}
        dataAttributes={{'component-name': 'InfoRating', ...dataAttributes}}
        {...props}
    />
);
