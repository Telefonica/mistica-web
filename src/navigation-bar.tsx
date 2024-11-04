'use client';
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import classnames from 'classnames';
import ResponsiveLayout, {ResetResponsiveLayout} from './responsive-layout';
import Inline from './inline';
import Touchable, {BaseTouchable} from './touchable';
import {Text2, Text3} from './text';
import {useScreenSize, useTheme} from './hooks';
import IconMenuRegular from './generated/mistica-icons/icon-menu-regular';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import {IconButton} from './icon-button';
import {Row, RowList} from './list';
import {ThemeVariant, useIsInverseOrMediaVariant} from './theme-variant-context';
import FocusTrap from './focus-trap';
import {Portal} from './portal';
import GridLayout from './grid-layout';
import {useSetModalState} from './modal-context-provider';
import {Logo} from './logo';
import {vars} from './skins/skin-contract.css';
import * as styles from './navigation-bar.css';
import {cancelEvent, getPrefixedDataAttributes} from './utils/dom';
import Stack from './stack';
import Box from './box';
import {isRunningAcceptanceTest} from './utils/platform';
import * as tokens from './text-tokens';
import {NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_DESKTOP_LARGE} from './theme';
import TextLink from './text-link';
import {Title1, Title3} from './title';
import {ButtonLink} from './button';
import {Grid, GridItem} from './grid';
import {DOWN, ESC, UP} from './utils/keys';
import {isEqual} from './utils/helpers';

import type {ExclusifyUnion} from './utils/utility-types';
import type {Variant} from './theme-variant-context';
import type {TouchableProps} from './touchable';
import type {DataAttributes, HeadingType} from './utils/types';

const supportsCssMin = () => {
    const element = document.createElement('div');
    element.style.height = 'min(2px, 3px)';
    return element.style.height === 'calc(2px)';
};

const BurgerMenuIcon = ({isOpen}: {isOpen: boolean}) => {
    return (
        <div className={styles.burgerIconContainer} role="presentation" data-component-name="BurgerMenuIcon">
            <div className={isOpen ? styles.iconCloseOpen : styles.iconCloseHidden}>
                <IconCloseRegular />
            </div>
            <div className={isOpen ? styles.iconMenuHidden : styles.iconMenuOpen}>
                <IconMenuRegular />
            </div>
        </div>
    );
};

type HeaderProps = {
    children: React.ReactNode;
    topFixed?: boolean;
    variant?: Variant;
    withBorder?: boolean;
    isBurgerMenuOpen?: boolean;
    dataAttributes?: DataAttributes;
    isBottomRow?: boolean;
};

const Header = ({
    children,
    topFixed,
    withBorder,
    isBurgerMenuOpen,
    variant = 'default',
    dataAttributes,
}: HeaderProps) => {
    const {isDarkMode} = useTheme();

    const getBorderClass = () => {
        const inverse = variant === 'inverse' && !isDarkMode;
        if (inverse || !withBorder) return styles.navbarBorderColorVariants.noBorder;
        if (isBurgerMenuOpen) return styles.navbarBorderColorVariants.menuOpen;

        return styles.navbarBorderColorVariants.default;
    };

    const backgroundColor: {[key in Variant]: string} = {
        default: vars.colors.background,
        inverse: vars.colors.navigationBarBackground,
        alternative: vars.colors.backgroundAlternative,
        media: vars.colors.navigationBarBackground,
    };

    return (
        <header
            className={classnames(getBorderClass(), {[styles.topFixed]: topFixed})}
            style={{
                background: backgroundColor[variant],
            }}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {children}
        </header>
    );
};

type NavigationBarContentContainerProps = {
    right?: React.ReactNode;
    children?: React.ReactNode;
    desktopOnly?: boolean;
};

const NavigationBarContentContainer = React.forwardRef<HTMLDivElement, NavigationBarContentContainerProps>(
    ({right, children, desktopOnly}, ref) => {
        return (
            <div
                ref={ref}
                className={classnames(styles.navigationBarContent, {[styles.desktopOnly]: desktopOnly})}
            >
                {children}
                {right && <div className={styles.navigationBarContentRight}>{right}</div>}
            </div>
        );
    }
);

interface NavigationBarCommonProps {
    variant?: Variant;
    onBack?: () => void;
    title?: string;
    titleAs?: HeadingType;
    right?: React.ReactElement;
    withBorder?: boolean;
    children?: undefined;
}

interface NavigationBarTopFixedProps extends NavigationBarCommonProps {
    topFixed?: true;
    paddingX?: undefined;
}

interface NavigationBarNotFixedProps extends NavigationBarCommonProps {
    topFixed: false;
    paddingX?: number;
}

type NavigationBarProps = NavigationBarTopFixedProps | NavigationBarNotFixedProps;

