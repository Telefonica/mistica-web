'use client';
import * as React from 'react';
import {useSidenavBarContext} from './sidenav-bar-context';
import {SidenavRow, useSidenavNavigation} from './sidenav-bar-row';

import type {SidenavRowPlacement} from './sidenav-bar-row';
import type {DataAttributes} from './utils/types';
import type {SidenavAsset, SidenavSecondLevelItem as SidenavSecondLevelItemData} from './sidenav-bar-types';

/** A second-level row never stands on the rail: it stands in the accordion of its parent, or in a panel. */
type SidenavSecondLevelPlacement = Exclude<SidenavRowPlacement, 'rail'>;

type SidenavSecondLevelItemProps = {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Display text. A text longer than the row wraps over several lines, and it never truncates. */
    label: string;
    /** Icon component or element. The collapsed rail never shows a second-level row, so it is optional. */
    asset?: SidenavAsset;
    /** Custom content on the right side (e.g., Badge). */
    rightSlot?: React.ReactNode;
    /**
     * Where the row stands. The accordion of its parent opens in place and moves with the bar; a panel
     * (the dialog panel, or the second column) never moves with it. The context alone cannot tell the two
     * apart, so the parent names the place.
     */
    placement: SidenavSecondLevelPlacement;
    onPress?: () => void;
    href?: string;
    to?: string;
    /** Open link in new tab. @default false */
    newTab?: boolean;
    /** Called after navigation. */
    onNavigate?: () => void | Promise<void>;
    dataAttributes?: DataAttributes;
};

/**
 * A second-level item. It always navigates, and it never has children of its own, so it holds no state:
 * it reads the current selection and renders one row.
 */
const SidenavSecondLevelItem = ({
    id,
    label,
    asset,
    rightSlot,
    placement,
    dataAttributes,
    ...navigationProps
}: SidenavSecondLevelItemProps): JSX.Element => {
    const {selectedItemId} = useSidenavBarContext();
    const navigation = useSidenavNavigation(id, navigationProps);
    const selected = selectedItemId === id;

    return (
        <div role="listitem">
            <SidenavRow
                id={id}
                label={label}
                asset={asset}
                rightSlot={rightSlot}
                showBackground={selected}
                showAccent={selected}
                current={selected}
                // A row of the accordion moves with the bar like the row of its parent: it folds and fades,
                // and its label keeps its width. Without this, the labels re-wrap as the rail narrows, the
                // rows grow, and the accordion bounces while it folds. A row of a panel never moves.
                placement={placement}
                navigation={navigation}
                dataAttributes={dataAttributes}
            />
        </div>
    );
};

/**
 * Renders a second-level item from its data. The accordion of a parent item, the dialog panel and the second
 * column list the same items, so this is the one place that maps the data to the props of the row.
 */
const renderSidenavSecondLevelItem = (
    item: SidenavSecondLevelItemData,
    {placement}: {placement: SidenavSecondLevelPlacement}
): React.ReactElement => (
    <SidenavSecondLevelItem
        key={item.id}
        id={item.id}
        label={item.label}
        asset={item.asset}
        rightSlot={item.rightSlot}
        placement={placement}
        href={item.href}
        to={item.to}
        onPress={item.onPress}
        newTab={item.newTab}
        onNavigate={item.onNavigate}
    />
);

export {SidenavSecondLevelItem, renderSidenavSecondLevelItem};
