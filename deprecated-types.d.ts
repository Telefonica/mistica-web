/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace JSX {
        // This allows to keep using `JSX.Element` instead of `React.JSX.Element`
        type Element = React.JSX.Element;
        type IntrinsicElements = React.JSX.IntrinsicElements;
        type ElementType = React.JSX.ElementType;
        type ElementClass = React.JSX.ElementClass;
        type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
        type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
        type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
        type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
    }
}

export {};
