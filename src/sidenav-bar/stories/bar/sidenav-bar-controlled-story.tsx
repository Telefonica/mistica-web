'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import Badge from '../../../badge';
import Box from '../../../box';
import Stack from '../../../stack';
import Inline from '../../../inline';
import Chip from '../../../chip';
import {Boxed} from '../../../boxed';
import {UnorderedList, ListItem} from '../../../list';
import {Text2, Text3, Text5, Text6} from '../../../text';
import {vars as skinVars} from '../../../skins/skin-contract.css';
import {ThemeVariant} from '../../../theme-variant-context';

import type {SidenavSection, SidenavItem} from '../../sidenav-types';
import type {NonDeprecatedVariant} from '../../../theme-variant-context';

type Args = {
    variant: NonDeprecatedVariant;
    pageVariant: NonDeprecatedVariant;
    doublePanel: boolean;
    boxed: boolean;
};

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
    args: {
        variant: 'default',
        pageVariant: 'default',
        doublePanel: false,
        boxed: false,
    },
    argTypes: {
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
            description: 'Color variant of the sidenav, which the selected item follows.',
        },
        pageVariant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
            description:
                'Color variant of the page that holds the sidenav. A boxed sidenav paints its border only over a default or an alternative page.',
        },
        doublePanel: {
            control: {type: 'boolean'},
            description:
                'Opens the children of a parent item in a second column, instead of expanding them inline.',
        },
        boxed: {
            control: {type: 'boolean'},
            description: 'Renders the sidenav as a floating box, with its own edge instead of a divider.',
        },
    },
};

// The bands of the negative and the media variants take a translucent token, so the page behind the sidenav
// decides how they read. The `pageVariant` control paints the page, the same way an application does.
const pageBackgroundColor: Record<NonDeprecatedVariant, string> = {
    default: skinVars.colors.background,
    brand: skinVars.colors.backgroundBrand,
    alternative: skinVars.colors.backgroundAlternative,
    negative: skinVars.colors.backgroundNegative,
    media: skinVars.colors.backgroundNegative,
};

type SelectionButton = {id: string; label: string};

// Flatten a section's items into the leaf (selectable) entries. Parents only expand, so they are not
// selectable themselves; their descendants are the ones tracked by selectedItemId.
const collectSelectableItems = (items: ReadonlyArray<SidenavItem>): Array<SelectionButton> => {
    const result: Array<SelectionButton> = [];
    items.forEach((item) => {
        if (item.children && item.children.length > 0) {
            result.push(...collectSelectableItems(item.children));
            return;
        }
        result.push({id: item.id, label: item.label});
    });
    return result;
};

