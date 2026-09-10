import * as React from 'react';
import {SidenavBar, Badge, IconHomeRegular, IconFolderRegular, IconSettingsRegular} from '../../..';

import type {SidenavEntry} from '../../sidenav-bar-types';

// The selected item is a child of a parent with `defaultOpen`, so the server renders the open group and
// the selected states, and the hydrated screen changes nothing: the auto-expand of the parent finds the
// group already open. A closed parent would instead open after the hydration, which the visual check of
// `openSSRPage` reads as a mismatch.
const sections: ReadonlyArray<SidenavEntry> = [
    {id: 'home', label: 'Home', asset: IconHomeRegular, href: '#home'},
    {
        title: 'Workspace',
        items: [
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                defaultOpen: true,
                children: [
                    {id: 'active', label: 'Active', href: '#active'},
                    {id: 'archived', label: 'Archived', href: '#archived', rightSlot: <Badge value={2} />},
                ],
            },
        ],
    },
    {id: 'settings', label: 'Settings', asset: IconSettingsRegular, href: '#settings'},
];

// The default logo loads the brand mark of the skin in a chunk of its own, which the bundler of the SSR
// harness does not serve (see the main-navigation-bar page), so the page brings a logo of its own.
const SidenavBarTest = (): JSX.Element => (
    <SidenavBar
        aria-label="Main navigation"
        sections={sections}
        selectedItemId="active"
        logo={<span>LOGO</span>}
    />
);

export default SidenavBarTest;
