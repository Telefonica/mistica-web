'use client';

import * as React from 'react';
import {SidenavBar} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../generated/mistica-icons/icon-documents-regular';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import IconCheckRegular from '../generated/mistica-icons/icon-check-regular';
import {Placeholder} from '../placeholder';
import Callout from '../callout';
import Circle from '../circle';
import Badge from '../badge';
import Box from '../box';
import Stack from '../stack';
import Inline from '../inline';
import {Boxed} from '../boxed';
import {UnorderedList, ListItem} from '../list';
import {Text2, Text3, Text6} from '../text';
import {useScreenSize} from '../hooks';
import {vars as skinVars} from '../skins/skin-contract.css';
import {SidenavStoryPage} from './sidenav-bar-story-page';

import type {Variant} from '../theme-variant-context';
import type {SidenavEntry} from '../sidenav-bar-types';
import type {SidenavLogoRenderProps} from '../sidenav-bar';

// A section title and an item label never truncate: they wrap over as many lines as their text needs, and
// the row grows with them. The longLabels control swaps four entries for a text that does not fit, at each
// level of the tree, so that the behaviour is visible in one screen. The stand-alone item carries a single
// word instead of a phrase, which is the case that has no space to wrap at.
const getDefaultSections = (
    onAction: (action: string) => void,
    sectionDividerTop: boolean,
    sectionDividerBottom: boolean,
    longLabels: boolean
): Array<SidenavEntry> => [
    {
        // No heading over these two items, and a screen reader still reads the name of their list.
        title: {text: 'General', hidden: true},
        items: [
            {
                id: 'home',
                label: 'Home (href)',
                asset: IconHomeRegular,
                href: '#home',
                onNavigate: () => onAction('Home navigated'),
            },
            {
                id: 'search',
                label: 'Search (onPress)',
                asset: IconSearchRegular,
                onPress: () => onAction('Search clicked'),
            },
        ],
    },
    {
        title: longLabels ? 'Workspace and shared team resources' : 'Workspace',
        dividerTop: sectionDividerTop,
        dividerBottom: sectionDividerBottom,
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
                        onNavigate: () => onAction('Active clicked'),
                    },
                    {
                        id: 'archived',
                        label: longLabels ? 'Archived projects of the last two years' : 'Archived (no asset)',
                        href: '#archived',
                        onNavigate: () => onAction('Archived clicked'),
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
                        onPress: () => onAction('Engineering team clicked'),
                    },
                    {
                        id: 'design',
                        label: 'Design',
                        asset: IconSearchRegular,
                        onPress: () => onAction('Design team clicked'),
                    },
                ],
            },
            {
                id: 'notifications',
                label: longLabels ? 'Notifications and system alerts' : 'Notifications',
                asset: IconBellRegular,
                href: '#notifications',
                rightSlot: <Badge value={2} />,
                onNavigate: () => onAction('Notifications clicked'),
            },
        ],
    },
    {
        id: 'favorites',
        // One word longer than the row, which has nothing to wrap at. `Text` breaks it inside the word.
        label: longLabels ? 'Favoritesandrecentlyopenedfiles' : 'Favorites (stand-alone)',
        asset: IconStarRegular,
        href: '#favorites',
        onNavigate: () => onAction('Favorites clicked'),
    },
    {
        title: 'Account',
        dividerTop: sectionDividerTop,
        dividerBottom: sectionDividerBottom,
        items: [
            {
                id: 'settings',
                label: 'Settings',
                asset: IconSettingsRegular,
                href: '#settings',
                onNavigate: () => onAction('Settings clicked'),
            },
        ],
    },
];

const productMark = (
    <Circle size={32} backgroundColor={skinVars.colors.brand}>
        <Text2 medium color={skinVars.colors.textPrimaryInverse}>
            M
        </Text2>
    </Circle>
);

// A logo larger than its slot, in both directions and in both states. The slot grows in height, and it
// clips the width, so the logo never paints past the edge of the rail. The collapsed rail takes a smaller
// one, which the rail still clips. One box changes its size, over the time of the rail, so the circle
// shrinks and grows with the rail instead of swapping. It reads the phase: it starts to shrink when the
// rail starts to narrow, and it starts to grow when the rail starts to widen.
const OVERSIZED_LOGO_RESIZE_MS = 350;

