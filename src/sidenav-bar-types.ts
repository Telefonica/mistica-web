import type {ExclusifyUnion} from './utils/utility-types';
import type {IconProps} from './utils/types';
import type {MaybeInteractiveProps} from './navigation-types';

type SidenavAsset = ((props: IconProps) => JSX.Element) | React.ReactElement;

/** Props shared by every navigation item, at any level. */
type SidenavItemBaseProps = {
    /** Unique identifier within the sidenav for selection tracking and sub menu state. */
    id: string;
    /** Display text (truncated if too long). */
    label: string;
    /** Custom content on right side (e.g., Badge). */
    rightSlot?: React.ReactNode;
};

/**
 * Props of a first-level item. The collapsed rail shows only the asset of these items, so the asset is
 * required there. An item that does not want the asset next to its label hides it with
 * `showAssetWhenExpanded`.
 */
type SidenavFirstLevelItemProps = SidenavItemBaseProps & {
    /** Icon component or element. It is the only visible part of the item on the collapsed rail. */
    asset: SidenavAsset;
    /** Show asset when expanded (not collapsed). @default true */
    showAssetWhenExpanded?: boolean;
};

/**
 * Props of a nested item. The collapsed rail never shows it, so the asset is optional and
 * `showAssetWhenExpanded` has no meaning. The `undefined` members let a consumer read both item types
 * through one union.
 */
type SidenavNestedItemProps = SidenavItemBaseProps & {
    /** Icon component or element. */
    asset?: SidenavAsset;
    showAssetWhenExpanded?: undefined;
    children?: undefined;
    defaultOpen?: undefined;
};

/**
 * Expandable item: only opens/closes its nested children and cannot navigate
 * (`href`, `to`, and `onPress` are not allowed).
 */
