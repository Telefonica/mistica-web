import * as React from 'react';

type Props = {
    role?: string;
    size?: number | string;
};

const IconMastercard = ({role = 'presentation', size = 24}: Props): JSX.Element => (
    <svg width={size} height={size} role={role} viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_10652_7684)">
            <path
                d="M19 -2H1C-0.656854 -2 -2 -0.656854 -2 1V19C-2 20.6569 -0.656854 22 1 22H19C20.6569 22 22 20.6569 22 19V1C22 -0.656854 20.6569 -2 19 -2Z"
                fill="white"
            />
            <path
                d="M7.057 14.614C9.57376 14.614 11.614 12.5738 11.614 10.057C11.614 7.54024 9.57376 5.5 7.057 5.5C4.54024 5.5 2.5 7.54024 2.5 10.057C2.5 12.5738 4.54024 14.614 7.057 14.614Z"
                fill="#EA021B"
            />
            <path
                d="M12.943 14.614C15.4597 14.614 17.5 12.5738 17.5 10.057C17.5 7.54024 15.4597 5.5 12.943 5.5C10.4262 5.5 8.38599 7.54024 8.38599 10.057C8.38599 12.5738 10.4262 14.614 12.943 14.614Z"
                fill="#F79F19"
            />
            <path
                d="M9.9625 6.54474C11.0058 7.38024 11.671 8.64324 11.671 10.057C11.671 11.4707 11.0058 12.7345 9.9625 13.5692C8.9185 12.7337 8.2525 11.4707 8.2525 10.057C8.2525 8.65974 8.90275 7.40949 9.9265 6.57324L9.9625 6.54474Z"
                fill="#FF5F00"
            />
        </g>
        <defs>
            <clipPath id="clip0_10652_7684">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default IconMastercard;
