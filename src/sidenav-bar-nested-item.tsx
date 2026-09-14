'use client';
import * as React from 'react';
import {NESTING_INDENT} from './sidenav-bar.css';
import {useSidenavBarContext} from './sidenav-bar-context';
import {SidenavRow, useSidenavNavigation} from './sidenav-bar-row';

import type {DataAttributes} from './utils/types';
import type {SidenavAsset} from './sidenav-bar-types';

type SidenavNestedItemProps = {
    /** Unique identifier for selection tracking. */
    id: string;
    /** Display text. A text longer than the row wraps over several lines, and it never truncates. */
    label: string;
    /** Icon component or element. The collapsed rail never shows a nested row, so it is optional. */
    asset?: SidenavAsset;
    /** Custom content on the right side (e.g., Badge). */
    rightSlot?: React.ReactNode;
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
const SidenavNestedItem = ({
    id,
    label,
    asset,
    rightSlot,
    dataAttributes,
    ...navigationProps
}: SidenavNestedItemProps): JSX.Element => {
    const {selectedItemId, isInsidePanel} = useSidenavBarContext();
    const navigation = useSidenavNavigation(id, navigationProps);
    const selected = selectedItemId === id;

    // A panel lists the children as its own rows, so they start at the edge like a first-level row.
    const indent = isInsidePanel ? 0 : NESTING_INDENT;

    return (
        <div role="listitem">
            <SidenavRow
                id={id}
                label={label}
                asset={asset}
                rightSlot={rightSlot}
                indent={indent}
                showBackground={selected}
                showAccent={selected}
                current={selected}
                navigation={navigation}
                dataAttributes={dataAttributes}
            />
        </div>
    );
};

export {SidenavNestedItem};
export type {SidenavNestedItemProps};
