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
import {debounce, isEqual} from './utils/helpers';
import NegativeBox from './negative-box';

import type {BoxProps} from './box';
import type {ExclusifyUnion} from './utils/utility-types';
import type {Variant} from './theme-variant-context';
import type {TouchableProps} from './touchable';
import type {DataAttributes, HeadingType, IconProps} from './utils/types';

const MAIN_NAVIGATION_BAR_MENU_DEBOUNCE_TIME = 120;

const MenuSectionArrow = ({size = 24, color = vars.colors.neutralHigh, style, className}: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 8 8" style={style} className={className}>
        <path
            d="M6.32595 3.46071L3.03801 0.158595L3.03292 0.153747L3.032 0.152903L3.02931 0.150463L3.02848 0.149738L3.02248 0.144353C2.88533 0.021206 2.71386 -0.0126731 2.56343 0.00394249C2.41648 0.0201739 2.27272 0.0856702 2.16886 0.18711C2.06893 0.281844 2.01209 0.42816 2.00175 0.567065C1.99083 0.71377 2.02925 0.889583 2.16869 1.02392L5.24446 4.00145L2.15859 6.96199L2.15375 6.96708L2.1529 6.968L2.15046 6.97069L2.14974 6.97152L2.14435 6.97752C2.02121 7.11467 1.98733 7.28614 2.00394 7.43657C2.02017 7.58352 2.08567 7.72728 2.18711 7.83114C2.28184 7.93107 2.42816 7.98791 2.56706 7.99825C2.71377 8.00917 2.88958 7.97075 3.02392 7.83132L6.32595 4.5422V4.5422C6.6246 4.24355 6.6246 3.75935 6.32595 3.46071V3.46071Z"
            fill={color}
        />
    </svg>
);

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
    expandRightContent?: boolean;
};

const NavigationBarContentContainer = React.forwardRef<HTMLDivElement, NavigationBarContentContainerProps>(
    ({right, children, desktopOnly, expandRightContent}, ref) => {
        return (
            <div
                ref={ref}
                className={classnames(styles.navigationBarContent, {[styles.desktopOnly]: desktopOnly})}
            >
                {children}
                {right && (
                    <div
                        className={
                            expandRightContent
                                ? styles.navigationBarContentRightExpanded
                                : styles.navigationBarContentRight
                        }
                    >
                        {right}
                    </div>
                )}
            </div>
        );
    }
);

type WideConfig = {
    paddingX: BoxProps['paddingX'];
};

const NavigationBarSideMargins = ({
    children,
    wide,
}: {
    children: React.ReactNode;
    wide: boolean | WideConfig;
}) => {
    if (!wide) {
        return <ResponsiveLayout>{children}</ResponsiveLayout>;
    }

    const defaultWidePaddingX: BoxProps['paddingX'] = {
        mobile: 16,
        tablet: 24,
        desktop: 24,
    };

    return (
        <Box
            width="100%"
            paddingX={
                wide === true
                    ? defaultWidePaddingX
                    : typeof wide.paddingX === 'number'
                      ? wide.paddingX
                      : {
                            ...defaultWidePaddingX,
                            ...wide.paddingX,
                        }
            }
        >
            {children}
        </Box>
    );
};

interface NavigationBarCommonProps {
    variant?: Variant;
    onBack?: () => void;
    title?: string;
    titleAs?: HeadingType;
    right?: React.ReactElement;
    withBorder?: boolean;
    children?: undefined;
    wide?: boolean | WideConfig;
}

interface NavigationBarTopFixedProps extends NavigationBarCommonProps {
    topFixed?: true;
    paddingX?: undefined;
}

