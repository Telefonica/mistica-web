// @flow
import * as React from 'react';

type Props = {
    role?: string,
    size?: number,
};

const IcnMastercard = ({role = 'presentation', size = 24}: Props): React.Element<'svg'> => (
    <svg role={role} width={size} height={size} viewBox="0 0 32 32">
        <g fill="none" fillRule="evenodd">
            <rect width="32" height="32" fill="#FFF" fillRule="nonzero" rx="4" />
            <circle cx="12.076" cy="16.076" r="6.076" fill="#EA021B" />
            <circle cx="19.924" cy="16.076" r="6.076" fill="#F79F19" />
            <path
                fill="#FF5F00"
                d="M15.95 11.393c1.391 1.114 2.278 2.798 2.278 4.683 0 1.885-.887 3.57-2.278 4.683-1.392-1.114-2.28-2.798-2.28-4.683 0-1.863.867-3.53 2.232-4.645z"
            />
        </g>
    </svg>
);

export default IcnMastercard;
