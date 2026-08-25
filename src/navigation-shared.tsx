'use client';
import * as React from 'react';
import classnames from 'classnames';
import ResponsiveLayout from './responsive-layout';
import Inline from './inline';
import Box from './box';
import {Text3} from './text';
import {IconButton} from './icon-button';
import IconMenuRegular from './generated/mistica-icons/icon-menu-regular';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import {ThemeVariant, normalizeVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';
import * as styles from './navigation-shared.css';

import type {BoxProps} from './box';
import type {NonDeprecatedVariant, Variant} from './theme-variant-context';
import type {DataAttributes, HeadingType} from './utils/types';

/*
 * The parts that every navigation surface shares. `NavigationBar`, `MainNavigationBar` and
 * `FunnelNavigationBar` build their bars with them, and so does the mobile `SidenavBar`. A change here
 * reaches the four components, so every one of them carries screenshot tests.
 *
 * The desktop menu of `MainNavigationBar` stays in `navigation-bar.tsx`, because that menu belongs to that
 * component alone. The panel of a burger menu lives in `mobile-navigation-menu.tsx`.
 */

export const BurgerMenuIcon = ({isOpen}: {isOpen: boolean}): JSX.Element => {
    return (
        <div className={styles.burgerIconContainer} role="presentation" data-testid="BurgerMenuIcon">
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
    variant: NonDeprecatedVariant;
    withBorder?: boolean;
    isBurgerMenuOpen?: boolean;
    dataAttributes?: DataAttributes;
    isBottomRow?: boolean;
};

export const Header = ({
    children,
    topFixed,
    withBorder,
    isBurgerMenuOpen,
    variant,
    dataAttributes,
}: HeaderProps): JSX.Element => {
    const {isDarkMode} = useTheme();

    const getBorderClass = () => {
        const isBrandVariant = (variant === 'brand' || variant === 'negative') && !isDarkMode;
        if (isBrandVariant || !withBorder) return styles.navbarBorderColorVariants.noBorder;
        if (isBurgerMenuOpen) return styles.navbarBorderColorVariants.menuOpen;

        return styles.navbarBorderColorVariants.default;
    };

    const backgroundColor = {
        default: vars.colors.background,
        brand: vars.colors.navigationBarBackground,
        negative: vars.colors.backgroundNegative,
        alternative: vars.colors.backgroundAlternative,
        media: vars.colors.navigationBarBackground,
    } as const;

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

export const NavigationBarContentContainer = React.forwardRef<
    HTMLDivElement,
    NavigationBarContentContainerProps
>(({right, children, desktopOnly, expandRightContent}, ref) => {
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
});

type WideConfig = {
    paddingX: BoxProps['paddingX'];
};

export const NavigationBarSideMargins = ({
    children,
    wide,
    backgroundColor,
}: {
    children: React.ReactNode;
    wide: boolean | WideConfig;
    backgroundColor?: string;
}): JSX.Element => {
    if (!wide) {
        return <ResponsiveLayout backgroundColor={backgroundColor}>{children}</ResponsiveLayout>;
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
            background={backgroundColor}
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
}

interface NavigationBarNotFixedProps extends NavigationBarCommonProps {
    topFixed: false;
}

type NavigationBarProps = NavigationBarTopFixedProps | NavigationBarNotFixedProps;

export const NavigationBar = ({
    onBack,
    title,
    titleAs,
    right,
    variant = 'default',
    topFixed = true,
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
        if (typeof wide !== 'object') {
            return 0;
        }
        return wide.paddingX ?? 0;
    };

    const normalizedVariant = normalizeVariant(variant);

    return (
        <ThemeVariant variant={normalizedVariant}>
            <Header
                topFixed={topFixed}
                withBorder={withBorder}
                variant={normalizedVariant}
                dataAttributes={{testid: 'NavigationBar'}}
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

export type {HeaderProps, NavigationBarContentContainerProps, WideConfig, NavigationBarProps};