const renderOversizedLogo = ({state}: SidenavLogoRenderProps): React.ReactNode => {
    const size = state === 'collapsed' || state === 'collapsing' ? 64 : 96;
    return (
        <div
            style={{
                width: size,
                height: size,
                transition: `width ${OVERSIZED_LOGO_RESIZE_MS}ms ease, height ${OVERSIZED_LOGO_RESIZE_MS}ms ease`,
            }}
        >
            <Circle size="100%" backgroundColor={skinVars.colors.brand}>
                <Text3 medium color={skinVars.colors.textPrimaryInverse}>
                    Too big
                </Text3>
            </Circle>
        </div>
    );
};

// The rail moves for 350ms. The name of the product fades over that same time, and it reads the phase of
// the motion, not the target state: it starts to fade when the rail starts to narrow, and it comes back as
// soon as the rail starts to widen. A swap on the target state would pop at the first frame instead.
const LOGO_NAME_FADE_MS = 350;

const renderCustomLogo = ({state}: SidenavLogoRenderProps): React.ReactNode => {
    const isNameVisible = state === 'expanded' || state === 'expanding';
    return (
        <Inline space={8} alignItems="center">
            {productMark}
            <span
                style={{
                    opacity: isNameVisible ? 1 : 0,
                    transition: `opacity ${LOGO_NAME_FADE_MS}ms ease`,
                }}
                aria-hidden={!isNameVisible || undefined}
            >
                <Text3 medium>Console</Text3>
            </span>
        </Inline>
    );
};

const logoByOption = {
    default: true,
    custom: renderCustomLogo,
    oversized: renderOversizedLogo,
    none: false,
} as const;

type LogoOption = keyof typeof logoByOption;

type Args = {
    'aria-label': string;
    variant: Variant;
    selectedItemId: string;
    logo: LogoOption;
    headerSlot: boolean;
    footerSlot: boolean;
    fixedFooter: boolean;
    boxed: boolean;
    divider: boolean;
    sectionDividerTop: boolean;
    sectionDividerBottom: boolean;
    longLabels: boolean;
    collapsible: boolean;
    defaultCollapsed: boolean;
    collapsed: boolean;
    doublePanel: boolean;
    width: number;
    colorsEnabled?: boolean;
    backgroundColor?: string;
};

