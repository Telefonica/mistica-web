import * as React from 'react';
import * as styles from './logo.css';
import {calcInlineVars} from './logo-common';
import {applyCssVars} from './utils/css';

import type {ByBreakpoint} from './utils/types';
import type {LogoType} from './logo-common';

type Props = {
    size: ByBreakpoint<number>;
    type: LogoType;
    children: React.ReactNode;
};

const BlauLogoShell = ({size, type, children}: Props): JSX.Element => {
    const viewBox = type === 'imagotype' ? '0 0 138 72' : type === 'vertical' ? '0 0 73 72' : '0 0 72 72';

    return (
        <svg
            className={styles.svg}
            style={applyCssVars(calcInlineVars(size))}
            viewBox={viewBox}
            role="presentation"
        >
            {children}
        </svg>
    );
};

export default BlauLogoShell;
