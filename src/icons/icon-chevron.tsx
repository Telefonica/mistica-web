import * as React from 'react';
import {vars} from '../skins/skin-contract.css';

type IcnChevronRightSvgProps = {
    size: number;
    color: string;
    transform: string;
    transitionDuration?: number;
    className?: string;
    style?: React.CSSProperties;
};

const IconChevronRightSvg: React.FC<IcnChevronRightSvgProps> = ({
    size,
    color,
    transform,
    transitionDuration,
    className,
    style,
}) => (
    <svg
        role="presentation"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        style={style}
    >
        <path
            style={{transition: `transform ${transitionDuration}ms,fill ${transitionDuration}ms`}}
            fill={color}
            fillRule="evenodd"
            d="M14.338 11.478a.75.75 0 0 1 0 1.044l-3.837 3.997a.75.75 0 1 1-1.082-1.038L12.76 12 9.42 8.52a.75.75 0 0 1 1.082-1.04l3.837 3.998z"
            transform={transform}
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

const IconChevron: React.FC<Props> = ({
    size = 24,
    color,
    className,
    style,
    transitionDuration = 300,
    direction = 'right',
}) => {
    const fillColor = color || vars.colors.neutralHigh;
    const props = {
        size,
        color: fillColor,
        transform: `rotate(${rotateAngleByDirection[direction]} 12 12)`,
        className,
        transitionDuration,
        style,
    };

    return <IconChevronRightSvg {...props} />;
};

export default IconChevron;
