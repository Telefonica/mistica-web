'use client';
import * as React from 'react';
import {Transition} from 'react-transition-group';
import classnames from 'classnames';
import ResponsiveLayout from './responsive-layout';
import Inline from './inline';
import Touchable, {BaseTouchable} from './touchable';
import {Text2, Text3} from './text';
import {useScreenSize, useTheme, useAriaId} from './hooks';
import IconMenuRegular from './generated/mistica-icons/icon-menu-regular';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import {IconButton} from './icon-button';
import NegativeBox from './negative-box';
import {Row, RowList} from './list';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import FocusTrap from './focus-trap';
import {Portal} from './portal';
import GridLayout from './grid-layout';
import {useSetModalState} from './modal-context-provider';
import {Logo} from './logo';
import {vars} from './skins/skin-contract.css';
import * as styles from './navigation-bar.css';
import {sprinkles} from './sprinkles.css';
import {getPrefixedDataAttributes} from './utils/dom';
import Stack from './stack';
import Box from './box';
import {isRunningAcceptanceTest} from './utils/platform';

import type {Variant} from './theme-variant-context';
import type {TouchableProps} from './touchable';
import type {DataAttributes, HeadingType} from './utils/types';

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

type HeaderProps = {
    children: React.ReactNode;
    topFixed?: boolean;
    variant?: Variant;
    withBorder?: boolean;
    isMenuOpen?: boolean;
    dataAttributes?: DataAttributes;
    isBottomRow?: boolean;
};

const Header = ({
    children,
    topFixed,
    withBorder,
    isMenuOpen,
    variant = 'default',
    dataAttributes,
}: HeaderProps) => {
    const {isDarkMode} = useTheme();

    const getBorderClass = () => {
        const inverse = variant === 'inverse' && !isDarkMode;
        if (inverse || !withBorder) return styles.navbarBorderColorVariants.noBorder;
        if (isMenuOpen) return styles.navbarBorderColorVariants.menuOpen;

        return styles.navbarBorderColorVariants.default;
    };

    const backgroundColor: {[key in Variant]: string} = {
        default: vars.colors.background,
        inverse: vars.colors.navigationBarBackground,
        alternative: vars.colors.backgroundAlternative,
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

type MainNavigationBarSection =
    | {href: string; to?: undefined; onPress?: undefined; title: string}
    | {to: string; href?: undefined; onPress?: undefined; title: string}
    | {onPress: () => void; to?: undefined; href?: undefined; title: string};

type MainNavigationBarPropsBase = {
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

type MainNavigationBarProps = MainNavigationBarPropsBase;

type MenuTransitionState = 'closed' | 'opening' | 'open' | 'closing';

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
    const {texts, isDarkMode} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuTransitionState, setMenuTransitionState] = React.useState<MenuTransitionState>('closed');
    const menuId = useAriaId();
    const shadowAlpha = isDarkMode ? 1 : 0.2;
    const {isTabletOrSmaller} = useScreenSize();
    const setModalState = useSetModalState();
    const logoElement = logo || <Logo size={{mobile: 40, desktop: 48}} />;

    const renderDesktopSections = () => {
        return (
            <nav className={styles.desktopOnly}>
                <Inline space={32}>
                    {sections.map(({title, ...touchableProps}, idx) => (
                        <BaseTouchable
                            {...touchableProps}
                            key={idx}
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
                    ))}
                </Inline>
            </nav>
        );
    };

    const hasBottomSections = large && sections.length > 0;

    const openMenu = () => {
        setIsMenuOpen(true);
        setModalState({isModalOpen: true});
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setModalState({isModalOpen: false});
    };

    const disableFocusTrap = menuTransitionState !== 'open';

    const showBurger = sections.length > 1;

    const mainNavBar = (
        <ThemeVariant variant={variant}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                isMenuOpen={isMenuOpen}
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
                                        isMenuOpen ? texts.closeNavigationMenu : texts.openNavigationMenu
                                    }
                                    aria-expanded={isMenuOpen}
                                    aria-controls={menuId}
                                    onPress={isMenuOpen ? closeMenu : openMenu}
                                >
                                    <BurgerMenuIcon isOpen={isMenuOpen} />
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

    if (!isTabletOrSmaller) {
        return mainNavBar;
    }

    return (
        <>
            <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                {mainNavBar}
            </FocusTrap>
            {showBurger && (
                <Portal>
                    <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                        <Transition
                            onEntering={() => {
                                setMenuTransitionState('opening');
                            }}
                            onEntered={() => {
                                setMenuTransitionState('open');
                            }}
                            onExiting={() => {
                                setMenuTransitionState('closing');
                            }}
                            onExited={() => {
                                setMenuTransitionState('closed');
                            }}
                            in={isMenuOpen}
                            timeout={isRunningAcceptanceTest() ? 0 : BURGER_MENU_ANIMATION_DURATION_MS}
                            unmountOnExit
                        >
                            {(burgerMenuState) => (
                                <>
                                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                                    <nav
                                        className={classnames(
                                            styles.burgerMenu,
                                            styles.burgerMenuTransition[burgerMenuState]
                                        )}
                                        style={{
                                            boxShadow:
                                                menuTransitionState !== 'closed'
                                                    ? `6px 0 4px -4px rgba(0, 0, 0, ${shadowAlpha})`
                                                    : 'none',
                                        }}
                                        id={menuId}
                                        onClick={() => {
                                            // Capture bubbling click events to close the burger menu when any row is pressed
                                            closeMenu();
                                        }}
                                    >
                                        <ResponsiveLayout>
                                            <Stack space={16}>
                                                <NegativeBox>
                                                    <RowList>
                                                        {sections.map((section, index) => (
                                                            <Row key={index} {...section} />
                                                        ))}
                                                    </RowList>
                                                </NegativeBox>
                                                {burgerMenuExtra && (
                                                    <Box paddingBottom={16}>{burgerMenuExtra}</Box>
                                                )}
                                            </Stack>
                                        </ResponsiveLayout>
                                    </nav>
                                </>
                            )}
                        </Transition>
                    </FocusTrap>
                </Portal>
            )}
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
    const {texts} = useTheme();
    const content = (
        <NavigationBarContentContainer right={right}>
            <Inline space={24} alignItems="center">
                {onBack && (
                    <IconButton
                        aria-label={texts.backNavigationBar}
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
                        className={sprinkles({
                            width: '100%',
                        })}
                        style={{
                            padding: `0 ${paddingX}px`,
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
    const isInverse = useIsInverseVariant();
    return (
        <BaseTouchable
            {...touchableProps}
            className={classnames(
                sprinkles({
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                }),
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
