import * as React from 'react';

export type RendersElement<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    React.ReactComponentElement<T>;
