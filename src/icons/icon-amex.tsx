import * as React from 'react';

type Props = {
    role?: string;
    size?: number;
};

const IconAmex: React.FC<Props> = ({role = 'presentation', size = 24}) => (
    <svg role={role} width={size} height={size} viewBox="0 0 32 32">
        <g fill="none" fillRule="evenodd">
            <rect width="32" height="32" fill="#FFF" fillRule="nonzero" rx="4" />
            <path
                fill="#016FD0"
                d="M12.971 26.442v-9.554h8.36v2.138H15.56v1.634h5.636v2.011H15.56v1.697h5.77v2.074z"
            />
            <path
                fill="#016FD0"
                d="M21.323 26.442l3.871-4.718-3.963-4.836h3.07l2.36 2.99 2.368-2.99h2.95l-3.911 4.777 3.878 4.777h-3.07L26.586 23.5l-2.236 2.942z"
            />
            <path
                fill="#016FD0"
                fillRule="nonzero"
                d="M13.093 6.007l-4.185 9.23h2.724l.772-1.848h4.49l.768 1.848h2.784l-4.18-9.23h-3.173zm1.548 2.148l1.368 3.23h-2.74l1.372-3.23z"
            />
            <path
                fill="#016FD0"
                d="M20.446 15.237v-9.23l3.673.013 2.137 5.952 2.085-5.965h3.644v9.23h-2.308V8.436l-2.446 6.801h-2.024l-2.453-6.801v6.801z"
            />
        </g>
    </svg>
);

export default IconAmex;
