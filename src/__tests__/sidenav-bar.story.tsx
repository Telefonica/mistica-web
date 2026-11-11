import * as React from 'react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import {SidenavBar, SidenavLayout, Text2} from '..';
import {ThemeVariant} from '../theme-variant-context';
import {getMovistarSkin} from '../skins/movistar';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';

import type {Variant} from '../theme-variant-context';
import type {Skin} from '../skins/types';
import type {SidenavEntry, SidenavSection} from '../sidenav-bar-types';

const defaultEntries: Array<SidenavSection> = [
    {
        title: 'Workspace',
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                defaultOpen: true,
                children: [{id: 'active', label: 'Active', href: '/active'}],
            },
        ],
    },
];
const mixedFirstLevel: Array<SidenavEntry> = [
    {id: 'standalone-top', label: 'Standalone top', asset: IconHomeRegular, href: '/standalone-top'},
    {
        title: 'Workspace',
        items: [{id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'}],
    },
    {
        id: 'standalone-bottom',
        label: 'Standalone bottom',
        asset: IconFolderRegular,
        href: '/standalone-bottom',
    },
];
const doublePanelEntries: Array<SidenavSection> = [
    {
        title: 'Workspace',
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, onPress: () => {}},
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                children: [
                    {id: 'active', label: 'Active', onPress: () => {}},
                    {id: 'archived', label: 'Archived', onPress: () => {}},
                ],
            },
            {
                id: 'documents',
                label: 'Documents',
                asset: IconFolderRegular,
                children: [{id: 'shared', label: 'Shared', onPress: () => {}}],
            },
        ],
    },
];
const keyboardEntries: Array<SidenavSection> = [
    {
        title: {text: 'General', hidden: true},
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
            {id: 'search', label: 'Search', asset: IconHomeRegular, href: '/search'},
            {
                id: 'teams',
                label: 'Teams',
                asset: IconFolderRegular,
                children: [{id: 'eng', label: 'Engineering', href: '/eng'}],
            },
        ],
    },
];
const renderCollapsible = (props: React.ComponentProps<typeof SidenavBar>) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SidenavBar aria-label="Main navigation" entries={defaultEntries} {...props} />
    </ThemeContextProvider>
);
const renderLogoByState = ({collapsed}: {collapsed: boolean}) => (
    <img src="/brand.svg" alt={collapsed ? 'Mark of the product' : 'Mark and name of the product'} />
);
const renderLogoByPhase = ({state}: {state: string}) => <img src="/brand.svg" alt={`Logo ${state}`} />;
const renderSidenav = (props: React.ComponentProps<typeof SidenavBar> = {}) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SidenavBar aria-label="Main navigation" entries={defaultEntries} {...props} />
    </ThemeContextProvider>
);
const renderDoublePanelSidenav = (props: Record<string, unknown> = {}) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SidenavBar
            {...({
                'aria-label': 'Main navigation',
                entries: doublePanelEntries,
                doublePanel: true,
                ...props,
            } as any)}
        />
    </ThemeContextProvider>
);
const renderKeyboardSidenav = () => (
    <ThemeContextProvider theme={makeTheme()}>
        <SidenavBar aria-label="Main navigation" entries={keyboardEntries} />
    </ThemeContextProvider>
);
const renderBoxedSidenav = ({
    variant,
    pageVariant,
    skin = getMovistarSkin(),
}: {
    variant?: Variant;
    pageVariant?: Variant;
    skin?: Skin;
} = {}) => (
    <ThemeContextProvider theme={makeTheme({skin})}>
        <ThemeVariant variant={pageVariant ?? 'default'}>
            <SidenavBar aria-label="Main navigation" entries={defaultEntries} variant={variant} boxed />
        </ThemeVariant>
    </ThemeContextProvider>
);
export const Scenario1 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario2 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario3 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({boxed: true})][step];
};
export const Scenario4 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavLayout
                topOffset={64}
                sidenav={<SidenavBar aria-label="Main navigation" entries={defaultEntries} />}
            >
                content
            </SidenavLayout>
        </ThemeContextProvider>,
    ][step];
};
export const Scenario5 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavLayout sidenav={<SidenavBar aria-label="Main navigation" entries={defaultEntries} />}>
                content
            </SidenavLayout>
        </ThemeContextProvider>,
    ][step];
};
export const Scenario6 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({selectedItemId: 'home'})][step];
};
export const Scenario7 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario8 = ({step = 0}: {step?: number}): JSX.Element => {
    const entries: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {
                    id: 'projects',
                    label: 'Projects',
                    asset: IconFolderRegular,
                    children: [{id: 'active', label: 'Active', href: '/active'}],
                },
            ],
        },
    ];
    return [
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" entries={entries} selectedItemId="active" />
        </ThemeContextProvider>,
    ][step];
};
export const Scenario9 = ({step = 0}: {step?: number}): JSX.Element => {
    const entries: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {
                    id: 'projects',
                    label: 'Projects',
                    asset: IconFolderRegular,
                    children: [
                        {id: 'active', label: 'Active', href: '/active'},
                        {id: 'archived', label: 'Archived', href: '/archived'},
                    ],
                },
            ],
        },
    ];
    return [
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" entries={entries} selectedItemId="active" />
        </ThemeContextProvider>,
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" entries={entries} selectedItemId="archived" />
        </ThemeContextProvider>,
    ][step];
};
export const Scenario10 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario11 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({showCollapseButton: false})][step];
};
export const Scenario12 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        renderCollapsible({showCollapseButton: false, collapsed: false}),
        renderCollapsible({showCollapseButton: false, collapsed: true}),
    ][step];
};
export const Scenario13 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderCollapsible({defaultCollapsed: false}), renderCollapsible({defaultCollapsed: true})][step];
};
export const Scenario14 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({headerSlot: <span>header slot</span>, defaultCollapsed: true})][step];
};
export const Scenario15 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({defaultCollapsed: true})][step];
};
export const Scenario16 = ({step = 0}: {step?: number}): JSX.Element => {
    const entries: Array<SidenavSection> = [
        {
            title: {text: 'Workspace', hidden: true},
            items: [{id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'}],
        },
    ];
    return [renderSidenav({entries})][step];
};
export const Scenario17 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario18 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({defaultCollapsed: true})][step];
};
export const Scenario19 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario20 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario21 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario22 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario23 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: true})][step];
};
export const Scenario24 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: <div data-testid="huge-logo" style={{width: 400, height: 400}} />})][step];
};
export const Scenario25 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: false})][step];
};
export const Scenario26 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: <img src="/brand.svg" alt="Brand of the product" />})][step];
};
export const Scenario27 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: renderLogoByState})][step];
};
export const Scenario28 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: renderLogoByState, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario29 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: renderLogoByState})][step];
};
export const Scenario30 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({logo: renderLogoByPhase})][step];
};
export const Scenario31 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        renderSidenav({
            headerSlot: ({collapsed, state}) => <div>{`Header ${state} ${collapsed}`}</div>,
            footerSlot: ({collapsed, state}) => <div>{`Footer ${state} ${collapsed}`}</div>,
        }),
    ][step];
};
export const Scenario32 = ({
    step = 0,
    onSelectedItemIdChange,
}: {
    step?: number;
    onSelectedItemIdChange: (...args: Array<any>) => void;
}): JSX.Element => {
    const entries: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
                {id: 'projects', label: 'Projects', asset: IconFolderRegular, href: '/projects'},
                {id: 'active', label: 'Active', asset: IconHomeRegular, href: '/active'},
            ],
        },
    ];
    return [
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                aria-label="Main navigation"
                entries={entries}
                selectedItemId="home"
                onSelectedItemIdChange={onSelectedItemIdChange}
            />
        </ThemeContextProvider>,
    ][step];
};
export const Scenario33 = ({
    step = 0,
    onSelectedItemIdChange,
    onPress,
}: {
    step?: number;
    onSelectedItemIdChange: (...args: Array<any>) => void;
    onPress: (...args: Array<any>) => void;
}): JSX.Element => {
    const entries: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {id: 'home', label: 'Home', asset: IconHomeRegular, onPress: () => {}},
                {id: 'projects', label: 'Projects', asset: IconFolderRegular, onPress},
            ],
        },
    ];
    return [
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                aria-label="Main navigation"
                entries={entries}
                selectedItemId="home"
                onSelectedItemIdChange={onSelectedItemIdChange}
            />
        </ThemeContextProvider>,
    ][step];
};
export const Scenario34 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({entries: mixedFirstLevel})][step];
};
export const Scenario35 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({entries: mixedFirstLevel})][step];
};
export const Scenario36 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({entries: mixedFirstLevel})][step];
};
export const Scenario37 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({entries: mixedFirstLevel})][step];
};
export const Scenario38 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario39 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        renderSidenav({
            entries: [
                {id: 'first', label: 'First', asset: IconHomeRegular, href: '/first'},
                {id: 'second', label: 'Second', asset: IconHomeRegular, href: '/second'},
                {
                    title: 'Workspace',
                    items: [{id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'}],
                },
                {id: 'third', label: 'Third', asset: IconHomeRegular, href: '/third'},
            ],
        }),
    ][step];
};
export const Scenario40 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        renderSidenav({
            entries: [
                {id: 'first', label: 'First', asset: IconHomeRegular, href: '/first'},
                {
                    title: 'Workspace',
                    dividerTop: true,
                    dividerBottom: true,
                    items: [{id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'}],
                },
                {id: 'last', label: 'Last', asset: IconHomeRegular, href: '/last'},
            ],
        }),
    ][step];
};
export const Scenario41 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        renderSidenav({
            entries: [
                {
                    title: 'First',
                    dividerTop: true,
                    dividerBottom: true,
                    items: [{id: 'one', label: 'One', asset: IconHomeRegular, href: '/one'}],
                },
                {
                    title: 'Second',
                    dividerTop: true,
                    dividerBottom: true,
                    items: [{id: 'two', label: 'Two', asset: IconHomeRegular, href: '/two'}],
                },
                {
                    title: 'Third',
                    dividerTop: true,
                    dividerBottom: true,
                    items: [{id: 'three', label: 'Three', asset: IconHomeRegular, href: '/three'}],
                },
            ],
        }),
    ][step];
};
export const Scenario42 = ({step = 0}: {step?: number}): JSX.Element => {
    return [
        renderSidenav({
            entries: [
                {
                    title: 'First',
                    dividerBottom: true,
                    items: [{id: 'one', label: 'One', asset: IconHomeRegular, href: '/one'}],
                },
                {
                    title: 'Second',
                    dividerTop: true,
                    dividerBottom: true,
                    items: [{id: 'two', label: 'Two', asset: IconHomeRegular, href: '/two'}],
                },
                {
                    title: 'Third',
                    items: [{id: 'three', label: 'Three', asset: IconHomeRegular, href: '/three'}],
                },
            ],
        }),
    ][step];
};
export const Scenario43 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({entries: mixedFirstLevel})][step];
};
export const Scenario44 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({entries: mixedFirstLevel, selectedItemId: 'standalone-top'})][step];
};
export const Scenario45 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario46 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario47 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario48 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario49 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario50 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario51 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario52 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario53 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario54 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario55 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({selectedItemId: 'active'})][step];
};
export const Scenario56 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario57 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav()][step];
};
export const Scenario58 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({selectedItemId: 'archived'})][step];
};
export const Scenario59 = ({step = 0}: {step?: number}): JSX.Element => {
    const renderWithSelection = (selectedItemId: string) => (
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                {...({
                    'aria-label': 'Main navigation',
                    entries: doublePanelEntries,
                    doublePanel: true,
                    selectedItemId,
                } as any)}
            />
        </ThemeContextProvider>
    );
    return [renderWithSelection('active'), renderWithSelection('home')][step];
};
export const Scenario60 = ({step = 0}: {step?: number}): JSX.Element => {
    const ControlledSidenav = (): JSX.Element => {
        const [selectedItemId, setSelectedItemId] = React.useState<string | null>('active');
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <SidenavBar
                    {...({
                        'aria-label': 'Main navigation',
                        entries: doublePanelEntries,
                        doublePanel: true,
                        selectedItemId,
                        onSelectedItemIdChange: setSelectedItemId,
                    } as any)}
                />
            </ThemeContextProvider>
        );
    };
    return [<ControlledSidenav />][step];
};
export const ExternalSelection = ({
    initialSelection = 'active',
}: {
    initialSelection?: string;
}): JSX.Element => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>(initialSelection);
    return (
        <>
            <SidenavBar
                aria-label="Main navigation"
                entries={doublePanelEntries}
                doublePanel
                selectedItemId={selectedItemId}
                onSelectedItemIdChange={setSelectedItemId}
            />
            <button onClick={() => setSelectedItemId('shared')}>Select from the app</button>
        </>
    );
};
export const Scenario62 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario63 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario64 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario65 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario66 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario67 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario68 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario69 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario70 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario71 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}})][step];
};
export const Scenario72 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav({defaultCollapsed: true, selectedItemId: 'home'})][step];
};
export const Scenario73 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({selectedItemId: 'archived'})][step];
};
export const Scenario74 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({selectedItemId: 'archived'})][step];
};
export const Scenario75 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderDoublePanelSidenav({doublePanel: false})][step];
};
export const Scenario76 = ({step = 0}: {step?: number}): JSX.Element => {
    const entries: Array<SidenavEntry> = [
        {
            id: 'standalone-parent',
            label: 'Standalone parent',
            asset: IconFolderRegular,
            defaultOpen: true,
            children: [{id: 'child', label: 'Child', href: '/child'}],
        },
    ];
    return [renderSidenav({entries})][step];
};
export const Scenario77 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderBoxedSidenav({variant: 'brand'})][step];
};
export const Scenario78 = ({step = 0}: {step?: number}): JSX.Element => {
    const movistarSkin = getMovistarSkin();
    const skin: Skin = {
        ...movistarSkin,
        componentProperties: {
            ...movistarSkin.componentProperties,
            showBoxedBorder: {
                default: false,
                alternative: false,
                brand: false,
                negative: false,
                media: false,
            },
        },
    };
    return [renderBoxedSidenav({skin})][step];
};
export const Scenario79 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderSidenav()][step];
};
export const Scenario80 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderKeyboardSidenav()][step];
};
export const Scenario81 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderKeyboardSidenav()][step];
};
export const Scenario82 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderKeyboardSidenav()][step];
};
export const Scenario83 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderKeyboardSidenav()][step];
};
export const Scenario84 = ({step = 0}: {step?: number}): JSX.Element => {
    return [renderKeyboardSidenav()][step];
};

