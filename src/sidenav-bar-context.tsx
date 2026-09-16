'use client';
import * as React from 'react';

import type {SidenavCollapseState} from './sidenav-bar-types';

type SidenavBarContextValue = {
    /** Target collapsed state. It flips at the first frame of the motion. */
    collapsed: boolean;
    /** Phase of the collapse motion, for the parts of a row that must wait until the rail rests. */
    collapseState: SidenavCollapseState;
    /** True when every movement of the sidenav takes zero time. See `useIsMotionOff`. */
    isMotionOff: boolean;
    doublePanel: boolean;
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
    selectedItemId: string | null;
};

const SidenavBarContext = React.createContext<SidenavBarContextValue>({
    collapsed: false,
    collapseState: 'expanded',
    isMotionOff: false,
    doublePanel: false,
    panelOpenForItemId: null,
    setPanelOpenForItemId: () => {},
    selectItemAndClosePanel: () => {},
    containerRef: React.createRef(),
    selectedItemId: null,
});

const useSidenavBarContext = (): SidenavBarContextValue => React.useContext(SidenavBarContext);

export {SidenavBarContext, useSidenavBarContext};
