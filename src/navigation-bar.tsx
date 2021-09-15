import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import classnames from 'classnames';
import ResponsiveLayout from './responsive-layout';
import Inline from './inline';
import Box from './box';
import Touchable from './touchable';
import {Text2, Text3} from './text';
import {useScreenSize, useTheme, useAriaId} from './hooks';
import {createUseStyles} from './jss';
import IconMenuRegular from './generated/mistica-icons/icon-menu-regular';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconButton from './icon-button';
import NegativeBox from './negative-box';
import {Row, RowList} from './list';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import FocusTrap from './focus-trap';
import {Portal} from './portal';
import GridLayout from './grid-layout';
import {useSetModalState} from './modal-context-provider';

import type {Props as TouchableProps} from './touchable';

type LogoProps = {size: number};

const MovistarLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" role="presentation">
            <g fill="none" fillRule="evenodd">
                <g fill={color} fillRule="nonzero">
                    <path d="M3.097 16.22c-.595 2.473-.826 5.05-.316 8.118.47 2.83 1.304 5.272 1.865 6.617.194.464.493.948.726 1.246.665.855 1.775.8 2.24.567.508-.254 1.092-.868.881-2.269-.102-.676-.397-1.666-.563-2.217-.508-1.69-1.186-3.728-1.245-5.18-.079-1.942.675-2.196 1.175-2.307.842-.188 1.547.75 2.217 1.927.8 1.405 2.171 3.894 3.29 5.794 1.008 1.716 2.872 3.553 5.864 3.427 3.05-.129 5.297-1.31 6.456-5.034.866-2.785 1.457-4.866 2.408-6.997 1.093-2.452 2.55-3.764 3.779-3.363 1.14.371 1.424 1.504 1.438 3.168.012 1.473-.155 3.096-.286 4.288-.047.433-.133 1.304-.098 1.787.069.95.474 1.9 1.526 2.05 1.122.162 2.022-.748 2.381-1.85.142-.433.263-1.097.328-1.568.33-2.38.415-3.979.267-6.413-.174-2.846-.722-5.443-1.679-7.689-.914-2.148-2.384-3.525-4.269-3.646-2.086-.136-4.48 1.271-5.736 4-1.158 2.516-2.084 5.098-2.646 6.416-.57 1.337-1.407 2.161-2.695 2.299-1.574.168-2.93-.993-3.923-2.65-.867-1.442-2.583-4.19-3.502-5.114-.863-.868-1.848-1.953-3.9-1.92-1.621.026-4.615.839-5.983 6.513z" />
                </g>
            </g>
        </svg>
    );
};

const VivoLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg height={size} viewBox="0 0 96 40" role="presentation">
            <g fill="none" fillRule="evenodd">
                <path
                    fill={color}
                    d="M9.178 16.667h1.679c.282 0 1.364-.143 1.96-1.193l6.948-11.913c.712-1.261-.128-2.331-.87-2.598l-1.847-.8c-.996-.431-2.19.023-2.638 1.03l-4.362 8.479h-.066L5.625 1.193C5.175.186 3.982-.268 2.988.163l-1.847.8C.397 1.23-.442 2.3.27 3.561l6.948 11.913c.596 1.05 1.678 1.193 1.96 1.193"
                    transform="translate(0.834783, 5.833333) translate(0.000000, 9.166667)"
                />
                <path
                    fill={color}
                    d="M40.065 25.833h1.678c.284 0 1.366-.142 1.961-1.192l6.948-11.913c.712-1.261-.128-2.332-.87-2.598l-1.848-.8c-.995-.432-2.188.023-2.637 1.03l-4.362 8.478h-.065L36.51 10.36c-.45-1.007-1.642-1.462-2.637-1.03l-1.846.8c-.743.266-1.583 1.337-.871 2.598l6.947 11.913c.597 1.05 1.678 1.192 1.96 1.192"
                    transform="translate(0.834783, 5.833333)"
                />
                <path
                    fill={color}
                    d="M8.347 11.622c-1.819 0-3.294-1.472-3.294-3.29 0-1.816 1.475-3.288 3.294-3.288s3.296 1.472 3.296 3.288c0 1.818-1.477 3.29-3.296 3.29M8.347 0C3.738 0 0 3.732 0 8.332c0 4.604 3.738 8.335 8.347 8.335 4.613 0 8.349-3.731 8.349-8.335C16.696 3.732 12.96 0 8.347 0"
                    transform="translate(0.834783, 5.833333) translate(51.756522, 9.166667)"
                />
                <path
                    fill={color}
                    d="M7.513 3.75c0 2.072-1.682 3.75-3.756 3.75C1.682 7.5 0 5.822 0 3.75S1.682 0 3.757 0C5.83 0 7.513 1.678 7.513 3.75"
                    transform="translate(0.834783, 5.833333) translate(21.704348, 0.000000)"
                />
                <path
                    fill={color}
                    d="M22.54 11.223c0-1.137.92-2.056 2.059-2.056h1.723c1.138 0 2.06.92 2.06 2.056v12.554c0 1.137-.922 2.056-2.06 2.056H24.6c-1.139 0-2.06-.92-2.06-2.056V11.223z"
                    transform="translate(0.834783, 5.833333)"
                />
                <path
                    fill={color}
                    fillRule="nonzero"
                    d="M85.88 28.104c.561.033.725.34.916.574.19.234 2.97 3.66 3.158 3.883.188.225.707.637 1.279.715.57.078 1.196-.04 1.596-.338.4-.298.908-.703 1.086-.974.177-.27.479-.658.423-1.295-.056-.636-.191-.969-.675-1.515-.484-.545-3.343-4-3.881-4.662 0 0-.49-.59-.419-1.423.072-.835.439-1.208 1.212-1.415.773-.207 3.795-.958 3.795-.958s1.73-.842 1.337-2.51l-.225-.853s-.376-1.946-2.862-1.343c-2.488.604-3.87.96-3.87.96s-.791.078-.905-.46c-.112-.538.035-.816.385-.965.35-.15 2.558-1.235 2.841-4.165.285-2.932-2.103-5.538-5.2-5.527-3.097.012-5.338 2.412-5.329 4.897.01 2.486 1.578 4.14 2.783 4.757.684.35.465.98.465.98s-.164.613-.884.45c-.72-.166-4.207-.987-4.207-.987s-2.103-.4-2.611 1.734c-.509 2.136.674 2.947 1.541 3.148.868.2 3.802.931 3.802.931s.873.443.907 1.351c.022.537.023.982-.527 1.783-.55.8-3.965 4.892-3.965 4.892s-1.174 1.433.527 2.724c1.701 1.292 2.658.99 3.668-.2 1.009-1.189 3.003-3.68 3.003-3.68s.275-.542.836-.51z"
                />
            </g>
        </svg>
    );
};

