import * as React from 'react';
import {SidenavBar} from '../../..';
import IconHomeRegular from '@telefonica/mistica-icons/icon-home-regular';
import IconFolderRegular from '@telefonica/mistica-icons/icon-folder-regular';
import IconSettingsRegular from '@telefonica/mistica-icons/icon-settings-regular';

import type {SidenavEntry} from '../../sidenav-bar-types';

const entries: ReadonlyArray<SidenavEntry> = [
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
// item wraps itself in a tooltip because the collapse state starts at rest collapsed.
const SidenavBarCollapsedTest = (): JSX.Element => (
    <SidenavBar
        aria-label="Main navigation"
        entries={entries}
        selectedItemId="home"
        defaultCollapsed
        logo={<span>LOGO</span>}
    />
);

export default SidenavBarCollapsedTest;
