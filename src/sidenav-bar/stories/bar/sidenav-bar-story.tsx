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
import Box from '../../../box';

import type {Meta} from '@storybook/react';
import type {Variant} from '../../../theme-variant-context';

const meta: Meta<typeof SidenavBar> = {
    title: 'Components/SidenavBar/Bar',
    component: SidenavBar,
    parameters: {
        fullScreen: true,
        docs: {
            source: {state: 'open'},
        },
    },
    tags: ['autodocs'],
};

export default meta;

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
    useCustomWidth: boolean;
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
    useCustomWidth,
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
                    {...(useCustomWidth && {width})}
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
                            />
                            <SidenavItem
                                id="archived"
                                label="Archived"
                                asset={IconDocumentsRegular}
                                href="#archived"
                            />
                            <SidenavItem id="draft" label="Draft" href="#draft" />
                            <SidenavItem
                                id="review"
                                label="In Review"
                                asset={IconDocumentsRegular}
                                href="#review"
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
                        />
                        <SidenavItem
                            id="settings"
                            label="Settings"
                            asset={IconSettingsRegular}
                            href="#settings"
                        />
                    </SidenavSection>
                    <SidenavSection title="Help" dividerTop dividerBottom>
                        <SidenavItem
                            id="docs"
                            label="Documentation"
                            asset={IconDocumentsRegular}
                            href="#docs"
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
                    {...(useCustomWidth && {width})}
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
                            />
                            <SidenavItem
                                id="archived"
                                label="Archived"
                                asset={IconDocumentsRegular}
                                href="#archived"
                            />
                            <SidenavItem id="draft" label="Draft" href="#draft" />
                            <SidenavItem
                                id="review"
                                label="In Review"
                                asset={IconDocumentsRegular}
                                href="#review"
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
                        />
                        <SidenavItem
                            id="settings"
                            label="Settings"
                            asset={IconSettingsRegular}
                            href="#settings"
                        />
                    </SidenavSection>
                    <SidenavSection title="Help" dividerTop dividerBottom>
                        <SidenavItem
                            id="docs"
                            label="Documentation"
                            asset={IconDocumentsRegular}
                            href="#docs"
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

Default.args = {
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
    useCustomWidth: false,
    width: 240,
    useCustomBackgrounds: false,
    headerBackgroundColor: '#e8f4f8',
    bodyBackgroundColor: '#fafafa',
    footerBackgroundColor: '#f0e8f4',
};

Default.argTypes = {
    variant: {
        options: ['default', 'brand', 'alternative', 'negative', 'media'],
        control: {type: 'select'},
    },
    divider: {if: {arg: 'boxed', truthy: false}},
    fixedFooter: {if: {arg: 'footerSlot', truthy: true}},
    useCustomWidth: {
        control: {type: 'boolean'},
        description: 'Use custom width instead of default',
    },
    width: {
        control: {type: 'range', min: 200, max: 400, step: 5},
        description: 'Width of the sidenav in pixels (only when useCustomWidth is enabled)',
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
};

export const DeepNesting = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Nested items example">
            <SidenavSection>
                <SidenavItem id="home" label="Home" asset={IconHomeRegular} href="#home" />
            </SidenavSection>
            <SidenavSection title="Navigation" dividerTop>
                <SidenavItem id="products" label="Products" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem id="web" label="Web App" asset={IconDocumentsRegular} href="#web" />
                    <SidenavItem id="mobile" label="Mobile App" asset={IconDocumentsRegular} href="#mobile" />
                    <SidenavItem
                        id="desktop"
                        label="Desktop App"
                        asset={IconDocumentsRegular}
                        href="#desktop"
                    />
                    <SidenavItem id="api" label="API Docs" href="#api" />
                </SidenavItem>
                <SidenavItem id="resources" label="Resources" asset={IconFolderRegular}>
                    <SidenavItem id="docs" label="Documentation" asset={IconDocumentsRegular} href="#docs" />
                    <SidenavItem id="examples" label="Examples" asset={IconSearchRegular} href="#examples" />
                    <SidenavItem id="faq" label="FAQ" href="#faq" />
                </SidenavItem>
                <SidenavItem id="other" label="Other" asset={IconSearchRegular} href="#other" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DeepNesting.storyName = 'Nested items';

export const WithRightSlots = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Right slots example">
            <SidenavSection>
                <SidenavItem
                    id="home"
                    label="Home"
                    asset={IconHomeRegular}
                    href="#home"
                    rightSlot={<Badge value={3} />}
                />
                <SidenavItem
                    id="notif"
                    label="Notifications"
                    asset={IconBellRegular}
                    href="#notif"
                    rightSlot={<Badge value={12} />}
                />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem id="projects" label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem
                        id="active"
                        label="Active"
                        asset={IconFolderRegular}
                        href="#active"
                        rightSlot={<Box paddingRight={8}>{/* custom content */}</Box>}
                    />
                    <SidenavItem id="archived" label="Archived" asset={IconFolderRegular} href="#archived" />
                </SidenavItem>
                <SidenavItem
                    id="settings"
                    label="Settings"
                    asset={IconSettingsRegular}
                    href="#settings"
                    rightSlot={<Box paddingRight={8}>New</Box>}
                />
            </SidenavSection>
        </SidenavBar>
    </div>
);

