'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {DEFAULT_WIDTH, COLLAPSED_WIDTH, LOGO_SIZE} from './sidenav-bar.css';
import {ThemeVariant, normalizeVariant} from '../theme-variant-context';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import {IconButton} from '../icon-button';
import {Logo} from '../logo';
import Divider from '../divider';
import ScreenReaderOnly from '../screen-reader-only';
import {Text3} from '../text';
import {vars as skinVars} from '../skins/skin-contract.css';
import IconPanelExpandRegular from '../generated/mistica-icons/icon-panel-expand-regular';
import IconPanelCollapseRegular from '../generated/mistica-icons/icon-panel-collapse-regular';

import type {Variant} from '../theme-variant-context';
import type {ExclusifyUnion} from '../utils/utility-types';
import type {DataAttributes} from '../utils/types';

// Branded type: a string that is guaranteed to be an opaque color
type OpaqueColor = string & {readonly __brand: 'OpaqueColor'};

// Type guard: checks if a color is opaque (no 'rgba' with alpha < 1, no 'transparent', etc)
const isOpaqueColor = (value: string): value is OpaqueColor => {
    if (value === 'transparent' || value === 'rgba(0,0,0,0)') {
        return false;
    }
    const rgbaMatch = value.match(/rgba\([^,]+,\s*[^,]+,\s*[^,]+,\s*([^)]+)\)/);
    if (rgbaMatch) {
        const alpha = parseFloat(rgbaMatch[1]);
        if (alpha < 1) return false;
    }
    return true;
};

// Helper: coerce a color to opaque (removes alpha channel if present)
const toOpaqueColor = (color: string): OpaqueColor => {
    const rgbaMatch = color.match(/^rgba\(([^,]+),\s*([^,]+),\s*([^)]+),\s*[^)]+\)$/);
    if (rgbaMatch) {
        return `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})` as OpaqueColor;
    }
    return color as OpaqueColor;
};

// Helper: validate and warn in dev, coerce in production
const enforceOpaqueColor = (color: string, region: 'header' | 'footer'): OpaqueColor => {
    if (process.env.NODE_ENV !== 'production' && !isOpaqueColor(color)) {
        console.warn(
            `SidenavBar: ${region} background color must be opaque (no transparency), ` +
                `but received "${color}". Coercing to opaque.`
        );
    }
    return toOpaqueColor(color);
};

/*
 * SidenavBar — Mistica sidenav navigation component.
 *
 * This component follows the Mistica "sidenav" spec:
 * https://github.com/Telefonica/mistica-design/blob/aweell-generate-figma-specs/specs/sidenav.md
 *
 * The public API (props of SidenavBar / SidenavSection / SidenavItem) is stable and includes:
 *   - Dialog panel rendering of nested items when collapsed
 *   - Double panel rendering of nested items when doublePanel={true}
 *
 * Behaviours described in the spec that are not yet implemented:
 *   - Mobile burger-menu behaviour (reuses MainNavigationBar patterns).
 *   - Layout wrapper for the main content (whole-viewport / centered).
 *   - Per-region colour token matrices for brand/alternative/negative/media variants
 *     (currently only the `default` variant is fully styled; other variants still
 *     provide the correct `ThemeVariant` context to descendant components).
 */

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

type SidenavBarContextValue = {
    collapsed: boolean;
    collapsible: boolean;
    doublePanel: boolean;
    toggleCollapsed: () => void;
    panelOpenForItemId: string | null;
    setPanelOpenForItemId: (id: string | null) => void;
    containerRef: React.RefObject<HTMLElement | null>;
    isInsidePanel: boolean;
    selectedItemId: string | null;
    onSelectedItemIdChange?: (id: string | null) => void;
};

const SidenavBarContext = React.createContext<SidenavBarContextValue>({
    collapsed: false,
    collapsible: true,
    doublePanel: false,
    toggleCollapsed: () => {},
    panelOpenForItemId: null,
    setPanelOpenForItemId: () => {},
    containerRef: React.createRef(),
    isInsidePanel: false,
    selectedItemId: null,
});

const useSidenavBarContext = (): SidenavBarContextValue => React.useContext(SidenavBarContext);

/** Nesting level of the items. Level 0 is the top level. */
const SidenavLevelContext = React.createContext<number>(0);

/** Generate a unique ID for tracking panel state */
let itemIdCounter = 0;
const generateItemId = (): string => {
    return `sidenav-item-${++itemIdCounter}`;
};

