import * as React from 'react';

export type RendersElement<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    React.ReactComponentElement<T>;
export type RendersNullableElement<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    React.ReactComponentElement<T> | null;