export const NavigationBar = ({
    onBack,
    title,
    titleAs,
    right,
    variant = 'default',
    topFixed = true,
    paddingX = 0,
    withBorder = true,
}: NavigationBarProps): JSX.Element => {
    const {texts, t} = useTheme();
    const content = (
        <NavigationBarContentContainer right={right}>
            <Inline space={24} alignItems="center">
                {onBack && (
                    <IconButton
                        aria-label={texts.backNavigationBar || t(tokens.backNavigationBar)}
                        onPress={onBack}
                        Icon={IconChevronLeftRegular}
                        bleedLeft
                        bleedRight
                    />
                )}
                <Text3 regular truncate as={titleAs}>
                    {title}
                </Text3>
            </Inline>
        </NavigationBarContentContainer>
    );
    return (
        <ThemeVariant variant={variant}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                variant={variant}
                dataAttributes={{'component-name': 'NavigationBar'}}
            >
                {topFixed ? (
                    <ResponsiveLayout>{content}</ResponsiveLayout>
                ) : (
                    <div
                        style={{
                            padding: `0 ${paddingX}px`,
                            width: '100%',
                        }}
                    >
                        {content}
                    </div>
                )}
            </Header>
            {topFixed && <div className={styles.spacer} />}
        </ThemeVariant>
    );
};

type InteractiveProps = ExclusifyUnion<{href: string} | {to: string} | {onPress: () => void}>;
type MaybeInteractiveProps = ExclusifyUnion<{href?: string} | {to?: string} | {onPress?: () => void}>;

type SectionItem = {title: string} & InteractiveProps;

type SectionColumn = {
    title: string;
    items: ReadonlyArray<SectionItem>;
};

type SectionMenu = ExclusifyUnion<
    | {columns: ReadonlyArray<SectionColumn>}
    // Content prop can receive a function as value with the closeMenu callback as parameter.
    // In this way, custom content can also force the menu to close programmatically.
    | {content?: React.ReactElement | ((props: {closeMenu: () => void}) => React.ReactElement)}
>;

type MainNavigationBarSection = {
    title: string;
    menu?: SectionMenu;
} & MaybeInteractiveProps;

type MainNavigationBarProps = {
    sections?: ReadonlyArray<MainNavigationBarSection>;
    selectedIndex?: number;
    right?: React.ReactElement;
    logo?: React.ReactElement;
    variant?: Variant;
    children?: undefined;
    topFixed?: boolean;
    withBorder?: boolean;
    burgerMenuExtra?: React.ReactNode;
    large?: boolean;
    desktopSmallMenu?: boolean;
};

type MainNavigationBarDesktopMenuState = {
    isMenuOpen: boolean;
    openedSection: number;
    setSectionAsActive: (index: number) => void;
    setSectionAsInactive: (index: number, forceCloseMenu?: boolean) => void;
    closeMenu: () => void;
    onMenuExited: () => void;
    setIsMenuHovered: (value: boolean) => void;
    setFocusedItem: (item?: {column: number; index: number}) => void;
};

const MainNavigationBarDesktopMenuContext = React.createContext<MainNavigationBarDesktopMenuState>({
    isMenuOpen: false,
    openedSection: -1,
    setSectionAsActive: () => {},
    setSectionAsInactive: () => {},
    closeMenu: () => {},
    onMenuExited: () => {},
    setIsMenuHovered: () => {},
    setFocusedItem: () => {},
});

