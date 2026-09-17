'use client';
import * as React from 'react';

/**
 * Key map of the spec:
 *   ArrowUp / ArrowDown   move between items
 *   Home / End            first / last item
 *   ArrowRight            expand a closed parent, or step into its open group
 *   ArrowLeft             collapse an open parent, or move from a child to its parent
 *   Tab                   an item, then the children it opened, then the next item
 *   Escape                close the dialog panel (handled in sidenav-bar-panel.tsx)
 *
 * Arrows stay on one level. Tab follows the reading order of the spec, which the document does not
 * carry: the dialog panel lives in a portal and the second column comes after the whole rail.
 */

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const escapeAttributeValue = (value: string): string =>
    typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(value) : value.replace(/"/g, '\\"');

const toFocusables = (rows: Array<HTMLElement>): Array<HTMLElement> =>
    rows
        .map((row) => row.querySelector<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element): element is HTMLElement => element !== null);

const getItemFocusables = (root: HTMLElement | null): Array<HTMLElement> =>
    root ? toFocusables(Array.from(root.querySelectorAll<HTMLElement>('[data-sidenav-item-id]'))) : [];

// The second column rows share the landmark. Without this filter they would end the rail sequence.
const getRailFocusables = (root: HTMLElement | null): Array<HTMLElement> => {
    if (!root) {
        return [];
    }
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-sidenav-item-id]')).filter(
        (row) => !row.closest('[data-sidenav-double-panel]')
    );
    return toFocusables(rows);
};

const getRailFocusable = (itemId: string, container: HTMLElement): HTMLElement | null => {
    const row = container.querySelector<HTMLElement>(
        `[data-sidenav-item-id="${escapeAttributeValue(itemId)}"]`
    );
    return row?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
};

const getRailFocusableAfter = (triggerItemId: string, container: HTMLElement): HTMLElement | null => {
    const trigger = getRailFocusable(triggerItemId, container);
    if (!trigger) {
        return null;
    }
    const rail = getRailFocusables(container);
    return rail[rail.indexOf(trigger) + 1] ?? null;
};

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

const getOpenDoublePanel = (trigger: HTMLElement, container: HTMLElement): HTMLElement | null => {
    const itemId = trigger.closest('[data-sidenav-item-id]')?.getAttribute('data-sidenav-item-id');
    if (!itemId) {
        return null;
    }
    return container.querySelector<HTMLElement>(
        `[data-sidenav-double-panel="${escapeAttributeValue(itemId)}"]`
    );
};

const getOpenAccordion = (trigger: HTMLElement, container: HTMLElement): HTMLElement | null => {
    const itemId = trigger.closest('[data-sidenav-item-id]')?.getAttribute('data-sidenav-item-id');
    if (!itemId) {
        return null;
    }
    return container.querySelector<HTMLElement>(
        `[data-sidenav-accordion-for="${escapeAttributeValue(itemId)}"]`
    );
};

const getParentTrigger = (child: HTMLElement, container: HTMLElement): HTMLElement | null => {
    const accordion = child.closest('[data-sidenav-accordion-for]');
    const parentId = accordion?.getAttribute('data-sidenav-accordion-for');
    if (!parentId) {
        return null;
    }
    const parentRow = container.querySelector<HTMLElement>(
        `[data-sidenav-item-id="${escapeAttributeValue(parentId)}"]`
    );
    return parentRow?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
};

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
            if (!active) {
                return;
            }

            const column = active.closest<HTMLElement>('[data-sidenav-double-panel]');
            if (column) {
                const columnItemId = column.getAttribute('data-sidenav-double-panel') ?? '';
                const trigger = getRailFocusable(columnItemId, container);
                const columnItems = getItemFocusables(column);
                const columnIndex = columnItems.indexOf(active);

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault();
                        columnItems[Math.min(columnIndex + 1, columnItems.length - 1)]?.focus();
                        return;
                    // The column is not a floating panel, so it stays open when the focus leaves it.
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
                        return;
                    case 'Home':
                        event.preventDefault();
                        columnItems[0]?.focus();
                        return;
                    case 'End':
                        event.preventDefault();
                        columnItems[columnItems.length - 1]?.focus();
                        return;
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

            // The collapse action in the header also has `aria-expanded`. ArrowLeft must not toggle it.
            if (!active.closest('[data-sidenav-item-id]')) {
                return;
            }

            const items = getRailFocusables(container);
            const index = items.indexOf(active);

            switch (event.key) {
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
                case 'ArrowRight': {
                    if (active.getAttribute('aria-expanded') === 'false') {
                        event.preventDefault();
                        // The effect that watches the open state focuses the first child.
                        active.click();
                        return;
                    }
                    const dialogPanel = getOpenDialogPanel(active);
                    if (dialogPanel) {
                        event.preventDefault();
                        getItemFocusables(dialogPanel)[0]?.focus();
                        return;
                    }
                    const column = getOpenDoublePanel(active, container);
                    if (column) {
                        event.preventDefault();
                        getItemFocusables(column)[0]?.focus();
                        return;
                    }
                    const accordion = getOpenAccordion(active, container);
                    if (accordion) {
                        event.preventDefault();
                        getItemFocusables(accordion)[0]?.focus();
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
                    if (!event.shiftKey) {
                        const panel = getOpenDialogPanel(active) ?? getOpenDoublePanel(active, container);
                        if (panel) {
                            event.preventDefault();
                            getItemFocusables(panel)[0]?.focus();
                        }
                        return;
                    }
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
        [containerRef]
    );

type DialogPanelKeyboardArgs = {
    panelElement: HTMLElement | null;
    containerRef: React.RefObject<HTMLElement | null>;
    itemId: string;
    /** A hidden element takes no focus, so the panel must be positioned first. */
    isPositioned: boolean;
    onClose: () => void;
};

const useDialogPanelKeyboard = ({
    panelElement,
    containerRef,
    itemId,
    isPositioned,
    onClose,
}: DialogPanelKeyboardArgs): void => {
    const triggerRef = React.useRef<HTMLElement | null>(null);
    // Read through a ref, so a new callback does not re-attach the listener.
    const onCloseRef = React.useRef(onClose);
    onCloseRef.current = onClose;

    React.useEffect(() => {
        const row = containerRef.current?.querySelector(
            `[data-sidenav-item-id="${escapeAttributeValue(itemId)}"]`
        );
        triggerRef.current = row?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
    }, [containerRef, itemId, panelElement]);

    // Open and close both replace the trigger row: the collapsed rail drops and re-adds its tooltips.
    // The focus falls to the body, so this re-reads the trigger one frame later and focuses it again.
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

    // The panel lives in a portal, so a screen reader would not reach it from the trigger.
    React.useEffect(() => {
        if (!panelElement || !isPositioned) {
            return;
        }
        getItemFocusables(panelElement)[0]?.focus();
    }, [panelElement, isPositioned]);

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
                // Closing the panel unmounts it, and the restore effect returns the focus to the trigger.
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
                    return;
            }
        };

        panelElement.addEventListener('keydown', handleKeyDown);
        return () => panelElement.removeEventListener('keydown', handleKeyDown);
    }, [panelElement, containerRef, itemId]);
};

export {useSidenavRailKeyboard, useDialogPanelKeyboard, getItemFocusables};
