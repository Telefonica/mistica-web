'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import Box from '../../../box';
import Stack from '../../../stack';
import {Boxed} from '../../../boxed';
import {UnorderedList, ListItem} from '../../../list';
import {Text2, Text3, Text6} from '../../../text';
import {vars as skinVars} from '../../../skins/skin-contract.css';
import {SidenavStoryPage} from './sidenav-story-page';

import type {SidenavEntry} from '../../sidenav-types';

// The first level admits sections and stand-alone items, in any order. An entry with `items` is a
// section, an entry with an `id` is a stand-alone item. Every section declares both dividers, so you
// can switch them on and off from the `sections` control.
const DEFAULT_SECTIONS: Array<SidenavEntry> = [
    {
        id: 'dashboard',
        label: 'Dashboard (stand-alone item)',
        href: '#dashboard',
    },
    {
        dividerTop: false,
        dividerBottom: false,
        items: [
            {
                id: 'home',
                label: 'Home',
                href: '#home',
            },
            {
                id: 'search',
                label: 'Search',
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
        ],
    },
    {
        id: 'support',
        label: 'Support (stand-alone item)',
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
                href: '#config',
            },
        ],
    },
];

type Args = {
    sections: Array<SidenavEntry>;
};

export const EditableSections = ({sections}: Args): React.JSX.Element => {
    return (
        <SidenavStoryPage sidenav={<SidenavBar sections={sections} aria-label="Sidenav" />}>
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
                            in the control. A stand-alone item takes no dividers. The collapsed state needs an
                            asset per item, so it has its own story: &quot;Sections and stand-alone
                            items&quot;.
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
                                        <ListItem>href, a string, the URL of the link.</ListItem>
                                        <ListItem>to, a string, the route of the link.</ListItem>
                                        <ListItem>children, an array of nested items.</ListItem>
                                        <ListItem>
                                            defaultOpen, a boolean, opens the item on the first render.
                                        </ListItem>
                                        <ListItem>items, an array, the items of a section.</ListItem>
                                        <ListItem>title, a string, the heading of a section.</ListItem>
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
                                        <ListItem>asset, because JSON holds no React component.</ListItem>
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
        controls: {include: ['sections']},
    },
    args: {
        sections: DEFAULT_SECTIONS,
    },
    argTypes: {
        sections: {
            control: {type: 'object'},
            description:
                'Edit JSON with: id, label, href/to, children, defaultOpen, items, title, dividerTop, dividerBottom. Cannot include: onPress, asset, rightSlot (these are functions/components).',
            table: {
                category: 'Data (JSON-editable)',
            },
        },
    },
};
