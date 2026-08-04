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
const assertChildrenAre = (children: React.ReactNode, expected: React.ElementType, message: string) => {
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
    /** Leading asset: icon component or any ReactNode (avatar, badge, image, etc). Required for top-level items (shown when collapsed). Optional for nested items. */
    asset?: ((props: IconProps) => JSX.Element) | React.ReactElement;
    /** When the sidenav is expanded, whether to show the asset. @default true */
    showIconWhenExpanded?: boolean;
    /** Marks the item as the current page. Rendered with a selected indicator + `aria-current="page"`. */
    selected?: boolean;
    /** Optional slot rendered before the chevron. Hidden when the sidenav is collapsed. */
    rightSlot?: React.ReactNode;
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
    const {
        label,
        asset,
        selected,
        rightSlot,
        children,
        defaultOpen,
        dataAttributes,
        showIconWhenExpanded = true,
    } = props;
    const {collapsed, doublePanel} = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);

    const hasChildren = React.Children.count(children) > 0;
    const navigates = props.onPress !== undefined || props.href !== undefined || props.to !== undefined;

    if (process.env.NODE_ENV !== 'production') {
        assertChildrenAre(children, SidenavItem, 'SidenavItem children must be SidenavItem elements');
        if (level === 0 && !asset) {
            console.error(
                `SidenavItem "${label}" at top level needs an asset to be usable in a collapsed sidenav`
            );
        }
    }

    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const isOpen = hasChildren && !collapsed && open;

    // todo WIP I don't know if you like it, but I do prefer it than a nested ternary
    const navigationProps = (() => {
        switch (true) {
            case !!props.onPress:
                return {onPress: props.onPress};
            case props.href !== undefined:
                return {href: props.href, newTab: props.newTab, onNavigate: props.onNavigate};
            case props.to !== undefined:
                return {to: props.to, newTab: props.newTab, onNavigate: props.onNavigate};
            default:
                return null;
        }
    })();

    const ChevronIcon = doublePanel ? IconChevronRightRegular : IconChevronDownRegular;

    const shouldShowAsset = asset && (collapsed || showIconWhenExpanded);
    let assetContent: React.ReactNode = null;
    if (shouldShowAsset) {
        if (typeof asset === 'function') {
            assetContent = (asset as (props: IconProps) => JSX.Element)({
                size: 20,
                color: 'currentColor',
            });
        } else {
            assetContent = asset;
        }
    }
    const assetElement = shouldShowAsset ? <span className={styles.itemAsset}>{assetContent}</span> : null;

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
            {assetElement}
            {labelNode}
            {!collapsed && rightSlot && <span className={styles.itemRightSlot}>{rightSlot}</span>}
            {!collapsed && hasChildren && !navigates && (
                <span className={styles.itemChevron} aria-hidden="true">
                    <ChevronIcon size={16} color="currentColor" />
                </span>
            )}
        </>
    );

    const ariaCurrent = selected ? ('page' as const) : undefined;

    const interactiveRow = (() => {
        // Case 1: expand-only item (has children, does not navigate). The whole row toggles.
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
        // Case 2: navigating item. The row navigates; if it also has children, a second focus
        //         stop (the chevron) toggles the panel/dropdown.
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
        // Case 3: leaf item that neither navigates nor groups (rendered as static text).
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
        assertChildrenAre(children, SidenavItem, 'SidenavSection children must be SidenavItem elements');
    }

    return (
        <div
            className={styles.section}
            role="group"
            aria-label={title}
            {...getPrefixedDataAttributes({testid: 'SidenavSection', ...dataAttributes})}
        >
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
            <div className={styles.sectionContent}>
                {dividerTop && (
                    <div className={styles.sectionDivider}>
                        <Divider />
                    </div>
                )}
                {children}
                {dividerBottom && (
                    <div className={styles.sectionDivider}>
                        <Divider />
                    </div>
                )}
            </div>
        </div>
    );
};

