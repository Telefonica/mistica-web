'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconAlarmClockRegular from '../../../generated/mistica-icons/icon-alarm-clock-regular';
import {Placeholder} from '../../../placeholder';
import Badge from '../../../badge';

import type {Variant} from '../../../theme-variant-context';
import type {SidenavSection, SidenavItem} from '../../sidenav-types';

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
    width,
}: Args): React.JSX.Element => {
    const [lastAction, setLastAction] = React.useState<string>('');

    const handleAction = (actionName: string) => {
        setLastAction(`${new Date().toLocaleTimeString()}: ${actionName}`);
    };

    const sections: SidenavSection[] = [
        {
            items: [
                {
                    id: 'home',
                    label: 'Home (href)',
                    asset: IconHomeRegular,
                    href: '#home',
                    onNavigate: () => handleAction('Home navigated'),
                },
                {
                    id: 'search',
                    label: 'Search (onPress)',
                    asset: IconSearchRegular,
                    onPress: () => handleAction('Search clicked'),
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
                            onNavigate: () => handleAction('Active clicked'),
                        },
                        {
                            id: 'archived',
                            label: 'Archived',
                            asset: IconDocumentsRegular,
                            href: '#archived',
                            onNavigate: () => handleAction('Archived clicked'),
                        },
                        {
                            id: 'draft',
                            label: 'Draft',
                            href: '#draft',
                            onNavigate: () => handleAction('Draft clicked'),
                        },
                        {
                            id: 'review',
                            label: 'In Review',
                            asset: IconDocumentsRegular,
                            href: '#review',
                            onNavigate: () => handleAction('In Review clicked'),
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
                            onPress: () => handleAction('Engineering team clicked'),
                        },
                        {
                            id: 'design',
                            label: 'Design',
                            asset: IconSearchRegular,
                            onPress: () => handleAction('Design team clicked'),
                        },
                        {
                            id: 'marketing',
                            label: 'Marketing',
                            asset: IconSearchRegular,
                            onPress: () => handleAction('Marketing team clicked'),
                        },
                    ],
                },
                {
                    id: 'notifications',
                    label: 'Notifications',
                    asset: IconBellRegular,
                    href: '#notifications',
                    onNavigate: () => handleAction('Notifications clicked'),
                    rightSlot: <Badge value={5} />,
                },
            ],
        },
        {
            title: 'Account',
            dividerTop: true,
            items: [
                {
                    id: 'profile',
                    label: 'Profile',
                    asset: IconDocumentsRegular,
                    onPress: () => handleAction('Profile clicked'),
                },
                {
                    id: 'history',
                    label: 'History',
                    asset: IconAlarmClockRegular,
                    href: '#history',
                    onNavigate: () => handleAction('History clicked'),
                },
                {
                    id: 'settings',
                    label: 'Settings',
                    asset: IconSettingsRegular,
                    href: '#settings',
                    onNavigate: () => handleAction('Settings clicked'),
                },
            ],
        },
        {
            title: 'Help',
            dividerTop: true,
            dividerBottom: true,
            items: [
                {
                    id: 'docs',
                    label: 'Documentation',
                    asset: IconDocumentsRegular,
                    href: '#docs',
                    onNavigate: () => handleAction('Documentation clicked'),
                },
                {
                    id: 'support',
                    label: 'Support',
                    asset: IconSearchRegular,
                    onPress: () => handleAction('Support clicked'),
                },
            ],
        },
    ];

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            {boxed ? (
                <SidenavBar
                    aria-label={label}
                    variant={variant}
                    logo={logo ? undefined : false}
                    headerSlot={headerSlot ? <Placeholder height={76} /> : undefined}
                    footerSlot={footerSlot ? <Placeholder height={76} /> : undefined}
                    fixedFooter={fixedFooter}
                    boxed
                    collapsible={collapsible}
                    defaultCollapsed={defaultCollapsed}
                    doublePanel={doublePanel}
                    width={width}
                    sections={sections}
                />
            ) : (
                <SidenavBar
                    aria-label={label}
                    variant={variant}
                    logo={logo ? undefined : false}
                    headerSlot={headerSlot ? <Placeholder height={76} /> : undefined}
                    footerSlot={footerSlot ? <Placeholder height={76} /> : undefined}
                    fixedFooter={fixedFooter}
                    boxed={false}
                    divider={divider}
                    collapsible={collapsible}
                    defaultCollapsed={defaultCollapsed}
                    doublePanel={doublePanel}
                    width={width}
                    sections={sections}
                />
            )}
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
                        backgroundColor: '#fffbea',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginTop: '1.5rem',
                        border: '1px solid #ffc107',
                    }}
                >
                    <h3>Last Action Triggered</h3>
                    <div
                        style={{
                            fontSize: '1rem',
                            color: '#d97706',
                            marginTop: '0.5rem',
                            fontFamily: 'monospace',
                            minHeight: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        {lastAction || '(Click items to trigger actions)'}
                    </div>
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
        width: 240,
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
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
    },
};
