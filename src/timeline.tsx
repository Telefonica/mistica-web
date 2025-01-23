import * as React from 'react';
import * as styles from './timeline.css';
import classNames from 'classnames';
import Circle from './circle';
import {vars} from './skins/skin-contract.css';
import IconCheckFilled from './generated/mistica-icons/icon-check-filled';
import {Text1} from './text';

type TimelineItemProps = {
    children: React.ReactNode;
    state: 'active' | 'inactive' | 'completed';
    asset?:
        | React.ReactNode
        | {
              kind: 'dot';
          }
        | {
              kind: 'number';
              number: number;
          };
};

const AnimatedCircle = ({begin}: {begin?: string}) => {
    const animationProps = {
        dur: '2s',
        repeatCount: 'indefinite',
        calcMode: 'spline',
        keyTimes: '0; 1',
        keySplines: '0.42, 0, 0.58, 1', // ease-in-out
    };
    return (
        <circle cx="12" cy="12" r="6" strokeWidth={1} stroke={vars.colors.brand} fill="none">
            <animate attributeName="r" values="6; 11" {...animationProps} begin={begin} />
            <animate attributeName="opacity" values="1; 0" {...animationProps} begin={begin} />
        </circle>
    );
};

export const TimelineItem = ({
    asset = {kind: 'dot'},
    state = 'inactive',
    children,
}: TimelineItemProps): JSX.Element => {
    const renderAsset = () => {
        if (!asset) {
            return null;
        }
        if (typeof asset === 'object' && 'kind' in asset) {
            if (asset.kind === 'dot') {
                return (
                    <svg width="24" height="24" style={{display: 'block', margin: -5}}>
                        {state === 'active' && (
                            <>
                                <AnimatedCircle />
                                <AnimatedCircle begin="0.5s" />
                            </>
                        )}
                        <circle
                            cx="12"
                            cy="12"
                            r="6"
                            strokeWidth={2}
                            stroke={
                                {
                                    inactive: vars.colors.neutralMedium,
                                    active: vars.colors.brand,
                                    completed: vars.colors.brand,
                                }[state]
                            }
                            fill={state === 'completed' ? vars.colors.brand : 'none'}
                        />
                    </svg>
                );
            } else if (asset.kind === 'number') {
                return state === 'completed' ? (
                    <Circle background={vars.colors.brand} size={32}>
                        <IconCheckFilled size={16} color={vars.colors.inverse} />
                    </Circle>
                ) : (
                    <div className={styles.assetNumberContainer}>
                        <Text1
                            regular
                            color={state === 'active' ? vars.colors.textActivated : vars.colors.textSecondary}
                        >
                            {asset.number}
                        </Text1>
                    </div>
                );
            }
        }
        return asset;
    };

    return (
        <div className={classNames(styles.timelineItem, styles.timelineItemState[state])}>
            <div className={styles.lineContainer}>
                <div className={styles.asset}>{renderAsset()}</div>
                <div className={styles.line}></div>
            </div>
            <div>{children}</div>
        </div>
    );
};

type TimelineProps = {
    children?: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
};

const Timeline = ({children, orientation = 'vertical'}: TimelineProps): JSX.Element => {
    return <div className={styles.timeline[orientation]}>{children}</div>;
};

export default Timeline;
