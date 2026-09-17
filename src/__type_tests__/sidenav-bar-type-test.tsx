import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';

import type {
    SidenavEntry,
    SidenavFirstLevelItem,
    SidenavSecondLevelItem,
    SidenavSection,
} from '../sidenav-bar-types';
import type {SidenavBarProps} from '../sidenav-bar';

// OK - a first-level item carries an asset
const firstLevelItem: SidenavFirstLevelItem = {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/'};

// OK - a first-level item hides the asset next to its label
const firstLevelItemWithHiddenAsset: SidenavFirstLevelItem = {
    id: 'home',
    label: 'Home',
    asset: IconHomeRegular,
    showAssetWhenExpanded: false,
    href: '/',
};

// @ts-expect-error - a first-level item needs an asset
const firstLevelItemWithoutAsset: SidenavFirstLevelItem = {id: 'home', label: 'Home', href: '/'};

// OK - a second-level item can omit the asset
const secondLevelItem: SidenavSecondLevelItem = {id: 'active', label: 'Active', href: '/active'};

// OK - a second-level item can carry an asset
const secondLevelItemWithAsset: SidenavSecondLevelItem = {
    id: 'active',
    label: 'Active',
    asset: IconHomeRegular,
    href: '/active',
};

const secondLevelItemWithHiddenAsset: SidenavSecondLevelItem = {
    id: 'active',
    label: 'Active',
    asset: IconHomeRegular,
    // @ts-expect-error - only a first-level item reads showAssetWhenExpanded
    showAssetWhenExpanded: false,
    href: '/active',
};

const secondLevelItemWithChildren: SidenavSecondLevelItem = {
    id: 'active',
    label: 'Active',
    // @ts-expect-error - a second-level item cannot have children
    children: [secondLevelItem],
};

// OK - a first-level parent item with second-level items
const parentItem: SidenavFirstLevelItem = {
    id: 'projects',
    label: 'Projects',
    asset: IconHomeRegular,
    children: [secondLevelItem, secondLevelItemWithAsset],
};

// @ts-expect-error - an item that has no children needs exactly one of href, to, and onPress
const itemWithoutChildrenAndWithoutNavigation: SidenavFirstLevelItem = {
    id: 'home',
    label: 'Home',
    asset: IconHomeRegular,
};

// @ts-expect-error - an item takes one navigation prop, and not two
const itemWithTwoNavigationProps: SidenavFirstLevelItem = {
    id: 'home',
    label: 'Home',
    asset: IconHomeRegular,
    href: '/',
    to: '/home',
};

// @ts-expect-error - a parent item cannot navigate
const parentItemThatNavigates: SidenavFirstLevelItem = {
    id: 'projects',
    label: 'Projects',
    asset: IconHomeRegular,
    children: [secondLevelItem],
    href: '/projects',
};

// @ts-expect-error - a second-level item always navigates
const secondLevelItemWithoutNavigation: SidenavSecondLevelItem = {id: 'active', label: 'Active'};

const section: SidenavSection = {
    title: 'Workspace',
    items: [
        firstLevelItem,
        firstLevelItemWithHiddenAsset,
        parentItem,
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

// OK - one colour paints the whole sidenav
const barWithBackground: SidenavBarProps = {background: '#ff0000'};

// @ts-expect-error - the background takes one colour, and not one colour per region
const barWithBackgroundPerRegion: SidenavBarProps = {background: {header: '#ff0000', body: '#00ff00'}};

export {
    firstLevelItemWithoutAsset,
    secondLevelItemWithHiddenAsset,
    secondLevelItemWithChildren,
    itemWithoutChildrenAndWithoutNavigation,
    itemWithTwoNavigationProps,
    parentItemThatNavigates,
    secondLevelItemWithoutNavigation,
    entries,
    barWithBackground,
    barWithBackgroundPerRegion,
};
