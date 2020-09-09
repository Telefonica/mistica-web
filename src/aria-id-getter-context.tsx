import * as React from 'react';

export type AriaIdGetter = () => string;

const AriaIdGetterContext = React.createContext<AriaIdGetter>(() => '');

export default AriaIdGetterContext;
