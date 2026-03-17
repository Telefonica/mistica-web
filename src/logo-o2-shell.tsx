import * as React from 'react';
import * as styles from './logo.css';
import {calcInlineVars} from './logo-common';
import {applyCssVars} from './utils/css';

import type {ByBreakpoint} from './utils/types';

type Props = {
    size: ByBreakpoint<number>;
    children: React.ReactNode;
};

const O2LogoShell = ({size, children}: Props): JSX.Element => {
    return (
        <svg
            className={styles.svg}
            style={applyCssVars(calcInlineVars(size))}
            viewBox="0 0 72 72"
            role="presentation"
        >
            {children}
        </svg>
    );
};

export default O2LogoShell;
