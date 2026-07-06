import * as React from 'react';
import * as styles from './logo.css';
import {calcInlineVars} from './logo-common';
import {applyCssVars} from './utils/css';

import type {LogoType} from './logo-common';
import type {ByBreakpoint} from './utils/types';

type Props = {
    size: ByBreakpoint<number>;
    type: LogoType;
    children: React.ReactNode;
};

const UnbrandedLogoShell = ({size, children}: Props): JSX.Element => (
    <svg
        className={styles.svg}
        style={applyCssVars(calcInlineVars(size))}
        viewBox="0 0 72 72"
        role="presentation"
    >
        {children}
    </svg>
);

export default UnbrandedLogoShell;
