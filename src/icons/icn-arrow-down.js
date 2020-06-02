// @flow
import * as React from 'react';
import {useTheme} from '../hooks';

import type {CssStyle} from '../utils/types';

type Props = {
    role?: string,
    size?: number,
    color?: string,
    style?: CssStyle,
};

const IcnArrowDown = ({role = 'presentation', size = 24, color, style}: Props): React.Element<'svg'> => {
    const {colors} = useTheme();

    return (
        <svg height={size} viewBox="0 0 24 24" width={size} role={role} style={style}>
            <path d="M7 10l5 5 5-5z" fill={color ?? colors.iconPrimary} />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    );
};

export default IcnArrowDown;
