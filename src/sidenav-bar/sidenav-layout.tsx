'use client';
import * as React from 'react';
import * as styles from './sidenav-layout.css';
import {InternalResponsiveLayout} from '../responsive-layout';
import {getPrefixedDataAttributes} from '../utils/dom';

import type {DataAttributes} from '../utils/types';

/**
 * Props for the sidenav section of SidenavLayout.
 */
type SidenavLayoutSidenavProps = {
    /** Content to render in the sidenav column (typically SidenavBar). */
    children: React.ReactNode;
};

/**
 * Props for the main content section of SidenavLayout.
 */
type SidenavLayoutContentProps = {
    /** Content to render in the main content area. */
    children: React.ReactNode;
};

/**
 * Props for SidenavLayout wrapper component.
 */
type SidenavLayoutProps = {
    /** Layout mode: 'whole-viewport' spans full width, 'centered' wraps in responsive container. @default 'whole-viewport' */
    mode?: 'whole-viewport' | 'centered';
    /** Layout sections: should contain `SidenavLayout.Sidenav` and `SidenavLayout.Content` children. */
    children: React.ReactNode;
    /** Custom data attributes for testing and tracking. */
    dataAttributes?: DataAttributes;
};

const SidenavLayoutSidenav = ({children}: SidenavLayoutSidenavProps): JSX.Element => (
    <div className={styles.sidenav}>{children}</div>
);

const SidenavLayoutContent = ({children}: SidenavLayoutContentProps): JSX.Element => (
    <div className={styles.content}>{children}</div>
);

const SidenavLayout = ({
    mode = 'whole-viewport',
    children,
    dataAttributes,
}: SidenavLayoutProps): JSX.Element => {
    const layout = (
        <div
            className={styles.container}
            {...getPrefixedDataAttributes({testid: 'SidenavLayout', ...dataAttributes})}
        >
            {children}
        </div>
    );

    if (mode === 'centered') {
        return (
            <div className={styles.centeredContainer}>
                <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <InternalResponsiveLayout
                        className={styles.centeredResponsiveContainer}
                        innerDivClassName={styles.centeredResponsiveLayout}
                        shouldExpandWhenNested
                    >
                        {layout}
                    </InternalResponsiveLayout>
                </div>
            </div>
        );
    }

    return layout;
};

SidenavLayout.Sidenav = SidenavLayoutSidenav;
SidenavLayout.Content = SidenavLayoutContent;

export default SidenavLayout;
export {SidenavLayout, SidenavLayoutSidenav, SidenavLayoutContent};
export type {SidenavLayoutProps, SidenavLayoutSidenavProps, SidenavLayoutContentProps};
