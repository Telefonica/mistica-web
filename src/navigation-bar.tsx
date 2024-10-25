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
import {getPrefixedDataAttributes} from './utils/dom';
import Stack from './stack';
import Box from './box';
import {isRunningAcceptanceTest} from './utils/platform';
import * as tokens from './text-tokens';
import {NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_DESKTOP_LARGE} from './theme';
import TextLink from './text-link';

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

const BURGER_MENU_ANIMATION_DURATION_MS = 300;
const DESKTOP_MENU_ANIMATION_DURATION_MS = 400;

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

const NavigationBarContentContainer = ({
    right,
    children,
    desktopOnly,
}: NavigationBarContentContainerProps) => {
    return (
        <div className={classnames(styles.navigationBarContent, {[styles.desktopOnly]: desktopOnly})}>
            {children}
            {right && <div className={styles.navigationBarContentRight}>{right}</div>}
        </div>
    );
};

type InteractiveProps = ExclusifyUnion<{href: string} | {to: string} | {onPress: () => void}>;

type SectionItem = {title: string} & InteractiveProps;

type SectionColumn = {
    title: string;
    items: ReadonlyArray<SectionItem>;
};

type SectionMenu = {
    columns?: ReadonlyArray<SectionColumn>;
    extra?: React.ReactElement;
    small?: boolean;
};

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
    const {isDarkMode} = useTheme();
    const menuRef = React.useRef<HTMLDivElement>(null);
    const shadowAlpha = isDarkMode ? 1 : 0.2;

    const renderSection = (section: MainNavigationBarSection, index: number) => {
        // TODO: implement
        return <Row key={index} title={section.title} onPress={closeMenu} />;
    };

    return (
        <Portal>
            <CSSTransition
                onEntered={() => setDisableFocusTrap(false)}
                onExiting={() => setDisableFocusTrap(true)}
                classNames={styles.burgerMenuTransition}
                in={open}
                nodeRef={menuRef}
                timeout={isRunningAcceptanceTest() ? 0 : BURGER_MENU_ANIMATION_DURATION_MS}
                unmountOnExit
            >
                <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                    <nav
                        className={styles.burgerMenu}
                        style={{boxShadow: `6px 0 4px -4px rgba(0, 0, 0, ${shadowAlpha})`}}
                        id={id}
                        ref={menuRef}
                    >
                        <ResponsiveLayout>
                            <Stack space={16}>
                                <ResetResponsiveLayout>
                                    <RowList>
                                        {sections.map((section, index) => renderSection(section, index))}
                                    </RowList>
                                </ResetResponsiveLayout>
                                {extra && <Box paddingBottom={16}>{extra}</Box>}
                            </Stack>
                        </ResponsiveLayout>
                    </nav>
                </FocusTrap>
            </CSSTransition>
        </Portal>
    );
};

