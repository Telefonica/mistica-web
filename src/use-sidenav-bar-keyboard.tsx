'use client';
import * as React from 'react';

/**
 * Keyboard interaction of the sidenav, split in two parts:
 *
 *   - `useSidenavRailKeyboard` runs on the `<nav>` and moves the focus between the items of the rail. It
 *     also carries the focus into an open dialog panel, because that panel lives in a portal, so the
 *     browser would otherwise skip it, and it answers the keys of the second column, which takes the focus
 *     when it opens and belongs to no item of the rail.
 *   - `useDialogPanelKeyboard` runs on the dialog panel. It keeps the focus inside the panel, and it
 *     returns the focus to the trigger once the panel closes.
 *
 * The spec asks for this key map:
 *   ArrowUp / ArrowDown   move between items
 *   Home / End            first / last item
 *   ArrowRight            expand a closed parent, or step into the group of an open one
 *   ArrowLeft             collapse an open parent, or move to the parent from a child
 *   Tab                   an item, then the children that it opened, then the next item
 *   Escape                close the dialog panel (owned by the panel itself)
 *
 * The arrow keys and Tab travel two different sequences. The arrows keep to one level: the rail, or the
 * panel that the user stepped into. Tab reads the whole tree in the order of the spec, which the document
 * does not carry: the floating panel lives in a portal, and the second column comes after the whole rail.
 */

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const escapeAttributeValue = (value: string): string =>
    typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(value) : value.replace(/"/g, '\\"');

const toFocusables = (rows: Array<HTMLElement>): Array<HTMLElement> =>
    rows
        .map((row) => row.querySelector<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element): element is HTMLElement => element !== null);

/** The interactive element of every visible item row inside `root`, in visual order. */
const getItemFocusables = (root: HTMLElement | null): Array<HTMLElement> =>
    root ? toFocusables(Array.from(root.querySelectorAll<HTMLElement>('[data-sidenav-item-id]'))) : [];

/**
 * The items of the rail alone. The second column stands inside the same landmark, and its rows come after
 * every row of the rail in the document, so they would otherwise land at the end of this sequence. The
 * panel of an item is a sequence of its own, and the keys below weave it in after its trigger.
 */
const getRailFocusables = (root: HTMLElement | null): Array<HTMLElement> => {
    if (!root) {
        return [];
    }
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-sidenav-item-id]')).filter(
        (row) => !row.closest('[data-sidenav-double-panel]')
    );
    return toFocusables(rows);
};

/** The interactive element of the row of an item of the rail. */
const getRailFocusable = (itemId: string, container: HTMLElement): HTMLElement | null => {
    const row = container.querySelector<HTMLElement>(
        `[data-sidenav-item-id="${escapeAttributeValue(itemId)}"]`
    );
    return row?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
};

/**
 * The item of the rail that follows the trigger of a panel. The last item of that panel steps to it, so
 * the sequence of the keyboard reads item 1, its children, item 2, as the spec of the reading order asks.
 */
const getRailFocusableAfter = (triggerItemId: string, container: HTMLElement): HTMLElement | null => {
    const trigger = getRailFocusable(triggerItemId, container);
    if (!trigger) {
        return null;
    }
    const rail = getRailFocusables(container);
    return rail[rail.indexOf(trigger) + 1] ?? null;
};

/** The dialog panel that the focused trigger opens, when one is open. */
const getOpenDialogPanel = (trigger: HTMLElement): HTMLElement | null => {
    if (trigger.getAttribute('aria-expanded') !== 'true') {
        return null;
    }
    const row = trigger.closest('[data-sidenav-item-id]');
    const itemId = row?.getAttribute('data-sidenav-item-id');
    if (!itemId) {
        return null;
    }
    return document.querySelector<HTMLElement>(
        `[data-sidenav-dialog-panel="${escapeAttributeValue(itemId)}"]`
    );
};

/** The second column that the trigger opened, when that column stands open. */
const getOpenDoublePanel = (trigger: HTMLElement, container: HTMLElement): HTMLElement | null => {
    const itemId = trigger.closest('[data-sidenav-item-id]')?.getAttribute('data-sidenav-item-id');
    if (!itemId) {
        return null;
    }
    return container.querySelector<HTMLElement>(
        `[data-sidenav-double-panel="${escapeAttributeValue(itemId)}"]`
    );
};

