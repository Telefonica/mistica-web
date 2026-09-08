import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';

import type {SidenavEntry, SidenavItem, SidenavNestedItem, SidenavSection} from '../sidenav-bar-types';

// OK - a first-level item carries an asset
const firstLevelItem: SidenavItem = {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/'};

// OK - a first-level item hides the asset next to its label
const firstLevelItemWithHiddenAsset: SidenavItem = {
    id: 'home',
    label: 'Home',
    asset: IconHomeRegular,
    showIconWhenExpanded: false,
    href: '/',
};

// @ts-expect-error - a first-level item needs an asset
const firstLevelItemWithoutAsset: SidenavItem = {id: 'home', label: 'Home', href: '/'};

// OK - a nested item can omit the asset
const nestedItem: SidenavNestedItem = {id: 'active', label: 'Active', href: '/active'};

// OK - a nested item can carry an asset
const nestedItemWithAsset: SidenavNestedItem = {
    id: 'active',
    label: 'Active',
    asset: IconHomeRegular,
    href: '/active',
};

const nestedItemWithHiddenAsset: SidenavNestedItem = {
    id: 'active',
    label: 'Active',
    asset: IconHomeRegular,
    // @ts-expect-error - only a first-level item reads showIconWhenExpanded
    showIconWhenExpanded: false,
    href: '/active',
};

// @ts-expect-error - a nested item cannot have children
const nestedItemWithChildren: SidenavNestedItem = {id: 'active', label: 'Active', children: [nestedItem]};

// OK - an expandable first-level item with nested children
const expandableItem: SidenavItem = {
    id: 'projects',
    label: 'Projects',
    asset: IconHomeRegular,
    children: [nestedItem, nestedItemWithAsset],
};

const section: SidenavSection = {
    title: 'Workspace',
    items: [
        firstLevelItem,
        firstLevelItemWithHiddenAsset,
        expandableItem,
        // @ts-expect-error - the items of a section are first-level items, so they need an asset
        {id: 'teams', label: 'Teams', href: '/teams'},
    ],
};

const entries: Array<SidenavEntry> = [
    section,
    firstLevelItem,
    // @ts-expect-error - a stand-alone first-level item needs an asset
    {id: 'settings', label: 'Settings', href: '/settings'},
];

export {firstLevelItemWithoutAsset, nestedItemWithHiddenAsset, nestedItemWithChildren, entries};
