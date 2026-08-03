'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {DEFAULT_WIDTH, COLLAPSED_WIDTH, NESTING_INDENT, LOGO_SIZE} from './sidenav-bar.css';
import {ThemeVariant, normalizeVariant} from '../theme-variant-context';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import {IconButton} from '../icon-button';
import {Logo} from '../logo';
import Touchable from '../touchable';
import Tooltip from '../tooltip';
import Divider from '../divider';
import ScreenReaderOnly from '../screen-reader-only';
import {Text2, Text3} from '../text';
import {vars as skinVars} from '../skins/skin-contract.css';
import IconChevronDownRegular from '../generated/mistica-icons/icon-chevron-down-regular';
import IconChevronRightRegular from '../generated/mistica-icons/icon-chevron-right-regular';
import IconChevronLeftDoubleRegular from '../generated/mistica-icons/icon-chevron-left-double-regular';
import IconChevronRightDoubleRegular from '../generated/mistica-icons/icon-chevron-right-double-regular';

import type {Variant} from '../theme-variant-context';
import type {ExclusifyUnion} from '../utils/utility-types';
import type {DataAttributes, IconProps} from '../utils/types';

/*
 * SidenavBar — first draft.
 *
 * This component follows the Mistica "sidenav" spec:
 * https://github.com/Telefonica/mistica-design/blob/aweell-generate-figma-specs/specs/sidenav.md
 *
 * The public API (props of SidenavBar / SidenavSection / SidenavItem) is meant to
 * be stable enough to start the review. Several behaviours described in the spec are
 * intentionally not implemented yet and are marked with `TODO WIP` so reviewers
 * can see the intended surface while the internals are iterated:
 *
 *   - Collapsed "dialog panel" and "double panel" rendering of nested items.
 *   - Mobile burger-menu behaviour (reuses MainNavigationBar patterns).
 *   - Layout wrapper for the main content (whole-viewport / centered).
 *   - Fixed header/footer scroll-intersection dividers.
 *   - Per-region colour token matrices for brand/alternative/negative/media variants
 *     (currently only the `default` variant is fully styled; other variants still
 *     provide the correct `ThemeVariant` context to descendant components).
 *   - The collapse/uncollapse glyph, which is missing from the icon library (see the
 *     TODO WIP on `defaultCollapseButton`).
 */

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

type SidenavBarContextValue = {
    collapsed: boolean;
    collapsible: boolean;
    doublePanel: boolean;
    toggleCollapsed: () => void;
};

const SidenavBarContext = React.createContext<SidenavBarContextValue>({
    collapsed: false,
    collapsible: true,
    doublePanel: false,
    toggleCollapsed: () => {},
});

const useSidenavBarContext = (): SidenavBarContextValue => React.useContext(SidenavBarContext);

/** Nesting level of the items. Level 0 is the top level. */
const SidenavLevelContext = React.createContext<number>(0);

/**
 * `React.ReactElement<Props>` cannot express these constraints, because every JSX expression is
 * typed as `ReactElement<any, any>` and therefore satisfies any props type. Comparing against the
 * component reference at runtime does work, so it is checked in development instead.
 */
const checkChildrenAre = (children: React.ReactNode, expected: React.ElementType, message: string) => {
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type !== expected) {
            console.error(message);
        }
    });
};

// -----------------------------------------------------------------------------
// SidenavItem
// -----------------------------------------------------------------------------

type SidenavItemBaseProps = {
    /** Visible text of the item. Also used as the accessible name (mandatory when collapsed). */
    label: string;
    /** Leading asset. Optional when expanded, required when the sidenav is collapsed. */
    Icon?: (props: IconProps) => JSX.Element;
    /** Marks the item as the current page. Rendered with a selected indicator + `aria-current="page"`. */
    selected?: boolean;
    /** Optional slot rendered before the chevron. Hidden when the sidenav is collapsed. */
    right?: React.ReactNode;
    /** Nested items. An item with children renders a chevron and can be expanded. */
    children?: React.ReactNode;
    /** When the item has children, whether they are expanded by default (ignored while collapsed). */
    defaultOpen?: boolean;
    dataAttributes?: DataAttributes;
};

type SidenavItemOnPressProps = SidenavItemBaseProps & {
    onPress: () => void;
    href?: undefined;
    to?: undefined;
};

type SidenavItemHrefProps = SidenavItemBaseProps & {
    href: string;
    newTab?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    to?: undefined;
};

type SidenavItemToProps = SidenavItemBaseProps & {
    to: string;
    newTab?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    href?: undefined;
};