const MainNavigationBarDesktopMenuContextProvider = ({
    children,
    sections,
    isSmallMenu,
}: {
    children: React.ReactNode;
    sections?: ReadonlyArray<MainNavigationBarSection>;
    isSmallMenu?: boolean;
}): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMenuHovered, setIsMenuHovered] = React.useState(false);

    // Item that is currently focused inside a section. This state is used to handle pressing
    // up/down arrows to navigate through the items of a section.
    const [focusedItem, setFocusedItem] = React.useState<{column: number; index: number} | undefined>();

    // Section that has been hovered. This state is used to determine whether the menu should be open or closed.
    const [activeSection, setActiveSection] = React.useState(-1);

    // Section that is currently being rendered. We keep this as a different state from activeSection
    // because when the large menu is closing, we still need to display the section that was opened.
    const [openedSection, setOpenedSection] = React.useState(-1);

    const closeMenu = React.useCallback(() => {
        setIsMenuHovered(false);
        setActiveSection(-1);
    }, []);

    // Callback used when a section has been hovered or it's focused arrow has been pressed while it's closed
    const setSectionAsActive = React.useCallback(
        (index: number) => {
            if (sections?.[index]?.menu) {
                setActiveSection(index);
            } else {
                // If the section has no menu, close the current opened one
                closeMenu();
            }
        },
        [sections, closeMenu]
    );

    // Callback used when a section has been blurred or it's focused arrow has been pressed while it's open
    const setSectionAsInactive = React.useCallback(
        (index: number, forceCloseMenu?: boolean) => {
            if (index === openedSection) {
                // We may want to close the menu even when menu is hovered, and if so, we should reset isMenuHovered
                // (for example, when the current menu is being hovered and we press the arrow from another section)
                if (forceCloseMenu) {
                    closeMenu();
                } else {
                    setActiveSection(-1);
                }
            }
        },
        [openedSection, closeMenu]
    );

    // Callback used to reset openedSection once the large menu close animation has finished
    const onMenuExited = React.useCallback(() => {
        setOpenedSection(-1);
    }, []);

    // Close menu when viewport is too small
    React.useEffect(() => {
        if (isTabletOrSmaller) {
            closeMenu();
            setOpenedSection(-1);
        }
    }, [isTabletOrSmaller, closeMenu]);

    React.useEffect(() => {
        if (activeSection === -1 && !isMenuHovered) {
            setIsMenuOpen(false);
            if (isSmallMenu) {
                // When rendering the small menu, we don't need to wait for the animation to finish
                onMenuExited();
            }
        } else if (activeSection !== -1) {
            setOpenedSection(activeSection);
            setIsMenuOpen(true);
        }
    }, [isMenuHovered, activeSection, isSmallMenu, onMenuExited]);

    const focusItem = React.useCallback(
        (item: {column: number; index: number} | undefined) => {
            if (!isEqual(focusedItem, item)) {
                setFocusedItem(item);
            }
        },
        [focusedItem]
    );

    React.useEffect(() => {
        // Find all the items of the section and focus the next (or previous) element
        const focusNextItem = (reverse?: boolean) => {
            if (focusedItem) {
                const itemsContainer = document.querySelector('[data-navigation-bar-menu-items]');
                const itemsList = Array.from(itemsContainer?.querySelectorAll('a,button') || []);

                const currentIndex = itemsList.findIndex((el) =>
                    el.hasAttribute(
                        `data-navigation-bar-menu-item-${focusedItem.column}-${focusedItem.index}`
                    )
                );

                const nextIndex = reverse ? currentIndex - 1 : currentIndex + 1;
                (itemsList[(nextIndex + itemsList.length) % itemsList.length] as HTMLElement).focus();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case DOWN:
                    if (focusedItem) {
                        cancelEvent(e);
                        focusNextItem();
                    }
                    break;

                case UP:
                    if (focusedItem) {
                        cancelEvent(e);
                        focusNextItem(true);
                    }
                    break;

                case ESC:
                    closeMenu();
                    break;

                default:
                // Do nothing
            }
        };
        // Close menu when ESC key is pressed or when scrolling in the page
        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('scroll', closeMenu);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
            document.removeEventListener('scroll', closeMenu);
        };
    }, [closeMenu, focusedItem]);

    React.useEffect(() => {
        // Restore focusedItem when opened section changes (or when the menu is closed)
        setFocusedItem(undefined);
    }, [openedSection]);

    return (
        <MainNavigationBarDesktopMenuContext.Provider
            value={{
                isMenuOpen,
                openedSection,
                setSectionAsActive,
                setSectionAsInactive,
                closeMenu,
                onMenuExited,
                setIsMenuHovered,
                setFocusedItem: focusItem,
            }}
        >
            {children}
        </MainNavigationBarDesktopMenuContext.Provider>
    );
};

const getInteractivePropsWithCloseMenu = (interactiveProps: InteractiveProps, closeMenu: () => void) => {
    if (
        interactiveProps.href === undefined &&
        interactiveProps.onPress === undefined &&
        interactiveProps.to === undefined
    ) {
        return {onPress: closeMenu};
    }

    return interactiveProps.onPress
        ? {
              onPress: () => {
                  interactiveProps.onPress();
                  closeMenu();
              },
          }
        : {...interactiveProps, onNavigate: () => closeMenu()};
};

export const useMainNavigationBarDesktopMenuState = (): MainNavigationBarDesktopMenuState =>
    React.useContext(MainNavigationBarDesktopMenuContext);

