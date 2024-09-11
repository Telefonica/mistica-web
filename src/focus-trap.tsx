import * as React from 'react';
import ReactFocusLock from 'react-focus-lock';

type Props = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    group?: string;
};

const FocusTrap = ({children, disabled, className, group}: Props): JSX.Element => (
    <ReactFocusLock noFocusGuards disabled={disabled} className={className} group={group}>
        {children}
    </ReactFocusLock>
);

export default FocusTrap;
