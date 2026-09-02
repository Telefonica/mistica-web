'use client';

import * as React from 'react';
import {SidenavBar} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../generated/mistica-icons/icon-documents-regular';
import IconChevronRightRegular from '../generated/mistica-icons/icon-chevron-right-regular';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import IconCheckRegular from '../generated/mistica-icons/icon-check-regular';
import {Placeholder} from '../placeholder';
import Callout from '../callout';
import Circle from '../circle';
import Badge from '../badge';
import {IconButton} from '../icon-button';
import {ButtonLink} from '../button';
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
import type {
    SidenavBarBackgroundColors,
    SidenavCollapseActionRenderProps,
    SidenavLogoRenderProps,
} from '../sidenav-bar';

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

const renderCustomCollapseAction = ({
    collapsed,
    onPress,
    'aria-label': ariaLabel,
}: SidenavCollapseActionRenderProps): React.ReactNode =>
    collapsed ? (
        <IconButton
            Icon={IconChevronRightRegular}
            type="neutral"
            backgroundType="transparent"
            small
            onPress={onPress}
            aria-label={ariaLabel}
        />
    ) : (
        <ButtonLink small bleedY onPress={onPress} aria-label={ariaLabel}>
            Hide
        </ButtonLink>
    );

const productMark = (
    <Circle size={32} backgroundColor={skinVars.colors.brand}>
        <Text2 medium color={skinVars.colors.textPrimaryInverse}>
            M
        </Text2>
    </Circle>
);

const renderCustomLogo = ({collapsed}: SidenavLogoRenderProps): React.ReactNode =>
    collapsed ? (
        productMark
    ) : (
        <Inline space={8} alignItems="center">
            {productMark}
            <Text3 medium>Console</Text3>
        </Inline>
    );

type Args = {
    'aria-label': string;
    variant: Variant;
    selectedItemId: string;
    logo: boolean;
    customLogo: boolean;
    headerSlot: boolean;
    footerSlot: boolean;
    fixedFooter: boolean;
    boxed: boolean;
    divider: boolean;
    sectionDividerTop: boolean;
    sectionDividerBottom: boolean;
    longLabels: boolean;
    collapsible: boolean;
    customCollapseAction: boolean;
    defaultCollapsed: boolean;
    collapsed: boolean;
    doublePanel: boolean;
    width: number;
    'Colors/Enabled'?: boolean;
    'Colors/Header'?: string;
    'Colors/Body'?: string;
    'Colors/Footer'?: string;
};

export const Default = ({
    'aria-label': label,
    variant,
    selectedItemId,
    logo,
    customLogo,
    headerSlot,
    footerSlot,
    fixedFooter,
    boxed,
    divider,
    sectionDividerTop,
    sectionDividerBottom,
    longLabels,
    collapsible,
    customCollapseAction,
    defaultCollapsed,
    collapsed,
    doublePanel,
    width,
    'Colors/Enabled': colorsEnabled,
    'Colors/Header': headerColor,
    'Colors/Body': bodyColor,
    'Colors/Footer': footerColor,
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
    const background: SidenavBarBackgroundColors = colorsEnabled
        ? {
              header: headerColor as any,
              body: bodyColor as any,
              footer: footerColor as any,
          }
        : {};

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
                        logo: logo && customLogo ? renderCustomLogo : logo,
                        headerSlot: headerSlot ? headerSlotContent : undefined,
                        footerSlot: footerSlot ? <Placeholder height={76} /> : undefined,
                        fixedFooter,
                        boxed,
                        divider,
                        ...(collapsible
                            ? {
                                  collapsible: true,
                                  defaultCollapsed,
                                  renderCollapseAction: customCollapseAction
                                      ? renderCustomCollapseAction
                                      : undefined,
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
                                            The header shows a collapse action by default. Turn on the
                                            customCollapseAction control to paint that action with
                                            renderCollapseAction, which receives the collapsed state, the
                                            press handler, and the accessible name.
                                        </ListItem>
                                        <ListItem>
                                            The header shows the logo of the skin by default: the isotype on
                                            both the expanded sidenav and the collapsed rail. The logo prop
                                            also takes an element of your own, or a function that receives the
                                            collapsed state and returns one logo for each state. Turn on the
                                            customLogo control to see that function, and turn the logo control
                                            off to hide the slot.
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
        logo: true,
        customLogo: false,
        headerSlot: true,
        footerSlot: true,
        fixedFooter: false,
        boxed: false,
        divider: true,
        sectionDividerTop: true,
        sectionDividerBottom: false,
        longLabels: false,
        collapsible: true,
        customCollapseAction: false,
        defaultCollapsed: false,
        collapsed: false,
        doublePanel: false,
        width: 240,
        'Colors/Enabled': false,
        'Colors/Header': '#ffffff',
        'Colors/Body': '#f5f5f5',
        'Colors/Footer': '#ffffff',
    },
    argTypes: {
        // The items stay out of the panel: an object of that shape does not edit well in a control.
        sections: {
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
            control: {type: 'boolean'},
            // The prop takes an element or a boolean, and Storybook drops a control value that does not
            // match the type it reads from that union. The story declares the type of its own arg instead.
            // The description comes from the JSDoc of the prop.
            type: {name: 'boolean'},
        },
        customLogo: {
            control: {type: 'boolean'},
            description:
                'Puts a logo of your own in the slot with a function of the collapsed state: the mark of a product alone on the rail, and the mark with the name of the product on the expanded sidenav.',
            if: {arg: 'logo', truthy: true},
        },
        headerSlot: {
            control: {type: 'boolean'},
        },
        // The docgen of Storybook drops the props that live inside the branches of ExclusifyUnion, so the
        // next five descriptions carry a copy of the JSDoc of each prop.
        footerSlot: {
            control: {type: 'boolean'},
            description: 'Custom content in footer region (at bottom of sidenav).',
        },
        fixedFooter: {
            control: {type: 'boolean'},
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
        customCollapseAction: {
            control: {type: 'boolean'},
            description:
                'Paints the collapse action with renderCollapseAction: a text link on the expanded sidenav, and an icon on the collapsed rail.',
            if: {arg: 'collapsible', truthy: true},
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
        },
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
