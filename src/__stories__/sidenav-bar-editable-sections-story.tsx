'use client';

import * as React from 'react';
import {SidenavBar} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../generated/mistica-icons/icon-documents-regular';
import IconBellRegular from '../generated/mistica-icons/icon-bell-regular';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import IconSettingsRegular from '../generated/mistica-icons/icon-settings-regular';
import Box from '../box';
import Stack from '../stack';
import {Boxed} from '../boxed';
import {UnorderedList, ListItem} from '../list';
import {Text2, Text3, Text6} from '../text';
import {vars as skinVars} from '../skins/skin-contract.css';
import {SidenavStoryPage} from './sidenav-bar-story-page';

import type {SidenavEntry, SidenavItem, SidenavSectionTitle} from '../sidenav-bar-types';

const ICONS = {
    home: IconHomeRegular,
    search: IconSearchRegular,
    folder: IconFolderRegular,
    documents: IconDocumentsRegular,
    bell: IconBellRegular,
    star: IconStarRegular,
    settings: IconSettingsRegular,
};

const ICON_NAMES = Object.keys(ICONS);

type IconName = keyof typeof ICONS;

/**
 * JSON form of a `SidenavItem`. The Controls panel holds no React component, so the item takes an `icon`
 * name instead of an `asset`, and the story maps that name to the icon of the design system.
 */
type EditableItem = {
    id: string;
    label: string;
    icon?: IconName;
    href?: string;
    to?: string;
    defaultOpen?: boolean;
    children?: ReadonlyArray<EditableItem>;
};

type EditableSection = {
    title: SidenavSectionTitle;
    dividerTop?: boolean;
    dividerBottom?: boolean;
    items: ReadonlyArray<EditableItem>;
};

type EditableEntry = EditableSection | EditableItem;

const toSidenavItem = ({icon, children, ...item}: EditableItem): SidenavItem =>
    ({
        ...item,
        asset: icon ? ICONS[icon] : undefined,
        children: children?.map(toSidenavItem),
    }) as SidenavItem;

const toSidenavEntry = (entry: EditableEntry): SidenavEntry =>
    'items' in entry ? {...entry, items: entry.items.map(toSidenavItem)} : toSidenavItem(entry);

const DEFAULT_SECTIONS: Array<EditableEntry> = [
    {
        id: 'dashboard',
        label: 'Dashboard (stand-alone item)',
        icon: 'star',
        href: '#dashboard',
    },
    {
        id: 'reports',
        label: 'Reports (stand-alone item)',
        icon: 'documents',
        href: '#reports',
    },
    {
        // The heading stays out of sight, and a screen reader still reads this text as the name of the
        // list of the section.
        title: {text: 'General', hidden: true},
        dividerTop: false,
        dividerBottom: true,
        items: [
            {
                id: 'home',
                label: 'Home',
                icon: 'home',
                href: '#home',
            },
            {
                id: 'search',
                label: 'Search',
                icon: 'search',
                href: '#search',
            },
        ],
    },
    {
        title: 'Workspace',
        dividerTop: true,
        dividerBottom: false,
        items: [
            {
                id: 'projects',
                label: 'Projects',
                icon: 'folder',
                defaultOpen: true,
                children: [
                    {
                        id: 'active',
                        label: 'Active',
                        icon: 'documents',
                        href: '#active',
                    },
                    {
                        id: 'archived',
                        label: 'Archived (no icon)',
                        href: '#archived',
                    },
                ],
            },
        ],
    },
    {
        id: 'support',
        label: 'Support (stand-alone item)',
        icon: 'bell',
        href: '#support',
    },
    {
        title: 'Settings',
        dividerTop: true,
        dividerBottom: false,
        items: [
            {
                id: 'config',
                label: 'Configuration',
                icon: 'settings',
                href: '#config',
            },
        ],
    },
];

type Args = {
    sections: Array<EditableEntry>;
};