const O2Logo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" role="presentation">
            <g fill="none" fillRule="evenodd">
                <g fill={color} fillRule="nonzero">
                    <path d="M12.884 6.674c1.909-.057 3.839.212 5.627.876 1.063.395 2.074.927 2.986 1.59 1.52 1.096 2.758 2.55 3.611 4.192.795 1.513 1.268 3.176 1.458 4.863.09.846.128 1.698.08 2.548-.067 1.35-.33 2.691-.784 3.968-.717 2.012-1.93 3.863-3.542 5.307-1.543 1.392-3.451 2.393-5.49 2.898-1.495.373-3.053.489-4.591.376-1.562-.114-3.108-.483-4.535-1.115-1.649-.726-3.133-1.803-4.323-3.13-1.459-1.619-2.475-3.6-2.983-5.693-.248-1.016-.374-2.058-.398-3.1v-.545c.022-.871.1-1.743.263-2.6.386-2.073 1.241-4.078 2.578-5.744 1.03-1.292 2.342-2.37 3.823-3.143 1.903-1 4.064-1.495 6.22-1.548zm-.152 3.827c-.784.062-1.56.235-2.285.533-.768.313-1.478.757-2.095 1.3-.774.676-1.406 1.5-1.893 2.392-.742 1.362-1.157 2.882-1.272 4.416-.067.901-.027 1.81.107 2.704.175 1.144.508 2.27 1.032 3.31.444.885 1.029 1.708 1.762 2.389.775.728 1.722 1.282 2.748 1.604.94.296 1.937.406 2.922.364.916-.042 1.83-.221 2.676-.573 1.276-.522 2.362-1.43 3.152-2.53 1.019-1.414 1.593-3.097 1.82-4.8.298-2.224-.028-4.542-1.032-6.569-.45-.896-1.03-1.737-1.762-2.439-.785-.776-1.753-1.38-2.813-1.735-.98-.331-2.033-.44-3.067-.366zM25.26 28.321c.933-.474 1.961-.76 3.004-.81.533-.033 1.073.008 1.592.139.535.139 1.053.397 1.44.806.326.328.55.753.68 1.2.155.553.195 1.14.124 1.71-.069.514-.238 1.01-.46 1.475-.416.856-.998 1.615-1.619 2.325-.669.76-1.39 1.47-2.11 2.18 1.45-.005 2.902 0 4.353-.002.078-.001.159-.005.236.016v1.793c-.044.006-.087.012-.13.014H25v-1.932c.168-.171.347-.33.52-.496.746-.695 1.482-1.404 2.176-2.155.667-.738 1.317-1.51 1.781-2.401.21-.419.387-.874.384-1.351-.002-.341-.123-.685-.354-.934-.3-.332-.737-.5-1.168-.554-.583-.064-1.172.06-1.714.274-.418.162-.807.39-1.187.629-.06-.642-.121-1.284-.178-1.926z" />
                </g>
            </g>
        </svg>
    );
};

