'use client';
import * as React from 'react';
import * as styles from './sidenav-bar-layout.css';
import {InternalResponsiveLayout} from './responsive-layout';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';

import type {DataAttributes} from './utils/types';

type SidenavLayoutProps = {
    /** Content of the sidenav column (typically SidenavBar). */
    sidenav: React.ReactNode;
    /** Content of the main area, which sits beside the sidenav. */
    children: React.ReactNode;
    /** Layout mode: 'whole-viewport' spans full width, 'centered' wraps in responsive container. @default 'whole-viewport' */
    mode?: 'whole-viewport' | 'centered';
    /**
     * Height in px of a persistent band above the layout (a fixed or sticky top header). The sidenav
     * sticks below it instead of taking the whole viewport. A header that scrolls away with the page
     * needs no offset. @default 0
     */
    topOffset?: number;
    /** Custom data attributes for testing and tracking. */
    dataAttributes?: DataAttributes;
};

const SidenavLayout = ({
    sidenav,
    children,
    mode = 'whole-viewport',
    topOffset,
    dataAttributes,
}: SidenavLayoutProps): JSX.Element => {
    const layout = (
        <div
            className={styles.container}
            style={topOffset ? applyCssVars({[styles.topOffsetVar]: `${topOffset}px`}) : undefined}
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
