import * as React from 'react';
import {TAB} from './utils/key-codes';

const TAB_NAVIGATION_CLASS = 'mistica-tab-navigation';

const css = `
    body:not(.${TAB_NAVIGATION_CLASS}) *:focus,
    body:not(.${TAB_NAVIGATION_CLASS}) *:active {
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
`;

type Props = {
    children: React.ReactNode;
    disabled: boolean;
};

let isMounted = false;

const TabFocus: React.FC<Props> = ({children, disabled}) => {
    React.useEffect(() => {
        if (disabled) {
            return;
        }

        if (isMounted) {
            throw Error('Only one instance of this component is allowed');
        }
        isMounted = true;

        const handleKeyboardEvent = (e: KeyboardEvent) => {
            // `e.key` requires chrome 51+
            // `e.keyCode` is deprecated
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            if (e.key === 'Tab' || e.keyCode === TAB) {
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
