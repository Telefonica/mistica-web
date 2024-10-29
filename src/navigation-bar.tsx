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

type SectionItem = {title: string} & InteractiveProps;

type SectionColumn = {
    title: string;
    items: ReadonlyArray<SectionItem>;
};

type SectionMenu = ExclusifyUnion<
    | {columns: ReadonlyArray<SectionColumn>}
    | {content?: React.ReactElement | ((props: {closeMenu: () => void}) => React.ReactElement)}
>;

type MainNavigationBarSection = {
    title: string;
    menu?: SectionMenu;
} & InteractiveProps;

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

const MainNavigationBarBurgerMenu = ({
    sections,
    extra,
    closeMenu,
    open,
    id,
    setDisableFocusTrap,
}: {
    sections: ReadonlyArray<MainNavigationBarSection>;
    extra: React.ReactNode;
    closeMenu: () => void;
    open: boolean;
    id: string;
    setDisableFocusTrap: (value: boolean) => void;
}) => {
    const {texts, t} = useTheme();
    const {isDarkMode} = useTheme();
    const [openedSection, setOpenedSection] = React.useState(-1);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const menuContentRef = React.useRef<HTMLDivElement>(null);

    const shadowAlpha = isDarkMode ? 1 : 0.2;
    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.BURGER_MENU_ANIMATION_DURATION_MS;

    // Close the menu when one of the rows is pressed
    const getInteractivePropsWithCloseMenu = (interactiveProps: InteractiveProps) => {
        return interactiveProps.onPress
            ? {
                  onPress: () => {
                      interactiveProps.onPress();
                      closeMenu();
                  },
              }
            : {...interactiveProps, onNavigate: () => closeMenu()};
    };

    const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

    const renderSection = (index: number) => {
        const {title, menu, ...interactiveProps} = sections[index];
        const columns = menu?.columns || [];
        const customContent = menu?.content;

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
                                <ButtonLink
                                    small
                                    bleedY
                                    bleedRight
                                    withChevron
                                    {...getInteractivePropsWithCloseMenu(interactiveProps)}
                                >
                                    {texts.mainNavigationBarSectionSeeAll ||
                                        t(tokens.mainNavigationBarSectionSeeAll)}
                                </ButtonLink>
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
                                                    {...getInteractivePropsWithCloseMenu(
                                                        itemInteractiveProps
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
                                                                    : getInteractivePropsWithCloseMenu(
                                                                          interactiveProps
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
        </Portal>
    );
};

const MainNavigationBarDesktopMenu = ({
    sections,
    isLargeNavigationBar,
    hoveredSection,
    setHoveredSection,
    isMenuHovered,
    setIsMenuHovered,
}: {
    sections: ReadonlyArray<MainNavigationBarSection>;
    isLargeNavigationBar: boolean;
    hoveredSection: number;
    setHoveredSection: (index: number) => void;
    isMenuHovered: boolean;
    setIsMenuHovered: (value: boolean) => void;
}): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [openedSection, setOpenedSection] = React.useState(-1);
    const [menuHeight, setMenuHeight] = React.useState('0px');
    const [isMenuContentScrollable, setIsMenuContentScrollable] = React.useState(false);
    const isAnySectionOpened = React.useRef(false);

    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.DESKTOP_MENU_ANIMATION_DURATION_MS;
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const bottomSpace = 40;

    React.useEffect(() => {
        if (!isMenuHovered && hoveredSection === -1) {
            setIsMenuOpen(false);
        } else if (hoveredSection !== -1) {
            setOpenedSection(hoveredSection);
            setIsMenuOpen(true);
        }
    }, [isMenuHovered, hoveredSection]);

    React.useEffect(() => {
        // Close desktop menu when scrolling in the page
        const handleScroll = () => {
            if (!isTabletOrSmaller) setIsMenuOpen(false);
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isTabletOrSmaller]);

    React.useEffect(() => {
        // scroll to top of the content if the opened section changed
        if (menuRef.current) {
            menuRef.current.scrollTop = 0;
        }

        // Disable scroll in menu content until height's animation is finished to avoid
        // showing the scrollbar while the menu's container is changing it's height
        setIsMenuContentScrollable(false);
        const id = setTimeout(() => setIsMenuContentScrollable(true), menuAnimationDuration);
        return () => clearTimeout(id);
    }, [openedSection, menuAnimationDuration]);

    React.useEffect(() => {
        // close menu when ESC key is pressed
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case ESC:
                    setIsMenuHovered(false);
                    setHoveredSection(-1);
                    break;
                default:
                // do nothing
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [setHoveredSection, setIsMenuHovered]);

    const columns = sections[openedSection]?.menu?.columns || [];
    const customContent = sections[openedSection]?.menu?.content;

    return (
        <div className={styles.desktopOnly}>
            <Portal>
                <CSSTransition
                    in={isMenuOpen}
                    timeout={menuAnimationDuration}
                    nodeRef={menuRef}
                    mountOnEnter
                    unmountOnExit
                    onEnter={() => {
                        isAnySectionOpened.current = true;
                    }}
                    onExiting={() => setIsMenuContentScrollable(false)}
                    onExited={() => {
                        isAnySectionOpened.current = false;
                        setOpenedSection(-1);
                    }}
                >
                    <div
                        className={styles.desktopMenuContainer}
                        onMouseEnter={() => setIsMenuHovered(true)}
                        onMouseLeave={() => setIsMenuHovered(false)}
                        ref={menuRef}
                        style={{
                            top: topSpace,
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
                                        // In old browsers, the speed of the menu height's animation will depend on
                                        // the height of the content instead of the height of the container.
                                        const value = supportsCssMin()
                                            ? `min(${el.scrollHeight}px, calc(100vh - ${topSpace}px - ${bottomSpace}px))`
                                            : `${el.scrollHeight}px`;
                                        setMenuHeight(!isMenuOpen ? '0px' : value);
                                    }
                                }}
                            >
                                {customContent ? (
                                    typeof customContent === 'function' ? (
                                        // the callback to close the menu is not required in desktop menu
                                        customContent({closeMenu: () => {}})
                                    ) : (
                                        customContent
                                    )
                                ) : (
                                    <Grid rows={1} columns={12} gap={24}>
                                        {columns.map((column, columnIdx) => (
                                            <GridItem key={columnIdx} columnSpan={2}>
                                                <Stack space={24}>
                                                    <Text2
                                                        medium
                                                        color={vars.colors.textSecondary}
                                                        transform="uppercase"
                                                    >
                                                        {column.title}
                                                    </Text2>

                                                    <Stack space={16}>
                                                        {column.items.map(
                                                            ({title, ...touchableProps}, itemIdx) => (
                                                                <div key={itemIdx}>
                                                                    <TextLink
                                                                        className={
                                                                            styles.desktopMenuColumnItem
                                                                        }
                                                                        {...touchableProps}
                                                                    >
                                                                        {title}
                                                                    </TextLink>
                                                                </div>
                                                            )
                                                        )}
                                                    </Stack>
                                                </Stack>
                                            </GridItem>
                                        ))}
                                    </Grid>
                                )}
                            </div>
                        </ResponsiveLayout>
                    </div>
                </CSSTransition>
            </Portal>
        </div>
    );
};

const MainNavigationBarDesktopSmallMenu = ({
    section,
    isLargeNavigationBar,
    open,
    leftPosition,
    isMenuHovered,
    setIsMenuHovered,
}: {
    section: MainNavigationBarSection;
    isLargeNavigationBar: boolean;
    open: boolean;
    leftPosition: number;
    isMenuHovered: boolean;
    setIsMenuHovered: (value: boolean) => void;
}): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuAnimationDuration = isRunningAcceptanceTest() ? 0 : styles.DESKTOP_MENU_ANIMATION_DURATION_MS;
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const bottomSpace = 40;

    React.useEffect(() => {
        // Close desktop menu when scrolling in the page
        const handleScroll = () => {
            if (!isTabletOrSmaller) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isTabletOrSmaller]);

    React.useEffect(() => {
        setIsMenuOpen(open || isMenuHovered);
    }, [open, isMenuHovered]);

    const columns = section.menu?.columns || [];
    const customContent = section?.menu?.content;

    return (
        <div className={styles.desktopOnly}>
            <Portal>
                <CSSTransition
                    in={isMenuOpen}
                    timeout={menuAnimationDuration}
                    nodeRef={menuRef}
                    classNames={styles.desktopSmallMenuTransition}
                    mountOnEnter
                    unmountOnExit
                >
                    <div
                        className={styles.desktopSmallMenuContainer}
                        onMouseEnter={() => setIsMenuHovered(true)}
                        onMouseLeave={() => setIsMenuHovered(false)}
                        ref={menuRef}
                        style={{
                            top: topSpace,
                            left: leftPosition,
                            maxHeight: `calc(100vh - ${topSpace}px - ${bottomSpace}px)`,
                        }}
                    >
                        {customContent ? (
                            typeof customContent === 'function' ? (
                                // the callback to close the menu is not required in desktop menu
                                customContent({closeMenu: () => {}})
                            ) : (
                                customContent
                            )
                        ) : (
                            <Stack space={40}>
                                {columns.map((column, columnIdx) => (
                                    <Stack space={24} key={columnIdx}>
                                        <Text2 medium color={vars.colors.textSecondary} transform="uppercase">
                                            {column.title}
                                        </Text2>

                                        <Stack space={16}>
                                            {column.items.map(({title, ...touchableProps}, itemIdx) => (
                                                <div key={itemIdx}>
                                                    <TextLink
                                                        className={styles.desktopMenuColumnItem}
                                                        {...touchableProps}
                                                    >
                                                        {title}
                                                    </TextLink>
                                                </div>
                                            ))}
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        )}
                    </div>
                </CSSTransition>
            </Portal>
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
    hoveredSection,
    isLargeMenuHovered,
    setIsLargeMenuHovered,
    setHoveredSection,
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
    hoveredSection: number;
    isLargeMenuHovered?: boolean;
    setIsLargeMenuHovered: (value: boolean) => void;
    setHoveredSection: (index: number) => void;
    variant?: Variant;
    isLargeNavigationBar: boolean;
    desktopSmallMenu?: boolean;
}): JSX.Element => {
    const {texts, t} = useTheme();
    const {title, menu, ...touchableProps} = section;
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const [smallMenuLeftPosition, setSmallMenuLeftPosition] = React.useState(0);
    const [isArrowFocused, setIsArrowFocused] = React.useState(false);
    const [isSectionMenuHovered, setIsSectionMenuHovered] = React.useState(false);

    // Align menu to left border of the section if it fits. Otherwise, align it to the right border
    const getSmallMenuLeftPosition = React.useCallback(() => {
        const {left, right} = sectionRef.current?.getBoundingClientRect() || {left: 0, right: 0};
        const maxLeftOffset =
            (navigationBarRef.current?.getBoundingClientRect().right || 0) - styles.DESKTOP_SMALL_MENU_WIDTH;

        return left <= maxLeftOffset ? left : right - styles.DESKTOP_SMALL_MENU_WIDTH;
    }, [navigationBarRef]);

    const openSectionMenu = React.useCallback(() => {
        setSmallMenuLeftPosition(getSmallMenuLeftPosition());
        setHoveredSection(menu ? index : -1);
    }, [index, menu, getSmallMenuLeftPosition, setHoveredSection]);

    const closeSectionMenu = React.useCallback(() => {
        setIsSectionMenuHovered(false);
        setIsLargeMenuHovered(false);
        setHoveredSection(-1);
    }, [setHoveredSection, setIsLargeMenuHovered]);

    React.useEffect(() => {
        // If any other section has been hovered, mark the current menu as not hovered in order to close it
        if (hoveredSection !== index && hoveredSection !== -1) {
            setIsSectionMenuHovered(false);
        }
    }, [hoveredSection, index]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                // close menu when ESC key is pressed
                case ESC:
                    cancelEvent(e);
                    closeSectionMenu();
                    break;

                // if arrow is focused and DOWN key is pressed, open the menu if it was closed
                case DOWN:
                    if (isArrowFocused && hoveredSection !== index) {
                        cancelEvent(e);
                        openSectionMenu();
                    }
                    break;

                // if arrow is focused and UP key is pressed, close the menu if it was opened
                case UP:
                    if (isArrowFocused && hoveredSection === index) {
                        cancelEvent(e);
                        closeSectionMenu();
                    }
                    break;

                default:
                // do nothing
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [openSectionMenu, closeSectionMenu, hoveredSection, index, isArrowFocused]);

    return (
        <div style={{position: 'relative'}}>
            <div
                ref={sectionRef}
                className={classnames(styles.sectionContainer, {
                    [styles.firstSection]: isFirstSection,
                    [styles.lastSection]: isLastSection,
                })}
                onMouseEnter={openSectionMenu}
                onMouseLeave={() => setHoveredSection(-1)}
            >
                <BaseTouchable
                    {...touchableProps}
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
                <div
                    className={styles.desktopMenuSectionArrowContainer}
                    onFocus={() => setIsArrowFocused(true)}
                    onBlur={() => setIsArrowFocused(false)}
                >
                    <BaseTouchable
                        className={styles.desktopMenuSectionArrow}
                        aria-label={`${section.title}, ${texts.mainNavigationBarOpenSectionMenu || t(tokens.mainNavigationBarOpenSectionMenu)}`}
                        onPress={() => {
                            if (isArrowFocused) {
                                if (hoveredSection !== index) {
                                    openSectionMenu();
                                } else {
                                    closeSectionMenu();
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
                                transform: `rotate(${hoveredSection === index || isSectionMenuHovered || isLargeMenuHovered ? 90 : -90}deg)`,
                            }}
                        />
                    </BaseTouchable>
                </div>
            )}

            {desktopSmallMenu && (
                <MainNavigationBarDesktopSmallMenu
                    section={section}
                    open={hoveredSection === index}
                    isLargeNavigationBar={isLargeNavigationBar}
                    leftPosition={smallMenuLeftPosition}
                    isMenuHovered={isSectionMenuHovered}
                    setIsMenuHovered={setIsSectionMenuHovered}
                />
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

    const [desktopHoveredSection, setDesktopHoveredSection] = React.useState(-1);
    const [isDesktopLargeMenuHovered, setIsDesktopLargeMenuHovered] = React.useState(false);

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
                            isLargeMenuHovered={isDesktopLargeMenuHovered}
                            setIsLargeMenuHovered={setIsDesktopLargeMenuHovered}
                            hoveredSection={desktopHoveredSection}
                            setHoveredSection={setDesktopHoveredSection}
                            isLargeNavigationBar={hasBottomSections}
                            desktopSmallMenu={desktopSmallMenu}
                        />
                    ))}
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
            {!desktopSmallMenu && (
                <MainNavigationBarDesktopMenu
                    sections={sections}
                    isLargeNavigationBar={hasBottomSections}
                    hoveredSection={desktopHoveredSection}
                    setHoveredSection={setDesktopHoveredSection}
                    isMenuHovered={isDesktopLargeMenuHovered}
                    setIsMenuHovered={setIsDesktopLargeMenuHovered}
                />
            )}
        </ThemeVariant>
    );

    if (!isTabletOrSmaller) {
        return mainNavBar;
    }

    return (
        <FocusTrap disabled={disableFocusTrap}>
            {mainNavBar}
            <MainNavigationBarBurgerMenu
                open={isBurgerMenuOpen}
                id={menuId}
                sections={sections}
                extra={burgerMenuExtra}
                closeMenu={closeMenu}
                setDisableFocusTrap={setDisableFocusTrap}
            />
        </FocusTrap>
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
