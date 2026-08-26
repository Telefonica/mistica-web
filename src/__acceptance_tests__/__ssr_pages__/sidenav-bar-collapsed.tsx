import * as React from 'react';
import {SidenavBar, IconHomeRegular, IconFolderRegular, IconSettingsRegular} from '../../..';

import type {SidenavEntry} from '../../sidenav-bar-types';

const sections: ReadonlyArray<SidenavEntry> = [
    {id: 'home', label: 'Home', asset: IconHomeRegular, href: '#home'},
    {
        title: 'Workspace',
        items: [
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                children: [
                    {id: 'active', label: 'Active', href: '#active'},
                    {id: 'archived', label: 'Archived', href: '#archived'},
                ],
            },
        ],
    },
    {id: 'settings', label: 'Settings', asset: IconSettingsRegular, href: '#settings'},
];

// The collapsed rail exercises the other server path: the labels keep their box but fade out, and every
// item wraps itself in a tooltip because `collapsedSettled` starts at the collapsed value.
const SidenavBarCollapsedTest = (): JSX.Element => (
    <SidenavBar
        aria-label="Main navigation"
        sections={sections}
        selectedItemId="home"
        defaultCollapsed
        logo={<span>LOGO</span>}
    />
);

export default SidenavBarCollapsedTest;