type SidenavExpandableItemProps = {
    /** Nested items (max 1 level, level 0 items only). An expandable item cannot navigate. */
    children: ReadonlyArray<SidenavNestedItem>;
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
 * - **Level 0 items** can have children (expandable/collapsible). They always carry an `asset`, because
 *   the collapsed rail shows nothing else of them.
 * - **Level 1 items** (children) cannot have children (leaf nodes). See `SidenavNestedItem`.
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
 * {id: 'notifications', label: 'Notifications', asset: IconBell, href: '#', rightSlot: <Badge value={5} />}
 */
type SidenavItem = SidenavFirstLevelItemProps &
    ExclusifyUnion<SidenavExpandableItemProps | SidenavNavigableItemProps>;

/**
 * Nested item data: a child of an expandable first-level item. It is always navigable, and it cannot
 * have children of its own. See `SidenavItem`.
 *
 * @example
 * {id: 'active', label: 'Active', href: '/projects/active'}
 */
type SidenavNestedItem = SidenavNestedItemProps & SidenavNavigableItemProps;

/**
 * Title of a section. Every section declares one, because it names the list of the section for a screen
 * reader. A plain string also paints the heading. The object form with `hidden: true` keeps the name and
 * paints no heading, so only assistive technology reads it.
 *
 * @example
 * // Visible heading, and name of the list
 * 'Workspace'
 *
 * // Name of the list only: no heading appears
 * {text: 'Workspace', hidden: true}
 */
type SidenavSectionTitle =
    | string
    | {
          /** Text of the heading, and name of the list of the section. */
          text: string;
          /** Hide the heading. The list keeps this text as its name. @default false */
          hidden?: boolean;
      };

/**
 * Section data that groups navigation items under a title, with optional dividers.
 *
 * Sections provide visual organization of items within a SidenavBar.
 * The title is mandatory, because the list of the section takes its accessible name from it. When the
 * sidenav is collapsed, the title is hidden visually but remains available to screen readers.
 *
 * @example
 * // Section with a visible title and items
 * {
 *   title: 'Workspace',
 *   dividerTop: true,
 *   items: [
 *     {id: 'projects', label: 'Projects', asset: IconFolder, href: '/projects'},
 *     {id: 'teams', label: 'Teams', asset: IconPeople, href: '/teams'}
 *   ]
 * }
 *
 * // Section that groups items without a visible heading. Only a screen reader reads the title.
 * {
 *   title: {text: 'Workspace', hidden: true},
 *   items: [{id: 'teams', label: 'Teams', asset: IconPeople, href: '/teams'}]
 * }
 */
type SidenavSection = {
    /**
     * Section heading, and accessible name of the list of the section. It is mandatory, because a list
     * without a name leaves a screen reader with no way to tell one section from another. Give
     * `{text, hidden: true}` to keep the name and paint no heading.
     */
    title: SidenavSectionTitle;
    /** Show divider above section. The first entry of the body draws none: a line parts two entries. */
    dividerTop?: boolean;
    /** Show divider below section. The last entry of the body draws none: a line parts two entries. */
    dividerBottom?: boolean;
    /** Navigation items in this section. */
    items: ReadonlyArray<SidenavItem>;
};

/**
 * First-level entry of the sidenav body. The first level admits sections and stand-alone items,
 * in any order, so an item does not need a section around it.
 *
 * Each entry is exactly one of:
 * - **Section** — has `items` and groups them under a title and optional dividers.
 * - **Stand-alone item** — a `SidenavItem` placed directly at the first level. It carries no title, so it
 *   is the entry to use when a group of one item needs no name.
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
 * Phase of the collapse motion of the desktop rail. `collapsing` and `expanding` last for the movement of
 * the rail, and they never appear when motion is off. The mobile top bar always reports `expanded`.
 */
type SidenavCollapseState = 'expanded' | 'collapsing' | 'collapsed' | 'expanding';

/**
 * Props of the slots that render per state: the logo, the header slot, the footer slot, and the collapse
 * action. `collapsed` flips at the first frame of the motion, and `state` tells the phase, so a slot can
 * keep its content while the rail moves and swap it when the rail rests.
 */
type SidenavSlotRenderProps = {
    /** Target collapsed state. The mobile top bar reports false, because it is not a rail. */
    collapsed: boolean;
    /** Phase of the collapse motion. */
    state: SidenavCollapseState;
};

/** Props of the logo of the header. The default logo keeps the isotype in both states. */
type SidenavLogoRenderProps = SidenavSlotRenderProps;

/**
 * Logo of the header. It takes true for the logo of the skin, false to hide the logo, an element of your
 * own, or a function that receives the collapse state and returns one logo for each state.
 */
type SidenavLogo = React.ReactElement | boolean | ((props: SidenavLogoRenderProps) => React.ReactNode);

/** Content of the header slot or of the footer slot: an element, or a function of the collapse state. */
type SidenavSlot = React.ReactNode | ((props: SidenavSlotRenderProps) => React.ReactNode);

/** Resolves the function form of a slot with the props of the current state. */
const renderSidenavSlot = (slot: SidenavSlot, props: SidenavSlotRenderProps): React.ReactNode =>
    typeof slot === 'function' ? slot(props) : slot;

/** Tells a first-level section apart from a first-level stand-alone item. */
const isSidenavSection = (entry: SidenavEntry): entry is SidenavSection =>
    Array.isArray((entry as SidenavSection).items);

/** Reads the two shapes of a section title as one pair: the text, and the visibility of the heading. */
const getSidenavSectionTitle = (title: SidenavSectionTitle): {text: string; isHeadingVisible: boolean} =>
    typeof title === 'string'
        ? {text: title, isHeadingVisible: true}
        : {text: title.text, isHeadingVisible: !title.hidden};

export {isSidenavSection, getSidenavSectionTitle, renderSidenavSlot};
export type {
    SidenavItem,
    SidenavNestedItem,
    SidenavSection,
    SidenavSectionTitle,
    SidenavEntry,
    SidenavLogo,
    SidenavLogoRenderProps,
    SidenavSlot,
    SidenavSlotRenderProps,
    SidenavCollapseState,
};
