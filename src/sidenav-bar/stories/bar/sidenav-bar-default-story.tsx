'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import {Placeholder} from '../../../placeholder';
import Badge from '../../../badge';

import type {Variant} from '../../../theme-variant-context';
import type {SidenavSection} from '../../sidenav-types';
import type {SidenavBarBackgroundColors} from '../../sidenav-bar';

const getDefaultSections = (): Array<SidenavSection> => [
    {
        items: [
            {
                id: 'home',
                label: 'Home (href)',
                asset: IconHomeRegular,
                href: '#home',
                onNavigate: () => console.log('Home navigated'),
            },
            {
                id: 'search',
                label: 'Search (onPress)',
                asset: IconSearchRegular,
                onPress: () => console.log('Search clicked'),
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
                defaultOpen: true,
                children: [
                    {
                        id: 'active',
                        label: 'Active',
                        asset: IconDocumentsRegular,
                        href: '#active',
                        onNavigate: () => console.log('Active clicked'),
                    },
                    {
                        id: 'archived',
                        label: 'Archived',
                        asset: IconDocumentsRegular,
                        href: '#archived',
                        onNavigate: () => console.log('Archived clicked'),
                    },
                ],
            },
            {
                id: 'teams',
                label: 'Teams',
                asset: IconFolderRegular,
                children: [
                    {
                        id: 'eng',
                        label: 'Engineering',
                        asset: IconSearchRegular,
                        onPress: () => console.log('Engineering team clicked'),
                    },
                    {
                        id: 'design',
                        label: 'Design',
                        asset: IconSearchRegular,
                        onPress: () => console.log('Design team clicked'),
                    },
                ],
            },
            {
                id: 'notifications',
                label: 'Notifications',
                asset: IconBellRegular,
                href: '#notifications',
                rightSlot: <Badge value={2} />,
                onNavigate: () => console.log('Notifications clicked'),
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
                onNavigate: () => console.log('Settings clicked'),
            },
        ],
    },
];

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
    panelWidth: number;
    width: number;
    sections: Array<SidenavSection>;
    'Colors/Enabled'?: boolean;
    'Colors/Header'?: string;
    'Colors/Body'?: string;
    'Colors/Footer'?: string;
};

export const Default = ({
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
    panelWidth,
    width,
    'Colors/Enabled': colorsEnabled,
    'Colors/Header': headerColor,
    'Colors/Body': bodyColor,
    'Colors/Footer': footerColor,
}: Args): React.JSX.Element => {
    const background: SidenavBarBackgroundColors = colorsEnabled
        ? {
              header: headerColor as any,
              body: bodyColor as any,
              footer: footerColor as any,
          }
        : {};

    const sections: Array<SidenavSection> = getDefaultSections();

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            <SidenavBar
                {...({
                    'aria-label': label,
                    variant,
                    logo: logo ? undefined : false,
                    headerSlot: headerSlot ? <Placeholder height={76} /> : undefined,
                    footerSlot: footerSlot ? <Placeholder height={76} /> : undefined,
                    fixedFooter,
                    boxed,
                    divider,
                    collapsible,
                    defaultCollapsed,
                    doublePanel,
                    panelWidth,
                    width,
                    sections,
                    background,
                } as any)}
            />
            <div
                style={{
                    flex: 1,
                    padding: '2rem',
                    backgroundColor: '#f5f5f5',
                    overflowY: 'auto',
                }}
            >
                <h1>SidenavItem Props Showcase</h1>
                <p>Click items in the sidenav to see the different prop types in action.</p>

                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginTop: '1.5rem',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <h2>SidenavItem Prop Types</h2>
                    <ul>
                        <li>
                            <strong>href</strong> — Navigation via hyperlink with optional onNavigate
                            callback. Example: "Home (href)"
                        </li>
                        <li>
                            <strong>onPress</strong> — Click handler for custom actions. Example: "Search
                            (onPress)", "Profile"
                        </li>
                        <li>
                            <strong>children</strong> — Creates expandable items (e.g., "Projects", "Teams").
                            Cannot have href or onPress.
                        </li>
                        <li>
                            <strong>rightSlot</strong> — Adds custom content to the right side (e.g., Badge on
                            "Notifications")
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        backgroundColor: '#f0f9ff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginTop: '1.5rem',
                        border: '1px solid #0284c7',
                    }}
                >
                    <h3>Key Features</h3>
                    <ul style={{color: '#0c4a6e'}}>
                        <li>Parent items can have children (expandable) or navigation (href/onPress/to)</li>
                        <li>Child items cannot have children themselves (max 2 levels of nesting)</li>
                        <li>Use onPress for client-side actions, href/to for navigation</li>
                        <li>onNavigate callback fires on both href and to navigation</li>
                        <li>Items marked with "(href)" or "(onPress)" show the prop type being used</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

Default.storyName = 'SidenavBar';

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
        label: 'Main navigation',
        variant: 'default',
        logo: true,
        headerSlot: true,
        footerSlot: true,
        fixedFooter: false,
        boxed: false,
        divider: true,
        collapsible: true,
        defaultCollapsed: false,
        doublePanel: false,
        panelWidth: 240,
        width: 240,
        sections: getDefaultSections(),
        'Colors/Enabled': false,
        'Colors/Header': '#ffffff',
        'Colors/Body': '#f5f5f5',
        'Colors/Footer': '#ffffff',
    },
    argTypes: {
        label: {
            control: {type: 'text'},
        },
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
        },
        logo: {
            control: {type: 'boolean'},
        },
        headerSlot: {
            control: {type: 'boolean'},
        },
        footerSlot: {
            control: {type: 'boolean'},
        },
        fixedFooter: {
            control: {type: 'boolean'},
            if: {arg: 'footerSlot', truthy: true},
        },
        boxed: {
            control: {type: 'boolean'},
        },
        divider: {
            if: {arg: 'boxed', truthy: false},
        },
        collapsible: {
            control: {type: 'boolean'},
        },
        defaultCollapsed: {
            control: {type: 'boolean'},
        },
        doublePanel: {
            control: {type: 'boolean'},
        },
        panelWidth: {
            control: {type: 'range', min: 200, max: 400, step: 5},
            description: 'Width of the second column. Only applies when doublePanel is true.',
            if: {arg: 'doublePanel', truthy: true},
        },
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
        sections: {
            control: false,
            description:
                'Navigation sections (fixed in this story). Use "Editable Sections" story to edit sections via JSON control.',
            table: {
                category: 'Data',
            },
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