export const Default = ({
    'aria-label': label,
    variant,
    selectedItemId,
    logo,
    headerSlot,
    footerSlot,
    fixedFooter,
    boxed,
    divider,
    sectionDividerTop,
    sectionDividerBottom,
    longLabels,
    collapsible,
    defaultCollapsed,
    collapsed,
    doublePanel,
    width,
    colorsEnabled,
    backgroundColor,
}: Args): React.JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const [lastAction, setLastAction] = React.useState('');

    // The control seeds the selection, and a press on an item moves it. The effect follows the control, so
    // a later change of the control also moves the selection.
    const selectedIdFromControl = selectedItemId === 'none' ? null : selectedItemId;
    const [selectedId, setSelectedId] = React.useState<string | null>(selectedIdFromControl);
    React.useEffect(() => {
        setSelectedId(selectedIdFromControl);
    }, [selectedIdFromControl]);
    const background = colorsEnabled ? backgroundColor : undefined;

    const sections: Array<SidenavEntry> = getDefaultSections(
        setLastAction,
        sectionDividerTop,
        sectionDividerBottom,
        longLabels
    );

    const headerSlotContent = isTabletOrSmaller ? (
        <Placeholder height={32} width={72} />
    ) : (
        <Placeholder height={76} />
    );

    return (
        <SidenavStoryPage
            sidenav={
                <SidenavBar
                    {...({
                        'aria-label': label,
                        variant,
                        logo: logoByOption[logo],
                        headerSlot: headerSlot ? headerSlotContent : undefined,
                        footerSlot: footerSlot ? <Placeholder height={76} /> : undefined,
                        fixedFooter,
                        boxed,
                        divider,
                        ...(collapsible
                            ? {
                                  collapsible: true,
                                  defaultCollapsed,
                                  onCollapse: (isCollapsed: boolean) =>
                                      setLastAction(isCollapsed ? 'Sidenav collapsed' : 'Sidenav expanded'),
                              }
                            : {collapsible: false, collapsed}),
                        doublePanel,
                        width,
                        sections,
                        background,
                        selectedItemId: selectedId,
                        onSelectedItemIdChange: (id: string | null) => {
                            setSelectedId(id);
                            setLastAction(`Selection moved to ${id ?? 'none'}`);
                        },
                    } as any)}
                />
            }
        >
            <Box padding={32}>
                <Stack space={24}>
                    <Stack space={8}>
                        <Text6 as="h1">SidenavItem props showcase</Text6>
                        <Text3 regular>
                            Press the items of the sidenav to see each type of prop in action. The panel below
                            tracks the last action.
                        </Text3>
                    </Stack>

                    <Callout
                        asset={<IconCheckRegular color={skinVars.colors.brand} />}
                        title="Last action"
                        description={lastAction || 'Press an item to trigger an action.'}
                    />

                    <Boxed>
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="prop-types">
                                    Types of props of a SidenavItem
                                </Text3>
                                <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                    <UnorderedList aria-labelledby="prop-types">
                                        <ListItem>
                                            href navigates with a hyperlink, and it takes an optional
                                            onNavigate callback. See &quot;Home (href)&quot;.
                                        </ListItem>
                                        <ListItem>
                                            onPress runs a custom action. See &quot;Search (onPress)&quot;.
                                        </ListItem>
                                        <ListItem>
                                            children makes the item expandable. See &quot;Projects&quot; and
                                            &quot;Teams&quot;. Such an item takes neither href nor onPress.
                                        </ListItem>
                                        <ListItem>
                                            rightSlot adds custom content on the right side. See the badge of
                                            &quot;Notifications&quot;.
                                        </ListItem>
                                        <ListItem>
                                            asset is optional. See &quot;Archived (no asset)&quot; inside
                                            &quot;Projects&quot;.
                                        </ListItem>
                                    </UnorderedList>
                                </Text2>
                            </Stack>
                        </Box>
                    </Boxed>

                    <Boxed variant="alternative">
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="key-features">
                                    Key features
                                </Text3>
                                <Text2 as="div" regular>
                                    <UnorderedList aria-labelledby="key-features">
                                        <ListItem>
                                            A first level item either expands its children, or navigates with
                                            href, to, or onPress.
                                        </ListItem>
                                        <ListItem>
                                            The first level admits sections and stand-alone items, in any
                                            order. See &quot;Favorites (stand-alone)&quot; between the two
                                            sections.
                                        </ListItem>
                                        <ListItem>
                                            A child item takes no children, so the tree holds two levels.
                                        </ListItem>
                                        <ListItem>The onNavigate callback runs for href and for to.</ListItem>
                                        <ListItem>
                                            The selectedItemId control seeds the selection, a press on an item
                                            moves it, and the sidenav reports every move through
                                            onSelectedItemIdChange. It also reports each collapse through
                                            onCollapse. The tracker above shows both.
                                        </ListItem>
                                        <ListItem>
                                            The label of an item says which prop it uses, either
                                            &quot;(href)&quot; or &quot;(onPress)&quot;.
                                        </ListItem>
                                        <ListItem>
                                            A section title and an item label never truncate. A text that does
                                            not fit wraps over several lines, and its row grows with it. Turn
                                            on the longLabels control to see it.
                                        </ListItem>
                                        <ListItem>
                                            The header shows the logo of the skin by default: the isotype on
                                            both the expanded sidenav and the collapsed rail. The logo prop
                                            also takes an element of your own, or a function that receives the
                                            collapsed state and the phase of the motion (expanded, collapsing,
                                            collapsed, expanding) and returns one logo for each state. The
                                            logo control shows that function: custom fades the name of the
                                            product with the rail, and oversized swaps two logos larger than
                                            the slot when the rail rests. The headerSlot and footerSlot props
                                            take that same function.
                                        </ListItem>
                                    </UnorderedList>
                                </Text2>
                            </Stack>
                        </Box>
                    </Boxed>
                </Stack>
            </Box>
        </SidenavStoryPage>
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
            expanded: true,
        },
    },
    tags: ['autodocs'],
    args: {
        'aria-label': 'Main navigation',
        variant: 'default',
        selectedItemId: 'none',
        logo: 'default',
        headerSlot: true,
        footerSlot: true,
        fixedFooter: false,
        boxed: false,
        divider: true,
        sectionDividerTop: true,
        sectionDividerBottom: false,
        longLabels: false,
        collapsible: true,
        defaultCollapsed: false,
        collapsed: false,
        doublePanel: false,
        width: 240,
        colorsEnabled: false,
        backgroundColor: '#f5f5f5',
    },
    argTypes: {
        // The items stay out of the panel: an object of that shape does not edit well in a control.
        sections: {
            table: {disable: true},
        },
        // The story takes this color from the Colors controls, so its own row would never take effect.
        background: {
            table: {disable: true},
        },
        'aria-label': {
            control: {type: 'text'},
        },
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
        },
        selectedItemId: {
            options: [
                'none',
                'home',
                'search',
                'active',
                'archived',
                'eng',
                'design',
                'notifications',
                'favorites',
                'settings',
            ],
            control: {type: 'select'},
            // The prop takes a string or null, and Storybook drops a control value that does not match the
            // type it reads from that union. The story declares the type of its own arg instead.
            type: {name: 'string'},
            description:
                'Seeds the selected item. A press on an item also moves the selection, and the sidenav reports it through onSelectedItemIdChange.',
        },
        logo: {
            options: Object.keys(logoByOption),
            control: {type: 'select'},
            // The prop takes an element, a boolean or a function, and Storybook drops a control value that
            // does not match the type it reads from that union. The story declares the type of its own arg.
            type: {name: 'string'},
            description:
                'default shows the isotype of the skin. custom is a function of the collapse state: the mark of a product with its name, and the name fades with the rail instead of popping at the first frame. oversized is a function too: a logo larger than the slot, which grows in height and clips the width, and the logo shrinks and grows with the rail. none hides the slot.',
        },
        headerSlot: {
            control: {type: 'boolean'},
            type: {name: 'boolean'},
        },
        // The docgen of Storybook drops the props that live inside the branches of ExclusifyUnion, so the
        // next five descriptions carry a copy of the JSDoc of each prop.
        footerSlot: {
            control: {type: 'boolean'},
            type: {name: 'boolean'},
            description: 'Custom content in footer region (at bottom of sidenav).',
        },
        fixedFooter: {
            control: {type: 'boolean'},
            type: {name: 'boolean'},
            if: {arg: 'footerSlot', truthy: true},
            description: 'Keep footer fixed when scrolling.',
        },
        boxed: {
            control: {type: 'boolean'},
            description: 'Renders as a floating box, with its own edge. The divider does not apply to it.',
        },
        divider: {
            if: {arg: 'boxed', truthy: false},
            description: 'Shows the vertical right divider (only when boxed is false).',
        },
        sectionDividerTop: {
            control: {type: 'boolean'},
            description:
                'Sets the dividerTop flag of the "Workspace" and the "Account" sections, which paints a divider over each of them.',
            table: {category: 'Section dividers'},
        },
        sectionDividerBottom: {
            control: {type: 'boolean'},
            description:
                'Sets the dividerBottom flag of the "Workspace" and the "Account" sections, which paints a divider under each of them.',
            table: {category: 'Section dividers'},
        },
        longLabels: {
            control: {type: 'boolean'},
            description:
                'Gives a long text to one section title, to one stand-alone item, to one item with a right slot and to one nested item. Such a text wraps over several lines, and the row grows with it. It never truncates. The stand-alone item carries a single word, which breaks inside the word.',
        },
        collapsible: {
            control: {type: 'boolean'},
            description: 'Whether the user can toggle the collapsed state.',
        },
        defaultCollapsed: {
            control: {type: 'boolean'},
            if: {arg: 'collapsible', truthy: true},
            description:
                'Initial collapsed state (uncontrolled). It seeds the state once, so a later change of this control does not move the sidenav.',
        },
        collapsed: {
            control: {type: 'boolean'},
            if: {arg: 'collapsible', truthy: false},
            description:
                'Collapsed state of a non-toggleable sidenav, which mirrors this prop on every render. Unlike defaultCollapsed, it is not a seed: a later change of it moves the sidenav.',
        },
        doublePanel: {
            control: {type: 'boolean'},
            description:
                'A press on a parent item opens its children in a second column, which pushes the page instead of overlaying it. The column shows the label of the parent as its title. It closes on a press on one of its children, on an item without children, on the same parent again, or outside of the bar. A press inside the bar that lands on no item, on the background of a column, or on a section title, keeps it open. A press on another parent refreshes it. A selection from outside of the bar opens the column on the parent of the selected child, and moves it there when it shows another parent. On the collapsed rail, every item keeps its tooltip while the column is open, except the item that owns the column.',
        },
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
        colorsEnabled: {
            control: {type: 'boolean'},
            description: 'Paints the sidenav with the color below, instead of the color of the variant.',
            table: {category: 'Colors'},
        },
        backgroundColor: {
            control: {type: 'color'},
            description:
                'Background color of the whole sidenav. Use an opaque color: the header and the footer are sticky over the scrolling body.',
            table: {category: 'Colors'},
            if: {arg: 'colorsEnabled', truthy: true},
        },
    },
};