export const ControlledSelection = ({variant, pageVariant, doublePanel, boxed}: Args): React.JSX.Element => {
    const [selectedId, setSelectedId] = React.useState<string | null>('overview');

    const sections: Array<SidenavSection> = [
        {
            items: [
                {
                    id: 'overview',
                    label: 'Overview',
                    asset: IconHomeRegular,
                    onPress: () => console.log('Overview clicked'),
                },
                {
                    id: 'weather',
                    label: 'Weather',
                    asset: IconSearchRegular,
                    onPress: () => console.log('Weather clicked'),
                },
            ],
        },
        {
            title: 'Water Activities',
            dividerTop: true,
            items: [
                {
                    id: 'water-sports',
                    label: 'Water Sports',
                    asset: IconFolderRegular,
                    defaultOpen: true,
                    // A parent (expandable item) can also carry a rightSlot alongside its expand chevron.
                    rightSlot: <Badge value={3} />,
                    children: [
                        {
                            id: 'water-sailing',
                            label: 'Sailing',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Sailing clicked'),
                        },
                        {
                            id: 'water-windsurf',
                            label: 'Windsurfing',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Windsurfing clicked'),
                        },
                        {
                            id: 'water-kayak',
                            label: 'Kayaking',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Kayaking clicked'),
                        },
                    ],
                },
                {
                    id: 'beaches',
                    label: 'Beaches',
                    asset: IconFolderRegular,
                    children: [
                        {
                            id: 'beach-riva',
                            label: 'Riva del Garda',
                            asset: IconSearchRegular,
                            onPress: () => console.log('Riva del Garda clicked'),
                        },
                        {
                            id: 'beach-torbole',
                            label: 'Torbole',
                            asset: IconSearchRegular,
                            onPress: () => console.log('Torbole clicked'),
                        },
                        {
                            id: 'beach-nago',
                            label: 'Nago-Torbole',
                            asset: IconSearchRegular,
                            onPress: () => console.log('Nago-Torbole clicked'),
                        },
                    ],
                },
            ],
        },
        {
            title: 'Mountain Activities',
            dividerTop: true,
            items: [
                {
                    id: 'mountain-trails',
                    label: 'Hiking Trails',
                    asset: IconFolderRegular,
                    children: [
                        {
                            id: 'trail-sentiero-della-pace',
                            label: 'Sentiero della Pace',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Sentiero della Pace clicked'),
                        },
                        {
                            id: 'trail-monte-cassian',
                            label: 'Monte Cassian',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Monte Cassian clicked'),
                        },
                    ],
                },
                {
                    id: 'climbing',
                    label: 'Rock Climbing',
                    asset: IconBellRegular,
                    onPress: () => console.log('Rock Climbing clicked'),
                },
                {
                    id: 'mtb',
                    label: 'Mountain Biking',
                    asset: IconSettingsRegular,
                    onPress: () => console.log('Mountain Biking clicked'),
                },
            ],
        },
        {
            title: 'Culture & Nature',
            dividerTop: true,
            items: [
                {
                    id: 'castles',
                    label: 'Castles & History',
                    asset: IconFolderRegular,
                    children: [
                        {
                            id: 'castle-arco',
                            label: 'Arco Castle',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Arco Castle clicked'),
                        },
                        {
                            id: 'castle-drena',
                            label: 'Drena Castle',
                            asset: IconDocumentsRegular,
                            onPress: () => console.log('Drena Castle clicked'),
                        },
                    ],
                },
                {
                    id: 'botanical-gardens',
                    label: 'Botanical Gardens',
                    asset: IconSearchRegular,
                    onPress: () => console.log('Botanical Gardens clicked'),
                },
            ],
        },
    ];

    return (
        // The page owns the variant, so the sidenav reads it as its context. A boxed sidenav needs it to
        // decide its border.
        <ThemeVariant variant={pageVariant}>
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    backgroundColor: pageBackgroundColor[pageVariant],
                }}
            >
                <SidenavBar
                    aria-label="Alto Garda Activities"
                    variant={variant}
                    selectedItemId={selectedId}
                    onSelectedItemIdChange={setSelectedId}
                    sections={sections}
                    doublePanel={doublePanel}
                    {...(boxed ? {boxed: true as const} : {boxed: false as const})}
                />
                <div style={{flex: 1, overflowY: 'auto'}}>
                    <Box padding={32}>
                        <Stack space={24}>
                            <Stack space={8}>
                                <Text6 as="h1">Alto Garda Activities - Controlled Selection</Text6>
                                <Text3 regular>
                                    Press the items of the sidenav, or the chips below, to update the
                                    selection. A parent item highlights when the sidenav collapses and one of
                                    its children is selected.
                                </Text3>
                            </Stack>

                            <Boxed>
                                <Box padding={24}>
                                    <Stack space={8}>
                                        <Text2 medium color={skinVars.colors.textSecondary}>
                                            Current selection
                                        </Text2>
                                        <Text5>{selectedId ?? '(none)'}</Text5>
                                    </Stack>
                                </Box>
                            </Boxed>

                            <Stack space={16}>
                                {sections.map((section, index) => (
                                    <Stack space={8} key={section.title ?? `section-${index}`}>
                                        <Text2 medium>{section.title ?? 'General'}</Text2>
                                        <Inline space={8} verticalSpace={8} wrap>
                                            {collectSelectableItems(section.items).map((button) => (
                                                <Chip
                                                    key={button.id}
                                                    active={selectedId === button.id}
                                                    onPress={() => setSelectedId(button.id)}
                                                >
                                                    {button.label}
                                                </Chip>
                                            ))}
                                        </Inline>
                                    </Stack>
                                ))}
                            </Stack>

                            <Boxed>
                                <Box padding={24}>
                                    <Stack space={16}>
                                        <Text2 medium id="how-to-test">
                                            How to test
                                        </Text2>
                                        <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                            <UnorderedList aria-labelledby="how-to-test">
                                                <ListItem>
                                                    Press the chips above to move the selection from the page.
                                                </ListItem>
                                                <ListItem>
                                                    Press the items of the sidenav to move the selection from
                                                    the sidenav.
                                                </ListItem>
                                                <ListItem>Press the collapse action of the sidenav.</ListItem>
                                                <ListItem>
                                                    When the sidenav is expanded, the selected item shows the
                                                    accent bar. Its parent shows a selected background and it
                                                    opens.
                                                </ListItem>
                                                <ListItem>
                                                    When the sidenav is expanded, close the parent that holds
                                                    the selection. Then select a sibling child with the chips.
                                                    The parent opens again on the new selection.
                                                </ListItem>
                                                <ListItem>
                                                    When the sidenav is collapsed, a parent with a selected
                                                    child shows a selected background, and no accent bar. Open
                                                    its dropdown to see the selected child.
                                                </ListItem>
                                                <ListItem>
                                                    A parent also holds a right slot. &quot;Water Sports&quot;
                                                    shows a badge next to its expand chevron.
                                                </ListItem>
                                                <ListItem>
                                                    Turn on the doublePanel control. A parent then opens its
                                                    children in a second column, instead of an inline
                                                    expansion.
                                                </ListItem>
                                                <ListItem>
                                                    With doublePanel on, select a child with the chips. The
                                                    second column opens on its parent, and it stays open when
                                                    you press the same chip again.
                                                </ListItem>
                                                <ListItem>
                                                    With doublePanel on, select a child of another parent with
                                                    the chips. The second column moves to that parent.
                                                </ListItem>
                                                <ListItem>
                                                    Turn on the boxed control. The sidenav floats as a box,
                                                    with its own edge and its own inset. The second column
                                                    stays inside that box.
                                                </ListItem>
                                                <ListItem>
                                                    With doublePanel on, the second column closes when you
                                                    press one of its children, when you press its parent
                                                    again, and when the selection moves to a first level item
                                                    without children.
                                                </ListItem>
                                            </UnorderedList>
                                        </Text2>
                                    </Stack>
                                </Box>
                            </Boxed>
                        </Stack>
                    </Box>
                </div>
            </div>
        </ThemeVariant>
    );
};

ControlledSelection.storyName = 'Controlled selection';
