'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as styles from './sidenav-bar.css';
import {DEFAULT_WIDTH, COLLAPSED_WIDTH, NESTING_INDENT} from './sidenav-bar.css';
import {ThemeVariant, normalizeVariant} from '../theme-variant-context';
import {getPrefixedDataAttributes} from '../utils/dom';
import {applyCssVars} from '../utils/css';
import {IconButton} from '../icon-button';
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
 * https://github.com/Telefonica/mistica-design/blob/main/specs/sidenav.md
 *
 * The public API (props of SidenavBar / SidenavSection / SidenavItem) is meant to
 * be stable enough to start the review. Several behaviours described in the spec are
 * intentionally not implemented yet and are marked with `TODO(sidenav)` so reviewers
 * can see the intended surface while the internals are iterated:
 *
 *   - Collapsed "dialog panel" and "double panel" rendering of nested items.
 *   - Mobile burger-menu behaviour (reuses MainNavigationBar patterns).
 *   - Layout wrapper for the main content (whole-viewport / centered).
 *   - Fixed header/footer scroll-intersection dividers.
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

// -----------------------------------------------------------------------------
// SidenavItem
// -----------------------------------------------------------------------------

interface SidenavItemBaseProps {
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
}

interface SidenavItemOnPressProps extends SidenavItemBaseProps {
    onPress: () => void;
    href?: undefined;
    to?: undefined;
}

interface SidenavItemHrefProps extends SidenavItemBaseProps {
    href: string;
    newTab?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    to?: undefined;
}

interface SidenavItemToProps extends SidenavItemBaseProps {
    to: string;
    newTab?: boolean;
    onNavigate?: () => void | Promise<void>;
    onPress?: undefined;
    href?: undefined;
}

/** An item that only groups children (it expands, it does not navigate). */
interface SidenavItemExpandOnlyProps extends SidenavItemBaseProps {
    children: React.ReactNode;
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
}

type SidenavItemProps = ExclusifyUnion<
    SidenavItemOnPressProps | SidenavItemHrefProps | SidenavItemToProps | SidenavItemExpandOnlyProps
>;

const SidenavItem = (props: SidenavItemProps): JSX.Element => {
    const {label, Icon, selected, right, children, defaultOpen, dataAttributes} = props;
    const {collapsed, doublePanel} = useSidenavBarContext();
    const level = React.useContext(SidenavLevelContext);

    const hasChildren = React.Children.count(children) > 0;
    const navigates = props.onPress !== undefined || props.href !== undefined || props.to !== undefined;

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
            {/* TODO(sidenav): when collapsed, render children in a dialog/double panel instead. */}
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

type SidenavBarProps = {
    children?: React.ReactNode;
    /** Accessible name of the navigation landmark. */
    'aria-label'?: string;
    /** Colour variant. Adapts the content appearance. @default 'default' */
    variant?: Variant;
    /** Renders the sidenav as a floating box. Incompatible with `divider`. @default false */
    boxed?: boolean;
    /** Shows the vertical right divider. Ignored when `boxed`. @default true */
    divider?: boolean;
    /** Whether the user can toggle the collapsed state. @default true */
    collapsible?: boolean;
    /** Controlled collapsed state. */
    collapsed?: boolean;
    /** Initial collapsed state (uncontrolled). @default false */
    defaultCollapsed?: boolean;
    /** Called when the collapsed state changes. */
    onCollapse?: (collapsed: boolean) => void;
    /** Opens nested items in a panel attached to the right of the sidenav. @default false */
    doublePanel?: boolean;
    /** Width of the expanded sidenav in px. @default 240 */
    width?: number;
    /** Width of the collapsed sidenav in px. @default 72 */
    collapsedWidth?: number;
    /** Optional logo rendered in the header. */
    logo?: React.ReactNode;
    /** Optional header slot rendered next to the collapse control. */
    header?: React.ReactNode;
    /** Optional footer slot rendered at the bottom. */
    footer?: React.ReactNode;
    /** Custom render for the collapse/uncollapse control. */
    renderCollapseButton?: (props: {collapsed: boolean; toggle: () => void}) => React.ReactNode;
    dataAttributes?: DataAttributes;
};

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
    header,
    footer,
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

    const showRightDivider = divider && !boxed;
    const currentWidth = collapsed ? collapsedWidth : width;

    const defaultCollapseButton = (
        <IconButton
            Icon={collapsed ? IconChevronRightDoubleRegular : IconChevronLeftDoubleRegular}
            type="neutral"
            backgroundType="transparent"
            onPress={toggleCollapsed}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        />
    );

    const hasHeader = Boolean(logo || collapsible || header || renderCollapseButton);

    return (
        <ThemeVariant variant={normalizeVariant(variant)}>
            <SidenavBarContext.Provider value={contextValue}>
                <nav
                    aria-label={ariaLabel}
                    className={classnames(styles.container, {
                        [styles.withRightDivider]: showRightDivider,
                        [styles.boxed]: boxed,
                    })}
                    style={applyCssVars({[styles.sidenavWidthVar]: `${currentWidth}px`})}
                    {...getPrefixedDataAttributes({testid: 'SidenavBar', ...dataAttributes})}
                >
                    {hasHeader && (
                        <div className={classnames(styles.header, {[styles.headerCollapsed]: collapsed})}>
                            {logo && !collapsed && <div className={styles.logo}>{logo}</div>}
                            {collapsible &&
                                (renderCollapseButton
                                    ? renderCollapseButton({collapsed, toggle: toggleCollapsed})
                                    : defaultCollapseButton)}
                            {header && !collapsed && <div className={styles.headerSlot}>{header}</div>}
                        </div>
                    )}
                    <div className={styles.body}>{children}</div>
                    {footer && <div className={styles.footer}>{footer}</div>}
                </nav>
            </SidenavBarContext.Provider>
        </ThemeVariant>
    );
};

export default SidenavBar;
export {SidenavBar, SidenavSection, SidenavItem};
export type {SidenavBarProps, SidenavSectionProps, SidenavItemProps};
