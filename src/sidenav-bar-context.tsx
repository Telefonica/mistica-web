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
    /** The first-level item whose children show in the panel. One panel opens at a time. */
    panelOpenForItemId: string | null;
    setPanelOpenForItemId: (id: string | null) => void;
    /**
     * The press of an item that navigates: it closes the open panel, then it reports the item as the
     * new selection. One call does both, because the selection alone would reopen the second column that
     * the press just closed. The item passes `null` when it has no id.
     */
    selectItemAndClosePanel: (itemId: string | null) => void;
    containerRef: React.RefObject<HTMLElement | null>;
    /** True for an item that renders inside the panel (the second column or the dialog panel). */
    isInsidePanel: boolean;
    selectedItemId: string | null;
};

const SidenavBarContext = React.createContext<SidenavBarContextValue>({
    collapsed: false,
    collapsedSettled: false,
    collapsible: true,
    doublePanel: false,
    toggleCollapsed: () => {},
    panelOpenForItemId: null,
    setPanelOpenForItemId: () => {},
    selectItemAndClosePanel: () => {},
    containerRef: React.createRef(),
    isInsidePanel: false,
    selectedItemId: null,
});

const useSidenavBarContext = (): SidenavBarContextValue => React.useContext(SidenavBarContext);

export {SidenavBarContext, useSidenavBarContext};
export type {SidenavBarContextValue};
