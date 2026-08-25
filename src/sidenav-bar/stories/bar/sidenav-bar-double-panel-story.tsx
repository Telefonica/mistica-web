'use client';

import * as React from 'react';
import {SidenavBar, SidenavLayout} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import Box from '../../../box';
import Stack from '../../../stack';
import {UnorderedList, ListItem} from '../../../list';
import {Text2, Text3, Text6} from '../../../text';
import {vars as skinVars} from '../../../skins/skin-contract.css';

import type {SidenavSection} from '../../sidenav-types';

type Args = {
    collapsed: boolean;
    boxed: boolean;
    divider: boolean;
    width: number;
};

export const DoublePanel = ({collapsed, boxed, divider, width}: Args): React.JSX.Element => {
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
        <div style={{width: '100%', minHeight: '100vh'}}>
            <SidenavLayout mode="whole-viewport">
                <SidenavLayout.Sidenav>
                    <SidenavBar
                        {...({
                            'aria-label': 'Main navigation',
                            sections,
                            logo: false,
                            doublePanel: true,
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
                    <Box padding={32}>
                        <Stack space={24}>
                            <Stack space={8}>
                                <Text6 as="h1">Double panel</Text6>
                                <Text3 regular>
                                    Press a parent item to open its children in a second column. The column
                                    pushes this content, it does not overlay it.
                                </Text3>
                            </Stack>

                            <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                <UnorderedList>
                                    <ListItem>
                                        The panel closes when you press one of its children, an item without
                                        children, the same parent again, or outside of the bar.
                                    </ListItem>
                                    <ListItem>
                                        A press inside the bar that lands on no item, on the background of a
                                        column, or on a section title, keeps the panel open.
                                    </ListItem>
                                    <ListItem>
                                        The panel refreshes when you press another parent item.
                                    </ListItem>
                                    <ListItem>
                                        A selection that comes from outside of the bar opens the panel on the
                                        parent of the selected child, and it keeps the panel open. It moves
                                        the panel to that parent when the panel shows another one.
                                    </ListItem>
                                    <ListItem>
                                        The panel shows the label of the parent item as its title.
                                    </ListItem>
                                    <ListItem>
                                        Turn on the collapsed control. The rail keeps the tooltip of every
                                        item while the column is open, except the item that owns the column.
                                    </ListItem>
                                </UnorderedList>
                            </Text2>

                            <Text3 medium>Selected item: {selectedItemId ?? 'none'}</Text3>
                        </Stack>
                    </Box>
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
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
    },
};
