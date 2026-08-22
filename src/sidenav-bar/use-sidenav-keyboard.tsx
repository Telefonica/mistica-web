'use client';
import * as React from 'react';

/**
 * Keyboard interaction of the sidenav, split in two parts:
 *
 *   - `useSidenavRailKeyboard` runs on the `<nav>` and moves the focus between the items of the rail. It
 *     also carries the focus into an open dialog panel, because that panel lives in a portal, so the
 *     browser would otherwise skip it.
 *   - `useDialogPanelKeyboard` runs on the dialog panel. It keeps the focus inside the panel, and it
 *     returns the focus to the trigger once the panel closes.
 *
 * The spec asks for this key map:
 *   ArrowUp / ArrowDown   move between items
 *   Home / End            first / last item
 *   ArrowRight            expand a closed parent
 *   ArrowLeft             collapse an open parent, or move to the parent from a child
 *   Tab / ArrowDown       carry the focus into an open dialog panel
 *   Escape                close the dialog panel (owned by the panel itself)
 */

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const escapeAttributeValue = (value: string): string =>
    typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(value) : value.replace(/"/g, '\\"');

/** The interactive element of every visible item row inside `root`, in visual order. */
const getItemFocusables = (root: HTMLElement | null): Array<HTMLElement> => {
    if (!root) {
        return [];
    }
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-sidenav-item-id]'));
    return rows
        .map((row) => row.querySelector<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element): element is HTMLElement => element !== null);
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
    containerRef: React.RefObject<HTMLElement | null>
): ((event: React.KeyboardEvent) => void) =>
    React.useCallback(
        (event: React.KeyboardEvent) => {
            const container = containerRef.current;
            if (!container) {
                return;
            }
            const active = document.activeElement as HTMLElement | null;
            // The header holds the collapse action, which also carries `aria-expanded`, so the handler runs
            // only when the focus rests on an item. Otherwise ArrowLeft on the collapse action would toggle
            // the whole sidenav.
            if (!active || !active.closest('[data-sidenav-item-id]')) {
                return;
            }

            const items = getItemFocusables(container);
            const index = items.indexOf(active);

            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    const panel = getOpenDialogPanel(active);
                    if (panel) {
                        getItemFocusables(panel)[0]?.focus();
                        return;
                    }
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
                case 'ArrowRight': {
                    if (active.getAttribute('aria-expanded') === 'false') {
                        event.preventDefault();
                        active.click();
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
                case 'Tab': {
                    // A forward Tab from a trigger enters its open dialog panel, which the portal would
                    // otherwise place after the whole document. A backward Tab keeps its native behavior.
                    if (event.shiftKey) {
                        return;
                    }
                    const panel = getOpenDialogPanel(active);
                    if (panel) {
                        event.preventDefault();
                        getItemFocusables(panel)[0]?.focus();
                    }
                    return;
                }
                default:
                    return;
            }
        },
        [containerRef]
    );

type DialogPanelKeyboardArgs = {
    panelElement: HTMLElement | null;
    containerRef: React.RefObject<HTMLElement | null>;
    itemId: string;
};

/**
 * Keeps the focus on the trigger while the panel opens, keeps it inside the panel once the user steps in,
 * and returns it to the trigger once the panel closes.
 *
 * The open and the close both replace the trigger row in the DOM, so the focus needs a restore on each
 * end. ArrowDown and Tab move between the items of the panel, and ArrowUp above the first item returns to
 * the trigger. Escape closes the panel through the document listener of `sidenav-panel.tsx`, which unmounts
 * the panel, and the restore below then returns the focus.
 */
const useDialogPanelKeyboard = ({panelElement, containerRef, itemId}: DialogPanelKeyboardArgs): void => {
    const triggerRef = React.useRef<HTMLElement | null>(null);

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

    // Opening the panel drops the tooltips of the rail, which replaces the trigger row and drops the focus
    // that the press left on it. The panel node appears one render after the panel mounts, so this returns
    // the focus to the fresh trigger as soon as that node exists.
    React.useEffect(() => {
        if (!panelElement) {
            return;
        }
        restoreFocusToTrigger();
    }, [panelElement, restoreFocusToTrigger]);

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
                case 'ArrowUp':
                    event.preventDefault();
                    if (index <= 0) {
                        triggerRef.current?.focus();
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
                case 'Tab': {
                    event.preventDefault();
                    const step = event.shiftKey ? -1 : 1;
                    const next = (index + step + focusables.length) % focusables.length;
                    focusables[next].focus();
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
    }, [panelElement]);
};

export {useSidenavRailKeyboard, useDialogPanelKeyboard};
