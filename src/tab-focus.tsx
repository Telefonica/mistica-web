'use client';
import * as React from 'react';
import {TAB} from './utils/keys';
import {fieldFocusRing} from './text-field-components.css';

const TAB_NAVIGATION_CLASS = 'mistica-tab-navigation';

const css = `
    body:not(.${TAB_NAVIGATION_CLASS}) *:focus,
    body:not(.${TAB_NAVIGATION_CLASS}) *:active,
    body:not(.${TAB_NAVIGATION_CLASS}) .${fieldFocusRing} {
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
`;

type Props = {
    children: React.ReactNode;
    disabled: boolean;
};

let isMounted = false;

const TabFocus = ({children, disabled}: Props): JSX.Element => {
    React.useEffect(() => {
        if (disabled) {
            return;
        }

        if (isMounted) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Multiple TabFocus instances');
            }
            return;
        }

        isMounted = true;

        const handleKeyboardEvent = (e: KeyboardEvent) => {
            if (e.key === TAB) {
                document.body.classList.add(TAB_NAVIGATION_CLASS);
            } else {
                document.body.classList.remove(TAB_NAVIGATION_CLASS);
            }
        };

        const handleMouseEvent = () => {
            document.body.classList.remove(TAB_NAVIGATION_CLASS);
        };

        window.addEventListener('keydown', handleKeyboardEvent);
        window.addEventListener('mouseup', handleMouseEvent);
        return () => {
            isMounted = false;
            window.removeEventListener('keydown', handleKeyboardEvent);
            window.removeEventListener('mouseup', handleMouseEvent);
        };
    }, [disabled]);

    return (
        <>
            {!disabled && <style>{css}</style>}
            {children}
        </>
    );
};

export default TabFocus;
