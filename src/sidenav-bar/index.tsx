'use client';
import * as React from 'react';
import * as styles from './sidenav-bar.css';

type SidenavBarProps = {
    children?: React.ReactNode;
    'aria-label'?: string;
};

const SidenavBar = ({children, 'aria-label': ariaLabel}: SidenavBarProps): React.JSX.Element => {
    return (
        <nav aria-label={ariaLabel} className={styles.container}>
            {children}
        </nav>
    );
};

export default SidenavBar;
export type {SidenavBarProps};
