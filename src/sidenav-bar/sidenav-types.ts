import type {ExclusifyUnion} from '../utils/utility-types';
import type {IconProps} from '../utils/types';
import type {MaybeInteractiveProps} from '../navigation-types';

/** Props shared by every navigation item, regardless of whether it is expandable or navigable. */
type SidenavItemBaseProps = {
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
};

/**
 * Expandable item: only opens/closes its nested children and cannot navigate
 * (`href`, `to`, and `onPress` are not allowed).
 */
type SidenavExpandableItemProps = {
    /** Nested items (max 1 level, level 0 items only). An expandable item cannot navigate. */
    children: ReadonlyArray<SidenavItem>;
    /** Initial expanded state for items with children. @default false */
    defaultOpen?: boolean;
};

/**
 * Navigable item: navigates via `href`, `to`, or `onPress` and cannot have children.
 */
type SidenavNavigableItemProps = MaybeInteractiveProps & {
    /** Called after navigation (when item has href, to, or onPress). */
    onNavigate?: () => void | Promise<void>;
    /** Open link in new tab. Only applies when href or to is set. @default false */
    newTab?: boolean;
};

/**
 * Navigation item data for SidenavBar.
 *
 * Supports 2-level nesting:
 * - **Level 0 items** can have children (expandable/collapsible)
 * - **Level 1 items** (children) cannot have children (leaf nodes)
 *
 * Each item is exactly one of:
 * - **Expandable** — has `children` and only opens/closes them. It cannot navigate, so
 *   `href`, `to`, and `onPress` are not allowed (enforced by the type).
 * - **Navigable** — has `href`, `to`, or `onPress`. It cannot have `children`.
 *
 * @example
 * // Navigable item (leaf)
 * {id: 'home', label: 'Home', asset: IconHome, href: '/', onNavigate: () => {}}
 *
 * // Expandable item (only opens/closes its children, no navigation prop allowed)
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
type SidenavItem = SidenavItemBaseProps &
    ExclusifyUnion<SidenavExpandableItemProps | SidenavNavigableItemProps>;

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
    items: ReadonlyArray<SidenavItem>;
};

/**
 * First-level entry of the sidenav body. The first level admits sections and stand-alone items,
 * in any order, so an item does not need a section around it.
 *
 * Each entry is exactly one of:
 * - **Section** — has `items` and groups them under an optional title and optional dividers.
 * - **Stand-alone item** — a `SidenavItem` placed directly at the first level.
 *
 * A stand-alone item aligns with the items of a section, and every first-level entry is
 * separated from the next one by the same vertical space.
 *
 * @example
 * // A stand-alone item, then a section, then another stand-alone item
 * [
 *   {id: 'home', label: 'Home', asset: IconHome, href: '/'},
 *   {title: 'Workspace', items: [{id: 'teams', label: 'Teams', asset: IconPeople, href: '/teams'}]},
 *   {id: 'settings', label: 'Settings', asset: IconSettings, href: '/settings'}
 * ]
 */
type SidenavEntry = ExclusifyUnion<SidenavSection | SidenavItem>;

/**
 * Props of the logo of the header. A consumer that needs a logo of its own for each state reads them. The
 * default logo keeps the isotype in both states.
 */
type SidenavLogoRenderProps = {
    /** Current collapsed state. The mobile top bar reports false, because it is not a rail. */
    collapsed: boolean;
};

/**
 * Logo of the header. It takes true for the logo of the skin, false to hide the logo, an element of your
 * own, or a function that receives the collapsed state and returns one logo for each state.
 */
type SidenavLogo = React.ReactElement | boolean | ((props: SidenavLogoRenderProps) => React.ReactNode);

/** Tells a first-level section apart from a first-level stand-alone item. */
const isSidenavSection = (entry: SidenavEntry): entry is SidenavSection =>
    Array.isArray((entry as SidenavSection).items);

export {isSidenavSection};
export type {SidenavItem, SidenavSection, SidenavEntry, SidenavLogo, SidenavLogoRenderProps};
