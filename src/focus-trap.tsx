import * as React from 'react';
import ReactFocusLock from 'react-focus-lock';

type Props = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    group?: string;
};

const FocusTrap: React.FC<Props> = ({children, disabled, className, group}) => (
    <ReactFocusLock noFocusGuards disabled={disabled} className={className} group={group}>
        {children}
    </ReactFocusLock>
);

export default FocusTrap;
