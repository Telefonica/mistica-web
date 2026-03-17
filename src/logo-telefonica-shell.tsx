import * as React from 'react';
import * as styles from './logo.css';
import {calcInlineVars} from './logo-common';
import {applyCssVars} from './utils/css';

import type { LogoType} from './logo-common';
import type {ByBreakpoint} from './utils/types';

type Props = {
    size: ByBreakpoint<number>;
    type: LogoType;
    children: React.ReactNode;
};

const TelefonicaLogoShell = ({size, type, children}: Props): JSX.Element => {
    const viewBox = type === 'imagotype' ? '0 0 195 72' : type === 'vertical' ? '0 0 73 72' : '0 0 72 72';

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

export default TelefonicaLogoShell;
