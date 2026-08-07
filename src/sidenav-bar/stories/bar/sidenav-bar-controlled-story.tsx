'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';

import type {SidenavSection, SidenavItem} from '../../sidenav-types';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
};

export const ControlledSelection = (): React.JSX.Element => {
    const [selectedId, setSelectedId] = React.useState<string | null>('home');

    const sections: SidenavSection[] = [
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
                selectedItemId={selectedId}
                onSelectedItemIdChange={setSelectedId}
                sections={sections}
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
