import classNames from 'classnames';
import * as React from 'react';
import {vars} from '../skins/skin-contract.css';
import {applyCssVars} from '../utils/css';
import * as styles from './icon-chevron.css';

type IconChevronRightSvgProps = {
    size: number | string;
    color: string;
    transform: string;
    transitionDuration?: number;
    className?: string;
    style?: React.CSSProperties;
};

const IconChevronRightSvg = ({
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
            className={styles.chevronColorTransition}
            fill={color}
            fillRule="evenodd"
            d="M14.338 11.478a.75.75 0 0 1 0 1.044l-3.837 3.997a.75.75 0 1 1-1.082-1.038L12.76 12 9.42 8.52a.75.75 0 0 1 1.082-1.04l3.837 3.998z"
        />
    </svg>
);

type Direction = 'up' | 'down' | 'left' | 'right';

const rotateAngleByDirection: Record<Direction, number> = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
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
    const fillColor = color || vars.colors.neutralHigh;
    const props = {
        size,
        color: fillColor,
        transform: `rotate(${rotateAngleByDirection[direction]}deg)`,
        className,
        transitionDuration,
        style,
    };

    return <IconChevronRightSvg {...props} />;
};

export default IconChevron;
