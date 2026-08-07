import * as React from 'react';
import {SidenavBar, SidenavLayout} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';

import type {SidenavSection} from '../../sidenav-types';

export default {
    title: 'Components/SidenavBar/Layout',
    parameters: {fullScreen: true},
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
            description: 'Show right divider on the sidenav',
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
    },
    args: {
        useCustomWidth: false,
        sidenavWidth: 240,
        divider: true,
        collapsible: false,
        collapsed: false,
        boxed: false,
    },
};

export const WholeViewport = (args: {
    useCustomWidth: boolean;
    sidenavWidth: number;
    divider: boolean;
    collapsible: boolean;
    collapsed: boolean;
    boxed: boolean;
}): React.JSX.Element => {
    const [autoWidth, setAutoWidth] = React.useState(240);
    const [internalCollapsed, setInternalCollapsed] = React.useState(args.collapsed);

    React.useEffect(() => {
        const updateWidth = () => {
            setAutoWidth(window.innerWidth >= 1920 ? 296 : 240);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    React.useEffect(() => {
        setInternalCollapsed(args.collapsed);
    }, [args.collapsed]);

    const sidenavWidth = args.useCustomWidth ? args.sidenavWidth : autoWidth;

    const sections: SidenavSection[] = [
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
                    id: 'notifications',
                    label: 'Notifications',
                    asset: IconBellRegular,
                    href: '#notifications',
                },
            ],
        },
    ];

    return (
        <div style={{width: '100%', height: '100vh'}}>
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
                        logo={false}
                        width={sidenavWidth as any}
                        sections={sections}
                        {...(args.boxed
                            ? ({boxed: true} as const)
                            : ({boxed: false, divider: args.divider} as const))}
                    />
                </SidenavLayout.Sidenav>
                <SidenavLayout.Content>
                    <div
                        style={{backgroundColor: '#fafafa', width: '100%', height: '100%', overflow: 'auto'}}
                    >
                        <h1 style={{margin: 0, padding: '32px 32px 0 0'}}>Main Content</h1>
                        <p style={{margin: 0, padding: '16px 32px'}}>
                            Content starts immediately after the sidenav.
                        </p>
                    </div>
                </SidenavLayout.Content>
            </SidenavLayout>
        </div>
    );
};

WholeViewport.storyName = 'Whole Viewport';

export const Centered = (args: {
    useCustomWidth: boolean;
    sidenavWidth: number;
    divider: boolean;
    collapsible: boolean;
    collapsed: boolean;
    boxed: boolean;
}): React.JSX.Element => {
    const [autoWidth, setAutoWidth] = React.useState(240);
    const [internalCollapsed, setInternalCollapsed] = React.useState(args.collapsed);

    React.useEffect(() => {
        const updateWidth = () => {
            setAutoWidth(window.innerWidth >= 1920 ? 296 : 240);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    React.useEffect(() => {
        setInternalCollapsed(args.collapsed);
    }, [args.collapsed]);

    const sidenavWidth = args.useCustomWidth ? args.sidenavWidth : autoWidth;

    const sections: SidenavSection[] = [
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
                    id: 'notifications',
                    label: 'Notifications',
                    asset: IconBellRegular,
                    href: '#notifications',
                },
            ],
        },
    ];

    return (
        <div style={{width: '100%', height: '100vh'}}>
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
                        {...(args.boxed
                            ? ({boxed: true} as const)
                            : ({boxed: false, divider: args.divider} as const))}
                    />
                </SidenavLayout.Sidenav>
                <SidenavLayout.Content>
                    <div
                        style={{
                            backgroundColor: args.boxed ? '#ffffff' : '#f5f5f5',
                            height: '100%',
                            overflow: 'auto',
                        }}
                    >
                        <h1 style={{margin: 0, padding: '32px 32px 0 0'}}>Main Content (Centered)</h1>
                        <p style={{margin: 0, padding: '16px 32px'}}>
                            Content is centered in the viewport with the sidenav on the left.
                        </p>
                    </div>
                </SidenavLayout.Content>
            </SidenavLayout>
        </div>
    );
};

Centered.storyName = 'Centered';
