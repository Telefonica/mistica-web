/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace JSX {
        // This allows to keep using `JSX.Element` instead of `React.JSX.Element`
        type Element = React.JSX.Element;
    }
}

export {};
