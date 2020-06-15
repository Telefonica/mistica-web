// @flow
import * as React from 'react';
import FocusTrapReact from 'focus-trap-react';

type Props = {
    children: React.Node,
    clickOutsideDeactivates?: boolean,
    className?: string,
};

const FocusTrap = ({children, clickOutsideDeactivates = false, className}: Props): React.Node => (
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
