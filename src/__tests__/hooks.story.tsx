import * as React from 'react';
import {useDisableBodyScroll} from '../hooks';

const DisableScroll = () => {
    useDisableBodyScroll(true);
    return <span>scroll is disabled</span>;
};
const Toggle = ({children, toggleText}: {children: React.ReactNode; toggleText: string}) => {
    const [show, setShow] = React.useState(false);
    React.useLayoutEffect(() => {
        document.body.style.cssText = 'background: red;';
    }, []);
    return (
        <>
            <button onClick={() => setShow((value) => !value)}>{toggleText}</button>
            {show && children}
        </>
    );
};
export const Single = (): JSX.Element => (
    <Toggle toggleText="toggle">
        <DisableScroll />
    </Toggle>
);
export const Nested = (): JSX.Element => (
    <Toggle toggleText="toggle1">
        <DisableScroll />
        <Toggle toggleText="toggle2">
            <DisableScroll />
        </Toggle>
    </Toggle>
);
