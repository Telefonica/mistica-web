import * as React from 'react';

type Props = {
    role?: string;
    size?: number | string;
};

const IconAmex = ({role = 'presentation', size = 24}: Props): JSX.Element => (
    <svg width={size} height={size} role={role} viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_10652_7690)">
            <path
                d="M17 -2H-1C-2.65685 -2 -4 -0.656854 -4 1V19C-4 20.6569 -2.65685 22 -1 22H17C18.6569 22 20 20.6569 20 19V1C20 -0.656854 18.6569 -2 17 -2Z"
                fill="white"
            />
            <path
                d="M5.72824 17.8315V10.666H11.9982V12.2695H7.66999V13.495H11.897V15.0033H7.66999V16.276H11.9975V17.8315H5.72824Z"
                fill="#016FD0"
            />
            <path
                d="M11.9922 17.8315L14.8955 14.293L11.9232 10.666H14.2257L15.9957 12.9085L17.7717 10.666H19.9842L17.051 14.2488L19.9595 17.8315H17.657L15.9395 15.625L14.2625 17.8315H11.9922Z"
                fill="#016FD0"
            />
            <path
                d="M5.81975 2.50525L2.681 9.42775H4.724L5.303 8.04175H8.6705L9.2465 9.42775H11.3345L8.1995 2.50525H5.81975ZM6.98075 4.11625L8.00675 6.53875H5.95175L6.98075 4.11625Z"
                fill="#016FD0"
            />
            <path
                d="M11.3345 9.42775V2.50525L14.0893 2.515L15.692 6.979L17.2558 2.50525H19.9888V9.42775H18.2578V4.327L16.4233 9.42775H14.9053L13.0655 4.327V9.42775H11.3345Z"
                fill="#016FD0"
            />
        </g>
        <defs>
            <clipPath id="clip0_10652_7690">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default IconAmex;
