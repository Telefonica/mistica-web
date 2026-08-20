'use client';

import * as React from 'react';
import {useScreenSize} from '../../../hooks';

type SidenavStoryPageProps = {
    /** The sidenav of the page. */
    sidenav: React.ReactNode;
    /** The content of the page, which the sidenav sits beside. */
    children: React.ReactNode;
    /** Background of the page, which a story that shows a variant needs. */
    backgroundColor?: string;
};

/**
 * Page of a story that shows the sidenav beside the content of a page. The sidenav of a mobile or a tablet
 * is a top bar, and not a column, so the two regions stack there, the same way that `SidenavLayout` stacks
 * them. A consumer that builds a layout of its own owns that rule as well.
 */
const SidenavStoryPage = ({sidenav, children, backgroundColor}: SidenavStoryPageProps): React.JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: isTabletOrSmaller ? 'column' : 'row',
                height: '100vh',
                backgroundColor,
            }}
        >
            {sidenav}
            <div style={{flex: 1, minHeight: 0, overflowY: 'auto'}}>{children}</div>
        </div>
    );
};

export {SidenavStoryPage};
export type {SidenavStoryPageProps};
