'use client';

import * as React from 'react';
import {SidenavLayout} from '..';

type SidenavStoryPageProps = {
    /** The sidenav of the page. */
    sidenav: React.ReactNode;
    /** The content of the page, which the sidenav sits beside. */
    children: React.ReactNode;
    /** Background of the page, which a story that shows a variant needs. */
    backgroundColor?: string;
};

/**
 * Page of a story that shows the sidenav beside the content of a page, through `SidenavLayout`, so the
 * story models the layout that a consumer builds.
 */
const SidenavStoryPage = ({sidenav, children, backgroundColor}: SidenavStoryPageProps): React.JSX.Element => (
    <div style={{minHeight: '100vh', backgroundColor}}>
        <SidenavLayout mode="whole-viewport" sidenav={sidenav}>
            {children}
        </SidenavLayout>
    </div>
);

export {SidenavStoryPage};
export type {SidenavStoryPageProps};