const TelefonicaLogo = ({size}: LogoProps) => {
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const color = isInverse && !isDarkMode ? colors.inverse : colors.brand;
    return (
        <svg height={size} viewBox="0 0 125 48" role="presentation">
            <g fill="none" fillRule="evenodd" transform="translate(2.000000, 10.000000)">
                <path
                    fill={color}
                    d="M8.61 4.298C8.61 1.924 6.683 0 4.305 0 1.927 0 0 1.924 0 4.298c0 2.375 1.927 4.299 4.305 4.299 2.378 0 4.305-1.924 4.305-4.299"
                />
                <path
                    fill={color}
                    d="M18.728 4.298C18.728 1.924 16.8 0 14.423 0c-2.378 0-4.306 1.924-4.306 4.298 0 2.375 1.928 4.299 4.306 4.299 2.377 0 4.305-1.924 4.305-4.299M28.845 4.298C28.845 1.924 26.917 0 24.54 0c-2.378 0-4.306 1.924-4.306 4.298 0 2.375 1.928 4.299 4.306 4.299 2.377 0 4.305-1.924 4.305-4.299M18.728 14.4c0-2.374-1.928-4.298-4.305-4.298-2.378 0-4.306 1.924-4.306 4.298s1.928 4.298 4.306 4.298c2.377 0 4.305-1.924 4.305-4.298M18.728 24.502c0-2.375-1.928-4.299-4.305-4.299-2.378 0-4.306 1.924-4.306 4.299 0 2.374 1.928 4.298 4.306 4.298 2.377 0 4.305-1.924 4.305-4.298M38.022 11.05L34.01 11.05 34.01 8.666 44.518 8.666 44.518 11.05 40.506 11.05 40.506 22.018 38.022 22.018zM50.803 16.296c-.21-1.24-1.032-2.194-2.389-2.194-1.452 0-2.292.954-2.579 2.194h4.968zm2.101 2.861c-.21.763-1.414 3.052-4.49 3.052-2.865 0-4.967-2.098-4.967-5.055 0-2.956 2.102-5.055 4.967-5.055 2.675 0 4.777 2.099 4.777 4.864 0 .287-.038.515-.058.687l-.038.267h-7.26c.21 1.354 1.223 2.29 2.58 2.29 1.127 0 1.814-.65 2.005-1.05h2.484zM54.622 22.018L57.01 22.018 57.01 8.666 54.622 8.666zM65.797 16.296c-.21-1.24-1.032-2.194-2.388-2.194-1.452 0-2.293.954-2.58 2.194h4.968zm2.102 2.861c-.21.763-1.414 3.052-4.49 3.052-2.866 0-4.967-2.098-4.967-5.055 0-2.956 2.101-5.055 4.967-5.055 2.675 0 4.776 2.099 4.776 4.864 0 .287-.038.515-.057.687l-.038.267h-7.26c.21 1.354 1.222 2.29 2.579 2.29 1.127 0 1.815-.65 2.006-1.05h2.484zM70.381 14.579h-1.624v-2.29h1.624v-1.43c0-1.45.937-2.384 2.389-2.384h2.101v2.098h-1.433c-.382 0-.668.286-.668.668v1.049h2.101v2.289H72.77v7.44H70.38v-7.44zM82.775 17.154c0-1.717-1.146-2.861-2.58-2.861-1.432 0-2.578 1.144-2.578 2.861 0 1.717 1.146 2.861 2.579 2.861 1.433 0 2.579-1.144 2.579-2.86m2.388 0c0 2.956-2.101 5.054-4.967 5.054-2.866 0-4.968-2.098-4.968-5.055 0-2.956 2.102-5.055 4.968-5.055s4.967 2.099 4.967 5.055M86.595 12.29h2.197l.19.954h.096c.172-.21.402-.4.65-.572.44-.287 1.108-.573 2.025-.573 2.197 0 3.821 1.622 3.821 4.101v5.818h-2.388v-5.627c0-1.24-.86-2.098-2.102-2.098-1.241 0-2.101.858-2.101 2.098v5.627h-2.388V12.29zM110.774 18.394c-.305 1.526-1.509 3.815-4.585 3.815-2.865 0-4.967-2.098-4.967-5.055 0-2.956 2.102-5.055 4.967-5.055 3.076 0 4.28 2.29 4.585 3.72h-2.388c-.21-.553-.764-1.526-2.197-1.526s-2.579 1.144-2.579 2.861c0 1.717 1.146 2.861 2.58 2.861 1.432 0 1.986-.953 2.196-1.62h2.388zM117.804 17.822h-2.006c-1.242 0-1.815.477-1.815 1.24s.554 1.24 1.529 1.24c1.451 0 2.292-.84 2.292-2.194v-.286zm.191 3.243h-.095c-.172.21-.401.4-.669.572-.458.286-1.127.572-2.102.572-2.216 0-3.534-1.354-3.534-2.956 0-1.908 1.337-3.243 4.012-3.243h2.197v-.191c0-1.068-.65-1.812-1.72-1.812-1.07 0-1.623.686-1.719 1.24h-2.388c.21-1.603 1.51-3.148 4.108-3.148 2.483 0 4.107 1.64 4.107 3.72v6.2h-2.006l-.19-.954zM97.402 22.018L99.791 22.018 99.791 12.29 97.402 12.29zM100.01 9.48c0-.779-.633-1.41-1.414-1.41-.78 0-1.413.631-1.413 1.41 0 .78.633 1.412 1.413 1.412.781 0 1.414-.632 1.414-1.411M81.056 8.189L83.54 8.189 81.247 10.955 79.24 10.955z"
                />
            </g>
        </svg>
    );
};

type NavigationBarLogoProps = {
    size?: number;
    children?: undefined;
};

export const NavigationBarLogo: React.FC<NavigationBarLogoProps> = ({size}) => {
    const {skinName} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();
    size = size ?? (isTabletOrSmaller ? 40 : 48);
    switch (skinName) {
        case 'Movistar':
            return <MovistarLogo size={size} />;
        case 'Vivo':
            return <VivoLogo size={size} />;
        case 'O2':
        case 'O2-classic':
            return <O2Logo size={size} />;
        case 'Telefonica':
            return <TelefonicaLogo size={size} />;
        default:
            return null;
    }
};

const useBurgerStyles = createUseStyles(() => ({
    burgerIconContainer: {
        position: 'relative',
        width: 24,
        height: 24,
        '& > *': {
            position: 'absolute',
            opacity: 1,
            transform: 'rotate(0) scale(1)',
            transition: 'transform 300ms, opacity 100ms',
        },
    },
    iconCloseHidden: {
        opacity: 0,
        transform: 'rotate(-45deg) scale(0.9)',
    },
    iconMenuHidden: {
        opacity: 0,
        transform: 'rotate(0deg) scale(0.7)',
    },
}));

