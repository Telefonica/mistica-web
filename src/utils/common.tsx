import * as React from 'react';

export const combineRefs =
    <T,>(...refs: Array<React.Ref<T> | undefined>) =>
    (refValue: T | null): void => {
        refs.forEach((ref) => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(refValue);
                } else if ('current' in ref) {
                    // @ts-expect-error - current is typed as read-only
                    ref.current = refValue;
                }
            }
        });
    };

export const getTextFromChildren = (children: React.ReactNode): string => {
    let text = '';

    React.Children.forEach(children, (child) => {
        if (typeof child === 'string') {
            text += child;
        }
    });

    return text;
};
