import * as React from 'react';

type Props = {
    role?: string;
    size?: number;
};

const IconCreditcard: React.FC<Props> = ({role = 'presentation', size = 24}) => {
    const originalSize = 32;

    return (
        <svg role={role} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <g fill="#757575" fillRule="nonzero" transform={`scale(${size / originalSize})`}>
                <path d="M13.58 21.075H7.039a.666.666 0 1 1 0-1.333h6.543a.667.667 0 0 1 0 1.333" />
                <path d="M25.827 24.409H6.2c-.992 0-1.8-.807-1.8-1.8v-6.875h23.228v6.875c0 .993-.806 1.8-1.8 1.8M6.2 8.4h19.628c.994 0 1.8.808 1.8 1.8v1.548H4.4V10.2c0-.992.808-1.8 1.8-1.8m19.628-1.735H6.2a3.539 3.539 0 0 0-3.533 3.535v12.408A3.539 3.539 0 0 0 6.2 26.143h19.628a3.539 3.539 0 0 0 3.534-3.534V10.2a3.539 3.539 0 0 0-3.534-3.535" />
            </g>
        </svg>
    );
};

export default IconCreditcard;
