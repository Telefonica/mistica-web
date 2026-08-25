'use client';
import * as React from 'react';
import {
    BurgerMenuIcon,
    Header,
    NavigationBar,
    NavigationBarContentContainer,
    NavigationBarSideMargins,
} from '../navigation-shared';
import {MobileNavigationMenu} from '../mobile-navigation-menu';
import * as sharedStyles from '../navigation-shared.css';
import ResponsiveLayout, {ResetResponsiveLayout} from '../responsive-layout';
import {Row, RowList} from '../list';
import {Title1, Title3} from '../title';
import Touchable from '../touchable';
import FocusTrap from '../focus-trap';
import Stack from '../stack';
import Box from '../box';
import {Logo} from '../logo';
import {ThemeVariant} from '../theme-variant-context';
import {useDisableBodyScroll, useTheme} from '../hooks';
import {useSetModalState} from '../modal-context-provider';
import {NAVBAR_HEIGHT_MOBILE} from '../theme';
import * as tokens from '../text-tokens';
import {isSidenavSection} from './sidenav-types';

import type {NonDeprecatedVariant} from '../theme-variant-context';
import type {DataAttributes} from '../utils/types';
import type {SidenavEntry, SidenavItem, SidenavLogo} from './sidenav-types';

/*
 * The mobile sidenav follows the mobile Main Navigation Bar as closely as the spec asks:
 * https://github.com/Telefonica/mistica-design/blob/aweell-generate-figma-specs/specs/sidenav.md
 *
 * It shares the panel of that component (see `MobileNavigationMenu`) and the chrome of its top bar, so
 * both keep the same animation, the same margins and the same tokens. The differences that the spec lists:
 *
 *   - An item paints its right slot before the chevron.
 *   - A section paints its title, and never its dividers.
 *   - The second level shows the label of the parent, and no action of its own, because a parent with
 *     children does not navigate.
 *   - The footer slot flows at the end of the content of the panel.
 */

// The top bar is not a rail, so the logo shows the imagotype at the size of the mobile navigation bar.
const MOBILE_LOGO_SIZE = 40;

// Distance from the top bar to the first entry of the panel.
const PANEL_TOP_PADDING = 24;

// Space around the footer slot, and between two first-level entries.
const FOOTER_SLOT_PADDING = 16;
const ENTRY_SPACE = 32;

// Space between the title of a section and its first item.
const SECTION_TITLE_SPACE = 8;

// Space between the back bar of the second level and the label of the parent.
const BACK_BAR_SPACE = 16;

// The top bar and the panel share one focus trap, so the focus moves between the two of them. The group is
// not the group of the main navigation bar: a page that holds both components traps each one on its own.
const SIDENAV_FOCUS_TRAP_GROUP = 'sidenav-burger-menu-lock';

type SidenavMobileBarProps = {
    /** First-level entries of the panel. */
    entries?: ReadonlyArray<SidenavEntry>;
    /** Accessible name of the navigation landmark. */
    'aria-label': string;
    /** Variant of the top bar. The panel always renders in the default variant. */
    variant: NonDeprecatedVariant;
    /** Logo of the top bar. */
    logo?: SidenavLogo;
    /** Content of the right side of the top bar. */
    headerSlot?: React.ReactNode;
    /** Content of the end of the panel. */
    footerSlot?: React.ReactNode;
    /** ID of the currently selected item. It marks the item for a screen reader, and paints nothing. */
    selectedItemId: string | null;
    /** Called when the user presses an item that navigates. */
    onSelectedItemIdChange?: (id: string | null) => void;
    dataAttributes?: DataAttributes;
};

/** The items of the first level, in order: the items of every section, and every stand-alone item. */
const getFirstLevelItems = (entries: ReadonlyArray<SidenavEntry>): Array<SidenavItem> =>
    entries.flatMap((entry) => (isSidenavSection(entry) ? [...entry.items] : [entry as SidenavItem]));