export const DoublePanel = ({collapsed = false}: {collapsed?: boolean}): JSX.Element =>
    renderDoublePanelSidenav({defaultCollapsed: collapsed});
export const Boxed = ({pageVariant}: {pageVariant: Variant}): JSX.Element =>
    renderBoxedSidenav({pageVariant});
export const Motion = (): JSX.Element => renderSidenav({logo: renderLogoByPhase});
export const InvalidAsset = (): JSX.Element => (
    <SidenavBar
        entries={[
            {
                title: {text: 'General', hidden: true},
                items: [
                    {
                        id: 'projects',
                        label: 'Projects',
                        asset: IconFolderRegular,
                        defaultOpen: true,
                        children: [{id: 'active', label: 'Active', href: '/active'}],
                    },
                    {
                        id: 'home',
                        label: 'Home',
                        href: '/home',
                    } as import('../sidenav-bar-types').SidenavFirstLevelItem,
                ],
            },
        ]}
    />
);
export const Scrollable = (): JSX.Element => (
    <SidenavBar
        aria-label="Main navigation"
        entries={Array.from({length: 30}, (_, index) => ({
            id: `item-${index}`,
            label: `Item ${index}`,
            asset: IconHomeRegular,
            onPress: () => {},
        }))}
        headerSlot={<Text2 regular>Header</Text2>}
        fixedFooter
        footerSlot={<Text2 regular>Footer</Text2>}
    />
);
