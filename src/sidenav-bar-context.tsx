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
    /**
     * The first-level item whose children show in the sub menu: the second column in double panel mode,
     * or the dialog panel of the collapsed rail. Only one of the two forms shows at a time.
     */
    subMenuOpenForItemId: string | null;
    setSubMenuOpenForItemId: (id: string | null) => void;
    /**
     * The press of an item that navigates: it closes the open sub menu, then it reports the item as the
     * new selection. One call does both, because the selection alone would reopen the second column that
     * the press just closed. The item passes `null` when it has no id.
     */
    selectItemAndCloseSubMenu: (itemId: string | null) => void;
    containerRef: React.RefObject<HTMLElement | null>;
    /** True for an item that renders inside the sub menu (the second column or the dialog panel). */
    isInsideSubMenu: boolean;
    selectedItemId: string | null;
};

const SidenavBarContext = React.createContext<SidenavBarContextValue>({
    collapsed: false,
    collapsedSettled: false,
    collapsible: true,
    doublePanel: false,
    toggleCollapsed: () => {},
    subMenuOpenForItemId: null,
    setSubMenuOpenForItemId: () => {},
    selectItemAndCloseSubMenu: () => {},
    containerRef: React.createRef(),
    isInsideSubMenu: false,
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
 * Tells an item that its list item already exists, so it renders none of its own. A stand-alone entry of
 * the first level carries the rail of the items on a wrapper of its own, and that wrapper is the list
 * item of the body list. Two nested list items would report one entry instead of two.
 */
const SidenavHasOuterListItemContext = React.createContext<boolean>(false);

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
    SidenavHasOuterListItemContext,
    hasDescendantWithId,
};
export type {SidenavBarContextValue};
