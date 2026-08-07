import type {ExclusifyUnion} from '../utils/utility-types';
import type {IconProps} from '../utils/types';
import type {MaybeInteractiveProps} from '../navigation-types';

/**
 * Navigation item data for SidenavBar.
 *
 * Supports 2-level nesting:
 * - **Level 0 items** can have children (expandable/collapsible)
 * - **Level 1 items** (children) cannot have children (leaf nodes)
 *
 * Each item must be exactly one of: navigable (href/to/onPress) or expandable (children).
 * An item with children cannot also navigate.
 *
 * @example
 * // Simple navigation item
 * {id: 'home', label: 'Home', asset: IconHome, href: '/', onNavigate: () => {}}
 *
 * // Item with nested children (expandable)
 * {
 *   id: 'projects',
 *   label: 'Projects',
 *   asset: IconFolder,
 *   children: [
 *     {id: 'active', label: 'Active', href: '/projects/active'},
 *     {id: 'archived', label: 'Archived', href: '/projects/archived'}
 *   ]
 * }
 *
 * // Item with right slot (e.g., badge)
 * {id: 'notifications', label: 'Notifications', href: '#', rightSlot: <Badge value={5} />}
 */
type SidenavItem = {
    /** Unique identifier within the sidenav for selection tracking and panel state. */
    id: string;
    /** Display text (truncated if too long). */
    label: string;
    /** Icon component or element. Required for top-level items in collapsed sidenav. */
    asset?: ((props: IconProps) => JSX.Element) | React.ReactElement;
    /** Show asset when expanded (not collapsed). @default true */
    showIconWhenExpanded?: boolean;
    /** Custom content on right side (e.g., Badge). */
    rightSlot?: React.ReactNode;
    /** Initial expanded state for items with children. @default false */
    defaultOpen?: boolean;

    /** Nested items (max 1 level). Only Level 0 items can have children. Mutually exclusive with href/to/onPress. */
    children?: readonly SidenavItem[];

    /** Called after navigation (when item has href, to, or onPress). */
    onNavigate?: () => void | Promise<void>;

    /** Open link in new tab. Only applies when href or to is set. @default false */
    newTab?: boolean;
} & MaybeInteractiveProps;

/**
 * Section data that groups navigation items with optional title and dividers.
 *
 * Sections provide visual organization of items within a SidenavBar.
 * When collapsed, section titles are hidden visually but remain available to screen readers.
 *
 * @example
 * // Section with title and items
 * {
 *   title: 'Workspace',
 *   dividerTop: true,
 *   items: [
 *     {id: 'projects', label: 'Projects', asset: IconFolder, href: '/projects'},
 *     {id: 'teams', label: 'Teams', asset: IconPeople, href: '/teams'}
 *   ]
 * }
 *
 * // Section without title (just grouping)
 * {
 *   items: [
 *     {id: 'home', label: 'Home', asset: IconHome, href: '/'}
 *   ]
 * }
 */
type SidenavSection = {
    /** Section heading (hidden when collapsed, but available to screen readers). */
    title?: string;
    /** Show divider above section. */
    dividerTop?: boolean;
    /** Show divider below section. */
    dividerBottom?: boolean;
    /** Navigation items in this section. */
    items: readonly SidenavItem[];
};

export type {SidenavItem, SidenavSection};
