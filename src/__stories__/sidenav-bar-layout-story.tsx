import * as React from 'react';
import {SidenavBar, SidenavLayout} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../generated/mistica-icons/icon-documents-regular';
import IconBellRegular from '../generated/mistica-icons/icon-bell-regular';
import Box from '../box';
import Stack from '../stack';
import {Text2, Text3, Text6} from '../text';
import {Placeholder} from '../placeholder';
import {vars as skinVars} from '../skins/skin-contract.css';

import type {SidenavSection} from '../sidenav-bar-types';

type Args = {
    useCustomWidth: boolean;
    sidenavWidth: number;
    divider: boolean;
    collapsible: boolean;
    collapsed: boolean;
    boxed: boolean;
    doublePanel: boolean;
};

export default {
    title: 'Components/SidenavBar/Layout',
    parameters: {fullScreen: true, controls: {expanded: true}},
    argTypes: {
        useCustomWidth: {
            control: {type: 'boolean'},
            description: 'Use custom width instead of responsive default',
        },
        sidenavWidth: {
            control: {type: 'range', min: 200, max: 400, step: 5},
            description: 'Width of the sidenav in pixels (only when useCustomWidth is enabled)',
        },
        divider: {
            control: {type: 'boolean'},
            description: 'Show right divider on the sidenav (only when boxed is disabled)',
            if: {arg: 'boxed', truthy: false},
        },
        collapsible: {
            control: {type: 'boolean'},
            description: 'Whether the sidenav can be collapsed',
        },
        collapsed: {
            control: {type: 'boolean'},
            description: 'Collapsed state (controlled)',
        },
        boxed: {
            control: {type: 'boolean'},
            description: 'Boxed layout with rounded corners and background',
        },
        doublePanel: {
            control: {type: 'boolean'},
            description:
                'Open the children of a parent item in a second column. The column takes the width of the sidenav and pushes the content.',
        },
    },
    args: {
        useCustomWidth: false,
        sidenavWidth: 240,
        divider: true,
        collapsible: false,
        collapsed: false,
        boxed: false,
        doublePanel: false,
    },
};

const useSidenavWidth = (args: Args) => {
    const [autoWidth, setAutoWidth] = React.useState(240);

    React.useEffect(() => {
        const updateWidth = () => {
            setAutoWidth(window.innerWidth >= 1920 ? 296 : 240);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return args.useCustomWidth ? args.sidenavWidth : autoWidth;
};

const useCollapsedState = (args: Args) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(args.collapsed);

    React.useEffect(() => {
        setInternalCollapsed(args.collapsed);
    }, [args.collapsed]);

    return [internalCollapsed, setInternalCollapsed] as const;
};

type ContentProps = {
    title: string;
    description: string;
    selectedItemId: string | null;
};

const Content = ({title, description, selectedItemId}: ContentProps): React.JSX.Element => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
        }}
    >
        <Box paddingX={32} paddingY={32}>
            <Stack space={16}>
                <Text6 as="h1">{title}</Text6>
                <Text3 regular>{description}</Text3>
                <Text3 medium>Selected item: {selectedItemId ?? 'none'}</Text3>
            </Stack>
        </Box>
        <Stack space={8}>
            <Box paddingX={32}>
                <Text2 regular color={skinVars.colors.textSecondary}>
                    The placeholder below takes the whole width of the content area.
                </Text2>
            </Box>
            <Placeholder height={80} />
        </Stack>
    </div>
);

