'use client';
import classNames from 'classnames';
import * as React from 'react';
import {vars} from '../skins/skin-contract.css';
import {applyCssVars} from '../utils/css';
import * as styles from './icon-chevron.css';
import {useTheme} from '../hooks';
import {O2_NEW_SKIN, BLAU_SKIN} from '../skins/constants';

type IconChevronRightSvgProps = {
    size: number | string;
    color: string;
    transform: string;
    transitionDuration?: number;
    className?: string;
    style?: React.CSSProperties;
};

const IconChevronRightSvgDefault = ({
    size,
    color,
    transform,
    transitionDuration,
    className,
    style,
}: IconChevronRightSvgProps) => (
    <svg
        role="presentation"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={classNames(className, styles.chevronRotateTransition)}
        style={{
            transform,
            ...style,
            ...applyCssVars({[styles.vars.transitionDuration]: `${transitionDuration}ms`}),
        }}
    >
        <path
            d="M12.0001 16.6333C11.7199 16.6333 11.4596 16.5232 11.2695 16.3131L4.2733 8.87648C3.89296 8.47613 3.91298 7.83556 4.31333 7.45523C4.71368 7.07489 5.35425 7.09491 5.73459 7.49526L12.0001 14.1511L18.2657 7.49526C18.646 7.0849 19.2866 7.07489 19.6869 7.45523C20.0873 7.83556 20.1073 8.47613 19.7269 8.87648L12.7308 16.3131C12.5406 16.5132 12.2704 16.6333 12.0001 16.6333Z"
            className={styles.chevronColorTransition}
            fill={color}
        />
    </svg>
);

const IconChevronRightSvgO2 = ({
    size,
    color,
    transform,
    transitionDuration,
    className,
    style,
}: IconChevronRightSvgProps) => (
    <svg
        role="presentation"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={classNames(className, styles.chevronRotateTransition)}
        style={{
            transform,
            ...style,
            ...applyCssVars({[styles.vars.transitionDuration]: `${transitionDuration}ms`}),
        }}
    >
        <path
            d="M12.0018 16.571C11.7518 16.571 11.5118 16.481 11.3118 16.301L4.32183 9.74098C3.91183 9.36098 3.89183 8.72098 4.27183 8.32098C4.65183 7.92098 5.29183 7.89098 5.69183 8.27098L12.0018 14.181L18.3118 8.27098C18.7118 7.89098 19.3518 7.91098 19.7318 8.32098C20.1118 8.73098 20.0918 9.36098 19.6818 9.74098L12.6918 16.301C12.5018 16.481 12.2518 16.571 12.0018 16.571Z"
            className={styles.chevronColorTransition}
            fill={color}
        />
    </svg>
);

const IconChevronRightSvgBlau = ({
    size,
    color,
    transform,
    transitionDuration,
    className,
    style,
}: IconChevronRightSvgProps) => (
    <svg
        role="presentation"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={classNames(className, styles.chevronRotateTransition)}
        style={{
            transform,
            ...style,
            ...applyCssVars({[styles.vars.transitionDuration]: `${transitionDuration}ms`}),
        }}
    >
        <path
            d="M12.0021 16.942L4.32208 9.74195C3.91208 9.36195 3.89208 8.72195 4.27208 8.32195C4.65208 7.92195 5.29208 7.89195 5.69208 8.27195L12.0021 14.182L18.3121 8.27195C18.7121 7.89195 19.3521 7.91195 19.7321 8.32195C20.1121 8.73195 20.0921 9.36195 19.6821 9.74195L12.0021 16.942Z"
            className={styles.chevronColorTransition}
            fill={color}
        />
    </svg>
);

type Direction = 'up' | 'down' | 'left' | 'right';

const rotateAngleByDirection: Record<Direction, number> = {
    up: -180,
    down: 0,
    left: 90,
    right: -90,
};

type Props = {
    size?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    direction?: Direction;
    transitionDuration?: number;
};

const IconChevron = ({
    size = 24,
    color,
    className,
    style,
    transitionDuration = 300,
    direction = 'right',
}: Props): JSX.Element => {
    const {skinName} = useTheme();
    const fillColor = color || vars.colors.neutralHigh;
    const props = {
        size,
        color: fillColor,
        transform: `rotate(${rotateAngleByDirection[direction]}deg)`,
        className,
        transitionDuration,
        style,
    };

    switch (skinName) {
        case O2_NEW_SKIN:
            return <IconChevronRightSvgO2 {...props} />;
        case BLAU_SKIN:
            return <IconChevronRightSvgBlau {...props} />;
        default:
            return <IconChevronRightSvgDefault {...props} />;
    }
};

export default IconChevron;