/** An item that only groups children (it expands, it does not navigate). */
type SidenavItemExpandOnlyProps = SidenavItemBaseProps & {
    children: React.ReactNode;
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
};

type SidenavItemProps = ExclusifyUnion<
    SidenavItemOnPressProps | SidenavItemHrefProps | SidenavItemToProps | SidenavItemExpandOnlyProps
>;

const SidenavItem = (props: SidenavItemProps): JSX.Element => {
    const {label, Icon, selected, right, children, defaultOpen, dataAttributes} = props;
    const {collapsed, doublePanel} = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);

    const hasChildren = React.Children.count(children) > 0;
    const navigates = props.onPress !== undefined || props.href !== undefined || props.to !== undefined;

    if (process.env.NODE_ENV !== 'production') {
        checkChildrenAre(children, SidenavItem, 'SidenavItem children must be SidenavItem elements');
        /*
         * TODO WIP only top level items are rendered in the collapsed rail today, so only those
         * need an asset. Revisit once nested items render in the dialog/double panel, since the
         * items shown there may need one too.
         */
        if (collapsed && level === 0 && !Icon) {
            console.error(`SidenavItem "${label}" needs an Icon to be usable in a collapsed sidenav`);
        }
    }

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const isOpen = hasChildren && !collapsed && open;

    const navigationProps = props.onPress
        ? {onPress: props.onPress}
        : props.href !== undefined
          ? {href: props.href, newTab: props.newTab, onNavigate: props.onNavigate}
          : props.to !== undefined
            ? {to: props.to, newTab: props.newTab, onNavigate: props.onNavigate}
            : null;

    const ChevronIcon = doublePanel ? IconChevronRightRegular : IconChevronDownRegular;

    const asset = Icon ? (
        <span className={styles.itemAsset}>
            <Icon size={20} color="currentColor" />
        </span>
    ) : null;

    const labelNode = collapsed ? (
        <ScreenReaderOnly>
            <span>{label}</span>
        </ScreenReaderOnly>
    ) : (
        <div className={styles.itemLabel}>
            <Text2 regular truncate>
                {label}
            </Text2>
        </div>
    );

    const touchableClassName = classnames(
        styles.itemTouchable,
        styles.itemTouchableSelected[selected ? 'true' : 'false'],
        {[styles.itemTouchableCollapsed]: collapsed}
    );

    const rowContent = (
        <>
            {asset}
            {labelNode}
            {!collapsed && right && <span className={styles.itemRightSlot}>{right}</span>}
            {!collapsed && hasChildren && !navigates && (
                <span className={styles.itemChevron} aria-hidden="true">
                    <ChevronIcon size={16} color="currentColor" />
                </span>
            )}
        </>
    );

    const ariaCurrent = selected ? ('page' as const) : undefined;

    // Case 1: expand-only item (has children, does not navigate). The whole row toggles.
    // Case 2: navigating item. The row navigates; if it also has children, a second focus
    //         stop (the chevron) toggles the panel/dropdown.
    // Case 3: leaf item that neither navigates nor groups (rendered as static text).
    const interactiveRow = (() => {
        if (hasChildren && !navigates) {
            return (
                <Touchable
                    className={touchableClassName}
                    onPress={() => setOpen((prev) => !prev)}
                    aria-expanded={collapsed ? undefined : isOpen}
                    aria-label={label}
                >
                    {rowContent}
                </Touchable>
            );
        }
        if (navigationProps) {
            return (
                <Touchable
                    {...navigationProps}
                    className={touchableClassName}
                    aria-current={ariaCurrent}
                    aria-label={collapsed ? label : undefined}
                >
                    {rowContent}
                </Touchable>
            );
        }
        return (
            <div className={touchableClassName} aria-current={ariaCurrent}>
                {rowContent}
            </div>
        );
    })();

    const row = (
        <div
            className={styles.itemRow}
            style={applyCssVars({[styles.itemIndentVar]: `${level * NESTING_INDENT}px`})}
            {...getPrefixedDataAttributes({testid: 'SidenavItem', ...dataAttributes})}
        >
            {selected ? (
                <span className={styles.selectedIndicator} />
            ) : (
                <span className={styles.selectedIndicatorPlaceholder} />
            )}
            {collapsed ? (
                <Tooltip position="right" description={label} target={interactiveRow} />
            ) : (
                interactiveRow
            )}
            {/* Second focus stop for items that navigate AND have children */}
            {!collapsed && hasChildren && navigates && (
                <Touchable
                    className={styles.itemChevron}
                    onPress={() => setOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${label}`}
                >
                    <ChevronIcon size={16} color="currentColor" />
                </Touchable>
            )}
        </div>
    );

    return (
        <>
            {row}
            {/* TODO WIP when collapsed, render children in a dialog/double panel instead. */}
            {isOpen && (
                <div className={styles.nestedList} role="group" aria-label={label}>
                    <SidenavLevelContext.Provider value={level + 1}>{children}</SidenavLevelContext.Provider>
                </div>
            )}
        </>
    );
};

// -----------------------------------------------------------------------------
// SidenavSection
// -----------------------------------------------------------------------------

type SidenavSectionProps = {
    /** Section heading. Hidden (space reserved) when the sidenav is collapsed. */
    title?: string;
    /** Renders a divider above the section. */
    dividerTop?: boolean;
    /** Renders a divider below the section. */
    dividerBottom?: boolean;
    children: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const SidenavSection = ({
    title,
    dividerTop,
    dividerBottom,
    children,
    dataAttributes,
}: SidenavSectionProps): JSX.Element => {
    const {collapsed} = useSidenavBarContext();

    if (process.env.NODE_ENV !== 'production') {
        checkChildrenAre(children, SidenavItem, 'SidenavSection children must be SidenavItem elements');
    }

    return (
        <div
            className={styles.section}
            role="group"
            aria-label={title}
            {...getPrefixedDataAttributes({testid: 'SidenavSection', ...dataAttributes})}
        >
            {dividerTop && (
                <div className={styles.sectionDivider}>
                    <Divider />
                </div>
            )}
            {title && (
                <div className={styles.sectionTitle}>
                    {collapsed ? (
                        <ScreenReaderOnly>
                            <span>{title}</span>
                        </ScreenReaderOnly>
                    ) : (
                        <Text3 medium color={skinVars.colors.textSecondaryBrand}>
                            {title}
                        </Text3>
                    )}
                </div>
            )}
            {children}
            {dividerBottom && (
                <div className={styles.sectionDivider}>
                    <Divider />
                </div>
            )}
        </div>
    );
};

// -----------------------------------------------------------------------------
// SidenavBar
// -----------------------------------------------------------------------------

type SidenavBarBaseProps = {
    children?: React.ReactNode;
    /** Accessible name of the navigation landmark. */
    'aria-label'?: string;
    /** Color variant. Adapts the content appearance. @default 'default' */
    variant?: Variant;
    /** Opens nested items in a panel attached to the right of the sidenav. @default false */
    doublePanel?: boolean;
    /** Width of the expanded sidenav in px. @default 240 */
    width?: number;
    /** Width of the collapsed sidenav in px. @default 72 */
    collapsedWidth?: number;
    /**
     * Logo rendered in the header. Defaults to the skin logo at the 32px the header reserves
     * in both the expanded and the collapsed state. Pass an element to override it, or `false`
     * to render no logo at all.
     *
     * @default <Logo size={32} />
     */
    logo?: React.ReactElement | false;
    /** Optional slot rendered in the header region, below the collapse control. */
    headerSlot?: React.ReactNode;
    /** Optional slot rendered in the footer region, at the bottom of the sidenav. */
    footerSlot?: React.ReactNode;
    dataAttributes?: DataAttributes;
};

type RenderCollapseButton = (props: {collapsed: boolean; toggle: () => void}) => React.ReactNode;

/**
 * Three constraints are enforced by the type system:
 *
 * - A boxed sidenav has its own edge, so the vertical right divider does not apply to it:
 *   `divider` is only accepted when `boxed` is false.
 * - The collapsed state is either controlled through `collapsed` or uncontrolled through
 *   `defaultCollapsed`, never both.
 * - `onCollapse` and `renderCollapseButton` are only reachable while the sidenav is
 *   collapsible, so they are rejected when `collapsible` is false. A non collapsible sidenav
 *   can still be fixed in the collapsed state through `collapsed` or `defaultCollapsed`.
 */
type SidenavBarProps = SidenavBarBaseProps &
    ExclusifyUnion<
        | {
              /** Renders the sidenav as a floating box. */
              boxed: true;
          }
        | {
              /** @default false */
              boxed?: false;
              /** Shows the vertical right divider. @default true */
              divider?: boolean;
          }
    > &
    ExclusifyUnion<
        | {
              /** Controlled collapsed state. */
              collapsed: boolean;
          }
        | {
              /** Initial collapsed state (uncontrolled). @default false */
              defaultCollapsed?: boolean;
          }
    > &
    ExclusifyUnion<
        | {
              /** Whether the user can toggle the collapsed state. @default true */
              collapsible?: true;
              /** Called when the collapsed state changes. */
              onCollapse?: (collapsed: boolean) => void;
              /** Custom render for the collapse/uncollapse control. */
              renderCollapseButton?: RenderCollapseButton;
          }
        | {
              /** The collapsed state cannot be toggled by the user. */
              collapsible: false;
          }
    >;

const SidenavBar = ({
    children,
    'aria-label': ariaLabel = 'Main navigation',
    variant = 'default',
    boxed = false,
    divider = true,
    collapsible = true,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapse,
    doublePanel = false,
    width = DEFAULT_WIDTH,
    collapsedWidth = COLLAPSED_WIDTH,
    logo,
    headerSlot,
    footerSlot,
    renderCollapseButton,
    dataAttributes,
}: SidenavBarProps): JSX.Element => {
    const isControlled = collapsedProp !== undefined;
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
    const collapsed = isControlled ? Boolean(collapsedProp) : uncontrolledCollapsed;

    const toggleCollapsed = React.useCallback(() => {
        const next = !collapsed;
        if (!isControlled) {
            setUncontrolledCollapsed(next);
        }
        onCollapse?.(next);
    }, [collapsed, isControlled, onCollapse]);

    const contextValue = React.useMemo(
        () => ({collapsed, collapsible, doublePanel, toggleCollapsed}),
        [collapsed, collapsible, doublePanel, toggleCollapsed]
    );

    const currentWidth = collapsed ? collapsedWidth : width;

    /*
     * TODO WIP the design uses a rounded panel glyph with a left rail, not a chevron —
     * `sidenav-collapse` when expanded and `sidenav-uncollapse` when collapsed (Figma file
     * 4woEBHpukbLVkmk9UJTGUD, nodes 0:1593 and 0:1121). Both are vectors drawn inside the
     * sidenav component and do not exist in Telefonica/mistica-icons, so they have to be added
     * there first and pulled in with `yarn start` in packages/import-mistica-icons. The chevrons
     * below are a stand-in until then; consumers needing the real glyph can pass
     * `renderCollapseButton`.
     */
    const defaultCollapseButton = (
        <IconButton
            Icon={collapsed ? IconChevronRightDoubleRegular : IconChevronLeftDoubleRegular}
            type="brand"
            backgroundType="transparent"
            small
            onPress={toggleCollapsed}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        />
    );

    if (process.env.NODE_ENV !== 'production') {
        checkChildrenAre(children, SidenavSection, 'SidenavBar children must be SidenavSection elements');
    }

    const logoElement = logo === false ? null : logo ?? <Logo size={LOGO_SIZE} />;

    const hasHeader = Boolean(logoElement || collapsible || headerSlot);

    return (
        <ThemeVariant variant={normalizeVariant(variant)}>
            <SidenavBarContext.Provider value={contextValue}>
                <nav
                    aria-label={ariaLabel}
                    className={classnames(styles.container, {
                        [styles.withRightDivider]: divider && !boxed,
                        [styles.boxed]: boxed,
                    })}
                    style={applyCssVars({[styles.sidenavWidthVar]: `${currentWidth}px`})}
                    {...getPrefixedDataAttributes({testid: 'SidenavBar', ...dataAttributes})}
                >
                    {hasHeader && (
                        <div
                            className={classnames(styles.header, {
                                [styles.headerCollapsed]: collapsed,
                                [styles.headerBoxed]: boxed,
                            })}
                        >
                            <div
                                className={classnames(styles.headerControls, {
                                    [styles.headerControlsCollapsed]: collapsed,
                                })}
                            >
                                {logoElement && <div className={styles.logo}>{logoElement}</div>}
                                {collapsible &&
                                    (renderCollapseButton
                                        ? renderCollapseButton({collapsed, toggle: toggleCollapsed})
                                        : defaultCollapseButton)}
                            </div>
                            {headerSlot && (
                                <div
                                    className={classnames(styles.headerSlot, {
                                        [styles.headerSlotCollapsed]: collapsed,
                                    })}
                                >
                                    {headerSlot}
                                </div>
                            )}
                        </div>
                    )}
                    <div className={classnames(styles.body, {[styles.bodyWithoutHeader]: !hasHeader})}>
                        {children}
                    </div>
                    {footerSlot && (
                        <div className={classnames(styles.footer, {[styles.footerBoxed]: boxed})}>
                            {footerSlot}
                        </div>
                    )}
                </nav>
            </SidenavBarContext.Provider>
        </ThemeVariant>
    );
};

export default SidenavBar;
export {SidenavBar, SidenavSection, SidenavItem};
export type {SidenavBarProps, SidenavSectionProps, SidenavItemProps};
