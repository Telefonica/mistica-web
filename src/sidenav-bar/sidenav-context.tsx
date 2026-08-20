'use client';
import * as React from 'react';

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

type SidenavBarContextValue = {
    collapsed: boolean;
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

export {SidenavBarContext, useSidenavBarContext, SidenavLevelContext, assertChildrenAre, hasDescendantWithId};
export type {SidenavBarContextValue};
