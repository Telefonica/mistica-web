import * as React from 'react';
import FocusTrapReact from 'focus-trap-react';

type Props = {
    children: React.ReactNode;
    clickOutsideDeactivates?: boolean;
    className?: string;
};

const FocusTrap: React.FC<Props> = ({children, clickOutsideDeactivates = false, className}) => (
    <FocusTrapReact
        focusTrapOptions={{
            escapeDeactivates: false,
            clickOutsideDeactivates,
        }}
        className={className}
    >
        {children}
    </FocusTrapReact>
);

export default FocusTrap;
