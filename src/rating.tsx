'use client';
import * as React from 'react';
import Inline from './inline';
import {vars} from './skins/skin-contract.css';
import {useThemeVariant} from './theme-variant-context';
import * as styles from './rating.css';
import classNames from 'classnames';
import {applyCssVars} from './utils/css';
import {isTouchableDevice} from './utils/environment';
import RadioButton, {RadioGroup} from './radio-button';
import {isEqual} from './utils/helpers';
import IconStarFilled from './generated/mistica-icons/icon-star-filled';
import IconStarRegular from './generated/mistica-icons/icon-star-regular';
import IconFaceSadFilled from './generated/mistica-icons/icon-face-sad-filled';
import IconFaceSadRegular from './generated/mistica-icons/icon-face-sad-regular';
import IconFaceSlightlySadFilled from './generated/mistica-icons/icon-face-slightly-sad-filled';
import IconFaceSlightlySadRegular from './generated/mistica-icons/icon-face-slightly-sad-regular';
import IconFaceNeutralFilled from './generated/mistica-icons/icon-face-neutral-filled';
import IconFaceNeutralRegular from './generated/mistica-icons/icon-face-neutral-regular';
import IconFaceHappyFilled from './generated/mistica-icons/icon-face-happy-filled';
import IconFaceHappyRegular from './generated/mistica-icons/icon-face-happy-regular';
import IconFaceSuperHappyFilled from './generated/mistica-icons/icon-face-super-happy-filled';
import IconFaceSuperHappyRegular from './generated/mistica-icons/icon-face-super-happy-regular';
import {useTheme} from './hooks';
import * as tokens from './text-tokens';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

