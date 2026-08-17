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

import type {SidenavSection, SidenavItem} from '../../sidenav-types';
import type {Variant} from '../../../theme-variant-context';

type Args = {
    variant: Variant;
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
        doublePanel: false,
        boxed: false,
    },
    argTypes: {
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
            description: 'Color variant of the sidenav, which the selected item follows.',
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

const getSelectionButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    backgroundColor: isActive ? '#0066CC' : '#e0e0e0',
    color: isActive ? 'white' : 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
});

export const ControlledSelection = ({variant, doublePanel, boxed}: Args): React.JSX.Element => {
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
        <div style={{display: 'flex', height: '100vh'}}>
            <SidenavBar
                aria-label="Alto Garda Activities"
                variant={variant}
                selectedItemId={selectedId}
                onSelectedItemIdChange={setSelectedId}
                sections={sections}
                doublePanel={doublePanel}
                {...(boxed ? {boxed: true as const} : {boxed: false as const})}
            />
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

                {sections.map((section, index) => {
                    const buttons = collectSelectableItems(section.items);
                    return (
                        <div
                            key={section.title ?? `section-${index}`}
                            style={{marginTop: index === 0 ? '2rem' : '1.5rem'}}
                        >
                            <strong>{section.title ?? 'General'}:</strong>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {buttons.map((button) => (
                                    <button
                                        key={button.id}
                                        onClick={() => setSelectedId(button.id)}
                                        style={getSelectionButtonStyle(selectedId === button.id)}
                                    >
                                        {button.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}

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
                        <li>
                            When expanded: the selected item shows the accent bar, and its parent shows a
                            selected background and auto-expands.
                        </li>
                        <li>
                            When expanded: close a parent that holds the selection, then select a sibling
                            child with the buttons above. The parent reopens to show the new selection.
                        </li>
                        <li>
                            When collapsed: a parent whose child is selected shows a selected background (no
                            accent bar). Open its dropdown to see the selected child.
                        </li>
                        <li>
                            A parent can also carry a right slot: &quot;Water Sports&quot; shows a badge next
                            to its expand chevron.
                        </li>
                        <li>
                            Turn on the <strong>doublePanel</strong> control: a parent then opens its children
                            in a second column instead of expanding them inline.
                        </li>
                        <li>
                            With doublePanel on: select a child with the buttons above. The second column
                            opens on its parent and stays open, even when you press the same button again.
                        </li>
                        <li>
                            With doublePanel on: select a child of another parent with the buttons above. The
                            second column moves to that parent.
                        </li>
                        <li>
                            Turn on the <strong>boxed</strong> control: the sidenav floats as a box, with its
                            own edge and its own inset. The second column stays inside that box.
                        </li>
                        <li>
                            With doublePanel on: the second column closes when you press one of its children,
                            when you press its parent again, and when the selection moves to a first-level
                            item without children.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

ControlledSelection.storyName = 'Controlled selection';
