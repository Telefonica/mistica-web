'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {DEFAULT_WIDTH, COLLAPSED_WIDTH, LOGO_SIZE} from './sidenav-bar.css';
import {ThemeVariant, normalizeVariant} from '../theme-variant-context';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import {useScreenSize, useTheme, useDisableBodyScroll} from '../hooks';
import {IconButton} from '../icon-button';
import {Logo} from '../logo';
import Divider from '../divider';
import ScreenReaderOnly from '../screen-reader-only';
import {Text3} from '../text';
import {vars as skinVars} from '../skins/skin-contract.css';
import IconPanelExpandRegular from '../generated/mistica-icons/icon-panel-expand-regular';
import IconPanelCollapseRegular from '../generated/mistica-icons/icon-panel-collapse-regular';
import IconMenuRegular from '../generated/mistica-icons/icon-menu-regular';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';
import IconChevronLeftRegular from '../generated/mistica-icons/icon-chevron-left-regular';
import {SidenavItem} from './sidenav-item';

import type {Variant} from '../theme-variant-context';
import type {ExclusifyUnion} from '../utils/utility-types';
import type {DataAttributes} from '../utils/types';
import type {SidenavItem as SidenavItemType, SidenavSection as SidenavSectionType} from './sidenav-types';

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

type MobileNavigationLevel = {
    id: string | null;
    label: string;
    items: ReadonlyArray<SidenavItemType>;
};

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
    isMobileMode?: boolean;
    mobileMenuOpen?: boolean;
    closeMobileMenu?: () => void;
    mobileNavLevel?: Array<MobileNavigationLevel>;
    pushMobileNavLevel?: (level: MobileNavigationLevel) => void;
    popMobileNavLevel?: () => void;
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
    isMobileMode: false,
    mobileMenuOpen: false,
    closeMobileMenu: () => {},
    mobileNavLevel: [],
    pushMobileNavLevel: () => {},
    popMobileNavLevel: () => {},
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
    const {collapsed, isMobileMode} = useSidenavBarContext();

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
                    <div
                        className={classnames(styles.sectionDivider, {
                            [styles.sectionDividerHidden]: isMobileMode,
                        })}
                    >
                        <Divider />
                    </div>
                )}
                {children}
                {dividerBottom && (
                    <div
                        className={classnames(styles.sectionDivider, {
                            [styles.sectionDividerHidden]: isMobileMode,
                        })}
                    >
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
    /** Navigation sections with items. Data-driven API replaces JSX children for better alignment with MainNavigationBar.
     * @see SidenavSection
     * @see SidenavItem
     */
    sections?: ReadonlyArray<SidenavSectionType>;
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

// Render a single item with its nested children recursively
const renderSidenavItemFromData = (item: SidenavItemType): React.ReactElement => {
    const children = item.children?.map((child) => renderSidenavItemFromData(child));
    const baseProps = {
        key: item.id,
        id: item.id,
        label: item.label,
        asset: item.asset,
        showIconWhenExpanded: item.showIconWhenExpanded,
        rightSlot: item.rightSlot,
        defaultOpen: item.defaultOpen,
        newTab: item.newTab,
        onNavigate: item.onNavigate,
        children,
        childrenData: item.children,
    };

    // Build navigation props based on which one is defined
    if (item.href !== undefined) {
        return <SidenavItem {...(baseProps as any)} href={item.href} />;
    }
    if (item.to !== undefined) {
        return <SidenavItem {...(baseProps as any)} to={item.to} />;
    }
    if (item.onPress !== undefined) {
        return <SidenavItem {...(baseProps as any)} onPress={item.onPress} />;
    }
    // No navigation: this item has children
    return <SidenavItem {...(baseProps as any)} />;
};

const SidenavBar = ({
    sections,
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
    const {isMobile} = useScreenSize();
    const theme = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [mobileNavStack, setMobileNavStack] = React.useState<Array<MobileNavigationLevel>>([]);
    useDisableBodyScroll(isMobile && mobileMenuOpen);

    // Get localized back button text
    const getBackButtonText = React.useCallback(() => {
        const locale = theme.i18n.locale;
        if (locale.startsWith('es')) return 'Atrás';
        if (locale.startsWith('ca')) return 'Enrere';
        if (locale.startsWith('pt')) return 'Voltar';
        if (locale.startsWith('gl')) return 'Atrás';
        if (locale.startsWith('eu')) return 'Atzera';
        return 'Back'; // Default to English
    }, [theme.i18n.locale]);

    const pushMobileNavLevel = React.useCallback((level: MobileNavigationLevel) => {
        setMobileNavStack((prev) => [...prev, level]);
    }, []);

    const popMobileNavLevel = React.useCallback(() => {
        setMobileNavStack((prev) => {
            if (prev.length > 0) {
                return prev.slice(0, -1);
            }
            return prev;
        });
    }, []);

    React.useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (mobileNavStack.length > 0) {
                    popMobileNavLevel();
                } else if (mobileMenuOpen) {
                    setMobileMenuOpen(false);
                }
            }
        };

        if (isMobile && (mobileMenuOpen || mobileNavStack.length > 0)) {
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isMobile, mobileMenuOpen, mobileNavStack.length, popMobileNavLevel]);

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

    const closeMobileMenu = React.useCallback(() => {
        setMobileMenuOpen(false);
        setMobileNavStack([]);
    }, []);

    const contextValue = React.useMemo(
        () => ({
            collapsed: isMobile ? false : collapsed,
            collapsible,
            doublePanel,
            toggleCollapsed,
            panelOpenForItemId,
            setPanelOpenForItemId,
            containerRef,
            isInsidePanel: false,
            selectedItemId: selectedItemId ?? null,
            onSelectedItemIdChange,
            isMobileMode: isMobile,
            mobileMenuOpen,
            closeMobileMenu,
            mobileNavLevel: mobileNavStack,
            pushMobileNavLevel,
            popMobileNavLevel,
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
            isMobile,
            mobileMenuOpen,
            closeMobileMenu,
            mobileNavStack,
            pushMobileNavLevel,
            popMobileNavLevel,
        ]
    );

    const currentWidth = collapsed ? COLLAPSED_WIDTH : width;

    if (process.env.NODE_ENV !== 'production') {
        const itemIds = new Set<string>();
        const duplicateIds = new Set<string>();

        const collectItemIds = (item: SidenavItemType): void => {
            if (itemIds.has(item.id)) {
                duplicateIds.add(item.id);
            } else {
                itemIds.add(item.id);
            }
            if (item.children) {
                item.children.forEach((child) => collectItemIds(child));
            }
        };

        if (sections) {
            sections.forEach((section) => {
                section.items.forEach((item) => collectItemIds(item));
            });
        }

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

    if (isMobile) {
        return (
            <ThemeVariant variant={normalizedVariant}>
                <SidenavBarContext.Provider value={contextValue}>
                    <div
                        className={styles.mobileContainer}
                        {...getPrefixedDataAttributes({testid: 'SidenavBarMobile', ...dataAttributes})}
                    >
                        <div className={styles.mobileTopBar}>
                            <IconButton
                                Icon={mobileMenuOpen ? IconCloseRegular : IconMenuRegular}
                                type="neutral"
                                backgroundType="transparent"
                                onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            />
                            {logoElement && <div className={styles.logo}>{logoElement}</div>}
                            <div className={styles.mobileTopBarControls} />
                        </div>

                        {mobileMenuOpen && (
                            <>
                                <div
                                    className={styles.mobilePanelOverlay}
                                    data-open={mobileMenuOpen}
                                    onClick={() => setMobileMenuOpen(false)}
                                    role="presentation"
                                />
                                <nav className={styles.mobilePanel} aria-label={ariaLabel}>
                                    {mobileNavStack.length > 0 && (
                                        <div className={styles.mobilePanelHeader}>
                                            <IconButton
                                                Icon={IconChevronLeftRegular}
                                                type="neutral"
                                                backgroundType="transparent"
                                                onPress={popMobileNavLevel}
                                                aria-label={getBackButtonText()}
                                            />
                                            <Text3 regular>{getBackButtonText()}</Text3>
                                        </div>
                                    )}
                                    <div className={styles.mobilePanelContent}>
                                        {mobileNavStack.length > 0 && (
                                            <div className={styles.sectionTitle}>
                                                <Text3 medium color={skinVars.colors.textSecondaryBrand}>
                                                    {mobileNavStack[mobileNavStack.length - 1].label}
                                                </Text3>
                                            </div>
                                        )}
                                        {mobileNavStack.length > 0
                                            ? mobileNavStack[mobileNavStack.length - 1].items.map((item) =>
                                                  renderSidenavItemFromData(item)
                                              )
                                            : sections?.map((section, sectionIndex) => (
                                                  <SidenavSection
                                                      key={section.title || `section-${sectionIndex}`}
                                                      title={section.title}
                                                      dividerTop={section.dividerTop}
                                                      dividerBottom={section.dividerBottom}
                                                  >
                                                      {section.items.map((item) =>
                                                          renderSidenavItemFromData(item)
                                                      )}
                                                  </SidenavSection>
                                              ))}
                                    </div>
                                </nav>
                            </>
                        )}
                    </div>
                </SidenavBarContext.Provider>
            </ThemeVariant>
        );
    }

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
                        {sections?.map((section, sectionIndex) => (
                            <SidenavSection
                                key={section.title || `section-${sectionIndex}`}
                                title={section.title}
                                dividerTop={section.dividerTop}
                                dividerBottom={section.dividerBottom}
                            >
                                {section.items.map((item) => renderSidenavItemFromData(item))}
                            </SidenavSection>
                        ))}
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
export {SidenavBar, SidenavSection, SidenavItem};
export {
    SidenavBarContext,
    useSidenavBarContext,
    SidenavLevelContext,
    generateItemId,
    assertChildrenAre,
    hasDescendantWithId,
};
export type {SidenavBarProps, SidenavSectionProps, SidenavBarBackgroundColors};
