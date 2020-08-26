import * as React from 'react';

export type AriaIdGetterContextType = () => string;

const AriaIdGetterContext = React.createContext<AriaIdGetterContextType>(() => '');

export default AriaIdGetterContext;
