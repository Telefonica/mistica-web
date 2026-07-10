import * as React from 'react';
import ReactFocusLock from 'react-focus-lock';

type Props = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    group?: string;
    returnFocus?: React.ComponentProps<typeof ReactFocusLock>['returnFocus'];
    focusWhiteList?: (activeElement: HTMLElement) => boolean;
};

const FocusTrap = ({
    children,
    disabled,
    className,
    group,
    returnFocus = true,
    focusWhiteList,
}: Props): JSX.Element => (
    <ReactFocusLock
        noFocusGuards
        disabled={disabled}
        className={className}
        group={group}
        returnFocus={returnFocus}
        whiteList={focusWhiteList}
    >
        {children}
    </ReactFocusLock>
);

export default FocusTrap;
