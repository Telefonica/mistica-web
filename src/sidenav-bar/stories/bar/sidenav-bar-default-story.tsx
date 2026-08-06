'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
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
    useCustomBackgrounds: boolean;
    headerBackgroundColor: string;
    bodyBackgroundColor: string;
    footerBackgroundColor: string;
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
    useCustomBackgrounds,
    headerBackgroundColor,
    bodyBackgroundColor,
    footerBackgroundColor,
}: Args): React.JSX.Element => {
    const [lastAction, setLastAction] = React.useState<string>('');

    const handleAction = (actionName: string) => {
        setLastAction(`${new Date().toLocaleTimeString()}: ${actionName}`);
    };

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
                    {...(useCustomBackgrounds && {
                        background: {
                            header: headerBackgroundColor as any,
                            body: bodyBackgroundColor,
                            footer: footerBackgroundColor as any,
                        },
                    })}
                >
                    <SidenavSection>
                        <SidenavItem
                            id="home"
                            label="Home (href)"
                            asset={IconHomeRegular}
                            href="#home"
                            onNavigate={() => handleAction('Home navigated')}
                        />
                        <SidenavItem
                            id="search"
                            label="Search (onPress)"
                            asset={IconSearchRegular}
                            onPress={() => handleAction('Search clicked')}
                        />
                    </SidenavSection>
                    <SidenavSection title="Workspace" dividerTop>
                        <SidenavItem id="projects" label="Projects" asset={IconFolderRegular} defaultOpen>
                            <SidenavItem
                                id="active"
                                label="Active"
                                asset={IconDocumentsRegular}
                                href="#active"
                                onNavigate={() => handleAction('Active clicked')}
                            />
                            <SidenavItem
                                id="archived"
                                label="Archived"
                                asset={IconDocumentsRegular}
                                href="#archived"
                                onNavigate={() => handleAction('Archived clicked')}
                            />
                            <SidenavItem
                                id="draft"
                                label="Draft"
                                href="#draft"
                                onNavigate={() => handleAction('Draft clicked')}
                            />
                            <SidenavItem
                                id="review"
                                label="In Review"
                                asset={IconDocumentsRegular}
                                href="#review"
                                onNavigate={() => handleAction('In Review clicked')}
                            />
                        </SidenavItem>
                        <SidenavItem id="teams" label="Teams" asset={IconFolderRegular}>
                            <SidenavItem
                                id="eng"
                                label="Engineering"
                                asset={IconSearchRegular}
                                onPress={() => handleAction('Engineering team clicked')}
                            />
                            <SidenavItem
                                id="design"
                                label="Design"
                                asset={IconSearchRegular}
                                onPress={() => handleAction('Design team clicked')}
                            />
                            <SidenavItem
                                id="marketing"
                                label="Marketing"
                                asset={IconSearchRegular}
                                onPress={() => handleAction('Marketing team clicked')}
                            />
                        </SidenavItem>
                        <SidenavItem
                            id="notifications"
                            label="Notifications"
                            asset={IconBellRegular}
                            href="#notifications"
                            onNavigate={() => handleAction('Notifications clicked')}
                            rightSlot={<Badge value={5} />}
                        />
                    </SidenavSection>
                    <SidenavSection title="Account" dividerTop>
                        <SidenavItem
                            id="profile"
                            label="Profile"
                            asset={IconDocumentsRegular}
                            onPress={() => handleAction('Profile clicked')}
                        />
                        <SidenavItem
                            id="history"
                            label="History"
                            asset={IconAlarmClockRegular}
                            href="#history"
                            onNavigate={() => handleAction('History clicked')}
                        />
                        <SidenavItem
                            id="settings"
                            label="Settings"
                            asset={IconSettingsRegular}
                            href="#settings"
                            onNavigate={() => handleAction('Settings clicked')}
                        />
                    </SidenavSection>
                    <SidenavSection title="Help" dividerTop dividerBottom>
                        <SidenavItem
                            id="docs"
                            label="Documentation"
                            asset={IconDocumentsRegular}
                            href="#docs"
                            onNavigate={() => handleAction('Documentation clicked')}
                        />
                        <SidenavItem
                            id="support"
                            label="Support"
                            asset={IconSearchRegular}
                            onPress={() => handleAction('Support clicked')}
                        />
                    </SidenavSection>
                </SidenavBar>
            ) : (
                // @ts-expect-error Complex union type - spreads with conditionals
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
                    {...(useCustomBackgrounds && {
                        background: {
                            header: headerBackgroundColor as any,
                            body: bodyBackgroundColor,
                            footer: footerBackgroundColor as any,
                        },
                    })}
                >
                    <SidenavSection>
                        <SidenavItem
                            id="home"
                            label="Home (href)"
                            asset={IconHomeRegular}
                            href="#home"
                            onNavigate={() => handleAction('Home navigated')}
                        />
                        <SidenavItem
                            id="search"
                            label="Search (onPress)"
                            asset={IconSearchRegular}
                            onPress={() => handleAction('Search clicked')}
                        />
                    </SidenavSection>
                    <SidenavSection title="Workspace" dividerTop>
                        <SidenavItem id="projects" label="Projects" asset={IconFolderRegular} defaultOpen>
                            <SidenavItem
                                id="active"
                                label="Active"
                                asset={IconDocumentsRegular}
                                href="#active"
                                onNavigate={() => handleAction('Active clicked')}
                            />
                            <SidenavItem
                                id="archived"
                                label="Archived"
                                asset={IconDocumentsRegular}
                                href="#archived"
                                onNavigate={() => handleAction('Archived clicked')}
                            />
                            <SidenavItem
                                id="draft"
                                label="Draft"
                                href="#draft"
                                onNavigate={() => handleAction('Draft clicked')}
                            />
                            <SidenavItem
                                id="review"
                                label="In Review"
                                asset={IconDocumentsRegular}
                                href="#review"
                                onNavigate={() => handleAction('In Review clicked')}
                            />
                        </SidenavItem>
                        <SidenavItem id="teams" label="Teams" asset={IconFolderRegular}>
                            <SidenavItem
                                id="eng"
                                label="Engineering"
                                asset={IconSearchRegular}
                                onPress={() => handleAction('Engineering team clicked')}
                            />
                            <SidenavItem
                                id="design"
                                label="Design"
                                asset={IconSearchRegular}
                                onPress={() => handleAction('Design team clicked')}
                            />
                            <SidenavItem
                                id="marketing"
                                label="Marketing"
                                asset={IconSearchRegular}
                                onPress={() => handleAction('Marketing team clicked')}
                            />
                        </SidenavItem>
                        <SidenavItem
                            id="notifications"
                            label="Notifications"
                            asset={IconBellRegular}
                            href="#notifications"
                            onNavigate={() => handleAction('Notifications clicked')}
                            rightSlot={<Badge value={5} />}
                        />
                    </SidenavSection>
                    <SidenavSection title="Account" dividerTop>
                        <SidenavItem
                            id="profile"
                            label="Profile"
                            asset={IconDocumentsRegular}
                            onPress={() => handleAction('Profile clicked')}
                        />
                        <SidenavItem
                            id="history"
                            label="History"
                            asset={IconAlarmClockRegular}
                            href="#history"
                            onNavigate={() => handleAction('History clicked')}
                        />
                        <SidenavItem
                            id="settings"
                            label="Settings"
                            asset={IconSettingsRegular}
                            href="#settings"
                            onNavigate={() => handleAction('Settings clicked')}
                        />
                    </SidenavSection>
                    <SidenavSection title="Help" dividerTop dividerBottom>
                        <SidenavItem
                            id="docs"
                            label="Documentation"
                            asset={IconDocumentsRegular}
                            href="#docs"
                            onNavigate={() => handleAction('Documentation clicked')}
                        />
                        <SidenavItem
                            id="support"
                            label="Support"
                            asset={IconSearchRegular}
                            onPress={() => handleAction('Support clicked')}
                        />
                    </SidenavSection>
                </SidenavBar>
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
        useCustomBackgrounds: false,
        headerBackgroundColor: '#e8f4f8',
        bodyBackgroundColor: '#fafafa',
        footerBackgroundColor: '#f0e8f4',
    },
    argTypes: {
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
        },
        divider: {if: {arg: 'boxed', truthy: false}},
        fixedFooter: {if: {arg: 'footerSlot', truthy: true}},
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
            description: 'Width of the expanded sidenav in pixels',
        },
        useCustomBackgrounds: {
            control: {type: 'boolean'},
            description: 'Override background colors for each region',
        },
        headerBackgroundColor: {
            control: {type: 'color'},
            description: 'Background color for header (must be opaque)',
            if: {arg: 'useCustomBackgrounds', truthy: true},
        },
        bodyBackgroundColor: {
            control: {type: 'color'},
            description: 'Background color for body (can be any color including transparent)',
            if: {arg: 'useCustomBackgrounds', truthy: true},
        },
        footerBackgroundColor: {
            control: {type: 'color'},
            description: 'Background color for footer (must be opaque)',
            if: {arg: 'useCustomBackgrounds', truthy: true},
        },
    },
};