const MainNavigationBarDesktopMenu = ({
    sections,
    isLargeNavigationBar,
    hoveredSection,
}: {
    sections: ReadonlyArray<MainNavigationBarSection>;
    isLargeNavigationBar: boolean;
    hoveredSection: number;
}): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const topSpace = isLargeNavigationBar ? NAVBAR_HEIGHT_DESKTOP_LARGE : NAVBAR_HEIGHT_DESKTOP;
    const bottomSpace = 40;

    const menuRef = React.useRef<HTMLDivElement>(null);
    const [isMenuHovered, setIsMenuHovered] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [openedSection, setOpenedSection] = React.useState(-1);
    const [menuHeight, setMenuHeight] = React.useState('0px');
    const [isMenuContentScrollable, setIsMenuContentScrollable] = React.useState(false);
    const isFirstOpenedSectionRef = React.useRef(false);

    React.useEffect(() => {
        if (!isMenuHovered && hoveredSection === -1) {
            setIsMenuOpen(false);
        } else if (hoveredSection !== -1) {
            setOpenedSection(hoveredSection);
            setIsMenuOpen(true);
        }
    }, [isMenuHovered, hoveredSection]);

    // Close desktop menu when scrolling in the page
    React.useEffect(() => {
        const handleScroll = () => {
            if (!isTabletOrSmaller) setIsMenuOpen(false);
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isTabletOrSmaller]);

    // Disable scroll in menu content until height's animation is finished to avoid
    // showing the scrollbar while the menu's container is changing it's height
    React.useEffect(() => {
        setIsMenuContentScrollable(false);
        const id = setTimeout(() => setIsMenuContentScrollable(true), DESKTOP_MENU_ANIMATION_DURATION_MS);
        return () => clearTimeout(id);
    }, [openedSection]);

    return (
        <div className={styles.desktopOnly}>
            <Portal>
                <CSSTransition
                    in={isMenuOpen}
                    timeout={isRunningAcceptanceTest() ? 0 : DESKTOP_MENU_ANIMATION_DURATION_MS}
                    nodeRef={menuRef}
                    mountOnEnter
                    unmountOnExit
                    onEnter={() => {
                        isFirstOpenedSectionRef.current = true;
                    }}
                    onExiting={() => setIsMenuContentScrollable(false)}
                    onExited={() => {
                        isFirstOpenedSectionRef.current = false;
                        setOpenedSection(-1);
                    }}
                >
                    <div
                        onMouseEnter={() => setIsMenuHovered(true)}
                        onMouseLeave={() => setIsMenuHovered(false)}
                        ref={menuRef}
                        style={{top: topSpace}}
                        className={styles.desktopMenuWrapper}
                    >
                        <div
                            className={styles.desktopMenuContainer}
                            style={{
                                height: menuHeight,
                                maxHeight: `calc(100vh - ${topSpace}px - ${bottomSpace}px)`,
                                overflowY: isMenuContentScrollable ? 'auto' : 'hidden',
                            }}
                        >
                            <ResponsiveLayout>
                                <div
                                    className={classnames(styles.desktopMenu, {
                                        [styles.desktopMenuContentFadeIn]: isFirstOpenedSectionRef.current,
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
                                    <Inline space="between">
                                        <Inline space={24}>
                                            {sections[openedSection]?.menu?.columns?.map(
                                                (column, columnIdx) => (
                                                    <Stack
                                                        key={columnIdx}
                                                        space={24}
                                                        className={styles.desktopMenuColumn}
                                                    >
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
                                                )
                                            )}
                                        </Inline>
                                        {sections[openedSection]?.menu?.extra}
                                    </Inline>
                                </div>
                            </ResponsiveLayout>
                        </div>
                    </div>
                </CSSTransition>
            </Portal>
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
}: MainNavigationBarProps): JSX.Element => {
    const {texts, t} = useTheme();
    const menuId = React.useId();
    const {isTabletOrSmaller} = useScreenSize();
    const logoElement = logo || <Logo size={{mobile: 40, desktop: 48}} />;
    const hasBottomSections = large && sections.length > 0;

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
    const [disableFocusTrap, setDisableFocusTrap] = React.useState(true);
    const setModalState = useSetModalState();

    const [desktopHoveredSection, setDesktopHoveredSection] = React.useState(-1);

    const renderDesktopSections = () => {
        return (
            <nav className={styles.desktopOnly}>
                <Inline space={32}>
                    {sections.map(({title, menu, ...touchableProps}, idx) => (
                        <div
                            key={idx}
                            className={classnames(styles.sectionContainer, {
                                [styles.firstSection]: idx === 0,
                                [styles.lastSection]: idx === sections.length - 1,
                            })}
                            onMouseEnter={() => setDesktopHoveredSection(idx)}
                            onMouseLeave={() => setDesktopHoveredSection(-1)}
                        >
                            <BaseTouchable
                                {...touchableProps}
                                className={classnames(
                                    styles.section,
                                    {
                                        [styles.selectedSectionVariantes[
                                            variant === 'inverse' ? 'inverse' : 'default'
                                        ]]: idx === selectedIndex,
                                    },
                                    styles.textWrapperVariants[variant === 'inverse' ? 'inverse' : 'default']
                                )}
                            >
                                <Text3 regular color="inherit">
                                    {title}
                                </Text3>
                            </BaseTouchable>
                        </div>
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
                    <NavigationBarContentContainer right={right}>
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
            <MainNavigationBarDesktopMenu
                sections={sections}
                isLargeNavigationBar={hasBottomSections}
                hoveredSection={desktopHoveredSection}
            />
        </ThemeVariant>
    );

    if (!isTabletOrSmaller) {
        return mainNavBar;
    }

    return (
        <>
            <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                {mainNavBar}
            </FocusTrap>
            <MainNavigationBarBurgerMenu
                open={isBurgerMenuOpen}
                id={menuId}
                sections={sections}
                extra={burgerMenuExtra}
                closeMenu={() => setIsBurgerMenuOpen(false)}
                disableFocusTrap={disableFocusTrap}
                setDisableFocusTrap={setDisableFocusTrap}
            />
        </>
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
