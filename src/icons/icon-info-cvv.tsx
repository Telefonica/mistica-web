import * as React from 'react';
import {useTheme} from '../hooks';

type Props = {
    size?: number;
    color?: string;
};

const IconInfo: React.FC<Props> = ({size = 24, color}) => {
    const {colors} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 24 24">
            <path
                fill={color || colors.iconSecondary}
                fillRule="evenodd"
                d="M12 7a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 7zm0 3.75c-.69 0-1.25.56-1.25 1.25v3.75a1.25 1.25 0 0 0 2.5 0V12c0-.69-.56-1.25-1.25-1.25zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18.125c-4.48 0-8.125-3.645-8.125-8.125S7.519 3.875 12 3.875c4.48 0 8.125 3.645 8.125 8.125S16.48 20.125 12 20.125z"
            />
        </svg>
    );
};

export default IconInfo;