// -----------------------------------------------------------------------------
// SidenavBar
// -----------------------------------------------------------------------------

type SidenavBarBaseProps = {
    /** Sections containing navigation items. Only `SidenavSection` children are allowed. */
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
     * Logo rendered in the header. Defaults to the skin logo at the 40px the header reserves
     * in both the expanded and the collapsed state. Pass an element to override it, or `false`
     * to render no logo at all.
     *
     * @default <Logo size={40} />
     */
    logo?: React.ReactElement | false;
    /** Optional slot rendered in the header region, below the collapse control. */
    headerSlot?: React.ReactNode;
    dataAttributes?: DataAttributes;
};

/**
 * Constraints enforced by the type system:
 *
 * - A boxed sidenav has its own edge, so the vertical right divider does not apply to it:
 *   `divider` is only accepted when `boxed` is false.
 * - The collapsed state is either controlled through `collapsed` (requires `onCollapse`)
 *   or uncontrolled through `defaultCollapsed` (optional `onCollapse`), never both.
 * - When `collapsible: false`, the sidenav cannot be toggled, so `onCollapse` is not allowed.
 * - `fixedFooter` is only allowed when `footerSlot` is provided.
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
              /** Controlled collapsed state. Requires `onCollapse` to handle state updates. */
              collapsed: boolean;
              /** Called when the collapsed state changes. */
              onCollapse: (collapsed: boolean) => void;
              /** Whether the user can toggle the collapsed state. @default true */
              collapsible?: true;
          }
        | {
              /** Initial collapsed state (uncontrolled). @default false */
              defaultCollapsed?: boolean;
              /** Called when the collapsed state changes (optional, for logging/side-effects). */
              onCollapse?: (collapsed: boolean) => void;
              /** Whether the user can toggle the collapsed state. @default true */
              collapsible?: true;
          }
        | {
              /** Controlled collapsed state with toggling disabled. */
              collapsed: boolean;
              /** The collapsed state cannot be toggled by the user. */
              collapsible: false;
          }
        | {
              /** Uncontrolled collapsed state with toggling disabled. */
              defaultCollapsed?: boolean;
              /** The collapsed state cannot be toggled by the user. */
              collapsible: false;
          }
    > &
    ExclusifyUnion<
        | {
              /** Optional slot rendered in the footer region, at the bottom of the sidenav. */
              footerSlot: React.ReactNode;
              /** Whether the footer should stay fixed at the bottom when scrolling. @default false */
              fixedFooter?: boolean;
          }
        | {
              /** No footer slot provided. */
              footerSlot?: undefined;
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
    collapsedWidth = COLLAPSED_WIDTH,
    defaultCollapsed = false,
    onCollapse,
    doublePanel = false,
    width = DEFAULT_WIDTH,
    logo,
    headerSlot,
    footerSlot,
    fixedFooter = false,
    dataAttributes,
}: SidenavBarProps): JSX.Element => {
    const isCollapsedControlled = collapsedProp !== undefined;
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
    const collapsed = isCollapsedControlled ? Boolean(collapsedProp) : uncontrolledCollapsed;

    const [showHeaderDivider, setShowHeaderDivider] = React.useState(false);
    const [showFooterDivider, setShowFooterDivider] = React.useState(false);
    const headerDividerSentinelRef = React.useRef<HTMLDivElement>(null);
    const footerDividerSentinelRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!bodyRef.current) return;

        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                setShowHeaderDivider(!entry.isIntersecting);
            },
            {root: bodyRef.current, threshold: 0}
        );

        const footerObserver = new IntersectionObserver(
            ([entry]) => {
                setShowFooterDivider(!entry.isIntersecting);
            },
            {root: bodyRef.current, threshold: 0}
        );

        if (headerDividerSentinelRef.current) {
            headerObserver.observe(headerDividerSentinelRef.current);
        }
        if (footerDividerSentinelRef.current) {
            footerObserver.observe(footerDividerSentinelRef.current);
        }

        return () => {
            headerObserver.disconnect();
            footerObserver.disconnect();
        };
    }, []);

    const toggleCollapsed = React.useCallback(() => {
        const next = !collapsed;
        if (!isCollapsedControlled) {
            setUncontrolledCollapsed(next);
            onCollapse?.(next);
            return;
        }
        onCollapse?.(next);
    }, [collapsed, isCollapsedControlled, onCollapse]);

    const contextValue = React.useMemo(
        () => ({collapsed, collapsible, doublePanel, toggleCollapsed}),
        [collapsed, collapsible, doublePanel, toggleCollapsed]
    );

    const currentWidth = collapsed ? collapsedWidth : width;

    /* TODO WIP the design uses a rounded panel glyph with a left rail, not a chevron.
     * Icons `sidenav-collapse` and `sidenav-uncollapse` will be added to mistica-icons
     * and replace the chevrons below. This will be a Touchable with an Icon inside,
     * not an IconButton.
     */

    if (process.env.NODE_ENV !== 'production') {
        assertChildrenAre(children, SidenavSection, 'SidenavBar children must be SidenavSection elements');
    }

    const logoElement = logo === false ? null : logo ?? <Logo size={LOGO_SIZE} />;

    const hasHeader = Boolean(logoElement || collapsible || headerSlot);
    const normalizedVariant = normalizeVariant(variant);

    return (
        <ThemeVariant variant={normalizedVariant}>
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
                            className={classnames(styles.headerBase, styles.header[normalizedVariant], {
                                [styles.headerCollapsed]: collapsed,
                                [styles.headerBoxed[normalizedVariant]]: boxed,
                            })}
                        >
                            <div
                                className={classnames(styles.headerControls, {
                                    [styles.headerControlsCollapsed]: collapsed,
                                })}
                            >
                                {logoElement && <div className={styles.logo}>{logoElement}</div>}
                                {collapsible && (
                                    <IconButton
                                        Icon={
                                            collapsed
                                                ? IconChevronRightDoubleRegular
                                                : IconChevronLeftDoubleRegular
                                        }
                                        type="brand"
                                        backgroundType="transparent"
                                        small
                                        onPress={toggleCollapsed}
                                        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
                                    />
                                )}
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
                    <div
                        ref={bodyRef}
                        className={classnames(styles.bodyBase, styles.body[normalizedVariant], {
                            [styles.bodyWithoutHeader]: !hasHeader,
                        })}
                    >
                        <div ref={headerDividerSentinelRef} />
                        {showHeaderDivider && (
                            <div
                                className={classnames(
                                    styles.scrollDivider,
                                    styles.headerScrollDivider,
                                    styles.scrollDividerVariant[normalizedVariant]
                                )}
                            />
                        )}
                        {children}
                        {footerSlot && !fixedFooter && (
                            <>
                                <div ref={footerDividerSentinelRef} />
                                {showFooterDivider && (
                                    <div
                                        className={classnames(
                                            styles.scrollDivider,
                                            styles.footerScrollDivider,
                                            styles.scrollDividerVariant[normalizedVariant]
                                        )}
                                    />
                                )}
                                <div
                                    className={classnames(
                                        styles.footerBase,
                                        styles.footer[normalizedVariant],
                                        {
                                            [styles.footerBoxed[normalizedVariant]]: boxed,
                                        }
                                    )}
                                >
                                    {footerSlot}
                                </div>
                            </>
                        )}
                    </div>
                    {footerSlot && fixedFooter && (
                        <div
                            className={classnames(styles.footerBase, styles.footer[normalizedVariant], {
                                [styles.footerBoxed[normalizedVariant]]: boxed,
                            })}
                        >
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
export {default as SidenavLayout} from './sidenav-layout';
export type {SidenavBarProps, SidenavSectionProps, SidenavItemProps};
export type {
    SidenavLayoutProps,
    SidenavLayoutSidenavProps,
    SidenavLayoutContentProps,
} from './sidenav-layout';
