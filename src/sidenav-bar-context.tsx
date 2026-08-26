'use client';
import * as React from 'react';

type SidenavBarContextValue = {
    collapsed: boolean;
    /**
     * The collapsed state, reported only once the movement of the rail ended. It drives the parts of the
     * row of an item that appear and disappear instead of moving, and above all the tooltip of the
     * collapsed rail: that tooltip wraps the row, so its arrival replaces the row in the DOM, and a
     * replaced node starts at its final style instead of animating. Reading the settled state keeps the
     * row untouched for the whole movement, and changes it when nothing moves any more.
     */
    collapsedSettled: boolean;
    collapsible: boolean;
    doublePanel: boolean;
    toggleCollapsed: () => void;
    panelOpenForItemId: string | null;
    setPanelOpenForItemId: (id: string | null) => void;
    /**
     * Closes the open panel, and marks `selectionId` as the selection that must not reopen the second
     * column. A press on an item closes the column and moves the selection at the same time, and the
     * selection alone would otherwise reopen the column that the press just closed.
     */
    closePanelForSelection: (selectionId: string | null) => void;
    containerRef: React.RefObject<HTMLElement | null>;
    isInsidePanel: boolean;
    selectedItemId: string | null;
    onSelectedItemIdChange?: (id: string | null) => void;
};

const SidenavBarContext = React.createContext<SidenavBarContextValue>({
    collapsed: false,
    collapsedSettled: false,
    collapsible: true,
    doublePanel: false,
    toggleCollapsed: () => {},
    panelOpenForItemId: null,
    setPanelOpenForItemId: () => {},
    closePanelForSelection: () => {},
    containerRef: React.createRef(),
    isInsidePanel: false,
    selectedItemId: null,
});

const useSidenavBarContext = (): SidenavBarContextValue => React.useContext(SidenavBarContext);

/** Nesting level of the items. Level 0 is the top level. */
const SidenavLevelContext = React.createContext<number>(0);

/**
 * Position of an item among the first-level entries of the body, which gives the delay of its label
 * fade. A nested item inherits the position of its parent, which never shows on screen: the collapsed
 * rail closes every group.
 */
const SidenavItemIndexContext = React.createContext<number>(0);

/**
 * `React.ReactElement<Props>` cannot express these constraints, because every JSX expression is
 * typed as `ReactElement<any, any>` and therefore satisfies any props type. Comparing against the
 * component reference at runtime does work, so it is checked in development instead.
 */
const assertChildrenAre = (children: React.ReactNode, expected: React.ElementType, message: string): void => {
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type !== expected) {
            console.error(message);
        }
    });
};

/** Check if any descendant SidenavItem has the given ID */
const hasDescendantWithId = (children: React.ReactNode, targetId: string | null): boolean => {
    if (!targetId) return false;

    let found = false;
    const search = (node: React.ReactNode): void => {
        React.Children.forEach(node, (child) => {
            if (found) return;
            if (React.isValidElement(child)) {
                const props = child.props as {id?: string; children?: React.ReactNode};
                if (props.id === targetId) {
                    found = true;
                    return;
                }
                if (props.children) {
                    search(props.children);
                }
            }
        });
    };

    search(children);
    return found;
};

export {
    SidenavBarContext,
    useSidenavBarContext,
    SidenavLevelContext,
    SidenavItemIndexContext,
    assertChildrenAre,
    hasDescendantWithId,
};
export type {SidenavBarContextValue};