const BurgerMenuIcon = ({isOpen}: {isOpen: boolean}) => {
    const classes = useBurgerStyles();
    return (
        <div className={classes.burgerIconContainer} role="presentation">
            <div className={isOpen ? '' : classes.iconCloseHidden}>
                <IconCloseRegular />
            </div>
            <div className={isOpen ? classes.iconMenuHidden : ''}>
                <IconMenuRegular />
            </div>
        </div>
    );
};

const NAVBAR_ZINDEX = 25;
const BURGER_ZINDEX = 26;

const DESKTOP_NAVBAR_HEIGHT = 80;
const MOBILE_NAVBAR_HEIGHT = 56;

const BURGER_MENU_ANIMATION_DURATION_MS = 300;

const useStyles = createUseStyles((theme) => {
    const shadowAlpha = theme.isDarkMode ? 1 : 0.2;

    return {
        topFixed: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: NAVBAR_ZINDEX,
        },
        notFixedPadding: {
            width: '100%',
            padding: ({paddingX}) => `0 ${paddingX}px`,
        },
        navbar: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: ({isInverse}) =>
                isInverse ? theme.colors.navigationBarBackground : theme.colors.background,
            height: DESKTOP_NAVBAR_HEIGHT,
            padding: '16px 0',
            transition: 'border 300ms',
            borderBottom: `1px solid ${theme.colors.divider}`,
            borderColor: ({isInverse}) =>
                isInverse && !theme.isDarkMode ? 'transparent' : theme.colors.divider,
            [theme.mq.tabletOrSmaller]: {
                borderColor: ({isMenuOpen, isInverse}) =>
                    isMenuOpen || (isInverse && !theme.isDarkMode) ? 'transparent' : theme.colors.divider,
                height: MOBILE_NAVBAR_HEIGHT,
                padding: '8px 0',
            },
        },
        section: {
            height: DESKTOP_NAVBAR_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            borderBottom: `2px solid transparent`,
            transition: 'border-color 300ms ease-in-out',

            // Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
            // Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
            // WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
            // See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
            '@media (pointer: fine), (pointer: none)': {
                '&:hover span': {
                    color: ({isInverse}) =>
                        isInverse ? theme.colors.textSecondaryInverse : theme.colors.textSecondary,
                },
            },
        },
        selectedSection: {
            borderColor: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.controlActivated),
        },
        spacer: {
            height: DESKTOP_NAVBAR_HEIGHT,
            [theme.mq.tabletOrSmaller]: {
                height: MOBILE_NAVBAR_HEIGHT,
            },
        },
        burgerMenu: {
            zIndex: BURGER_ZINDEX,
            position: 'fixed',
            top: MOBILE_NAVBAR_HEIGHT,
            left: 0,
            right: 0,
            height: `calc(100vh - ${MOBILE_NAVBAR_HEIGHT}px)`,
            overflowY: 'auto',
            background: theme.colors.background,
            boxShadow: ({menuTransitionState}) =>
                menuTransitionState !== 'closed' ? `6px 0 4px -4px rgba(0, 0, 0, ${shadowAlpha})` : 'none',
            transition: `transform ${BURGER_MENU_ANIMATION_DURATION_MS}ms ease-out`,
        },
        burgerMenuEnter: {
            transform: 'translate(-100vw)',
        },
        burgerMenuEnterActive: {
            transform: 'translate(0)',
        },
        burgerMenuExit: {
            transform: 'translate(0)',
        },
        burgerMenuExitActive: {
            transform: 'translate(-100vw)',
        },
        iconButton: {
            color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralHigh),
            // Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
            // Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
            // WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
            // See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
            '@media (pointer: fine), (pointer: none)': {
                '&:hover': {
                    color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralMedium),
                },
            },
        },
    };
});

