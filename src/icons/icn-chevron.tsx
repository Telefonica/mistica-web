// @flow
import * as React from 'react';
import {useTheme} from '../hooks';

import type {CssStyle} from '../utils/types';

type IcnChevronRightSvgProps = {
    size: number,
    color: string,
    transform: string,
    className?: string,
    style?: CssStyle,
};

const IcnChevronRightSvg = ({size, color, transform, className, style}: IcnChevronRightSvgProps) => (
    <svg
        role="presentation"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        style={style}
    >
        <path
            style={{transition: 'transform 0.3s'}}
            fill={color}
            fillRule="evenodd"
            d="M14.338 11.478a.75.75 0 0 1 0 1.044l-3.837 3.997a.75.75 0 1 1-1.082-1.038L12.76 12 9.42 8.52a.75.75 0 0 1 1.082-1.04l3.837 3.998z"
            transform={transform}
        />
    </svg>
);

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

const rotateAngleByDirection = {
    [UP]: -90,
    [DOWN]: 90,
    [LEFT]: 180,
    [RIGHT]: 0,
};

type Props = {
    size?: number,
    color?: string,
    direction: typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT,
    className?: string,
    style?: CssStyle,
};

const IcnChevron = ({size = 24, color, direction, className, style}: Props): React.Node => {
    const {colors} = useTheme();
    const fillColor = color || colors.iconPrimary;
    const props = {
        size,
        color: fillColor,
        transform: `rotate(${rotateAngleByDirection[direction]} 12 12)`,
        className,
        style,
    };

    return <IcnChevronRightSvg {...props} />;
};

IcnChevron.Up = (props: $Rest<Props, {direction: any}>): React.Node => (
    <IcnChevron direction={UP} {...props} />
);
IcnChevron.Down = (props: $Rest<Props, {direction: any}>): React.Node => (
    <IcnChevron direction={DOWN} {...props} />
);
IcnChevron.Left = (props: $Rest<Props, {direction: any}>): React.Node => (
    <IcnChevron direction={LEFT} {...props} />
);
IcnChevron.Right = (props: $Rest<Props, {direction: any}>): React.Node => (
    <IcnChevron direction={RIGHT} {...props} />
);

export default IcnChevron;
