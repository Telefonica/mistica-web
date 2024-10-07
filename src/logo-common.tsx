import * as styles from './logo.css';

import type {ByBreakpoint} from './utils/types';

export type LogoType = 'isotype' | 'imagotype' | 'vertical';

export type LogoImageProps = {
    size: ByBreakpoint<number>;
    type: LogoType;
    isDarkMode: boolean;
    isInverse: boolean;
    color?: string;
};

export const calcInlineVars = (size: ByBreakpoint<number>): Record<string, string> => {
    if (typeof size === 'number') {
        return {
            [styles.vars.size]: `${size}px`,
        };
    }
    const vars = {
        [styles.vars.sizeMobile]: `${size.mobile}px`,
        [styles.vars.sizeDesktop]: `${size.desktop}px`,
    };
    if (size.tablet) {
        vars[styles.vars.sizeTablet] = `${size.tablet}px`;
    }
    return vars;
};