const MainNavigationBarBurgerMenu = ({
    sections,
    extra,
    closeMenu,
    open,
    id,
    disableFocusTrap,
    setDisableFocusTrap,
}: {
    sections: ReadonlyArray<MainNavigationBarSection>;
    extra: React.ReactNode;
    closeMenu: () => void;
    open: boolean;
    id: string;
    disableFocusTrap: boolean;
    setDisableFocusTrap: (value: boolean) => void;
}) => {
    const {texts, t, isDarkMode} = useTheme();
    const [openedSection, setOpenedSection] = React.useState(-1);
    const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const menuContentRef = React.useRef<HTMLDivElement>(null);

    const shadowAlpha = isDarkMode ? 1 : 0.2;
    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.BURGER_MENU_ANIMATION_DURATION_MS;

    const renderSection = (index: number) => {
        const {title, menu, ...interactiveProps} = sections[index];
        const columns = menu?.columns || [];
        const customContent = menu?.content;
        const hasCustomInteraction =
            interactiveProps.href !== undefined ||
            interactiveProps.onPress !== undefined ||
            interactiveProps.to !== undefined;

        return (
            <ResponsiveLayout>
                <Stack space={32}>
                    <Stack space={16}>
                        <NavigationBar
                            title={texts.backNavigationBar || t(tokens.backNavigationBar)}
                            onBack={() => setIsSubMenuOpen(false)}
                            topFixed={false}
                            withBorder={false}
                        />
                        <Title3
                            right={
                                hasCustomInteraction ? (
                                    <ButtonLink
                                        small
                                        bleedY
                                        bleedRight
                                        withChevron
                                        // Close the menu when "See all" button is pressed
                                        {...getInteractivePropsWithCloseMenu(
                                            interactiveProps as InteractiveProps,
                                            closeMenu
                                        )}
                                    >
                                        {texts.mainNavigationBarSectionSeeAll ||
                                            t(tokens.mainNavigationBarSectionSeeAll)}
                                    </ButtonLink>
                                ) : undefined
                            }
                        >
                            {sections[index].title}
                        </Title3>
                    </Stack>

                    {customContent ? (
                        <Box paddingBottom={16}>
                            {typeof customContent === 'function' ? customContent({closeMenu}) : customContent}
                        </Box>
                    ) : (
                        columns.map((column, columnIndex) => (
                            <Stack space={8} key={columnIndex}>
                                <Title1> {column.title}</Title1>
                                <ResetResponsiveLayout>
                                    <RowList>
                                        {column.items.map(
                                            ({title: itemTitle, ...itemInteractiveProps}, itemIndex) => (
                                                <Row
                                                    key={itemIndex}
                                                    title={itemTitle}
                                                    // Close the menu when one of the rows is pressed
                                                    {...getInteractivePropsWithCloseMenu(
                                                        itemInteractiveProps,
                                                        closeMenu
                                                    )}
                                                />
                                            )
                                        )}
                                    </RowList>
                                </ResetResponsiveLayout>
                            </Stack>
                        ))
                    )}
                </Stack>
            </ResponsiveLayout>
        );
    };

    return (
        <Portal>
            <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                <CSSTransition
                    onEntered={() => setDisableFocusTrap(false)}
                    onExiting={() => setDisableFocusTrap(true)}
                    onExited={() => {
                        setIsSubMenuOpen(false);
                        setOpenedSection(-1);
                    }}
                    classNames={styles.burgerMenuTransition}
                    in={open}
                    nodeRef={menuRef}
                    timeout={menuAnimationDuration}
                    mountOnEnter
                    unmountOnExit
                >
                    <nav
                        className={styles.burgerMenu}
                        style={{boxShadow: `6px 0 4px -4px rgba(0, 0, 0, ${shadowAlpha})`}}
                        id={id}
                        ref={menuRef}
                    >
                        <CSSTransition
                            timeout={menuAnimationDuration}
                            in={isSubMenuOpen}
                            nodeRef={menuContentRef}
                        >
                            {(transitionStatus) => (
                                <div
                                    ref={menuContentRef}
                                    style={{
                                        transition: `transform ${menuAnimationDuration}ms ease-out`,
                                        transform: `translate(${isSubMenuOpen ? '-100vw' : '0vw'})`,
                                    }}
                                >
                                    {transitionStatus !== 'entered' && (
                                        <div className={styles.burgerMainMenuContainer}>
                                            <ResponsiveLayout>
                                                <ResetResponsiveLayout>
                                                    <RowList>
                                                        {sections.map(
                                                            ({title, menu, ...interactiveProps}, index) => (
                                                                <Row
                                                                    key={index}
                                                                    title={title}
                                                                    {...(menu
                                                                        ? {
                                                                              onPress: () => {
                                                                                  setIsSubMenuOpen(true);
                                                                                  setOpenedSection(index);
                                                                              },
                                                                          }
                                                                        : // Close the menu when one of the rows is pressed
                                                                          getInteractivePropsWithCloseMenu(
                                                                              interactiveProps as InteractiveProps,
                                                                              closeMenu
                                                                          ))}
                                                                />
                                                            )
                                                        )}
                                                    </RowList>
                                                </ResetResponsiveLayout>
                                                {extra && <Box paddingY={16}>{extra}</Box>}
                                            </ResponsiveLayout>
                                        </div>
                                    )}

                                    {transitionStatus !== 'exited' && openedSection !== -1 && (
                                        <div className={styles.burgerSubMenuContainer}>
                                            {renderSection(openedSection)}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CSSTransition>
                    </nav>
                </CSSTransition>
            </FocusTrap>
        </Portal>
    );
};

const MainNavigationBarDesktopMenuSectionColumn = ({
    column,
    columnIndex,
}: {
    column: SectionColumn;
    columnIndex: number;
}) => {
    const {setFocusedItem, closeMenu} = useMainNavigationBarDesktopMenuState();

    return (
        <Stack space={24}>
            <Text2 medium color={vars.colors.textSecondary} transform="uppercase">
                {column.title}
            </Text2>

            <Stack space={16} role="list">
                {column.items.map(({title, ...touchableProps}, itemIdx) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <div
                        key={itemIdx}
                        onFocus={() => setFocusedItem({column: columnIndex, index: itemIdx})}
                        onBlur={() => setFocusedItem(undefined)}
                        role="listitem"
                    >
                        <TextLink
                            className={styles.desktopMenuColumnItem}
                            dataAttributes={{
                                [`navigation-bar-menu-item-${columnIndex}-${itemIdx}`]: 'true',
                            }}
                            // Close the menu when one of the section items is pressed
                            {...getInteractivePropsWithCloseMenu(touchableProps, closeMenu)}
                        >
                            {title}
                        </TextLink>
                    </div>
                ))}
            </Stack>
        </Stack>
    );
};

const MainNavigationBarDesktopMenu = ({
    sections,
    isLargeNavigationBar,
}: {
    sections: ReadonlyArray<MainNavigationBarSection>;
    isLargeNavigationBar: boolean;
}): JSX.Element => {
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [menuHeight, setMenuHeight] = React.useState('0px');
    const [isMenuContentScrollable, setIsMenuContentScrollable] = React.useState(false);
    const isAnySectionOpened = React.useRef(false);

    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.DESKTOP_MENU_ANIMATION_DURATION_MS;
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const bottomSpace = 40;

    const {isMenuOpen, openedSection, closeMenu, onMenuExited, setIsMenuHovered} =
        useMainNavigationBarDesktopMenuState();

    React.useEffect(() => {
        // Scroll to top of the content if the opened section changed
        if (menuRef.current) {
            menuRef.current.scrollTop = 0;
        }

        // Disable scroll in menu content until height's animation is finished to avoid
        // showing the scrollbar while the menu's container is changing it's height
        setIsMenuContentScrollable(false);
        if (isMenuOpen) {
            const id = setTimeout(() => setIsMenuContentScrollable(true), menuAnimationDuration);
            return () => clearTimeout(id);
        }
    }, [isMenuOpen, openedSection, menuAnimationDuration]);

    const columns = sections[openedSection]?.menu?.columns || [];
    const customContent = sections[openedSection]?.menu?.content;

    return (
        <div className={styles.desktopOnly}>
            <ResetResponsiveLayout>
                <div className={styles.desktopMenuWrapper} style={{top: topSpace}}>
                    <CSSTransition
                        in={isMenuOpen}
                        timeout={menuAnimationDuration}
                        nodeRef={menuRef}
                        mountOnEnter
                        unmountOnExit
                        onEnter={() => {
                            // Hack to be able to set the fade-in effect in the content after the first render
                            isAnySectionOpened.current = true;
                        }}
                        onExiting={() => setIsMenuContentScrollable(false)}
                        onExited={() => {
                            isAnySectionOpened.current = false;
                            onMenuExited();
                        }}
                    >
                        <div
                            className={styles.desktopMenuContainer}
                            onMouseEnter={() => setIsMenuHovered(true)}
                            onMouseLeave={() => setIsMenuHovered(false)}
                            ref={menuRef}
                            style={{
                                height: menuHeight,
                                maxHeight: `calc(100vh - ${topSpace}px - ${bottomSpace}px)`,
                                overflowY: isMenuContentScrollable ? 'auto' : 'hidden',
                            }}
                        >
                            <ResponsiveLayout>
                                <div
                                    className={classnames(styles.desktopMenu, {
                                        [styles.desktopMenuContentFadeIn]: isAnySectionOpened.current,
                                    })}
                                    ref={(el) => {
                                        if (el) {
                                            // In old browsers where min() is not supported, the speed of the menu
                                            // height's animation will depend on the height of the content instead of
                                            // the height of the container.
                                            const value = supportsCssMin()
                                                ? `min(${el.scrollHeight}px, calc(100vh - ${topSpace}px - ${bottomSpace}px))`
                                                : `${el.scrollHeight}px`;
                                            setMenuHeight(!isMenuOpen ? '0px' : value);
                                        }
                                    }}
                                >
                                    {customContent ? (
                                        typeof customContent === 'function' ? (
                                            customContent({closeMenu})
                                        ) : (
                                            customContent
                                        )
                                    ) : (
                                        <Grid
                                            rows={1}
                                            columns={12}
                                            gap={[24, 40]}
                                            dataAttributes={{'navigation-bar-menu-items': 'true'}}
                                        >
                                            {columns.map((column, columnIdx) => (
                                                <GridItem key={columnIdx} columnSpan={2}>
                                                    <MainNavigationBarDesktopMenuSectionColumn
                                                        column={column}
                                                        columnIndex={columnIdx}
                                                    />
                                                </GridItem>
                                            ))}
                                        </Grid>
                                    )}
                                </div>
                            </ResponsiveLayout>
                        </div>
                    </CSSTransition>
                </div>
            </ResetResponsiveLayout>
        </div>
    );
};

const MainNavigationBarDesktopSmallMenu = ({
    section,
    isLargeNavigationBar,
    leftPosition,
    index,
}: {
    section: MainNavigationBarSection;
    isLargeNavigationBar: boolean;
    leftPosition: number;
    index: number;
}): JSX.Element => {
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const bottomSpace = 40;

    const columns = section.menu?.columns || [];
    const customContent = section?.menu?.content;

    const {openedSection, setIsMenuHovered, closeMenu} = useMainNavigationBarDesktopMenuState();

    return (
        <div className={styles.desktopOnly}>
            {index === openedSection && (
                <div
                    className={styles.desktopSmallMenuContainer}
                    onMouseEnter={() => setIsMenuHovered(true)}
                    onMouseLeave={() => setIsMenuHovered(false)}
                    style={{
                        top: topSpace,
                        left: leftPosition,
                        maxHeight: `calc(100vh - ${topSpace}px - ${bottomSpace}px)`,
                    }}
                >
                    {customContent ? (
                        typeof customContent === 'function' ? (
                            customContent({closeMenu})
                        ) : (
                            customContent
                        )
                    ) : (
                        <Stack space={40} dataAttributes={{'navigation-bar-menu-items': 'true'}}>
                            {columns.map((column, columnIdx) => (
                                <MainNavigationBarDesktopMenuSectionColumn
                                    key={columnIdx}
                                    column={column}
                                    columnIndex={columnIdx}
                                />
                            ))}
                        </Stack>
                    )}
                </div>
            )}
        </div>
    );
};

const MainNavigationBarDesktopSection = ({
    section,
    index,
    selectedIndex,
    isFirstSection,
    isLastSection,
    navigationBarRef,
    variant,
    isLargeNavigationBar,
    desktopSmallMenu,
}: {
    section: MainNavigationBarSection;
    index: number;
    selectedIndex?: number;
    isFirstSection: boolean;
    isLastSection: boolean;
    navigationBarRef: React.RefObject<HTMLDivElement>;
    variant?: Variant;
    isLargeNavigationBar: boolean;
    desktopSmallMenu?: boolean;
}): JSX.Element => {
    const {texts, t} = useTheme();
    const {title, menu, ...touchableProps} = section;
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const [smallMenuLeftPosition, setSmallMenuLeftPosition] = React.useState(0);
    const [isArrowFocused, setIsArrowFocused] = React.useState(false);
    const {openedSection, setSectionAsActive, setSectionAsInactive} = useMainNavigationBarDesktopMenuState();

    const hasCustomInteraction =
        touchableProps.href !== undefined ||
        touchableProps.onPress !== undefined ||
        touchableProps.to !== undefined;

    const openSectionMenu = React.useCallback(() => {
        // Align small menu to left border of the section if it fits. Otherwise, align it to the right border
        const getSmallMenuLeftPosition = () => {
            const {left, right} = sectionRef.current?.getBoundingClientRect() || {left: 0, right: 0};
            const maxLeftOffset =
                (navigationBarRef.current?.getBoundingClientRect().right || 0) -
                styles.DESKTOP_SMALL_MENU_WIDTH;

            return left <= maxLeftOffset ? left : right - styles.DESKTOP_SMALL_MENU_WIDTH;
        };

        if (desktopSmallMenu) {
            setSmallMenuLeftPosition(getSmallMenuLeftPosition());
        }

        setSectionAsActive(index);
    }, [desktopSmallMenu, index, setSectionAsActive, navigationBarRef]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const shouldReactOnArrowKeyPress = isArrowFocused || (menu && !hasCustomInteraction);

            switch (e.key) {
                // If arrow is focused and DOWN key is pressed, open the menu if it was closed
                case DOWN:
                    if (shouldReactOnArrowKeyPress) {
                        cancelEvent(e);
                        openSectionMenu();
                    }
                    break;

                // If arrow is focused and UP key is pressed, close the menu if it was opened
                case UP:
                    if (shouldReactOnArrowKeyPress) {
                        cancelEvent(e);
                        setSectionAsInactive(index, true);
                    }
                    break;

                default:
                // Do nothing
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [index, isArrowFocused, openSectionMenu, setSectionAsInactive, menu, hasCustomInteraction]);

    const getSectionInteractiveProps = React.useCallback(
        (touchableProps: InteractiveProps) => {
            // Open or close the menu when a section without interaction is pressed
            if (!hasCustomInteraction) {
                return {
                    onPress: () => {
                        if (index !== openedSection) {
                            openSectionMenu();
                        } else {
                            setSectionAsInactive(index, true);
                        }
                    },
                };
            }

            return touchableProps as InteractiveProps;
        },
        [hasCustomInteraction, index, openSectionMenu, openedSection, setSectionAsInactive]
    );

    return (
        <div className={styles.desktopMenuSectionWithArrowWrapper}>
            <div
                ref={sectionRef}
                className={classnames(styles.desktopMenuSectionContainer, {
                    [styles.desktopMenuFirstSection]: isFirstSection,
                    [styles.desktopMenuLastSection]: isLastSection,
                })}
                onMouseEnter={() => openSectionMenu()}
                onMouseLeave={() => setSectionAsInactive(index)}
            >
                <BaseTouchable
                    {...getSectionInteractiveProps(touchableProps as InteractiveProps)}
                    aria-label={
                        !hasCustomInteraction
                            ? `${section.title}, ${texts.mainNavigationBarOpenSectionMenu || t(tokens.mainNavigationBarOpenSectionMenu)}`
                            : undefined
                    }
                    aria-haspopup={!hasCustomInteraction}
                    aria-expanded={!hasCustomInteraction ? openedSection === index : undefined}
                    className={classnames(
                        styles.section,
                        {
                            [styles.selectedSectionVariantes[variant === 'inverse' ? 'inverse' : 'default']]:
                                index === selectedIndex,
                        },
                        styles.textWrapperVariants[variant === 'inverse' ? 'inverse' : 'default']
                    )}
                >
                    <Text3 regular color="inherit">
                        {title}
                    </Text3>
                </BaseTouchable>
            </div>
            {menu && (
                <>
                    {hasCustomInteraction && (
                        <div
                            className={styles.desktopMenuSectionArrowContainer}
                            onFocus={() => setIsArrowFocused(true)}
                            onBlur={() => setIsArrowFocused(false)}
                        >
                            <BaseTouchable
                                className={styles.desktopMenuSectionArrow}
                                aria-label={`${section.title}, ${texts.mainNavigationBarOpenSectionMenu || t(tokens.mainNavigationBarOpenSectionMenu)}`}
                                aria-haspopup
                                aria-expanded={openedSection === index}
                                onPress={() => {
                                    if (isArrowFocused) {
                                        if (index !== openedSection) {
                                            openSectionMenu();
                                        } else {
                                            setSectionAsInactive(index, true);
                                        }
                                    }
                                }}
                                style={{
                                    pointerEvents: isArrowFocused ? 'auto' : 'none',
                                    opacity: isArrowFocused ? 1 : 0,
                                }}
                            >
                                <IconChevronLeftRegular
                                    size={8}
                                    style={{
                                        transform: `rotate(${openedSection === index ? 90 : -90}deg)`,
                                    }}
                                />
                            </BaseTouchable>
                        </div>
                    )}
                    {desktopSmallMenu && (
                        <MainNavigationBarDesktopSmallMenu
                            section={section}
                            isLargeNavigationBar={isLargeNavigationBar}
                            leftPosition={smallMenuLeftPosition}
                            index={index}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export const MainNavigationBar = ({
    sections = [],
    selectedIndex,
    right,
    variant = 'default',
    topFixed = true,
    withBorder = true,
    burgerMenuExtra,
    logo,
    large = false,
    desktopSmallMenu = false,
}: MainNavigationBarProps): JSX.Element => {
    const {texts, t} = useTheme();
    const menuId = React.useId();
    const {isTabletOrSmaller} = useScreenSize();
    const logoElement = logo || <Logo size={{mobile: 40, desktop: 48}} />;
    const hasBottomSections = large && sections.length > 0;

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
    const [disableFocusTrap, setDisableFocusTrap] = React.useState(true);
    const navigationBarRef = React.useRef<HTMLDivElement>(null);
    const setModalState = useSetModalState();

    const renderDesktopSections = () => {
        return (
            <nav className={styles.desktopOnly}>
                <Inline space={32}>
                    {sections.map((section, idx) => (
                        <MainNavigationBarDesktopSection
                            key={idx}
                            index={idx}
                            selectedIndex={selectedIndex}
                            navigationBarRef={navigationBarRef}
                            isFirstSection={idx === 0}
                            isLastSection={idx === sections.length - 1}
                            variant={variant}
                            section={section}
                            isLargeNavigationBar={hasBottomSections}
                            desktopSmallMenu={desktopSmallMenu}
                        />
                    ))}
                    {!desktopSmallMenu && (
                        <MainNavigationBarDesktopMenu
                            sections={sections}
                            isLargeNavigationBar={hasBottomSections}
                        />
                    )}
                </Inline>
            </nav>
        );
    };

    const openMenu = () => {
        setIsBurgerMenuOpen(true);
        setModalState({isModalOpen: true});
    };

    const closeMenu = () => {
        setIsBurgerMenuOpen(false);
        setModalState({isModalOpen: false});
    };

    const showBurger = sections.length > 1;

    const mainNavBar = (
        <ThemeVariant variant={variant}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                isBurgerMenuOpen={isBurgerMenuOpen}
                variant={variant}
                dataAttributes={{'component-name': 'MainNavigationBar'}}
            >
                <ResponsiveLayout>
                    <NavigationBarContentContainer ref={navigationBarRef} right={right}>
                        <div className={styles.mainNavbarContent}>
                            {showBurger && (
                                <Touchable
                                    className={styles.burgerMenuButton}
                                    aria-live="polite"
                                    aria-label={
                                        isBurgerMenuOpen
                                            ? texts.closeNavigationMenu || t(tokens.closeNavigationMenu)
                                            : texts.openNavigationMenu || t(tokens.openNavigationMenu)
                                    }
                                    aria-expanded={isBurgerMenuOpen}
                                    aria-controls={menuId}
                                    onPress={isBurgerMenuOpen ? closeMenu : openMenu}
                                >
                                    <BurgerMenuIcon isOpen={isBurgerMenuOpen} />
                                </Touchable>
                            )}
                            <div className={styles.logoContainer}>{logoElement}</div>
                            {!hasBottomSections && renderDesktopSections()}
                        </div>
                    </NavigationBarContentContainer>
                    {hasBottomSections && (
                        <NavigationBarContentContainer desktopOnly>
                            {renderDesktopSections()}
                        </NavigationBarContentContainer>
                    )}
                </ResponsiveLayout>
            </Header>
            {topFixed && <div className={hasBottomSections ? styles.spacerLarge : styles.spacer} />}
        </ThemeVariant>
    );

    return (
        <MainNavigationBarDesktopMenuContextProvider sections={sections} isSmallMenu={desktopSmallMenu}>
            {!isTabletOrSmaller ? (
                mainNavBar
            ) : (
                <>
                    <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                        {mainNavBar}
                    </FocusTrap>
                    <MainNavigationBarBurgerMenu
                        open={isBurgerMenuOpen}
                        id={menuId}
                        sections={sections}
                        extra={burgerMenuExtra}
                        closeMenu={closeMenu}
                        disableFocusTrap={disableFocusTrap}
                        setDisableFocusTrap={setDisableFocusTrap}
                    />
                </>
            )}
        </MainNavigationBarDesktopMenuContextProvider>
    );
};

type FunnelNavigationBarProps = {
    variant?: Variant;
    logo?: React.ReactElement;
    right?: React.ReactElement;
    topFixed?: boolean;
    children?: undefined;
    withBorder?: boolean;
};

export const FunnelNavigationBar = ({
    logo,
    right,
    variant = 'default',
    topFixed = true,
    withBorder = true,
}: FunnelNavigationBarProps): JSX.Element => {
    logo = logo ?? <Logo size={{mobile: 40, desktop: 48}} />;

    return (
        <ThemeVariant variant={variant}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                variant={variant}
                dataAttributes={{'component-name': 'FunnelNavigationBar'}}
            >
                <ResponsiveLayout>
                    <GridLayout template="10">
                        <NavigationBarContentContainer right={right}>{logo}</NavigationBarContentContainer>
                    </GridLayout>
                </ResponsiveLayout>
            </Header>
            {topFixed && <div className={styles.spacer} />}
        </ThemeVariant>
    );
};

type NavigationBarActionGroupProps = {
    children: React.ReactNode;
};

export const NavigationBarActionGroup = ({children}: NavigationBarActionGroupProps): JSX.Element => {
    return (
        <div className={styles.lineHeightFix} data-component-name="NavigationBarActionGroup">
            <Inline space={24} alignItems="center">
                {children}
            </Inline>
        </div>
    );
};

type NavigationBarActionProps = TouchableProps;

export const NavigationBarAction = ({children, ...touchableProps}: NavigationBarActionProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    return (
        <BaseTouchable
            {...touchableProps}
            className={classnames(
                styles.navigationBarAction,
                styles.lineHeightFix,
                styles.textWrapperVariants[isInverse ? 'inverse' : 'default']
            )}
            dataAttributes={{'component-name': 'NavigationBarAction'}}
        >
            <Inline space={16} alignItems="center">
                {React.Children.map(children, (child) =>
                    typeof child === 'string' ? (
                        <Text2 regular color="inherit">
                            {child}
                        </Text2>
                    ) : (
                        child
                    )
                )}
            </Inline>
        </BaseTouchable>
    );
};