WithRightSlots.storyName = 'With right slots';

type MultipleSectionsArgs = {
    workspaceDividerTop: boolean;
    workspaceDividerBottom: boolean;
    accountDividerTop: boolean;
    accountDividerBottom: boolean;
    otherDividerTop: boolean;
    otherDividerBottom: boolean;
};

export const MultipleSections = ({
    workspaceDividerTop,
    workspaceDividerBottom,
    accountDividerTop,
    accountDividerBottom,
    otherDividerTop,
    otherDividerBottom,
}: MultipleSectionsArgs): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Multiple sections example">
            <SidenavSection>
                <SidenavItem id="home" label="Home" asset={IconHomeRegular} href="#home" />
                <SidenavItem id="search" label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection
                title="Workspace"
                dividerTop={workspaceDividerTop}
                dividerBottom={workspaceDividerBottom}
            >
                <SidenavItem id="projects" label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem id="active" label="Active" href="#active" />
                    <SidenavItem id="archived" label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem
                    id="notifications"
                    label="Notifications"
                    asset={IconBellRegular}
                    href="#notifications"
                />
            </SidenavSection>
            <SidenavSection
                title="Account"
                dividerTop={accountDividerTop}
                dividerBottom={accountDividerBottom}
            >
                <SidenavItem id="profile" label="Profile" asset={IconDocumentsRegular} href="#profile" />
                <SidenavItem id="history" label="History" asset={IconAlarmClockRegular} href="#history" />
                <SidenavItem id="settings" label="Settings" asset={IconSettingsRegular} href="#settings" />
            </SidenavSection>
            <SidenavSection title="Other" dividerTop={otherDividerTop} dividerBottom={otherDividerBottom}>
                <SidenavItem id="docs" label="Documentation" href="#docs" asset={IconDocumentsRegular} />
                <SidenavItem id="help" label="Help" href="#help" asset={IconSearchRegular} />
            </SidenavSection>
        </SidenavBar>
    </div>
);

MultipleSections.storyName = 'Multiple sections';

MultipleSections.args = {
    workspaceDividerTop: true,
    workspaceDividerBottom: true,
    accountDividerTop: true,
    accountDividerBottom: true,
    otherDividerTop: false,
    otherDividerBottom: false,
};

MultipleSections.argTypes = {
    workspaceDividerTop: {control: 'boolean'},
    workspaceDividerBottom: {control: 'boolean'},
    accountDividerTop: {control: 'boolean'},
    accountDividerBottom: {control: 'boolean'},
    otherDividerTop: {control: 'boolean'},
    otherDividerBottom: {control: 'boolean'},
};

