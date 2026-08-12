'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';

import type {SidenavSection} from '../../sidenav-types';

const DEFAULT_SECTIONS: Array<SidenavSection> = [
    {
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
        title: 'Settings',
        dividerTop: true,
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
    sections: Array<SidenavSection>;
};

export const EditableSections = ({sections}: Args): React.JSX.Element => {
    return (
        <div style={{display: 'flex', height: '100vh', gap: '1rem'}}>
            <div style={{width: '300px', borderRight: '1px solid #ccc', overflow: 'auto'}}>
                <SidenavBar sections={sections} aria-label="Sidenav" />
            </div>
            <div style={{flex: 1, padding: '2rem', overflowY: 'auto'}}>
                <h1>Editable Sections (JSON-Safe)</h1>
                <p>
                    ✅ Edit the `sections` control below to test the component with different navigation
                    structures
                </p>

                <div
                    style={{
                        backgroundColor: '#f0f8ff',
                        padding: '1rem',
                        borderRadius: '4px',
                        border: '1px solid #0284c7',
                        marginTop: '1rem',
                    }}
                >
                    <h3>✓ Supported in JSON:</h3>
                    <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
                        <li>
                            <code>id</code> (string) — unique identifier
                        </li>
                        <li>
                            <code>label</code> (string) — display text
                        </li>
                        <li>
                            <code>href</code> (string) — link URL
                        </li>
                        <li>
                            <code>to</code> (string) — router link
                        </li>
                        <li>
                            <code>children</code> (array) — nested items
                        </li>
                        <li>
                            <code>defaultOpen</code> (boolean) — expand by default
                        </li>
                        <li>
                            <code>title</code> (string) — section heading
                        </li>
                        <li>
                            <code>dividerTop</code> (boolean) — section divider
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        backgroundColor: '#fee',
                        padding: '1rem',
                        borderRadius: '4px',
                        border: '1px solid #fcc',
                        marginTop: '1rem',
                    }}
                >
                    <h3>✗ NOT supported in JSON:</h3>
                    <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
                        <li>
                            <code>onPress</code> — functions cannot be in JSON
                        </li>
                        <li>
                            <code>asset</code> — React components/icons cannot be in JSON
                        </li>
                        <li>
                            <code>rightSlot</code> — React elements cannot be in JSON
                        </li>
                        <li>
                            <code>onNavigate</code> — callback functions cannot be in JSON
                        </li>
                    </ul>
                    <p style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
                        For these features, use the <strong>SidenavBar</strong> story which showcases all
                        capabilities via JSX.
                    </p>
                </div>

                <pre
                    style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1rem',
                        overflow: 'auto',
                        marginTop: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                >
                    {JSON.stringify(sections, null, 2)}
                </pre>
            </div>
        </div>
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
                'Edit JSON with: id, label, href/to, children, defaultOpen, title, dividerTop. Cannot include: onPress, asset, rightSlot (these are functions/components).',
            table: {
                category: 'Data (JSON-editable)',
            },
        },
    },
};
