'use client';
import * as React from 'react';
import * as styles from './sidenav-bar-layout.css';
import {InternalResponsiveLayout} from './responsive-layout';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type SidenavLayoutProps = {
    /** Content of the sidenav column (typically SidenavBar). */
    sidenav: React.ReactNode;
    /** Content of the main area, which sits beside the sidenav. */
    children: React.ReactNode;
    /** Layout mode: 'whole-viewport' spans full width, 'centered' wraps in responsive container. @default 'whole-viewport' */
    mode?: 'whole-viewport' | 'centered';
    /** Custom data attributes for testing and tracking. */
    dataAttributes?: DataAttributes;
};

const SidenavLayout = ({
    sidenav,
    children,
    mode = 'whole-viewport',
    dataAttributes,
}: SidenavLayoutProps): JSX.Element => {
    const layout = (
        <div
            className={styles.container}
            {...getPrefixedDataAttributes({testid: 'SidenavLayout', ...dataAttributes})}
        >
            <div className={styles.sidenav}>{sidenav}</div>
            <div className={styles.content}>{children}</div>
        </div>
    );

    if (mode === 'centered') {
        return (
            <InternalResponsiveLayout
                innerDivClassName={styles.centeredResponsiveLayout}
                shouldExpandWhenNested
            >
                {layout}
            </InternalResponsiveLayout>
        );
    }

    return layout;
};

export default SidenavLayout;
export {SidenavLayout};
export type {SidenavLayoutProps};