interface NavigationBarNotFixedProps extends NavigationBarCommonProps {
    topFixed: false;
    /** @deprecated use wide */
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
    wide = false,
}: NavigationBarProps): JSX.Element => {
    const {texts, t} = useTheme();
    const content = (
        <NavigationBarContentContainer right={right} expandRightContent>
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

    const calcPaddingXWhenNotTopFixed = (): BoxProps['paddingX'] => {
        if (wide !== undefined) {
            if (typeof wide !== 'object') {
                return 0;
            }
            return wide.paddingX ?? 0;
        }

        return paddingX as BoxProps['paddingX'];
    };

    return (
        <ThemeVariant variant={variant}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                variant={variant}
                dataAttributes={{'component-name': 'NavigationBar'}}
            >
                {topFixed ? (
                    <NavigationBarSideMargins wide={wide}>{content}</NavigationBarSideMargins>
                ) : (
                    <Box width="100%" paddingX={calcPaddingXWhenNotTopFixed()}>
                        {content}
                    </Box>
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
    desktopLargeMenu?: boolean;
    wide?: boolean | WideConfig;
};

type MainNavigationBarMenuStatus = 'opening' | 'opened' | 'closing' | 'closed';
type MainNavigationBarMenuAction = 'open' | 'finishOpen' | 'close' | 'finishClose';

const mainNavigationBurgerMenuTranstions: Record<
    MainNavigationBarMenuStatus,
    Partial<Record<MainNavigationBarMenuAction, MainNavigationBarMenuStatus>>
> = {
    opening: {
        close: 'closing',
        finishOpen: 'opened',
    },
    opened: {
        close: 'closing',
    },
    closing: {
        open: 'opening',
        finishClose: 'closed',
    },
    closed: {
        open: 'opening',
    },
};

const burgerMenuReducer = (state: MainNavigationBarMenuStatus, action: MainNavigationBarMenuAction) => {
    return mainNavigationBurgerMenuTranstions[state][action] || state;
};

const MainNavigationBarBurgerSection = ({
    section,
    closeSubMenu,
    closeMenu,
}: {
    section: MainNavigationBarSection;
    closeSubMenu: () => void;
    closeMenu: () => void;
}) => {
    const {texts, t} = useTheme();

    const {title, menu, ...interactiveProps} = section;

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
                        onBack={closeSubMenu}
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
                        {title}
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
                            <NegativeBox>
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
                            </NegativeBox>
                        </Stack>
                    ))
                )}
            </Stack>
        </ResponsiveLayout>
    );
};

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
    const {isDarkMode, texts, t} = useTheme();
    const [openedSection, setOpenedSection] = React.useState(-1);
    const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);
    const [subMenuStatus, dispatch] = React.useReducer(burgerMenuReducer, 'closed');
    const menuRef = React.useRef<HTMLDivElement>(null);

    const shadowAlpha = isDarkMode ? 1 : 0.2;
    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.BURGER_MENU_ANIMATION_DURATION_MS;

    React.useEffect(() => {
        let id: NodeJS.Timeout;

        // menu starts opening or closing
        if (isSubMenuOpen) {
            dispatch('open');
            id = setTimeout(() => dispatch('finishOpen'), menuAnimationDuration);
        } else {
            dispatch('close');
            id = setTimeout(() => dispatch('finishClose'), menuAnimationDuration);
        }

        return () => clearTimeout(id);
    }, [isSubMenuOpen, menuAnimationDuration]);

    const sectionContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Make screen reader focus on back button when opening any section's menu
        if (subMenuStatus === 'opening') {
            const sectionBackButtonElement = sectionContainerRef.current?.querySelector<HTMLButtonElement>(
                `button[aria-label="${texts.backNavigationBar || t(tokens.backNavigationBar)}"]`
            );

            sectionBackButtonElement?.focus();
        }
    }, [subMenuStatus, t, texts]);

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
                        <div className={styles.burgerMenuContainer}>
                            <div
                                className={styles.burgerMenuContentContainer}
                                style={{
                                    transform: `translate(${isSubMenuOpen ? '-100vw' : '0'})`,
                                }}
                            >
                                {subMenuStatus !== 'opened' && (
                                    <ResponsiveLayout>
                                        <ResetResponsiveLayout>
                                            <RowList>
                                                {sections.map(({title, menu, ...interactiveProps}, index) => (
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
                                                ))}
                                            </RowList>
                                        </ResetResponsiveLayout>
                                        {extra && <Box paddingY={16}>{extra}</Box>}
                                    </ResponsiveLayout>
                                )}
                            </div>

                            <div
                                className={styles.burgerMenuContentContainer}
                                ref={sectionContainerRef}
                                style={{
                                    transform: `translate(${isSubMenuOpen ? '0' : '100vw'})`,
                                }}
                            >
                                {subMenuStatus !== 'closed' && openedSection !== -1 && (
                                    <MainNavigationBarBurgerSection
                                        section={sections[openedSection]}
                                        closeMenu={closeMenu}
                                        closeSubMenu={() => setIsSubMenuOpen(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </nav>
                </CSSTransition>
            </FocusTrap>
        </Portal>
    );
};

const mainNavigationDesktopMenuTranstions: Record<
    MainNavigationBarMenuStatus,
    Partial<Record<MainNavigationBarMenuAction, MainNavigationBarMenuStatus>>
> = {
    opening: {
        close: 'closing',
        finishOpen: 'opened',
    },
    opened: {
        close: 'closing',
    },
    closing: {
        // If a section was opened while the menu was closing, the menu should be considered as
        // already open. This is useful for example to avoid the new content's fade-in animation
        open: 'opened',
        finishClose: 'closed',
    },
    closed: {
        open: 'opening',
    },
};

const desktopMenuReducer = (state: MainNavigationBarMenuStatus, action: MainNavigationBarMenuAction) => {
    return mainNavigationDesktopMenuTranstions[state][action] || state;
};

type MainNavigationBarDesktopMenuState = {
    isMenuOpen: boolean;
    openedSection: number;
    menuHeight: string;
    menuStatus: MainNavigationBarMenuStatus;
    openSectionMenu: (index: number) => void;
    closeMenu: () => void;
    setMenuHeight: (height: string) => void;
    setIsMenuHovered: (value: boolean) => void;
    setFocusedItem: (item?: {column: number; index: number}) => void;
    debouncedOpenSectionMenu: (index: number) => void;
    cancelDebouncedOpenSectionMenu: (index: number) => void;
};

const MainNavigationBarDesktopMenuContext = React.createContext<MainNavigationBarDesktopMenuState>({
    isMenuOpen: false,
    openedSection: -1,
    menuHeight: '0px',
    menuStatus: 'closed',
    openSectionMenu: () => {},
    closeMenu: () => {},
    setMenuHeight: () => {},
    setIsMenuHovered: () => {},
    setFocusedItem: () => {},
    debouncedOpenSectionMenu: () => {},
    cancelDebouncedOpenSectionMenu: () => {},
});

const MainNavigationBarDesktopMenuContextProvider = ({
    children,
    sections,
    isLargeMenu,
}: {
    children: React.ReactNode;
    sections?: ReadonlyArray<MainNavigationBarSection>;
    isLargeMenu?: boolean;
}): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuHeight, setMenuHeight] = React.useState('0px');
    const [menuStatus, dispatch] = React.useReducer(desktopMenuReducer, 'closed');
    const [debouncedOpenSectionIndex, setDebouncedOpenSectionIndex] = React.useState(-1);

    // Item that is currently focused inside a section. This state is used to handle pressing
    // up/down arrows to navigate through the items of a section.
    const [focusedItem, setFocusedItem] = React.useState<{column: number; index: number} | undefined>();

    // State that indicated whether the menu container has been hovered
    const [isMenuHovered, setIsMenuHovered] = React.useState(false);

    // State that indicates whether the current rendered section has been hovered or its arrow button is focused
    const [isSectionHovered, setIsSectionHovered] = React.useState(false);

    // Section that is currently being rendered
    const [openedSection, setOpenedSection] = React.useState(-1);

    // Callback used when a section has been hovered or it's focused arrow has been pressed while it's closed
    const openSectionMenu = React.useCallback(
        (index: number) => {
            setDebouncedOpenSectionIndex(-1);
            if (sections?.[index]?.menu) {
                setIsSectionHovered(true);
                setOpenedSection(index);
            } else {
                // If the section has no menu, close the current opened one
                setIsMenuHovered(false);
                setIsSectionHovered(false);
            }
        },
        [sections]
    );

    const debouncedOpenSectionMenu = React.useMemo(
        () => debounce(openSectionMenu, MAIN_NAVIGATION_BAR_MENU_DEBOUNCE_TIME),
        [openSectionMenu]
    );

    const closeMenu = React.useCallback(() => {
        setIsMenuHovered(false);
        setIsSectionHovered(false);
        debouncedOpenSectionMenu.cancel();
        setDebouncedOpenSectionIndex(-1);
    }, [debouncedOpenSectionMenu]);

    // Close menu when viewport is too small
    React.useEffect(() => {
        if (isTabletOrSmaller) {
            closeMenu();
        }
    }, [isTabletOrSmaller, closeMenu]);

    React.useEffect(() => {
        if (!isSectionHovered && !isMenuHovered) {
            setIsMenuOpen(false);
            setMenuHeight('0px');
        } else {
            setIsMenuOpen(true);
        }
    }, [isMenuHovered, isSectionHovered]);

    React.useEffect(() => {
        const menuAnimationDuration =
            isRunningAcceptanceTest() || !isLargeMenu ? 0 : styles.DESKTOP_MENU_ANIMATION_DURATION_MS;

        let id: NodeJS.Timeout;

        // menu starts opening or closing
        if (!isMenuOpen) {
            dispatch('close');
            id = setTimeout(() => dispatch('finishClose'), menuAnimationDuration);
        } else {
            dispatch('open');
            id = setTimeout(() => dispatch('finishOpen'), menuAnimationDuration);
        }

        return () => clearTimeout(id);
    }, [isMenuOpen, isLargeMenu]);

    React.useEffect(() => {
        // reset openedSection when the menu has been closed
        if (menuStatus === 'closed') {
            setOpenedSection(-1);
        }
    }, [menuStatus]);

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
        // Close menu when ESC key is pressed
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
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
                menuHeight,
                menuStatus,
                openSectionMenu,
                debouncedOpenSectionMenu: (index: number) => {
                    setDebouncedOpenSectionIndex(index);
                    debouncedOpenSectionMenu(index);
                },
                cancelDebouncedOpenSectionMenu: (index: number) => {
                    if (index === debouncedOpenSectionIndex) {
                        debouncedOpenSectionMenu.cancel();
                        setDebouncedOpenSectionIndex(-1);
                    }
                },
                closeMenu,
                setMenuHeight,
                setIsMenuHovered,
                setFocusedItem: focusItem,
            }}
        >
            {children}
        </MainNavigationBarDesktopMenuContext.Provider>
    );
};

