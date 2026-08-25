'use client';

import * as React from 'react';
import {SidenavLayout} from '../../index';

type SidenavStoryPageProps = {
    /** The sidenav of the page. */
    sidenav: React.ReactNode;
    /** The content of the page, which the sidenav sits beside. */
    children: React.ReactNode;
    /** Background of the page, which a story that shows a variant needs. */
    backgroundColor?: string;
};

/**
 * Page of a story that shows the sidenav beside the content of a page. It reuses `SidenavLayout`, so the
 * story models the layout that a consumer builds: the document scrolls, and the rail sticks to the top of
 * the viewport beside the content. A mobile or tablet sidenav is a top bar, and not a column, so the two
 * regions stack there, which `SidenavLayout` handles as well.
 */
const SidenavStoryPage = ({sidenav, children, backgroundColor}: SidenavStoryPageProps): React.JSX.Element => (
    <div style={{minHeight: '100vh', backgroundColor}}>
        <SidenavLayout mode="whole-viewport">
            <SidenavLayout.Sidenav>{sidenav}</SidenavLayout.Sidenav>
            <SidenavLayout.Content>{children}</SidenavLayout.Content>
        </SidenavLayout>
    </div>
);

export {SidenavStoryPage};
export type {SidenavStoryPageProps};
