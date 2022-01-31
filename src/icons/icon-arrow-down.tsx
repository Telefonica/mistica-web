import * as React from 'react';
import {useTheme} from '../hooks';

type Props = {
    role?: string;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
};

/** @deprecated use IconArrowDropDownFilled instead */
const IconArrowDown: React.FC<Props> = ({role = 'presentation', size = 24, color, style}) => {
    const {colors} = useTheme();

    return (
        <svg height={size} viewBox="0 0 24 24" width={size} role={role} style={style}>
            <path d="M7 10l5 5 5-5z" fill={color ?? colors.neutralHigh} />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    );
};

export default IconArrowDown;
