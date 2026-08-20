'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconCheckRegular from '../../../generated/mistica-icons/icon-check-regular';
import IconTrashCanRegular from '../../../generated/mistica-icons/icon-trash-can-regular';
import {Placeholder} from '../../../placeholder';
import Box from '../../../box';
import Stack from '../../../stack';
import Callout from '../../../callout';
import {Text3, Text6} from '../../../text';
import {vars as skinVars} from '../../../skins/skin-contract.css';
import {SidenavStoryPage} from './sidenav-story-page';

import type {Variant} from '../../../theme-variant-context';

type Args = {
    label: string;
    variant: Variant;
    logo: boolean;
    headerSlot: boolean;
    footerSlot: boolean;
    fixedFooter: boolean;
    boxed: boolean;
    divider: boolean;
    collapsible: boolean;
    defaultCollapsed: boolean;
    doublePanel: boolean;
    width: number;
    'Colors/Enabled': boolean;
    'Colors/Header': string;
    'Colors/Body': string;
    'Colors/Footer': string;
};

export const WithActionTracking = ({
    label,
    variant,
    logo,
    headerSlot,
    footerSlot,
    fixedFooter,
    boxed,
    divider,
    collapsible,
    defaultCollapsed,
    doublePanel,
    width,
    'Colors/Enabled': colorsEnabled,
    'Colors/Header': headerColor,
    'Colors/Body': bodyColor,
    'Colors/Footer': footerColor,
}: Args): React.JSX.Element => {
    const [lastAction, setLastAction] = React.useState<string>('');

    const handleAction = (actionName: string) => {
        setLastAction(`${new Date().toLocaleTimeString()}: ${actionName}`);
    };

    const background = colorsEnabled
        ? {
              header: headerColor as any,
              body: bodyColor as any,
              footer: footerColor as any,
          }
        : {};

    const sections = [
        {
            items: [
                {
                    id: 'home',
                    label: 'Home',
                    asset: IconHomeRegular,
                    onPress: () => handleAction('Home clicked'),
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
                        {
                            id: 'active',
                            label: 'Active Projects',
                            onPress: () => handleAction('Active Projects clicked'),
                        },
                        {
                            id: 'archived',
                            label: 'Archived Projects',
                            onPress: () => handleAction('Archived Projects clicked'),
                        },
                        {
                            id: 'completed',
                            label: 'Completed',
                            onPress: () => handleAction('Completed clicked'),
                        },
                    ],
                },
                {
                    id: 'documents',
                    label: 'Documents',
                    asset: IconDocumentsRegular,
                    children: [
                        {
                            id: 'shared',
                            label: 'Shared with me',
                            onPress: () => handleAction('Shared with me clicked'),
                        },
                        {
                            id: 'starred',
                            label: 'Starred',
                            onPress: () => handleAction('Starred clicked'),
                        },
                    ],
                },
            ],
        },
        {
            title: 'Tasks & Approvals',
            dividerTop: true,
            items: [
                {
                    id: 'tasks',
                    label: 'My Tasks',
                    asset: IconCheckRegular,
                    children: [
                        {
                            id: 'pending',
                            label: 'Pending Review',
                            onPress: () => handleAction('Pending Review clicked'),
                        },
                        {
                            id: 'completed-tasks',
                            label: 'Completed',
                            onPress: () => handleAction('Completed Tasks clicked'),
                        },
                    ],
                },
            ],
        },
        {
            title: 'Other',
            dividerTop: true,
            items: [
                {
                    id: 'settings',
                    label: 'Settings',
                    asset: IconSettingsRegular,
                    onPress: () => handleAction('Settings clicked'),
                },
                {
                    id: 'trash',
                    label: 'Trash',
                    asset: IconTrashCanRegular,
                    onPress: () => handleAction('Trash clicked'),
                },
            ],
        },
    ];

    return (
        <SidenavStoryPage
            sidenav={
                <SidenavBar
                    {...({
                        'aria-label': label,
                        variant,
                        logo,
                        headerSlot: headerSlot ? <Placeholder height={76} /> : undefined,
                        footerSlot: footerSlot ? <Placeholder height={76} /> : undefined,
                        fixedFooter,
                        boxed,
                        divider,
                        collapsible,
                        defaultCollapsed,
                        doublePanel,
                        width,
                        background,
                        sections,
                    } as any)}
                />
            }
        >
            <Box padding={32}>
                <Stack space={24}>
                    <Stack space={8}>
                        <Text6 as="h1">Action tracking example</Text6>
                        <Text3 regular>
                            Press the items of the sidenav, or open a parent item, to track the actions below.
                        </Text3>
                    </Stack>

                    <Callout
                        asset={<IconCheckRegular color={skinVars.colors.brand} />}
                        title="Last action"
                        description={lastAction || 'Press an item to trigger an action.'}
                    />
                </Stack>
            </Box>
        </SidenavStoryPage>
    );
};

export default {
    title: 'Components/SidenavBar/Bar',
    component: SidenavBar,
    parameters: {
        fullScreen: true,
        docs: {
            source: {state: 'open'},
        },
        controls: {
            expanded: false,
        },
    },
    tags: ['autodocs'],
    args: {
        label: 'Navigation',
        variant: 'default',
        logo: true,
        headerSlot: false,
        footerSlot: false,
        fixedFooter: true,
        boxed: false,
        divider: true,
        collapsible: true,
        defaultCollapsed: false,
        doublePanel: false,
        width: 256,
        'Colors/Enabled': false,
        'Colors/Header': '#ffffff',
        'Colors/Body': '#f5f5f5',
        'Colors/Footer': '#ffffff',
    },
    argTypes: {
        label: {control: 'text'},
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
        },
        // The prop takes an element or a boolean, and Storybook drops a control value that does not match
        // the type it reads from that union. The story declares the type of its own arg instead.
        logo: {control: 'boolean', type: {name: 'boolean'}},
        headerSlot: {control: 'boolean'},
        footerSlot: {control: 'boolean'},
        fixedFooter: {
            control: {type: 'boolean'},
            if: {arg: 'footerSlot', truthy: true},
        },
        boxed: {control: 'boolean'},
        divider: {
            if: {arg: 'boxed', truthy: false},
        },
        collapsible: {control: 'boolean'},
        defaultCollapsed: {control: 'boolean'},
        doublePanel: {control: 'boolean'},
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
        'Colors/Enabled': {
            control: {type: 'boolean'},
            table: {category: 'Colors'},
        },
        'Colors/Header': {
            control: {type: 'color'},
            description: 'Header background color (must be opaque)',
            table: {category: 'Colors'},
        },
        'Colors/Body': {
            control: {type: 'color'},
            description: 'Body background color (can be any color)',
            table: {category: 'Colors'},
        },
        'Colors/Footer': {
            control: {type: 'color'},
            description: 'Footer background color (must be opaque)',
            table: {category: 'Colors'},
        },
    },
};