type MainNavigationBarSection =
    | {href: string; to?: undefined; onPress?: undefined; title: string}
    | {to: string; href?: undefined; onPress?: undefined; title: string}
    | {onPress: () => void; to?: undefined; href?: undefined; title: string};

type MainNavigationBarProps = {
    sections: Array<MainNavigationBarSection>;
    selectedIndex?: number;
    right?: React.ReactElement;
    logo?: React.ReactElement;
    isInverse?: boolean;
    children?: undefined;
    topFixed?: boolean;
};

type MenuTransitionState = 'closed' | 'opening' | 'open' | 'closing';

export const MainNavigationBar: React.FC<MainNavigationBarProps> = ({
    sections,
    selectedIndex,
    right,
    logo,
    isInverse = false,
    topFixed = true,
}) => {
    const {texts} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuTransitionState, setMenuTransitionState] = React.useState<MenuTransitionState>('closed');
    const menuId = useAriaId();
    const classes = useStyles({isMenuOpen, isInverse, menuTransitionState});
    const {isTabletOrSmaller} = useScreenSize();
    const setModalState = useSetModalState();

    logo = logo ?? <NavigationBarLogo />;

    if (isTabletOrSmaller) {
        const openMenu = () => {
            setIsMenuOpen(true);
            setModalState({isModalOpen: true});
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
            setModalState({isModalOpen: false});
        };

        const disableFocusTrap = menuTransitionState !== 'open';

        return (
            <>
                <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                    <header>
                        <ThemeVariant isInverse={isInverse}>
                            <div className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                                <ResponsiveLayout>
                                    <Inline space="between" alignItems="center">
                                        <Inline space={24} alignItems="center">
                                            <IconButton
                                                aria-live="polite"
                                                aria-label={
                                                    isMenuOpen
                                                        ? texts.closeNavigationMenu
                                                        : texts.openNavigationMenu
                                                }
                                                aria-expanded={isMenuOpen}
                                                aria-controls={menuId}
                                                onPress={isMenuOpen ? closeMenu : openMenu}
                                            >
                                                <BurgerMenuIcon isOpen={isMenuOpen} />
                                            </IconButton>
                                            {logo}
                                        </Inline>
                                        {right}
                                    </Inline>
                                </ResponsiveLayout>
                            </div>
                        </ThemeVariant>
                        {topFixed && <div className={classes.spacer} />}
                    </header>
                </FocusTrap>
                <Portal>
                    <FocusTrap disabled={disableFocusTrap} group="burger-menu-lock">
                        <CSSTransition
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
                            timeout={BURGER_MENU_ANIMATION_DURATION_MS}
                            classNames={{
                                enter: classes.burgerMenuEnter,
                                enterActive: classes.burgerMenuEnterActive,
                                exit: classes.burgerMenuExit,
                                exitActive: classes.burgerMenuExitActive,
                            }}
                            unmountOnExit
                        >
                            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                            <nav
                                className={classes.burgerMenu}
                                id={menuId}
                                onClick={() => {
                                    // Capture bubbling click events to close the burger menu when any row is pressed
                                    closeMenu();
                                }}
                            >
                                <ResponsiveLayout>
                                    <NegativeBox>
                                        <RowList>
                                            {sections.map((section, index) => (
                                                <Row key={index} {...section} />
                                            ))}
                                        </RowList>
                                    </NegativeBox>
                                </ResponsiveLayout>
                            </nav>
                        </CSSTransition>
                    </FocusTrap>
                </Portal>
            </>
        );
    }

    return (
        <ThemeVariant isInverse={isInverse}>
            <header className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                <ResponsiveLayout>
                    <Inline space="between" alignItems="center">
                        <Inline space={48} alignItems="center">
                            {logo}
                            <nav>
                                <Inline space={32}>
                                    {sections.map(({title, ...touchableProps}, idx) => (
                                        <Touchable
                                            {...touchableProps}
                                            key={idx}
                                            className={classnames(classes.section, {
                                                [classes.selectedSection]: idx === selectedIndex,
                                            })}
                                        >
                                            <Text3 regular>{title}</Text3>
                                        </Touchable>
                                    ))}
                                </Inline>
                            </nav>
                        </Inline>
                        {right}
                    </Inline>
                </ResponsiveLayout>
            </header>
            {topFixed && <div className={classes.spacer} />}
        </ThemeVariant>
    );
};