export const useMainNavigationBarDesktopMenuState = (): MainNavigationBarDesktopMenuState =>
    React.useContext(MainNavigationBarDesktopMenuContext);

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
                            underline="on hover"
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

const MainNavigationBarDesktopMenuContent = ({
    section,
    index,
    isLargeNavigationBar,
    wide,
}: {
    section: MainNavigationBarSection;
    index: number;
    isLargeNavigationBar: boolean;
    wide: boolean | WideConfig;
}): JSX.Element => {
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [isMenuContentScrollable, setIsMenuContentScrollable] = React.useState(false);

    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.DESKTOP_MENU_ANIMATION_DURATION_MS;
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const bottomSpace = 40;

    const {menuStatus, isMenuOpen, openedSection, closeMenu, setIsMenuHovered, setMenuHeight} =
        useMainNavigationBarDesktopMenuState();

    React.useEffect(() => {
        // Scroll to top of the content if the opened section changed
        if (menuRef.current && isMenuOpen) {
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

    const [isContentVisible, setIsContentVisible] = React.useState(true);

    React.useEffect(() => {
        if (openedSection === index) {
            // If menu is opening, trigger the fade-in effect for current section
            if (menuStatus === 'opening') {
                setIsContentVisible(false);
                const id = requestAnimationFrame(() => setIsContentVisible(true));
                return () => cancelAnimationFrame(id);
            } else {
                setIsContentVisible(true);
            }
        }
    }, [menuStatus, openedSection, index]);

    React.useEffect(() => {
        // disable scroll when menu is closing to avoid showing the scrollbar
        if (menuStatus === 'closing') {
            setIsMenuContentScrollable(false);
        }
    }, [menuStatus]);

    const columns = section.menu?.columns || [];
    const customContent = section?.menu?.content;

    return (
        <div className={styles.desktopOnly}>
            <ThemeVariant variant="default">
                {openedSection === index && (
                    <ResetResponsiveLayout>
                        <div
                            className={styles.desktopMenuContainer}
                            onMouseEnter={() => setIsMenuHovered(true)}
                            onMouseLeave={() => setIsMenuHovered(false)}
                            style={{
                                // disable pointer events when menu is closing
                                pointerEvents:
                                    menuStatus === 'closed' || menuStatus === 'closing' ? 'none' : undefined,
                                top: topSpace,
                                maxHeight: `calc(100vh - ${topSpace}px - ${bottomSpace}px)`,
                                overflowY: isMenuContentScrollable ? 'auto' : 'hidden',
                            }}
                        >
                            <NavigationBarSideMargins wide={wide}>
                                <div
                                    className={classnames(styles.desktopMenu, {
                                        [styles.desktopMenuContentFadeIn]: isContentVisible,
                                    })}
                                    ref={(el) => {
                                        if (el && isMenuOpen) {
                                            setMenuHeight(
                                                `min(${el.scrollHeight}px, calc(100vh - ${topSpace}px - ${bottomSpace}px))`
                                            );
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
                            </NavigationBarSideMargins>
                        </div>
                    </ResetResponsiveLayout>
                )}
            </ThemeVariant>
        </div>
    );
};

// This is the menu's background panel. The menu content is rendered separately for each tab
// in order to make the section's content follow the natural focus order of elements
// when using the keyboard or a screen reader to navigate
const MainNavigationBarDesktopMenuBackground = ({
    isLargeNavigationBar,
}: {
    isLargeNavigationBar: boolean;
}): JSX.Element => {
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const {menuHeight} = useMainNavigationBarDesktopMenuState();

    return (
        <div className={styles.desktopOnly}>
            <div className={styles.desktopMenuWrapper} style={{top: topSpace}}>
                <div
                    className={styles.desktopMenuBackgroundContainer}
                    style={{
                        height: menuHeight,
                    }}
                />
            </div>
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

    const {openedSection, menuStatus, setIsMenuHovered, closeMenu} = useMainNavigationBarDesktopMenuState();

    return (
        <div className={styles.desktopOnly}>
            {index === openedSection && (
                <ThemeVariant variant="default">
                    <div
                        className={styles.desktopSmallMenuContainer}
                        onMouseEnter={() => setIsMenuHovered(true)}
                        onMouseLeave={() => setIsMenuHovered(false)}
                        style={{
                            // disable pointer events when menu is closing
                            pointerEvents:
                                menuStatus === 'closed' || menuStatus === 'closing' ? 'none' : undefined,
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
                </ThemeVariant>
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
    desktopLargeMenu,
    wide,
}: {
    section: MainNavigationBarSection;
    index: number;
    selectedIndex?: number;
    isFirstSection: boolean;
    isLastSection: boolean;
    navigationBarRef: React.RefObject<HTMLDivElement>;
    variant?: Variant;
    isLargeNavigationBar: boolean;
    desktopLargeMenu?: boolean;
    wide: boolean | WideConfig;
}): JSX.Element => {
    const {texts, t} = useTheme();
    const {title, menu, ...touchableProps} = section;
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const [smallMenuLeftPosition, setSmallMenuLeftPosition] = React.useState(0);
    const [isMenuControlFocused, setIsMenuControlFocused] = React.useState(false);
    const {
        isMenuOpen,
        openedSection,
        openSectionMenu,
        debouncedOpenSectionMenu,
        cancelDebouncedOpenSectionMenu,
        closeMenu,
    } = useMainNavigationBarDesktopMenuState();

    const hasCustomInteraction =
        touchableProps.href !== undefined ||
        touchableProps.onPress !== undefined ||
        touchableProps.to !== undefined;

    const openCurrentSectionMenu = React.useCallback(
        (withDebounce?: boolean) => {
            // Align small menu to left border of the section if it fits. Otherwise, align it to the right border
            const getSmallMenuLeftPosition = () => {
                const {left, right} = sectionRef.current?.getBoundingClientRect() || {left: 0, right: 0};
                const maxLeftOffset =
                    (navigationBarRef.current?.getBoundingClientRect().right || 0) -
                    styles.DESKTOP_SMALL_MENU_WIDTH;

                return left <= maxLeftOffset ? left : right - styles.DESKTOP_SMALL_MENU_WIDTH;
            };
            if (!desktopLargeMenu) {
                setSmallMenuLeftPosition(getSmallMenuLeftPosition());
            }

            if (withDebounce) {
                debouncedOpenSectionMenu(index);
            } else {
                openSectionMenu(index);
            }
        },
        [desktopLargeMenu, index, openSectionMenu, debouncedOpenSectionMenu, navigationBarRef]
    );

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                // If arrow is focused and DOWN key is pressed, open the menu if it was closed
                case DOWN:
                    if (isMenuControlFocused) {
                        cancelEvent(e);
                        openCurrentSectionMenu();
                    }
                    break;

                // If arrow is focused and UP key is pressed, close the menu if it was opened
                case UP:
                    if (isMenuControlFocused) {
                        cancelEvent(e);
                        closeMenu();
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
    }, [index, isMenuControlFocused, openCurrentSectionMenu, closeMenu, menu, hasCustomInteraction]);

    const isSectionMenuOpen = isMenuOpen && openedSection === index;

    const menuButtonOnPress = React.useCallback(() => {
        if (isSectionMenuOpen) {
            closeMenu();
        } else {
            openCurrentSectionMenu();
        }
    }, [isSectionMenuOpen, openCurrentSectionMenu, closeMenu]);

    const getSectionInteractiveProps = React.useCallback(
        (touchableProps: InteractiveProps) => {
            // Open or close the menu when a section without interaction is pressed
            if (!hasCustomInteraction) {
                return {
                    onPress: menuButtonOnPress,
                };
            }

            return touchableProps as InteractiveProps;
        },
        [hasCustomInteraction, menuButtonOnPress]
    );

    return (
        <div className={styles.desktopMenuSectionWithArrowWrapper}>
            <div
                ref={sectionRef}
                className={classnames(styles.desktopMenuSectionContainer, {
                    [styles.desktopMenuFirstSection]: isFirstSection,
                    [styles.desktopMenuLastSection]: isLastSection,
                })}
                onMouseEnter={() => openCurrentSectionMenu(true)}
                onMouseLeave={() => cancelDebouncedOpenSectionMenu(index)}
                onFocus={() => {
                    if (menu && !hasCustomInteraction) setIsMenuControlFocused(true);
                }}
                onBlur={() => {
                    if (menu && !hasCustomInteraction) setIsMenuControlFocused(false);
                }}
            >
                <BaseTouchable
                    {...getSectionInteractiveProps(touchableProps as InteractiveProps)}
                    aria-label={
                        !hasCustomInteraction
                            ? `${section.title}, ${texts.mainNavigationBarOpenSectionMenu || t(tokens.mainNavigationBarOpenSectionMenu)}`
                            : undefined
                    }
                    aria-haspopup={!hasCustomInteraction}
                    aria-expanded={!hasCustomInteraction ? isSectionMenuOpen : undefined}
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
                            onFocus={() => setIsMenuControlFocused(true)}
                            onBlur={() => setIsMenuControlFocused(false)}
                        >
                            <BaseTouchable
                                className={styles.desktopMenuSectionArrow}
                                aria-label={`${section.title}, ${texts.mainNavigationBarOpenSectionMenu || t(tokens.mainNavigationBarOpenSectionMenu)}`}
                                aria-haspopup
                                aria-expanded={isSectionMenuOpen}
                                onPress={() => {
                                    if (isMenuControlFocused) {
                                        menuButtonOnPress();
                                    }
                                }}
                                style={{
                                    pointerEvents: isMenuControlFocused ? 'auto' : 'none',
                                    opacity: isMenuControlFocused ? 1 : 0,
                                    // We are using the same chevron as in ButtonLink, and that svg has
                                    // some extra space on the left that we want to ignore in this case
                                    marginTop: -2,
                                }}
                            >
                                <MenuSectionArrow
                                    size={8}
                                    style={{
                                        transform: `rotate(${isSectionMenuOpen ? -90 : 90}deg)`,
                                    }}
                                />
                            </BaseTouchable>
                        </div>
                    )}
                    {desktopLargeMenu ? (
                        <MainNavigationBarDesktopMenuContent
                            section={section}
                            isLargeNavigationBar={isLargeNavigationBar}
                            index={index}
                            wide={wide}
                        />
                    ) : (
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

const MainNavigationBarDesktopSections = ({
    sections,
    selectedIndex,
    navigationBarRef,
    variant,
    isLargeNavigationBar,
    hasRightContent,
    desktopLargeMenu,
    wide,
}: {
    sections: ReadonlyArray<MainNavigationBarSection>;
    selectedIndex?: number;
    navigationBarRef: React.RefObject<HTMLDivElement>;
    variant: Variant;
    hasRightContent: boolean;
    isLargeNavigationBar: boolean;
    desktopLargeMenu: boolean;
    wide: boolean | WideConfig;
}): JSX.Element => {
    const {openSectionMenu, openedSection, closeMenu} = useMainNavigationBarDesktopMenuState();

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <nav
            className={classnames(styles.desktopOnly, styles.mainNavBarSectionsContainer)}
            style={{
                paddingLeft: !isLargeNavigationBar ? 48 : 0,
                paddingRight: !isLargeNavigationBar && hasRightContent ? 136 : 0,
            }}
            onMouseEnter={() => {
                // Mark current opened section as active to avoid closing the menu when moving the pointer
                // from the menu content to the navigation bar (without hovering the tab itself)
                if (openedSection !== -1) {
                    openSectionMenu(openedSection);
                }
            }}
            onMouseLeave={closeMenu}
        >
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
                        isLargeNavigationBar={isLargeNavigationBar}
                        desktopLargeMenu={desktopLargeMenu}
                        wide={wide}
                    />
                ))}
            </Inline>
        </nav>
    );
};

// It's not easy to coordinate the animation of the menu content height when switching between opened
// sections. This is because each section has it's own element where it displays the content. Instead,
// the contents of the sections are rendered without any animation, and we keep this wrapper around
// all of them, which "hides" the rendered smoothly by using animated clip-path
const MainNavigationBarContentWrapper = ({
    children,
    isLargeNavigationBar,
    desktopLargeMenu,
}: {
    children: React.ReactNode;
    isLargeNavigationBar: boolean;
    desktopLargeMenu: boolean;
}): JSX.Element => {
    const {menuHeight} = useMainNavigationBarDesktopMenuState();
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;

    return (
        <div
            className={styles.mainNavigationBarContentWrapper}
            style={
                desktopLargeMenu
                    ? {
                          clipPath: `rect(0 100% calc(${topSpace}px + ${menuHeight}) 0)`,
                          WebkitClipPath: `rect(0 100% calc(${topSpace}px + ${menuHeight}) 0)`,
                      }
                    : undefined
            }
        >
            {children}
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
    desktopLargeMenu = false,
    wide = false,
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

    const desktopSections = (
        <MainNavigationBarDesktopSections
            sections={sections}
            selectedIndex={selectedIndex}
            navigationBarRef={navigationBarRef}
            variant={variant}
            hasRightContent={!!right}
            isLargeNavigationBar={hasBottomSections}
            desktopLargeMenu={desktopLargeMenu}
            wide={wide}
        />
    );

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
                {desktopLargeMenu && (
                    <MainNavigationBarDesktopMenuBackground isLargeNavigationBar={hasBottomSections} />
                )}
                <MainNavigationBarContentWrapper
                    isLargeNavigationBar={hasBottomSections}
                    desktopLargeMenu={desktopLargeMenu}
                >
                    <NavigationBarSideMargins wide={wide}>
                        <NavigationBarContentContainer
                            ref={navigationBarRef}
                            right={right}
                            expandRightContent={hasBottomSections}
                        >
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
                            {!hasBottomSections && desktopSections}
                        </NavigationBarContentContainer>
                        {hasBottomSections && (
                            <NavigationBarContentContainer desktopOnly>
                                {desktopSections}
                            </NavigationBarContentContainer>
                        )}
                    </NavigationBarSideMargins>
                </MainNavigationBarContentWrapper>
            </Header>
            {topFixed && <div className={hasBottomSections ? styles.spacerLarge : styles.spacer} />}
        </ThemeVariant>
    );

    return (
        <MainNavigationBarDesktopMenuContextProvider sections={sections} isLargeMenu={desktopLargeMenu}>
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
    wide?: boolean | WideConfig;
};

export const FunnelNavigationBar = ({
    logo,
    right,
    variant = 'default',
    topFixed = true,
    withBorder = true,
    wide = false,
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
                <NavigationBarSideMargins wide={wide}>
                    <GridLayout template="10">
                        <NavigationBarContentContainer right={right} expandRightContent>
                            {logo}
                        </NavigationBarContentContainer>
                    </GridLayout>
                </NavigationBarSideMargins>
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
