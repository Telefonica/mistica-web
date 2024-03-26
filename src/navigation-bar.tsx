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

import type {Props as TouchableProps} from './touchable';
import type {DataAttributes} from './utils/types';

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
    isInverse?: boolean;
    withBorder?: boolean;
    isMenuOpen?: boolean;
    dataAttributes?: DataAttributes;
    isBottomRow?: boolean;
};

const Header = ({children, topFixed, withBorder, isMenuOpen, isInverse, dataAttributes}: HeaderProps) => {
    const {isDarkMode} = useTheme();

    const getBorderClass = () => {
        const inverse = isInverse && !isDarkMode;
        if (inverse || !withBorder) return styles.navbarBorderColorVariants.noBorder;
        if (isMenuOpen) return styles.navbarBorderColorVariants.menuOpen;

        return styles.navbarBorderColorVariants.default;
    };

    return (
        <header
            className={classnames(getBorderClass(), {[styles.topFixed]: topFixed})}
            style={{
                background: isInverse ? vars.colors.navigationBarBackground : vars.colors.background,
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

const NavigationBarContentContainer: React.FC<NavigationBarContentContainerProps> = ({
    right,
    children,
    desktopOnly,
}) => {
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
    sections: ReadonlyArray<MainNavigationBarSection>;
    selectedIndex?: number;
    right?: React.ReactElement;
    logo?: React.ReactElement;
    isInverse?: boolean;
    children?: undefined;
    topFixed?: boolean;
    withBorder?: boolean;
    burgerMenuExtra?: React.ReactNode;
    large?: boolean;
};

type MainNavigationBarProps = MainNavigationBarPropsBase;

type MenuTransitionState = 'closed' | 'opening' | 'open' | 'closing';

export const MainNavigationBar: React.FC<MainNavigationBarProps> = ({
    sections,
    selectedIndex,
    right,
    isInverse = false,
    topFixed = true,
    withBorder = true,
    burgerMenuExtra,
    logo,
    large = false,
}) => {
    const {texts, isDarkMode} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuTransitionState, setMenuTransitionState] = React.useState<MenuTransitionState>('closed');
    const menuId = useAriaId();
    const shadowAlpha = isDarkMode ? 1 : 0.2;
    const {isTabletOrSmaller} = useScreenSize();
    const setModalState = useSetModalState();

    logo = logo ?? <Logo size={{mobile: 40, desktop: 48}} />;

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
                                    [styles.selectedSectionVariantes[isInverse ? 'inverse' : 'default']]:
                                        idx === selectedIndex,
                                },
                                styles.textWrapperVariants[isInverse ? 'inverse' : 'default']
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
        <ThemeVariant isInverse={isInverse}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                isMenuOpen={isMenuOpen}
                isInverse={isInverse}
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
                            <div className={styles.logoContainer}>{logo}</div>
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
    isInverse?: boolean;
    onBack?: () => void;
    title?: string;
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

export const NavigationBar: React.FC<NavigationBarProps> = ({
    onBack,
    title,
    right,
    isInverse = false,
    topFixed = true,
    paddingX = 0,
    withBorder = true,
}) => {
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
                <Text3 regular truncate>
                    {title}
                </Text3>
            </Inline>
        </NavigationBarContentContainer>
    );
    return (
        <ThemeVariant isInverse={isInverse}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                isInverse={isInverse}
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
    isInverse?: boolean;
    logo?: React.ReactElement;
    right?: React.ReactElement;
    topFixed?: boolean;
    children?: undefined;
    withBorder?: boolean;
};

export const FunnelNavigationBar: React.FC<FunnelNavigationBarProps> = ({
    logo,
    right,
    isInverse = false,
    topFixed = true,
    withBorder = true,
}) => {
    logo = logo ?? <Logo size={{mobile: 40, desktop: 48}} />;

    return (
        <ThemeVariant isInverse={isInverse}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                isInverse={isInverse}
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

export const NavigationBarActionGroup: React.FC<NavigationBarActionGroupProps> = ({children}) => {
    return (
        <div className={styles.lineHeightFix} data-component-name="NavigationBarActionGroup">
            <Inline space={24} alignItems="center">
                {children}
            </Inline>
        </div>
    );
};

type NavigationBarActionProps = TouchableProps;

export const NavigationBarAction: React.FC<NavigationBarActionProps> = ({children, ...touchableProps}) => {
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
