'use client';

import * as React from 'react';
import {SidenavBar, SidenavLayout} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';

import type {SidenavSection} from '../../sidenav-types';

type Args = {
    collapsed: boolean;
    boxed: boolean;
    divider: boolean;
    panelWidth: number;
    width: number;
};

export const DoublePanel = ({collapsed, boxed, divider, panelWidth, width}: Args): React.JSX.Element => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>('home');

    const sections: Array<SidenavSection> = [
        {
            items: [
                {
                    id: 'home',
                    label: 'Home',
                    asset: IconHomeRegular,
                    href: '#home',
                },
            ],
        },
        {
            title: 'Workspace',
            dividerTop: true,
            items: [
                {
                    id: 'projects',
                    label: 'Projects',
                    asset: IconFolderRegular,
                    children: [
                        {id: 'active', label: 'Active projects', href: '#active'},
                        {id: 'archived', label: 'Archived projects', href: '#archived'},
                        {id: 'templates', label: 'Templates', href: '#templates'},
                    ],
                },
                {
                    id: 'documents',
                    label: 'Documents',
                    asset: IconDocumentsRegular,
                    children: [
                        {id: 'shared', label: 'Shared with me', href: '#shared'},
                        {id: 'starred', label: 'Starred', href: '#starred'},
                    ],
                },
                {
                    id: 'notifications',
                    label: 'Notifications',
                    asset: IconBellRegular,
                    href: '#notifications',
                },
            ],
        },
        {
            title: 'Account',
            dividerTop: true,
            items: [
                {
                    id: 'settings',
                    label: 'Settings',
                    asset: IconSettingsRegular,
                    href: '#settings',
                },
            ],
        },
    ];

    return (
        <div style={{width: '100%', height: '100vh'}}>
            <SidenavLayout mode="whole-viewport">
                <SidenavLayout.Sidenav>
                    <SidenavBar
                        {...({
                            'aria-label': 'Main navigation',
                            sections,
                            logo: false,
                            doublePanel: true,
                            panelWidth,
                            width,
                            boxed,
                            divider,
                            collapsible: true,
                            collapsed,
                            selectedItemId,
                            onSelectedItemIdChange: setSelectedItemId,
                        } as any)}
                    />
                </SidenavLayout.Sidenav>
                <SidenavLayout.Content>
                    <div style={{padding: 32}}>
                        <h1 style={{marginTop: 0}}>Double panel</h1>
                        <p>
                            Press a parent item to open its children in a second column. The column pushes
                            this content, it does not overlay it.
                        </p>
                        <ul>
                            <li>
                                The panel closes when you press a child, an item without children, or outside.
                            </li>
                            <li>The panel refreshes when you press another parent item.</li>
                            <li>The panel shows the label of the parent item as its title.</li>
                        </ul>
                        <p>
                            Selected item: <strong>{selectedItemId ?? 'none'}</strong>
                        </p>
                    </div>
                </SidenavLayout.Content>
            </SidenavLayout>
        </div>
    );
};

DoublePanel.storyName = 'SidenavBar double panel';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
    args: {
        collapsed: false,
        boxed: false,
        divider: true,
        panelWidth: 240,
        width: 240,
    },
    argTypes: {
        collapsed: {
            control: {type: 'boolean'},
        },
        boxed: {
            control: {type: 'boolean'},
        },
        divider: {
            control: {type: 'boolean'},
            description:
                'Right divider of the sidenav. The divider between the two columns always renders while the panel is open.',
            if: {arg: 'boxed', truthy: false},
        },
        panelWidth: {
            control: {type: 'range', min: 200, max: 400, step: 5},
            description: 'Width of the second column.',
        },
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
    },
};
