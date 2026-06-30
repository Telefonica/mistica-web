import * as React from 'react';
import ReactFocusLock from 'react-focus-lock';

type Props = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    group?: string;
    returnFocus?: React.ComponentProps<typeof ReactFocusLock>['returnFocus'];
};

const FocusTrap = ({children, disabled, className, group, returnFocus = true}: Props): JSX.Element => (
    <ReactFocusLock
        noFocusGuards
        disabled={disabled}
        className={className}
        group={group}
        returnFocus={returnFocus}
    >
        {children}
    </ReactFocusLock>
);

export default FocusTrap;