export const EditableSections = ({sections}: Args): React.JSX.Element => {
    const entries = React.useMemo(() => sections.map(toSidenavEntry), [sections]);

    return (
        <SidenavStoryPage sidenav={<SidenavBar sections={entries} aria-label="Sidenav" />}>
            <Box padding={32}>
                <Stack space={24}>
                    <Stack space={8}>
                        <Text6 as="h1">Editable sections</Text6>
                        <Text3 regular>
                            Edit the sections control to test the component with another navigation structure.
                        </Text3>
                        <Text3 regular>
                            The first level takes sections and stand-alone items, in any order. Every section
                            declares dividerTop and dividerBottom, so you can switch each divider on and off
                            in the control. A stand-alone item takes no dividers. Two consecutive sections
                            share one divider when the first ends with one and the second starts with one, as
                            the section with the hidden title and &quot;Workspace&quot; show.
                        </Text3>
                        <Text3 regular>
                            Every section declares a title, because the list of the section takes its
                            accessible name from it. A string paints a visible heading. The object form{' '}
                            {'{text, hidden: true}'} paints no heading, and a screen reader still reads the
                            name, as the section above &quot;Workspace&quot; shows.
                        </Text3>
                        <Text3 regular>
                            Give an icon to every first-level item. The collapsed rail shows the icon instead
                            of the label, so a first-level item without an icon disappears there, and the
                            component reports it in the console. An item of the second level takes an optional
                            icon, as &quot;Archived (no icon)&quot; shows.
                        </Text3>
                    </Stack>

                    <Boxed>
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="supported">
                                    The control accepts these properties
                                </Text3>
                                <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                    <UnorderedList aria-labelledby="supported">
                                        <ListItem>id, a string, the unique identifier.</ListItem>
                                        <ListItem>label, a string, the text of the item.</ListItem>
                                        <ListItem>
                                            icon, a string, the name of the icon. The story accepts:{' '}
                                            {ICON_NAMES.join(', ')}.
                                        </ListItem>
                                        <ListItem>href, a string, the URL of the link.</ListItem>
                                        <ListItem>to, a string, the route of the link.</ListItem>
                                        <ListItem>children, an array of nested items.</ListItem>
                                        <ListItem>
                                            defaultOpen, a boolean, opens the item on the first render.
                                        </ListItem>
                                        <ListItem>items, an array, the items of a section.</ListItem>
                                        <ListItem>
                                            title, mandatory on a section. Give a string for a visible
                                            heading, or {'{"text": "...", "hidden": true}'} to name the list
                                            of the section for a screen reader only.
                                        </ListItem>
                                        <ListItem>
                                            dividerTop, a boolean, the divider above a section.
                                        </ListItem>
                                        <ListItem>
                                            dividerBottom, a boolean, the divider below a section.
                                        </ListItem>
                                    </UnorderedList>
                                </Text2>
                            </Stack>
                        </Box>
                    </Boxed>

                    <Boxed variant="alternative">
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="not-supported">
                                    The control rejects these properties
                                </Text3>
                                <Text2 as="div" regular>
                                    <UnorderedList aria-labelledby="not-supported">
                                        <ListItem>onPress, because JSON holds no function.</ListItem>
                                        <ListItem>
                                            asset, because JSON holds no React component. Use the icon name
                                            instead. The component itself takes an asset.
                                        </ListItem>
                                        <ListItem>rightSlot, because JSON holds no React element.</ListItem>
                                        <ListItem>onNavigate, because JSON holds no callback.</ListItem>
                                    </UnorderedList>
                                </Text2>
                                <Text2 regular>
                                    For these properties, open the SidenavBar story, which declares the
                                    sections in JSX.
                                </Text2>
                            </Stack>
                        </Box>
                    </Boxed>

                    <Boxed>
                        <Box padding={24}>
                            <Text2 as="div" regular>
                                <pre style={{margin: 0, overflow: 'auto'}}>
                                    {JSON.stringify(sections, null, 2)}
                                </pre>
                            </Text2>
                        </Box>
                    </Boxed>
                </Stack>
            </Box>
        </SidenavStoryPage>
    );
};

EditableSections.storyName = 'Editable Sections';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
        // This playground is only about editing the `sections` data, so restrict the Controls panel
        // to that single control instead of every inferred SidenavBar prop.
        controls: {include: ['sections'], expanded: true},
    },
    args: {
        sections: DEFAULT_SECTIONS,
    },
    argTypes: {
        sections: {
            control: {type: 'object'},
            description: `Edit JSON with: id, label, icon (${ICON_NAMES.join(
                ' | '
            )}), href/to, children, defaultOpen, items, title, dividerTop, dividerBottom. Cannot include: onPress, asset, rightSlot (these are functions/components).`,
            table: {
                category: 'Data (JSON-editable)',
            },
        },
    },
};