/** The group of children that the trigger opened in place, when that group stands open. */
const getOpenNestedList = (trigger: HTMLElement, container: HTMLElement): HTMLElement | null => {
    const itemId = trigger.closest('[data-sidenav-item-id]')?.getAttribute('data-sidenav-item-id');
    if (!itemId) {
        return null;
    }
    return container.querySelector<HTMLElement>(
        `[data-sidenav-nested-list-for="${escapeAttributeValue(itemId)}"]`
    );
};

/** The trigger of the group that holds `child`, when `child` is a nested item. */
const getParentTrigger = (child: HTMLElement, container: HTMLElement): HTMLElement | null => {
    const nestedList = child.closest('[data-sidenav-nested-list-for]');
    const parentId = nestedList?.getAttribute('data-sidenav-nested-list-for');
    if (!parentId) {
        return null;
    }
    const parentRow = container.querySelector<HTMLElement>(
        `[data-sidenav-item-id="${escapeAttributeValue(parentId)}"]`
    );
    return parentRow?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
};

/**
 * Moves the focus between the items of the rail. It reads the state of each item from the DOM
 * (`aria-expanded`, the nesting markers), so it needs no knowledge of the data behind the sidenav.
 */
const useSidenavRailKeyboard = (
    containerRef: React.RefObject<HTMLElement | null>,
    /**
     * Carries the id of the parent whose column must open on its first item, instead of on the column
     * itself. ArrowRight fills it, because that press opens the column and steps into it at once.
     */
    openColumnOnFirstItemRef: React.MutableRefObject<string | null>
): ((event: React.KeyboardEvent) => void) =>
    React.useCallback(
        (event: React.KeyboardEvent) => {
            const container = containerRef.current;
            if (!container) {
                return;
            }
            const active = document.activeElement as HTMLElement | null;
            if (!active) {
                return;
            }

            // The second column stands inside the landmark, so this handler owns its keys as well. The
            // column and its rows form a sequence of their own, which the rail weaves in after the trigger
            // that opened it.
            const column = active.closest<HTMLElement>('[data-sidenav-double-panel]');
            if (column) {
                const columnItemId = column.getAttribute('data-sidenav-double-panel') ?? '';
                const trigger = getRailFocusable(columnItemId, container);
                const columnItems = getItemFocusables(column);
                // The column itself holds the focus right after it opens, and it belongs to none of its
                // rows, so it stands before the first one.
                const columnIndex = active === column ? -1 : columnItems.indexOf(active);

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault();
                        columnItems[Math.min(columnIndex + 1, columnItems.length - 1)]?.focus();
                        return;
                    // The column stays open when the focus steps out of it: it is a column of the bar, and
                    // not a floating panel that hides what stands behind it.
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        event.preventDefault();
                        if (event.key === 'ArrowUp' && columnIndex > 0) {
                            columnItems[columnIndex - 1].focus();
                            return;
                        }
                        trigger?.focus();
                        return;
                    case 'ArrowRight':
                        event.preventDefault();
                        if (columnIndex === -1) {
                            columnItems[0]?.focus();
                        }
                        return;
                    case 'Home':
                        event.preventDefault();
                        columnItems[0]?.focus();
                        return;
                    case 'End':
                        event.preventDefault();
                        columnItems[columnItems.length - 1]?.focus();
                        return;
                    // Tab reads the sequence of the spec: the last row of the column steps to the item that
                    // follows its trigger on the rail, and the first row steps back to that trigger.
                    case 'Tab': {
                        event.preventDefault();
                        if (event.shiftKey) {
                            (columnIndex > 0 ? columnItems[columnIndex - 1] : trigger)?.focus();
                            return;
                        }
                        const next =
                            columnIndex < columnItems.length - 1
                                ? columnItems[columnIndex + 1]
                                : getRailFocusableAfter(columnItemId, container);
                        next?.focus();
                        return;
                    }
                    default:
                        return;
                }
            }

            // The header holds the collapse action, which also carries `aria-expanded`, so the handler runs
            // only when the focus rests on an item. Otherwise ArrowLeft on the collapse action would toggle
            // the whole sidenav.
            if (!active.closest('[data-sidenav-item-id]')) {
                return;
            }

            const items = getRailFocusables(container);
            const index = items.indexOf(active);

            switch (event.key) {
                // ArrowUp and ArrowDown travel the rail alone. An open dialog panel stays open and keeps
                // its place while the focus passes its trigger, so the user reads the rail without losing
                // the panel. Tab is the key that steps into that panel.
                case 'ArrowDown': {
                    event.preventDefault();
                    if (index >= 0 && index < items.length - 1) {
                        items[index + 1].focus();
                    }
                    return;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    if (index > 0) {
                        items[index - 1].focus();
                    }
                    return;
                }
                case 'Home': {
                    event.preventDefault();
                    items[0]?.focus();
                    return;
                }
                case 'End': {
                    event.preventDefault();
                    items[items.length - 1]?.focus();
                    return;
                }
                // ArrowRight opens a closed parent, and it steps into the group of a parent that already
                // stands open: the floating panel of the collapsed rail, or the group that an expanded
                // sidenav opens in place. The panel itself takes the focus, and it names its group.
                case 'ArrowRight': {
                    if (active.getAttribute('aria-expanded') === 'false') {
                        event.preventDefault();
                        // One press opens the group and steps into it. The column does not exist yet, so
                        // the id travels to the effect that gives it the focus.
                        const itemId = active
                            .closest('[data-sidenav-item-id]')
                            ?.getAttribute('data-sidenav-item-id');
                        openColumnOnFirstItemRef.current = itemId ?? null;
                        active.click();
                        return;
                    }
                    // The floating panel takes the focus itself, because it hides the rail behind it and
                    // the user needs to hear which group they entered. The second column stands beside the
                    // rail and already announced itself when it opened, so ArrowRight goes straight to its
                    // first item, as it does for a group that opens in place.
                    const dialogPanel = getOpenDialogPanel(active);
                    if (dialogPanel) {
                        event.preventDefault();
                        dialogPanel.focus();
                        return;
                    }
                    const column = getOpenDoublePanel(active, container);
                    if (column) {
                        event.preventDefault();
                        getItemFocusables(column)[0]?.focus();
                        return;
                    }
                    const nestedList = getOpenNestedList(active, container);
                    if (nestedList) {
                        event.preventDefault();
                        getItemFocusables(nestedList)[0]?.focus();
                    }
                    return;
                }
                case 'ArrowLeft': {
                    if (active.getAttribute('aria-expanded') === 'true') {
                        event.preventDefault();
                        active.click();
                        return;
                    }
                    const parent = getParentTrigger(active, container);
                    if (parent) {
                        event.preventDefault();
                        parent.focus();
                    }
                    return;
                }
                // Tab reads the sequence of the spec: an item, then the children that it opened, then the
                // next item. Neither panel stands there in the document — the floating one lives in a
                // portal, and the column comes after the whole rail — so both directions move by hand.
                case 'Tab': {
                    if (!event.shiftKey) {
                        const panel = getOpenDialogPanel(active) ?? getOpenDoublePanel(active, container);
                        if (panel) {
                            event.preventDefault();
                            getItemFocusables(panel)[0]?.focus();
                        }
                        return;
                    }
                    // Backwards, the item that follows a trigger steps to the last child of that trigger.
                    const previous = index > 0 ? items[index - 1] : null;
                    if (!previous) {
                        return;
                    }
                    const previousPanel =
                        getOpenDialogPanel(previous) ?? getOpenDoublePanel(previous, container);
                    const lastChild = getItemFocusables(previousPanel).pop();
                    if (lastChild) {
                        event.preventDefault();
                        lastChild.focus();
                    }
                    return;
                }
                default:
                    return;
            }
        },
        [containerRef, openColumnOnFirstItemRef]
    );

