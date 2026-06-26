import * as React from 'react';
import ReactFocusLock from 'react-focus-lock';

type Props = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    group?: string;
    returnFocus?: React.ComponentProps<typeof ReactFocusLock>['returnFocus'];
};

// TODO https://github.com/Telefonica/mistica-web/issues/1589 unify focus-restoration logic with consumers that restore focus manually (e.g. Drawer's useRestoreFocus)
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