interface NavigationBarCommonProps {
    isInverse?: boolean;
    onBack?: () => void;
    title?: string;
    right?: React.ReactElement;
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
    paddingX,
}) => {
    const {texts} = useTheme();
    const classes = useStyles({isInverse, paddingX: paddingX ?? 0});
    const content = (
        <Inline space="between" alignItems="center">
            <Inline space={24} alignItems="center">
                {onBack && (
                    <IconButton
                        aria-label={texts.backNavigationBar}
                        onPress={onBack}
                        className={classes.iconButton}
                    >
                        <IconChevronLeftRegular color="currentColor" />
                    </IconButton>
                )}
                <Text3 regular truncate>
                    {title}
                </Text3>
            </Inline>
            <Box paddingLeft={24}>{right}</Box>
        </Inline>
    );
    return (
        <ThemeVariant isInverse={isInverse}>
            <header className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                {topFixed ? (
                    <ResponsiveLayout>{content}</ResponsiveLayout>
                ) : (
                    <div className={classes.notFixedPadding}>{content}</div>
                )}
            </header>
            {topFixed && <div className={classes.spacer} />}
        </ThemeVariant>
    );
};

type FunnelNavigationBarProps = {
    isInverse?: boolean;
    logo?: React.ReactElement;
    right?: React.ReactElement;
    topFixed?: boolean;
    children?: undefined;
};

export const FunnelNavigationBar: React.FC<FunnelNavigationBarProps> = ({
    logo,
    right,
    isInverse = false,
    topFixed = true,
}) => {
    const classes = useStyles({isInverse});
    return (
        <ThemeVariant isInverse={isInverse}>
            <header className={classnames(classes.navbar, {[classes.topFixed]: topFixed})}>
                <ResponsiveLayout>
                    <GridLayout template="10">
                        <Inline space="between" alignItems="center">
                            {logo ?? <NavigationBarLogo />}
                            {right}
                        </Inline>
                    </GridLayout>
                </ResponsiveLayout>
            </header>
            {topFixed && <div className={classes.spacer} />}
        </ThemeVariant>
    );
};

const useNavigationBarActionGroupStyles = createUseStyles(() => ({
    lineHeightFix: {
        // This fixes vertical alignment issues with icons in the secondary navigation, because mistica icons
        // use display inline and other components like Badge use inline-block.
        lineHeight: 0,
    },
}));

type NavigationBarActionGroupProps = {
    children: React.ReactNode;
};

export const NavigationBarActionGroup: React.FC<NavigationBarActionGroupProps> = ({children}) => {
    const classes = useNavigationBarActionGroupStyles();
    return (
        <div className={classes.lineHeightFix}>
            <Inline space={24} alignItems="center">
                {children}
            </Inline>
        </div>
    );
};

type NavigationBarActionProps = TouchableProps;

const useNavigationBarActionStyles = createUseStyles((theme) => ({
    touchable: {
        lineHeight: 0,
        '& svg': {
            color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralHigh),
        },

        // Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
        // Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
        // WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
        // See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
        '@media (pointer: fine), (pointer: none)': {
            '&:hover span': {
                color: ({isInverse}) =>
                    isInverse ? theme.colors.textSecondaryInverse : theme.colors.textSecondary,
            },
            '&:hover svg': {
                color: ({isInverse}) => (isInverse ? theme.colors.inverse : theme.colors.neutralMedium),
            },
        },
    },
}));

export const NavigationBarAction: React.FC<NavigationBarActionProps> = ({children, ...touchableProps}) => {
    const isInverse = useIsInverseVariant();
    const classes = useNavigationBarActionStyles({isInverse});
    return (
        <Touchable {...touchableProps} className={classes.touchable}>
            <Inline space={16} alignItems="center">
                {React.Children.map(children, (child) =>
                    typeof child === 'string' ? <Text2 regular>{child}</Text2> : child
                )}
            </Inline>
        </Touchable>
    );
};