type DialogPanelKeyboardArgs = {
    panelElement: HTMLElement | null;
    containerRef: React.RefObject<HTMLElement | null>;
    itemId: string;
    /** The panel stays hidden until it knows where it stands, and a hidden element takes no focus. */
    isPositioned: boolean;
    /** Closes the panel. The focus returns to the trigger on its own, as it does after Escape. */
    onClose: () => void;
};

/**
 * Moves the focus into the panel when it opens, keeps it there, and returns it to the trigger once the
 * panel closes.
 *
 * The panel opens in a portal, at the end of the document, so a screen reader that reads the page in order
 * never reaches it from the trigger. The focus therefore travels to the panel itself, whatever opened it: a
 * press of the mouse, of the keyboard, or of a screen reader. The panel carries `role="group"` and a name,
 * so the user hears which group they entered before they hear its first item.
 *
 * ArrowDown and Tab move from the panel to its first item and then between the items. ArrowLeft, and
 * ArrowUp on the first item, close the panel and return to the trigger: the user leaves the group the way
 * they left an accordion, and the rail shows where they stand. Escape closes the panel through the document listener of `sidenav-panel.tsx`, which unmounts the
 * panel, and the restore below then returns the focus.
 */
const useDialogPanelKeyboard = ({
    panelElement,
    containerRef,
    itemId,
    isPositioned,
    onClose,
}: DialogPanelKeyboardArgs): void => {
    const triggerRef = React.useRef<HTMLElement | null>(null);
    // The listener below reads the callback from a ref, so a new callback on every render of the panel
    // does not detach and attach that listener again.
    const onCloseRef = React.useRef(onClose);
    onCloseRef.current = onClose;

    React.useEffect(() => {
        const row = containerRef.current?.querySelector(
            `[data-sidenav-item-id="${escapeAttributeValue(itemId)}"]`
        );
        triggerRef.current = row?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
    }, [containerRef, itemId, panelElement]);

    // Both the open and the close of the panel replace the trigger row in the DOM, because the collapsed
    // rail drops the tooltips of the rail while the panel is open and wraps the row again once it goes. Each
    // replacement destroys the node that held the focus, so the browser sends the focus back to the document
    // body. This re-reads the fresh trigger from the DOM one frame later and returns the focus to it, but
    // only when the focus rests on the body, so a focus that the user moved elsewhere stays where it is.
    const restoreFocusToTrigger = React.useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const restoreFocus = () => {
            const active = document.activeElement;
            if (active && active !== document.body) {
                return;
            }
            const row = container.querySelector(`[data-sidenav-item-id="${escapeAttributeValue(itemId)}"]`);
            row?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
        };
        if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(restoreFocus);
        } else {
            restoreFocus();
        }
    }, [containerRef, itemId]);

    // The panel itself takes the focus as soon as it stands where it belongs, and not its first item: a
    // screen reader then announces the group and its name, which tells the user where the panel took them.
    // Opening the panel also drops the tooltips of the rail, which replaces the trigger row and drops the
    // focus that the press left on it, so the focus would otherwise fall to the body.
    React.useEffect(() => {
        if (!panelElement || !isPositioned) {
            return;
        }
        panelElement.focus();
    }, [panelElement, isPositioned]);

    // The panel returns the focus to the trigger once it closes as well, because the rail wraps the row in a
    // tooltip again and replaces the node that held the focus.
    React.useEffect(() => () => restoreFocusToTrigger(), [restoreFocusToTrigger]);

    React.useEffect(() => {
        if (!panelElement) {
            return;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            const focusables = getItemFocusables(panelElement);
            if (focusables.length === 0) {
                return;
            }
            const active = document.activeElement as HTMLElement | null;
            const index = active ? focusables.indexOf(active) : -1;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    focusables[Math.min(index + 1, focusables.length - 1)]?.focus();
                    return;
                // The top of the panel and ArrowLeft both lead out of the group: the panel closes, and the
                // restore effect above returns the focus to the trigger, as it does after Escape.
                case 'ArrowLeft':
                    event.preventDefault();
                    onCloseRef.current();
                    return;
                case 'ArrowUp':
                    event.preventDefault();
                    if (index <= 0) {
                        onCloseRef.current();
                        return;
                    }
                    focusables[index - 1].focus();
                    return;
                case 'Home':
                    event.preventDefault();
                    focusables[0].focus();
                    return;
                case 'End':
                    event.preventDefault();
                    focusables[focusables.length - 1].focus();
                    return;
                // Tab reads the sequence of the spec: the trigger, the children of the panel, then the item
                // that follows the trigger on the rail. The panel itself holds the focus right after it
                // opens, and it belongs to no item of its list, so it stands before the first one.
                case 'Tab': {
                    event.preventDefault();
                    if (event.shiftKey) {
                        (index > 0 ? focusables[index - 1] : triggerRef.current)?.focus();
                        return;
                    }
                    if (index < focusables.length - 1) {
                        focusables[index + 1].focus();
                        return;
                    }
                    const container = containerRef.current;
                    if (container) {
                        getRailFocusableAfter(itemId, container)?.focus();
                    }
                    return;
                }
                default:
                    // Escape closes the panel through the document listener of `sidenav-panel.tsx`, and the
                    // restore effect above returns the focus to the trigger once the panel unmounts.
                    return;
            }
        };

        panelElement.addEventListener('keydown', handleKeyDown);
        return () => panelElement.removeEventListener('keydown', handleKeyDown);
    }, [panelElement, containerRef, itemId]);
};

export {useSidenavRailKeyboard, useDialogPanelKeyboard};
