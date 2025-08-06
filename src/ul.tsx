import * as React from 'react';
import * as styles from './ul.css';
import Box from './box';

import type {IconProps} from './utils/types';

type Props = {
    children: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
};

export const Ul = ({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: Props): JSX.Element => {
    return (
        // role="list" is needed for accesibility in Safari+VoiceOver. See: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul role="list" className={styles.ul} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
            {children}
        </ul>
    );
};

export const Ol = ({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: Props): JSX.Element => {
    return (
        // role="list" is needed for accesibility in Safari+VoiceOver. See: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ol role="list" className={styles.ul} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
            {children}
        </ol>
    );
};

export const Li = ({
    children,
    Icon,
    renderIcon,
    withMarker = true,
}: {
    children: React.ReactNode;
    Icon?: (props: IconProps) => JSX.Element;
    renderIcon?: () => JSX.Element;
    withMarker?: boolean;
}): JSX.Element => {
    return !withMarker ? (
        <li className={styles.liWithoutMarker}>
            <div className={styles.content}>{children}</div>
        </li>
    ) : Icon || renderIcon ? (
        <li className={styles.liWithCustomIcon}>
            <Box paddingRight={{mobile: 8, desktop: 16}}>
                {Icon ? <Icon size="1em" color="currentColor" /> : renderIcon?.()}
            </Box>
            <div className={styles.content}>{children}</div>
        </li>
    ) : (
        <li className={styles.li}>{children}</li>
    );
};
