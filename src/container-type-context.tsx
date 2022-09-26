import * as React from 'react';

import type {ContainerType} from './utils/types';

const ContainerTypeContext = React.createContext<ContainerType | null>(null);

export default ContainerTypeContext;
