// @flow
import * as React from 'react';
import {useTheme} from '../hooks';

const ICON_SIZE_1 = 24;

type Props = {
    role?: string,
    size?: number,
    color?: string,
};

const IcnClose = ({role = 'presentation', size = ICON_SIZE_1, color}: Props): React.Element<'svg'> => {
    const {colors} = useTheme();
    const fillColor = color || colors.iconPrimary;
    return (
        <svg role={role} width={size} height={size} viewBox="0 0 24 24">
            <path
                fill={fillColor}
                fillRule="evenodd"
                d="M17.4 6.6a.849.849 0 0 0-1.2 0L12 10.8 7.8 6.6a.849.849 0 1 0-1.2 1.2l4.2 4.2-4.2 4.2a.849.849 0 0 0 1.2 1.2l4.2-4.2 4.2 4.2a.849.849 0 0 0 1.2-1.2L13.2 12l4.2-4.2a.849.849 0 0 0 0-1.2z"
            />
        </svg>
    );
};

export default IcnClose;