export const DifferentAssets = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Different assets example">
            <SidenavSection>
                <SidenavItem id="icon-asset" label="With icon" asset={IconHomeRegular} href="#icon-asset" />
            </SidenavSection>
            <SidenavSection title="Alternative assets" dividerTop>
                <SidenavItem
                    id="badge-asset"
                    label="With badge"
                    asset={<Badge value={5} />}
                    href="#badge-asset"
                />
                <SidenavItem
                    id="avatar-asset"
                    label="With avatar"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: '#FF6B35',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            AB
                        </div>
                    }
                    href="#avatar-asset"
                />
                <SidenavItem
                    id="image-asset"
                    label="With image"
                    asset={
                        <img
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect fill='%23E8E8E8' width='20' height='20'/%3E%3Ctext x='10' y='15' font-size='12' text-anchor='middle' fill='%23666'%3E📷%3C/text%3E%3C/svg%3E"
                            alt=""
                            style={{width: 20, height: 20}}
                        />
                    }
                    href="#image-asset"
                />
                <SidenavItem
                    id="emoji-asset"
                    label="With emoji"
                    asset={<span style={{fontSize: 20, lineHeight: 1}}>⭐</span>}
                    href="#emoji-asset"
                />
                <SidenavItem
                    id="custom-box-asset"
                    label="With custom box"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#00BCD4',
                                borderRadius: 4,
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            +
                        </div>
                    }
                    href="#custom-box-asset"
                />
                <SidenavItem
                    id="radio-asset"
                    label="With custom component"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: '2px solid #999',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#0066CC',
                                }}
                            />
                        </div>
                    }
                    href="#radio-asset"
                />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DifferentAssets.storyName = 'Different assets';