const SidenavMobileBar = ({
    entries,
    'aria-label': ariaLabel,
    variant,
    logo,
    headerSlot,
    footerSlot,
    selectedItemId,
    onSelectedItemIdChange,
    dataAttributes,
}: SidenavMobileBarProps): JSX.Element => {
    const {texts, t} = useTheme();
    const menuId = React.useId();
    const setModalState = useSetModalState();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [disableFocusTrap, setDisableFocusTrap] = React.useState(true);
    // Id of the parent item whose children the second level shows. The sidenav holds two levels, so one id
    // describes the whole state of the panel.
    const [openedItemId, setOpenedItemId] = React.useState<string | null>(null);
    const [isSecondLevelOpen, setIsSecondLevelOpen] = React.useState(false);

    useDisableBodyScroll(isMenuOpen);

    const openMenu = () => {
        setIsMenuOpen(true);
        setModalState({isModalOpen: true});
    };

    const closeMenu = React.useCallback(() => {
        setIsMenuOpen(false);
        setModalState({isModalOpen: false});
    }, [setModalState]);

    const logoElement = (() => {
        if (logo === false) {
            return null;
        }
        if (typeof logo === 'function') {
            return logo({collapsed: false});
        }
        if (logo === undefined || logo === true) {
            return <Logo size={MOBILE_LOGO_SIZE} type="imagotype" />;
        }
        return logo;
    })();

    /**
     * One row of the panel. A parent item opens the second level, and never navigates. Any other item
     * navigates, moves the selection, and closes the panel, the same way that a row of the burger menu of
     * the main navigation bar does.
     */
    const renderRow = (item: SidenavItem): JSX.Element => {
        const commonProps = {
            title: item.label,
            right: item.rightSlot,
            'aria-current': selectedItemId === item.id ? ('page' as const) : undefined,
        };

        if (item.children?.length) {
            return (
                <Row
                    key={item.id}
                    {...commonProps}
                    onPress={() => {
                        setOpenedItemId(item.id);
                        setIsSecondLevelOpen(true);
                    }}
                />
            );
        }

        const navigate = async (callback?: () => void | Promise<void>) => {
            onSelectedItemIdChange?.(item.id);
            await callback?.();
            closeMenu();
        };

        if (item.href !== undefined) {
            return (
                <Row
                    key={item.id}
                    {...commonProps}
                    href={item.href}
                    newTab={item.newTab}
                    onNavigate={() => navigate(item.onNavigate)}
                />
            );
        }

        if (item.to !== undefined) {
            return (
                <Row
                    key={item.id}
                    {...commonProps}
                    to={item.to}
                    newTab={item.newTab}
                    onNavigate={() => navigate(item.onNavigate)}
                />
            );
        }

        return <Row key={item.id} {...commonProps} onPress={() => navigate(item.onPress)} />;
    };

    const renderEntry = (entry: SidenavEntry, entryIndex: number): JSX.Element => {
        if (!isSidenavSection(entry)) {
            return (
                <ResetResponsiveLayout key={(entry as SidenavItem).id}>
                    <RowList>{renderRow(entry as SidenavItem)}</RowList>
                </ResetResponsiveLayout>
            );
        }

        return (
            <Stack space={SECTION_TITLE_SPACE} key={entry.title || `section-${entryIndex}`}>
                {entry.title && <Title1>{entry.title}</Title1>}
                <ResetResponsiveLayout>
                    <RowList aria-label={entry.title}>{entry.items.map((item) => renderRow(item))}</RowList>
                </ResetResponsiveLayout>
            </Stack>
        );
    };

    const openedItem = openedItemId
        ? getFirstLevelItems(entries ?? []).find((item) => item.id === openedItemId)
        : undefined;

    const topBar = (
        <Header
            topFixed
            withBorder
            isBurgerMenuOpen={isMenuOpen}
            variant={variant}
            dataAttributes={{testid: 'SidenavBar', ...dataAttributes}}
        >
            <NavigationBarSideMargins wide={false}>
                <NavigationBarContentContainer right={headerSlot}>
                    <Touchable
                        className={sharedStyles.burgerMenuButton}
                        aria-live="polite"
                        aria-label={
                            isMenuOpen
                                ? texts.closeNavigationMenu || t(tokens.closeNavigationMenu)
                                : texts.openNavigationMenu || t(tokens.openNavigationMenu)
                        }
                        aria-expanded={isMenuOpen}
                        aria-controls={menuId}
                        onPress={isMenuOpen ? closeMenu : openMenu}
                    >
                        <BurgerMenuIcon isOpen={isMenuOpen} />
                    </Touchable>
                    {logoElement && <div className={sharedStyles.logoContainer}>{logoElement}</div>}
                </NavigationBarContentContainer>
            </NavigationBarSideMargins>
        </Header>
    );

    // The variant paints the top bar alone. The panel always renders in the default variant, so it stays
    // outside of this context: a portal keeps the context of the tree that renders it.
    return (
        <>
            <ThemeVariant variant={variant}>
                <FocusTrap disabled={disableFocusTrap} group={SIDENAV_FOCUS_TRAP_GROUP}>
                    {topBar}
                </FocusTrap>
            </ThemeVariant>
            <div className={sharedStyles.spacer} />
            <MobileNavigationMenu
                open={isMenuOpen}
                id={menuId}
                aria-label={ariaLabel}
                topOffset={NAVBAR_HEIGHT_MOBILE}
                secondLevelOpen={isSecondLevelOpen}
                onExited={() => {
                    setIsSecondLevelOpen(false);
                    setOpenedItemId(null);
                }}
                focusTrapGroup={SIDENAV_FOCUS_TRAP_GROUP}
                disableFocusTrap={disableFocusTrap}
                setDisableFocusTrap={setDisableFocusTrap}
                firstLevel={
                    <ResponsiveLayout>
                        <Box paddingTop={PANEL_TOP_PADDING}>
                            <Stack space={ENTRY_SPACE}>
                                {(entries ?? []).map((entry, entryIndex) => renderEntry(entry, entryIndex))}
                            </Stack>
                        </Box>
                        {footerSlot && <Box paddingY={FOOTER_SLOT_PADDING}>{footerSlot}</Box>}
                    </ResponsiveLayout>
                }
                secondLevel={
                    openedItem ? (
                        <ResponsiveLayout>
                            <Stack space={ENTRY_SPACE}>
                                <Stack space={BACK_BAR_SPACE}>
                                    <NavigationBar
                                        title={texts.backNavigationBar || t(tokens.backNavigationBar)}
                                        onBack={() => setIsSecondLevelOpen(false)}
                                        topFixed={false}
                                        withBorder={false}
                                    />
                                    <Title3>{openedItem.label}</Title3>
                                </Stack>
                                <ResetResponsiveLayout>
                                    <RowList aria-label={openedItem.label}>
                                        {(openedItem.children ?? []).map((child) => renderRow(child))}
                                    </RowList>
                                </ResetResponsiveLayout>
                            </Stack>
                        </ResponsiveLayout>
                    ) : null
                }
            />
        </>
    );
};

export {SidenavMobileBar};
export type {SidenavMobileBarProps};