const sections: Array<SidenavSection> = [
    {
        items: [
            {
                id: 'home',
                label: 'Home',
                asset: IconHomeRegular,
                href: '#home',
            },
            {
                id: 'search',
                label: 'Search',
                asset: IconSearchRegular,
                href: '#search',
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
                        href: '#active',
                    },
                    {
                        id: 'archived',
                        label: 'Archived',
                        href: '#archived',
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
                        href: '#shared',
                    },
                    {
                        id: 'starred',
                        label: 'Starred',
                        href: '#starred',
                    },
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
    // Extra sections give the rail more items than the viewport holds, so the rail scrolls on its own
    // inside its sticky column while the document scrolls the content beside it.
    {
        title: 'Library',
        dividerTop: true,
        items: [
            {id: 'files', label: 'Files', asset: IconDocumentsRegular, href: '#files'},
            {id: 'photos', label: 'Photos', asset: IconFolderRegular, href: '#photos'},
            {id: 'videos', label: 'Videos', asset: IconFolderRegular, href: '#videos'},
            {id: 'downloads', label: 'Downloads', asset: IconDocumentsRegular, href: '#downloads'},
            {id: 'bookmarks', label: 'Bookmarks', asset: IconBellRegular, href: '#bookmarks'},
        ],
    },
    {
        title: 'Account',
        dividerTop: true,
        items: [
            {id: 'profile', label: 'Profile', asset: IconHomeRegular, href: '#profile'},
            {id: 'billing', label: 'Billing', asset: IconDocumentsRegular, href: '#billing'},
            {id: 'security', label: 'Security', asset: IconBellRegular, href: '#security'},
            {id: 'preferences', label: 'Preferences', asset: IconSearchRegular, href: '#preferences'},
        ],
    },
    {
        title: 'Administration',
        dividerTop: true,
        items: [
            {id: 'members', label: 'Members', asset: IconHomeRegular, href: '#members'},
            {id: 'roles', label: 'Roles', asset: IconFolderRegular, href: '#roles'},
            {id: 'audit', label: 'Audit log', asset: IconDocumentsRegular, href: '#audit'},
            {id: 'integrations', label: 'Integrations', asset: IconSearchRegular, href: '#integrations'},
        ],
    },
];

export const WholeViewport = (args: Args): React.JSX.Element => {
    const sidenavWidth = useSidenavWidth(args);
    const [internalCollapsed, setInternalCollapsed] = useCollapsedState(args);
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>('home');

    return (
        <div style={{width: '100%', minHeight: '100vh'}}>
            <SidenavLayout mode="whole-viewport">
                <SidenavLayout.Sidenav>
                    <SidenavBar
                        aria-label="Main navigation"
                        {...(args.collapsible
                            ? {
                                  collapsible: true,
                                  collapsed: internalCollapsed,
                                  onCollapse: setInternalCollapsed,
                              }
                            : {collapsible: false})}
                        width={sidenavWidth as any}
                        sections={sections}
                        doublePanel={args.doublePanel}
                        selectedItemId={selectedItemId}
                        onSelectedItemIdChange={setSelectedItemId}
                        {...(args.boxed
                            ? ({boxed: true} as const)
                            : ({boxed: false, divider: args.divider} as const))}
                    />
                </SidenavLayout.Sidenav>
                <SidenavLayout.Content>
                    <Box paddingX={32} paddingY={32}>
                        <Stack space={16}>
                            <Text6 as="h1">Whole viewport</Text6>
                            <Text3 regular>
                                Content starts immediately after the sidenav and spans the full width. It is
                                taller than the viewport, so the page scrolls. The rail stays at the top
                                beside it, because it sticks to the viewport and the document scrolls.
                            </Text3>
                            <Text3 medium>Selected item: {selectedItemId ?? 'none'}</Text3>
                            {Array.from({length: 12}).map((_, index) => (
                                <Placeholder key={index} height={160} />
                            ))}
                        </Stack>
                    </Box>
                </SidenavLayout.Content>
            </SidenavLayout>
        </div>
    );
};

WholeViewport.storyName = 'Whole Viewport';

export const Centered = (args: Args): React.JSX.Element => {
    const sidenavWidth = useSidenavWidth(args);
    const [internalCollapsed, setInternalCollapsed] = useCollapsedState(args);
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>('home');

    return (
        <div style={{width: '100%', minHeight: '100vh'}}>
            <SidenavLayout mode="centered">
                <SidenavLayout.Sidenav>
                    <SidenavBar
                        aria-label="Main navigation"
                        {...(args.collapsible
                            ? {
                                  collapsible: true,
                                  collapsed: internalCollapsed,
                                  onCollapse: setInternalCollapsed,
                              }
                            : {collapsible: false})}
                        width={sidenavWidth as any}
                        sections={sections}
                        doublePanel={args.doublePanel}
                        selectedItemId={selectedItemId}
                        onSelectedItemIdChange={setSelectedItemId}
                        {...(args.boxed
                            ? ({boxed: true} as const)
                            : ({boxed: false, divider: args.divider} as const))}
                    />
                </SidenavLayout.Sidenav>
                <SidenavLayout.Content>
                    <Content
                        title="Main Content (Centered)"
                        description="Content is centered in the viewport with the sidenav on the left."
                        selectedItemId={selectedItemId}
                    />
                </SidenavLayout.Content>
            </SidenavLayout>
        </div>
    );
};

Centered.storyName = 'Centered';
