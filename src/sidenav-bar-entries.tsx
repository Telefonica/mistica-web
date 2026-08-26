'use client';
import * as React from 'react';
import * as styles from './sidenav-bar.css';
import {SidenavItem} from './sidenav-bar-item';
import {SidenavSection} from './sidenav-bar-section';
import {isSidenavSection} from './sidenav-bar-types';
import {SidenavItemIndexContext} from './sidenav-bar-context';

import type {SidenavEntry, SidenavItem as SidenavItemType} from './sidenav-bar-types';

const renderSidenavItemFromData = (item: SidenavItemType): React.ReactElement => {
    const children = item.children?.map((child) => renderSidenavItemFromData(child));
    const baseProps = {
        id: item.id,
        label: item.label,
        asset: item.asset,
        showIconWhenExpanded: item.showIconWhenExpanded,
        rightSlot: item.rightSlot,
        defaultOpen: item.defaultOpen,
        newTab: item.newTab,
        onNavigate: item.onNavigate,
        children,
    };

    if (item.href !== undefined) {
        return <SidenavItem key={item.id} {...(baseProps as any)} href={item.href} />;
    }
    if (item.to !== undefined) {
        return <SidenavItem key={item.id} {...(baseProps as any)} to={item.to} />;
    }
    if (item.onPress !== undefined) {
        return <SidenavItem key={item.id} {...(baseProps as any)} onPress={item.onPress} />;
    }
    return <SidenavItem key={item.id} {...(baseProps as any)} />;
};

/** The items of the first level, in order: the items of every section, and every stand-alone item. */
const getFirstLevelItems = (entries: ReadonlyArray<SidenavEntry>): Array<SidenavItemType> =>
    entries.flatMap((entry) => (isSidenavSection(entry) ? [...entry.items] : [entry as SidenavItemType]));

/**
 * Finds the first-level item that owns the given child id. The sidenav supports a single nesting
 * level, so the parent of an item is always a first-level item.
 */
const findParentOfItem = (
    entries: ReadonlyArray<SidenavEntry>,
    childId: string
): SidenavItemType | undefined =>
    getFirstLevelItems(entries).find((item) => item.children?.some((child) => child.id === childId));

/** Finds a first-level item by id. Only these items can open a panel. */
const findFirstLevelItem = (
    entries: ReadonlyArray<SidenavEntry>,
    itemId: string
): SidenavItemType | undefined => getFirstLevelItems(entries).find((item) => item.id === itemId);

/** Wraps an item with its position among the first-level entries, which gives the delay of its label fade. */
const withItemIndex = (item: SidenavItemType, index: number): React.ReactElement => (
    <SidenavItemIndexContext.Provider key={item.id} value={index}>
        {renderSidenavItemFromData(item)}
    </SidenavItemIndexContext.Provider>
);

const renderSidenavEntries = (entries: ReadonlyArray<SidenavEntry>): Array<React.ReactElement> => {
    // The position runs over the whole body, not over one section, so the fade travels down the sidenav.
    let itemIndex = 0;

    return entries.map((entry, entryIndex) => {
        if (isSidenavSection(entry)) {
            return (
                <SidenavSection
                    key={entry.title || `section-${entryIndex}`}
                    title={entry.title}
                    dividerTop={entry.dividerTop}
                    dividerBottom={entry.dividerBottom}
                >
                    {entry.items.map((item) => withItemIndex(item, itemIndex++))}
                </SidenavSection>
            );
        }

        return (
            <div key={entry.id} className={styles.standaloneItem}>
                {withItemIndex(entry as SidenavItemType, itemIndex++)}
            </div>
        );
    });
};

export {
    renderSidenavItemFromData,
    getFirstLevelItems,
    findParentOfItem,
    findFirstLevelItem,
    renderSidenavEntries,
};