type RatingIconProps = {
    ActiveIcon: (props: IconProps) => JSX.Element;
    InactiveIcon: (props: IconProps) => JSX.Element;
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

const DEFAULT_QUALITATIVE_ICONS: Array<RatingIconProps> = [
    {
        ActiveIcon: IconFaceSadFilled,
        InactiveIcon: IconFaceSadRegular,
        color: vars.colors.errorHigh,
    },
    {
        ActiveIcon: IconFaceSlightlySadFilled,
        InactiveIcon: IconFaceSlightlySadRegular,
        color: vars.colors.error,
    },
    {
        ActiveIcon: IconFaceNeutralFilled,
        InactiveIcon: IconFaceNeutralRegular,
        color: vars.colors.warning,
    },
    {
        ActiveIcon: IconFaceHappyFilled,
        InactiveIcon: IconFaceHappyRegular,
        color: vars.colors.success,
    },
    {
        ActiveIcon: IconFaceSuperHappyFilled,
        InactiveIcon: IconFaceSuperHappyRegular,
        color: vars.colors.successHigh,
    },
];

interface BaseRatingProps {
    size?: number;
    dataAttributes?: DataAttributes;
    valueLabels?: Array<string>;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

interface QuantitativeRatingProps extends BaseRatingProps {
    type?: 'quantitative';
    icon?: RatingIconProps;
    count?: number;
}

interface QualitativeRatingProps extends BaseRatingProps {
    type: 'qualitative';
    icons?: Array<RatingIconProps>;
}

type RatingProps = ExclusifyUnion<QualitativeRatingProps | QuantitativeRatingProps> & {
    value?: number;
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    disabled?: boolean;
};

type InfoRatingProps = Omit<QuantitativeRatingProps, 'type' | 'valueLabels'> & {
    value?: number;
    withHalfValue?: boolean;
};

type InternalRatingProps = ExclusifyUnion<RatingProps | InfoRatingProps> & {
    role: 'radiogroup' | 'img';
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

const InternalRating = ({
    icons = DEFAULT_QUALITATIVE_ICONS,
    count = DEFAULT_RATING_ICON_COUNT,
    icon = DEFAULT_RATING_ICON,
    size = DEFAULT_RATING_SIZE,
    type = 'quantitative',
    dataAttributes,
    onChangeValue,
    defaultValue,
    value,
    disabled,
    role,
    valueLabels,
    withHalfValue,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: InternalRatingProps) => {
    const {texts, t} = useTheme();

    const defaultQualitativeLabels = [
        texts.ratingVeryBadLabel || t(tokens.ratingVeryBadLabel),
        texts.ratingBadLabel || t(tokens.ratingBadLabel),
        texts.ratingRegularLabel || t(tokens.ratingRegularLabel),
        texts.ratingGoodLabel || t(tokens.ratingGoodLabel),
        texts.ratingVeryGoodLabel || t(tokens.ratingVeryGoodLabel),
    ];

    const defaultQuantitativeLabels = Array.from({length: count}, (_, index) =>
        t(texts.ratingQuantitativeLabel || tokens.ratingQuantitativeLabel, index + 1, count)
    );

    const iconList = type === 'qualitative' ? icons : Array.from({length: count}, () => icon);
    const labelList =
        valueLabels ??
        (type === 'qualitative' && isEqual(iconList, DEFAULT_QUALITATIVE_ICONS)
            ? defaultQualitativeLabels
            : defaultQuantitativeLabels);

    const isInteractive = role === 'radiogroup';

    const iconSpacing = isInteractive ? 16 : size <= 16 ? 2 : size <= 24 ? 4 : 8;
    const variant = useThemeVariant();
    const [hoveredIndex, setHoveredIndex] = React.useState<number | undefined>(undefined);
    const isTouchable = isTouchableDevice();

    const [currentValue, setCurrentValue] = useRatingState({
        value,
        defaultValue,
        iconsCount: iconList.length,
        onChangeValue,
    });

    const getIconType = (index: number) => {
        if (hoveredIndex !== undefined && !disabled) {
            return (type === 'qualitative' && index === hoveredIndex) ||
                (type === 'quantitative' && index <= hoveredIndex)
                ? 'active'
                : 'inactive';
        }
        if (type === 'qualitative') {
            return index === currentValue ? 'active' : 'inactive';
        }

        if (isInteractive) {
            return index <= currentValue ? 'active' : 'inactive';
        }

        // Round the value to the closest integer (.5 is rounded down)
        if (!withHalfValue) {
            return index - 0.5 < currentValue ? 'active' : 'inactive';
        }

        // Fractional part of the value is in range [0.25, 0.75)
        if (index - 0.75 <= currentValue && currentValue < index - 0.25) {
            return 'half';
        }

        if (index - 0.25 <= currentValue) {
            return 'active';
        }

        return 'inactive';
    };

    const getIconElement = (icon: RatingIconProps, index: number) => {
        const activeColor = variant === 'inverse' ? vars.colors.inverse : iconList[index].color;
        const inactiveColor =
            variant === 'inverse'
                ? vars.colors.inverse
                : isInteractive
                  ? vars.colors.control
                  : iconList[0].color;

        switch (getIconType(index + 1)) {
            case 'active':
                return <icon.ActiveIcon size={size} color={activeColor} key={index} />;

            case 'inactive':
                return <icon.InactiveIcon size={size} color={inactiveColor} key={index} />;

            case 'half':
            default:
                return (
                    <div className={styles.halfIconContainer} key={index}>
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

        return !isInteractive ? (
            iconElement
        ) : (
            <RadioButton
                key={index}
                aria-label={labelList[index]}
                value={labelList[index]}
                render={({labelId, disabled}) => (
                    <div
                        id={labelId}
                        onMouseEnter={() => {
                            if (!isTouchable) {
                                setHoveredIndex(index + 1);
                            }
                        }}
                        onMouseLeave={() => {
                            if (!isTouchable) {
                                setHoveredIndex(undefined);
                            }
                        }}
                        style={applyCssVars({
                            [styles.vars.iconSize]: `${size}px`,
                        })}
                        className={classNames(styles.touchable, {
                            [styles.disabled]: disabled,
                            [styles.firstIcon]: index === 0,
                            [styles.lastIcon]: index === iconList.length - 1,
                        })}
                    >
                        <div className={styles.IconWrapper}>{iconElement}</div>
                    </div>
                )}
            />
        );
    };

    return role === 'img' ? (
        <Inline
            space={iconSpacing}
            dataAttributes={dataAttributes}
            role={role}
            aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : `${currentValue} de ${count}`)}
            aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
        >
            {iconList.map(renderIcon)}
        </Inline>
    ) : (
        <RadioGroup
            name="info-rating"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
            disabled={disabled}
            onChange={(label) => {
                setCurrentValue(labelList.findIndex((value) => value === label) + 1);
            }}
            value={labelList[currentValue - 1]}
            dataAttributes={dataAttributes}
        >
            <Inline space={iconSpacing}>{iconList.map(renderIcon)}</Inline>
        </RadioGroup>
    );
};

export const Rating = ({dataAttributes, ...props}: RatingProps): JSX.Element => (
    <InternalRating
        role="radiogroup"
        dataAttributes={{'component-name': 'Rating', ...dataAttributes}}
        {...props}
    />
);

export const InfoRating = ({dataAttributes, icon, size, ...props}: InfoRatingProps): JSX.Element => (
    <InternalRating
        size={size ?? DEFAULT_INFO_RATING_SIZE}
        icon={icon ?? DEFAULT_INFO_RATING_ICON}
        role="img"
        dataAttributes={{'component-name': 'InfoRating', ...dataAttributes}}
        {...props}
    />
);
