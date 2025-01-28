'use client';
import * as React from 'react';
import * as styles from './timeline.css';
import classNames from 'classnames';
import Circle from './circle';
import {vars} from './skins/skin-contract.css';
import IconCheckFilled from './generated/mistica-icons/icon-check-filled';
import {Text1} from './text';
import {useThemeVariant, ThemeVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';
import {isRunningAcceptanceTest} from './utils/platform';

import type {ExclusifyUnion} from './utils/utility-types';
import type {IconProps} from './utils/types';

type TimelineItemCommonProps = {
    children: React.ReactNode;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    dataAttributes?: Record<string, string>;
    state: 'active' | 'inactive' | 'completed';
};

type TimelineItemProps = TimelineItemCommonProps &
    ExclusifyUnion<
        | {
              state: 'active' | 'inactive';
              asset?:
                  | React.ReactNode
                  | {
                        kind: 'dot';
                    }
                  | {
                        kind: 'number';
                        number: number;
                    }
                  | {
                        kind: 'icon';
                        Icon: (props: IconProps) => JSX.Element;
                    }
                  | {
                        kind: 'circled-icon';
                        Icon: (props: IconProps) => JSX.Element;
                    };
          }
        | {
              state: 'completed';
              asset?:
                  | React.ReactNode
                  | {
                        kind: 'dot';
                    }
                  | {
                        kind: 'number';
                        number?: number;
                    }
                  | {
                        kind: 'icon';
                        Icon?: (props: IconProps) => JSX.Element;
                    }
                  | {
                        kind: 'circled-icon';
                        Icon?: (props: IconProps) => JSX.Element;
                    };
          }
    >;

const AnimatedCircle = ({begin, stroke}: {begin?: string; stroke: string}) => {
    const animationProps = {
        dur: '2s',
        repeatCount: 'indefinite',
        calcMode: 'spline',
        keyTimes: '0; 1',
        keySplines: '0.42, 0, 0.58, 1', // ease-in-out
    };
    return (
        <circle cx="12" cy="12" r="6" strokeWidth={1} stroke={stroke} fill="none">
            <animate attributeName="r" values="6; 11" {...animationProps} begin={begin} />
            <animate attributeName="opacity" values="1; 0" {...animationProps} begin={begin} />
        </circle>
    );
};

export const TimelineItem = ({
    asset = {kind: 'dot'},
    state = 'inactive',
    role = 'listitem',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    dataAttributes,
    children,
}: TimelineItemProps): JSX.Element => {
    const {isDarkMode} = useTheme();
    const themeVariant = useThemeVariant();
    const backgroundVariant = isDarkMode ? 'default' : themeVariant;
    const isOverInverse = backgroundVariant === 'inverse';
    const renderAsset = () => {
        if (!asset) {
            return null;
        }
        if (typeof asset === 'object' && 'kind' in asset) {
            const completedOrActiveColor = {
                inverse: vars.colors.inverse,
                media: vars.colors.inverse,
                default: vars.colors.brand,
                alternative: vars.colors.brandHigh,
            }[backgroundVariant];

            const inactiveColor = isOverInverse ? vars.colors.brandLow : vars.colors.neutralMedium;

            const bareAssetColor = {
                inactive: inactiveColor,
                active: completedOrActiveColor,
                completed: completedOrActiveColor,
            }[state];

            if (asset.kind === 'dot') {
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        {state === 'active' && !isRunningAcceptanceTest() && (
                            <>
                                <AnimatedCircle stroke={bareAssetColor} />
                                <AnimatedCircle stroke={bareAssetColor} begin="0.5s" />
                            </>
                        )}
                        <circle
                            cx="12"
                            cy="12"
                            r="6"
                            strokeWidth={2}
                            stroke={bareAssetColor}
                            fill={state === 'completed' ? bareAssetColor : 'none'}
                        />
                    </svg>
                );
            } else if (asset.kind === 'number') {
                return state === 'completed' ? (
                    <Circle background={completedOrActiveColor} size={32}>
                        <IconCheckFilled
                            size={16}
                            color={isOverInverse ? vars.colors.brand : vars.colors.inverse}
                        />
                    </Circle>
                ) : (
                    <div className={styles.assetNumberContainer[isOverInverse ? 'inverse' : 'default']}>
                        <ThemeVariant variant="default">
                            <Text1
                                medium
                                color={
                                    state === 'active'
                                        ? isOverInverse
                                            ? vars.colors.brand
                                            : vars.colors.textActivated
                                        : vars.colors.textSecondary
                                }
                            >
                                {asset.number}
                            </Text1>
                        </ThemeVariant>
                    </div>
                );
            } else if (asset.kind === 'icon') {
                return state === 'completed' ? (
                    <IconCheckFilled size={24} color={bareAssetColor} />
                ) : asset.Icon ? (
                    <asset.Icon size={24} color={bareAssetColor} />
                ) : null;
            } else if (asset.kind === 'circled-icon') {
                return (
                    <Circle background={vars.colors.background} size={40} border={!isOverInverse}>
                        {state === 'completed' ? (
                            <IconCheckFilled size={24} color={vars.colors.brand} />
                        ) : asset.Icon ? (
                            <asset.Icon
                                size={24}
                                color={state === 'inactive' ? vars.colors.neutralMedium : vars.colors.brand}
                            />
                        ) : null}
                    </Circle>
                );
            }
        }
        return asset;
    };

    return (
        <div
            className={classNames(styles.timelineItem, styles.timelineItemState[state])}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-current={state === 'active' ? 'step' : undefined}
            {...getPrefixedDataAttributes(dataAttributes, 'TimelineItem')}
        >
            <div className={styles.lineContainer}>
                <div className={styles.asset}>{renderAsset()}</div>
                <div className={styles.line[isOverInverse ? 'inverse' : 'default']} />
            </div>
            <div>{children}</div>
        </div>
    );
};

type TimelineProps = {
    children?: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    dataAttributes?: Record<string, string>;
};

const Timeline = ({
    children,
    orientation = 'vertical',
    role = 'list',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    dataAttributes,
}: TimelineProps): JSX.Element => {
    return (
        <div
            className={styles.timeline[orientation]}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            {...getPrefixedDataAttributes(dataAttributes, 'Timeline')}
        >
            {children}
        </div>
    );
};

export default Timeline;