export const ControlledSelection = (): React.JSX.Element => {
    const [selectedId, setSelectedId] = React.useState<string | null>('home');

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            <SidenavBar
                aria-label="Alto Garda Activities"
                selectedItemId={selectedId}
                onSelectedItemIdChange={setSelectedId}
            >
                <SidenavSection>
                    <SidenavItem
                        id="overview"
                        label="Overview"
                        asset={IconHomeRegular}
                        onPress={() => console.log('Overview clicked')}
                    />
                    <SidenavItem
                        id="weather"
                        label="Weather"
                        asset={IconSearchRegular}
                        onPress={() => console.log('Weather clicked')}
                    />
                </SidenavSection>
                <SidenavSection title="Water Activities" dividerTop>
                    <SidenavItem id="water-sports" label="Water Sports" asset={IconFolderRegular} defaultOpen>
                        <SidenavItem
                            id="water-sailing"
                            label="Sailing"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Sailing clicked')}
                        />
                        <SidenavItem
                            id="water-windsurf"
                            label="Windsurfing"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Windsurfing clicked')}
                        />
                        <SidenavItem
                            id="water-kayak"
                            label="Kayaking"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Kayaking clicked')}
                        />
                    </SidenavItem>
                    <SidenavItem id="beaches" label="Beaches" asset={IconFolderRegular}>
                        <SidenavItem
                            id="beach-riva"
                            label="Riva del Garda"
                            asset={IconSearchRegular}
                            onPress={() => console.log('Riva del Garda clicked')}
                        />
                        <SidenavItem
                            id="beach-torbole"
                            label="Torbole"
                            asset={IconSearchRegular}
                            onPress={() => console.log('Torbole clicked')}
                        />
                        <SidenavItem
                            id="beach-nago"
                            label="Nago-Torbole"
                            asset={IconSearchRegular}
                            onPress={() => console.log('Nago-Torbole clicked')}
                        />
                    </SidenavItem>
                </SidenavSection>
                <SidenavSection title="Mountain Activities" dividerTop>
                    <SidenavItem id="mountain-trails" label="Hiking Trails" asset={IconFolderRegular}>
                        <SidenavItem
                            id="trail-sentiero-della-pace"
                            label="Sentiero della Pace"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Sentiero della Pace clicked')}
                        />
                        <SidenavItem
                            id="trail-monte-cassian"
                            label="Monte Cassian"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Monte Cassian clicked')}
                        />
                    </SidenavItem>
                    <SidenavItem
                        id="climbing"
                        label="Rock Climbing"
                        asset={IconBellRegular}
                        onPress={() => console.log('Rock Climbing clicked')}
                    />
                    <SidenavItem
                        id="mtb"
                        label="Mountain Biking"
                        asset={IconSettingsRegular}
                        onPress={() => console.log('Mountain Biking clicked')}
                    />
                </SidenavSection>
                <SidenavSection title="Culture & Nature" dividerTop>
                    <SidenavItem id="castles" label="Castles & History" asset={IconFolderRegular}>
                        <SidenavItem
                            id="castle-arco"
                            label="Arco Castle"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Arco Castle clicked')}
                        />
                        <SidenavItem
                            id="castle-drena"
                            label="Drena Castle"
                            asset={IconDocumentsRegular}
                            onPress={() => console.log('Drena Castle clicked')}
                        />
                    </SidenavItem>
                    <SidenavItem
                        id="botanical-gardens"
                        label="Botanical Gardens"
                        asset={IconSearchRegular}
                        onPress={() => console.log('Botanical Gardens clicked')}
                    />
                </SidenavSection>
            </SidenavBar>
            <div
                style={{
                    flex: 1,
                    padding: '2rem',
                    backgroundColor: '#f5f5f5',
                    overflowY: 'auto',
                }}
            >
                <h1>Alto Garda Activities - Controlled Selection</h1>
                <p>
                    Click items in the sidenav or use the controls below to update the selection. Watch how
                    the parent items highlight when collapsed and a child is selected.
                </p>

                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginTop: '1.5rem',
                    }}
                >
                    <strong>Current Selection:</strong>
                    <div
                        style={{
                            fontSize: '1.5rem',
                            color: '#0066CC',
                            marginTop: '0.5rem',
                            fontFamily: 'monospace',
                        }}
                    >
                        {selectedId || '(none)'}
                    </div>
                </div>

                <div style={{marginTop: '2rem'}}>
                    <strong>Water Activities:</strong>
                    <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap'}}>
                        <button
                            onClick={() => setSelectedId('water-sailing')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'water-sailing' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'water-sailing' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Sailing
                        </button>
                        <button
                            onClick={() => setSelectedId('water-windsurf')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'water-windsurf' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'water-windsurf' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Windsurfing
                        </button>
                        <button
                            onClick={() => setSelectedId('beach-riva')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'beach-riva' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'beach-riva' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Riva del Garda
                        </button>
                    </div>
                </div>

                <div style={{marginTop: '1.5rem'}}>
                    <strong>Mountain Activities:</strong>
                    <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap'}}>
                        <button
                            onClick={() => setSelectedId('trail-sentiero-della-pace')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor:
                                    selectedId === 'trail-sentiero-della-pace' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'trail-sentiero-della-pace' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Sentiero della Pace
                        </button>
                        <button
                            onClick={() => setSelectedId('climbing')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'climbing' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'climbing' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Rock Climbing
                        </button>
                        <button
                            onClick={() => setSelectedId('mtb')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'mtb' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'mtb' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Mountain Biking
                        </button>
                    </div>
                </div>

                <div style={{marginTop: '1.5rem'}}>
                    <strong>Culture & Nature:</strong>
                    <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap'}}>
                        <button
                            onClick={() => setSelectedId('castle-arco')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'castle-arco' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'castle-arco' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Arco Castle
                        </button>
                        <button
                            onClick={() => setSelectedId('botanical-gardens')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedId === 'botanical-gardens' ? '#0066CC' : '#e0e0e0',
                                color: selectedId === 'botanical-gardens' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Botanical Gardens
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                    }}
                >
                    <strong>How to test:</strong>
                    <ul style={{marginTop: '0.5rem', color: '#666'}}>
                        <li>Click buttons above to change selection programmatically</li>
                        <li>Click items in the sidenav to update selection</li>
                        <li>Toggle the collapse button in the sidenav</li>
                        <li>When expanded: only the selected item highlights</li>
                        <li>
                            When collapsed: parent items do not highlight if a child is selected. Open the
                            dropdown to see the selected child.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

ControlledSelection.storyName = 'Controlled selection';

export const PropsShowcase = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Main navigation">
            <SidenavSection title="Example section">
                <SidenavItem id="item1" label="Item 1" asset={IconHomeRegular} href="#item1" />
                <SidenavItem id="item2" label="Item 2" asset={IconSearchRegular} href="#item2" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

PropsShowcase.storyName = 'Props showcase (for docs)';
PropsShowcase.parameters = {
    docs: {
        controls: {
            include: [],
            hideNoControlsWarning: true,
        },
        source: {state: 'open'},
    },
};