/**
 * `React.ReactElement<Props>` cannot express these constraints, because every JSX expression is
 * typed as `ReactElement<any, any>` and therefore satisfies any props type. Comparing against the
 * component reference at runtime does work, so it is checked in development instead.
 */
const assertChildrenAre = (children: React.ReactNode, expected: React.ElementType, message: string): void => {
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type !== expected) {
            console.error(message);
        }
    });
};

/** Check if any descendant SidenavItem has the given ID */
const hasDescendantWithId = (children: React.ReactNode, targetId: string | null): boolean => {
    if (!targetId) return false;

    let found = false;
    const search = (node: React.ReactNode): void => {
        React.Children.forEach(node, (child) => {
            if (found) return;
            if (React.isValidElement(child)) {
                const props = child.props as {id?: string; children?: React.ReactNode};
                if (props.id === targetId) {
                    found = true;
                    return;
                }
                if (props.children) {
                    search(props.children);
                }
            }
        });
    };

    search(children);
    return found;
};

// -----------------------------------------------------------------------------
// SidenavSection
// -----------------------------------------------------------------------------

type SidenavSectionProps = {
    /** Section heading. Hidden (space reserved) when the sidenav is collapsed. */
    title?: string;
    /** Renders a divider above the section. @default false */
    dividerTop?: boolean;
    /** Renders a divider below the section. @default false */
    dividerBottom?: boolean;
    /** Navigation items (`SidenavItem` elements).
     * @see SidenavItem
     */
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

type SidenavBarBackgroundColors = {
    /** Header background color (must be opaque to mask scrolling content). */
    header?: OpaqueColor;
    /** Body background color (can be any color including transparent). */
    body?: string;
    /** Footer background color (must be opaque to mask scrolling content). */
    footer?: OpaqueColor;
};

type SidenavBarBaseProps = {
    /** Must be one or more `SidenavSection` elements. Each section can contain `SidenavItem` and nested `SidenavItem` elements.
     * @see SidenavSection
     * @see SidenavItem
     */
    children?: React.ReactNode;
    /** Accessible name of the navigation landmark. @default 'Main navigation' */
    'aria-label'?: string;
    /** Color variant (default, brand, alternative, negative, media). @default 'default' */
    variant?: Variant;
    /** Opens nested items in a panel to the right of the sidenav. @default false */
    doublePanel?: boolean;
    /** Width of expanded sidenav in pixels. @default 240 */
    width?: number;
    /** Logo element in header. Defaults to skin logo. Pass false to hide. @default <Logo size={40} /> */
    logo?: React.ReactElement | false;
    /** Custom content below logo/collapse in header. */
    headerSlot?: React.ReactNode;
    /** Custom background colors for header (opaque), body (any), and footer (opaque) regions. */
    background?: SidenavBarBackgroundColors;
    /** ID of currently selected item (controlled selection). */
    selectedItemId?: string | null;
    /** Called when selection changes. */
    onSelectedItemIdChange?: (id: string | null) => void;
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
              /** Renders as a floating box (with own edge). Divider not applicable. */
              boxed: true;
          }
        | {
              /** Renders as full-width. @default false */
              boxed?: false;
              /** Shows vertical right divider (only when boxed=false). @default true */
              divider?: boolean;
          }
    > &
    ExclusifyUnion<
        | {
              /** Controlled collapsed state. */
              collapsed: boolean;
              /** Handler for collapsed state changes (required for controlled mode). */
              onCollapse: (collapsed: boolean) => void;
              /** Whether user can toggle collapsed state. @default true */
              collapsible?: true;
          }
        | {
              /** Initial collapsed state (uncontrolled). @default false */
              defaultCollapsed?: boolean;
              /** Optional handler for collapsed state changes (for logging/effects). */
              onCollapse?: (collapsed: boolean) => void;
              /** Whether user can toggle collapsed state. @default true */
              collapsible?: true;
          }
        | {
              /** Controlled collapsed state (non-toggleable). */
              collapsed: boolean;
              /** User cannot toggle collapsed state. */
              collapsible: false;
          }
        | {
              /** Initial collapsed state (uncontrolled, non-toggleable). @default false */
              defaultCollapsed?: boolean;
              /** User cannot toggle collapsed state. */
              collapsible: false;
          }
    > &
    ExclusifyUnion<
        | {
              /** Custom content in footer region (at bottom of sidenav). */
              footerSlot: React.ReactNode;
              /** Keep footer fixed when scrolling. @default false */
              fixedFooter?: boolean;
          }
        | {
              /** No footer slot. */
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
    defaultCollapsed = false,
    onCollapse,
    doublePanel = false,
    width = DEFAULT_WIDTH,
    logo,
    headerSlot,
    footerSlot,
    fixedFooter = false,
    background,
    selectedItemId,
    onSelectedItemIdChange,
    dataAttributes,
}: SidenavBarProps): JSX.Element => {
    const isCollapsedControlled = collapsedProp !== undefined;
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
    const collapsed = isCollapsedControlled ? Boolean(collapsedProp) : uncontrolledCollapsed;
    const [panelOpenForItemId, setPanelOpenForItemId] = React.useState<string | null>(null);
    const containerRef = React.useRef<HTMLElement>(null);

    // Extract and enforce opacity constraints on header/footer backgrounds
    const headerBackgroundColor = background?.header
        ? enforceOpaqueColor(background.header, 'header')
        : undefined;
    const footerBackgroundColor = background?.footer
        ? enforceOpaqueColor(background.footer, 'footer')
        : undefined;
    const bodyBackgroundColor = background?.body;

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
        () => ({
            collapsed,
            collapsible,
            doublePanel,
            toggleCollapsed,
            panelOpenForItemId,
            setPanelOpenForItemId,
            containerRef,
            isInsidePanel: false,
            selectedItemId: selectedItemId ?? null,
            onSelectedItemIdChange,
        }),
        [
            collapsed,
            collapsible,
            doublePanel,
            toggleCollapsed,
            panelOpenForItemId,
            containerRef,
            selectedItemId,
            onSelectedItemIdChange,
        ]
    );

    const currentWidth = collapsed ? COLLAPSED_WIDTH : width;

    if (process.env.NODE_ENV !== 'production') {
        assertChildrenAre(children, SidenavSection, 'SidenavBar children must be SidenavSection elements');

        const itemIds = new Set<string>();
        const duplicateIds = new Set<string>();

        const collectItemIds = (node: React.ReactNode): void => {
            React.Children.forEach(node, (child) => {
                if (React.isValidElement(child)) {
                    const childProps = child.props as any;
                    if (child.type === SidenavSection) {
                        collectItemIds(childProps.children);
                    } else if (childProps?.id) {
                        const id = childProps.id as string;
                        if (itemIds.has(id)) {
                            duplicateIds.add(id);
                        } else {
                            itemIds.add(id);
                        }
                        if (childProps.children) {
                            collectItemIds(childProps.children);
                        }
                    }
                }
            });
        };

        collectItemIds(children);

        if (duplicateIds.size > 0) {
            console.error(
                `SidenavBar: duplicate item IDs found: ${Array.from(duplicateIds).join(', ')}. ` +
                    `All SidenavItem ids must be unique within a SidenavBar.`
            );
        }
    }

    const logoElement = logo === false ? null : logo ?? <Logo size={LOGO_SIZE} />;

    const hasHeader = Boolean(logoElement || collapsible || headerSlot);
    const normalizedVariant = normalizeVariant(variant);

    return (
        <ThemeVariant variant={normalizedVariant}>
            <SidenavBarContext.Provider value={contextValue}>
                <nav
                    ref={containerRef}
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
                            style={
                                headerBackgroundColor ? {backgroundColor: headerBackgroundColor} : undefined
                            }
                        >
                            <div
                                className={classnames(styles.headerControls, {
                                    [styles.headerControlsCollapsed]: collapsed,
                                })}
                            >
                                {logoElement && <div className={styles.logo}>{logoElement}</div>}
                                {collapsible && (
                                    <IconButton
                                        Icon={collapsed ? IconPanelExpandRegular : IconPanelCollapseRegular}
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
                        style={bodyBackgroundColor ? {backgroundColor: bodyBackgroundColor} : undefined}
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
                                    style={
                                        footerBackgroundColor
                                            ? {backgroundColor: footerBackgroundColor}
                                            : undefined
                                    }
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
                            style={
                                footerBackgroundColor ? {backgroundColor: footerBackgroundColor} : undefined
                            }
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
export {SidenavBar, SidenavSection};
export {
    SidenavBarContext,
    useSidenavBarContext,
    SidenavLevelContext,
    generateItemId,
    assertChildrenAre,
    hasDescendantWithId,
};
export type {SidenavBarProps, SidenavSectionProps, SidenavBarBackgroundColors};
