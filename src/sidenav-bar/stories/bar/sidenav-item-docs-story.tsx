'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';

import type {Meta} from '@storybook/react';

const meta = {
    title: 'Components/SidenavBar/Docs/SidenavItem',
    component: SidenavItem,
    parameters: {
        fullScreen: true,
        docs: {
            description: {
                component:
                    "Navigation item component for use within SidenavSection. Props `href`, `onPress`, `to`, and `children` are mutually exclusive—use exactly one of these to define the item's behavior.",
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Display text (truncated if too long).',
        },
        id: {
            control: 'text',
            description: 'Unique identifier for selection tracking.',
        },
        asset: {
            control: false,
            description:
                'Icon component or element to display. Required for top-level items in collapsed sidenav.',
        },
        showIconWhenExpanded: {
            control: 'boolean',
            description: 'Show asset when expanded (not collapsed). Default: true',
        },
        rightSlot: {
            control: false,
            description: 'Custom content on the right side (e.g., Badge).',
        },
        defaultOpen: {
            control: 'boolean',
            description: 'Initial expanded state for items with children. Default: false',
        },
        href: {
            control: 'text',
            description:
                'Navigation URL for href link. Mutually exclusive with `onPress`, `to`, and `children`.',
        },
        to: {
            control: 'text',
            description: 'Router link target. Mutually exclusive with `onPress`, `href`, and `children`.',
        },
        onPress: {
            control: false,
            description:
                'Click handler for custom actions. Mutually exclusive with `href`, `to`, and `children`.',
        },
        children: {
            control: false,
            description:
                'Nested SidenavItem elements (max 2 nesting levels). Mutually exclusive with `href`, `onPress`, and `to`.',
        },
        newTab: {
            control: 'boolean',
            description: 'Open link in new tab (applies to `href` and `to` variants). Default: false',
        },
        onNavigate: {
            control: false,
            description: 'Called after navigation (applies to `href` and `to` variants).',
        },
        dataAttributes: {
            control: false,
            description: 'Custom data attributes for testing and tracking.',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SidenavItem>;

export default meta;

export const Docs = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Main navigation">
            <SidenavSection title="Navigation items">
                <SidenavItem id="item1" label="Home" asset={IconHomeRegular} href="#home" />
                <SidenavItem id="item2" label="Search" asset={IconSearchRegular} href="#search" />
                <SidenavItem
                    id="item3"
                    label="Settings with children"
                    asset={IconSettingsRegular}
                    defaultOpen
                >
                    <SidenavItem id="item3-1" label="Nested item 1" href="#nested1" />
                    <SidenavItem id="item3-2" label="Nested item 2" href="#nested2" />
                </SidenavItem>
            </SidenavSection>
        </SidenavBar>
    </div>
);

Docs.storyName = 'SidenavItem';
