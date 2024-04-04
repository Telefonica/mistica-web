import * as React from 'react';
import {
    Select,
    IconSettingsRegular,
    Overlay,
    useTheme,
    useScreenSize,
    Tabs,
    ThemeContextProvider,
    skinVars,
    MovistarLogo,
    VivoLogo,
    O2Logo,
    TelefonicaLogo,
    BlauLogo,
    TuLogo,
    Inline,
    Circle,
    Touchable,
    IconButton,
    ToggleIconButton,
} from '../../src';
import {Movistar, Vivo, O2, Telefonica, Blau, Vivo_New, Tu, O2_New} from '../themes';
import {useOverrideTheme} from '../frame-component';
import IconSun from '../icons/icon-sun';
import IconMoon from '../icons/icon-moon';
import IconAppleOn from '../icons/icon-apple-on';
import IconAppleOff from '../icons/icon-apple-off';
import IconCode from '../icons/icon-code';
import * as styles from '../preview-tools.css';
import {CSSTransition} from 'react-transition-group';

import type {IconProps} from '../../dist';
import type {ThemeConfig, ColorScheme, KnownSkinName} from '../../src';

export * from '../../src';
export * from '../../src/community';
export {default as Loader} from './loader';
export {default as ButtonGroup} from '../../src/button-group';

const VivoNewLogo = () => (
    <svg width="51" height="24" viewBox="0 0 51 24" fill="none">
        <path
            d="M11.6005 5.70391C11.6005 6.41692 11.3579 7.52998 10.6042 8.31522C10.3393 8.59128 10.1094 8.75739 9.92566 8.88098C9.57134 9.11972 9.31486 9.28583 9.45773 9.68507C9.59792 10.0771 10.0358 9.95551 10.4498 9.85801C10.5831 9.82511 13.183 9.17669 13.2157 9.17509C13.914 9.03786 14.5887 9.49809 14.7524 10.2099C14.7531 10.2127 14.9611 11.1175 14.963 11.1255C15.1279 11.8374 14.7273 12.5672 14.0457 12.7755C14.0164 12.7891 11.1754 13.5009 11.1704 13.5021C10.6308 13.6454 10.315 13.9242 10.315 14.4663C10.315 14.7087 10.4494 14.9719 10.6154 15.1902C10.6154 15.1902 13.7021 19.1762 13.7179 19.2071C14.1381 19.8041 14.031 20.6367 13.4849 21.0981C13.483 21.1001 12.7898 21.686 12.7829 21.6912C12.2379 22.153 11.4338 22.092 10.9593 21.5407C10.9347 21.519 9.01793 19.0642 8.8142 18.8038C8.61086 18.5438 8.35514 18.1474 7.99967 18.1474C7.6442 18.1474 7.38964 18.5434 7.18553 18.8038C6.98257 19.0642 5.06467 21.5194 5.04079 21.5407C4.56594 22.0916 3.76181 22.153 3.21648 21.6912C3.2107 21.686 2.51672 21.1001 2.51479 21.0981C1.96946 20.6367 1.86201 19.8041 2.28179 19.2071C2.29758 19.1762 5.38432 15.1902 5.38432 15.1902C5.54992 14.9719 5.68471 14.7087 5.68471 14.4663C5.68471 13.9242 5.3693 13.6454 4.82936 13.5021C4.82436 13.5009 1.98371 12.7891 1.95444 12.7755C1.27278 12.5672 0.872639 11.8374 1.0367 11.1255C1.03824 11.1175 1.24698 10.2127 1.24736 10.2099C1.41104 9.49809 2.08538 9.03746 2.78399 9.17509C2.81672 9.17669 5.41629 9.82511 5.54954 9.85801C5.96431 9.95551 6.40181 10.0771 6.54199 9.68507C6.68487 9.28623 6.42838 9.11972 6.07446 8.88098C5.89037 8.75739 5.66045 8.59168 5.39549 8.31522C4.64142 7.52958 4.3988 6.41692 4.3988 5.70391C4.39957 3.65835 6.03671 2 8.00006 2C9.9634 2 11.6005 3.65835 11.6005 5.70391Z"
            fill="black"
        />
        <path
            d="M18 12C18 7.58172 21.7924 4 26.4706 4H41.5294C46.2076 4 50 7.58172 50 12V12C50 16.4183 46.2076 20 41.5294 20H26.4706C21.7924 20 18 16.4183 18 12V12Z"
            fill="#D73241"
        />
        <path
            d="M42 4.5C46.1421 4.5 49.5 7.85786 49.5 12C49.5 16.1421 46.1421 19.5 42 19.5H26C21.8579 19.5 18.5 16.1421 18.5 12C18.5 7.85786 21.8579 4.5 26 4.5H42ZM26 3C21.0294 3 17 7.02944 17 12C17 16.9706 21.0294 21 26 21H42C46.9706 21 51 16.9706 51 12C51 7.02944 46.9706 3 42 3H26Z"
            fill="#F6F6F6"
        />
        <path
            d="M23.043 15.5039V9.12305H24.2559V10.1367H24.3496C24.6602 9.42773 25.293 9 26.2539 9C27.6777 9 28.4629 9.85547 28.4629 11.373V15.5039H27.2031V11.6895C27.2031 10.6641 26.7578 10.1543 25.8262 10.1543C24.8945 10.1543 24.3027 10.7754 24.3027 11.7715V15.5039H23.043Z"
            fill="white"
        />
        <path
            d="M32.8574 10.0723C31.9258 10.0723 31.2754 10.7285 31.2051 11.7246H34.4277C34.3984 10.7227 33.7891 10.0723 32.8574 10.0723ZM34.4219 13.7812H35.6348C35.3477 14.9238 34.3281 15.627 32.8691 15.627C31.041 15.627 29.9219 14.373 29.9219 12.334C29.9219 10.2949 31.0645 9 32.8633 9C34.6387 9 35.7109 10.2129 35.7109 12.2168V12.6562H31.2051V12.7266C31.2461 13.8457 31.8965 14.5547 32.9043 14.5547C33.666 14.5547 34.1875 14.2793 34.4219 13.7812Z"
            fill="white"
        />
        <path
            d="M45.4844 9.12305L43.7324 15.5039H42.4258L41.1074 10.8047H41.0078L39.6953 15.5039H38.4004L36.6426 9.12305H37.9199L39.0625 13.9922H39.1562L40.4688 9.12305H41.6758L42.9883 13.9922H43.0879L44.2246 9.12305H45.4844Z"
            fill="white"
        />
    </svg>
);

const O2NewLogo = () => (
    <svg width="51" height="24" viewBox="0 0 51 24" fill="none">
        <path
            d="M17.5488 16.0336C17.8424 16.1065 18.1266 16.2416 18.3388 16.4558C18.5183 16.6276 18.6411 16.85 18.7127 17.0838C18.7977 17.3732 18.8193 17.6804 18.7802 17.9788C18.7429 18.248 18.6501 18.5076 18.5284 18.7512C18.2997 19.1993 17.9805 19.5965 17.6394 19.9683C17.2723 20.3663 16.8766 20.7381 16.4814 21.1094C17.2777 21.1069 18.074 21.1093 18.8703 21.1082C18.9135 21.1078 18.9576 21.1055 19 21.1167V22.0553C18.9759 22.0582 18.952 22.0614 18.9283 22.0624L14.8838 22.0623V21.0512C14.9759 20.9617 15.0743 20.8788 15.1687 20.7916C15.5786 20.4276 15.9825 20.0568 16.3632 19.6636C16.7294 19.2772 17.0861 18.8731 17.3411 18.4066C17.4566 18.1876 17.5534 17.9492 17.5517 17.6994C17.5505 17.5208 17.4843 17.341 17.3574 17.2105C17.1927 17.0367 16.9529 16.949 16.716 16.9204C16.3962 16.887 16.0733 16.9517 15.7757 17.0638C15.546 17.1487 15.3328 17.2686 15.1242 17.3932C15.0916 17.0571 15.0577 16.7213 15.0264 16.3851C15.5388 16.1369 16.1029 15.987 16.6754 15.9609C16.9677 15.9438 17.2639 15.9651 17.5488 16.0336ZM10.8405 5.31604C11.4058 5.52598 11.9429 5.80916 12.4281 6.16153C13.2361 6.74439 13.8939 7.51831 14.3477 8.39092C14.7702 9.19559 15.0213 10.0802 15.1223 10.977C15.1704 11.4268 15.1906 11.8802 15.1648 12.3321C15.1295 13.05 14.99 13.7632 14.7481 14.4425C14.3674 15.5125 13.7227 16.4968 12.8652 17.2646C12.0449 18.0047 11.0307 18.5371 9.94699 18.8056C9.15229 19.0038 8.32369 19.0655 7.50629 19.0057C6.67582 18.9452 5.85411 18.7488 5.09547 18.4128C4.21888 18.0263 3.43007 17.454 2.79756 16.7484C2.02182 15.8874 1.48168 14.8335 1.21175 13.7206C1.07973 13.1805 1.01279 12.6265 1 12.0718V11.7824C1.01178 11.3189 1.05344 10.8555 1.13963 10.3992C1.34506 9.29693 1.79973 8.23074 2.51039 7.34513C3.05786 6.65787 3.75545 6.08494 4.54283 5.67344C5.55445 5.14133 6.70297 4.87855 7.84905 4.85046C8.86383 4.81985 9.88996 4.96284 10.8405 5.31604ZM7.7686 6.88542C7.35186 6.91854 6.93899 7.01037 6.55342 7.16902C6.1453 7.33521 5.76806 7.57142 5.43995 7.86006C5.02852 8.21997 4.69266 8.6576 4.43365 9.13241C4.03931 9.85658 3.81866 10.665 3.75717 11.4807C3.72184 11.96 3.74281 12.4429 3.81421 12.9185C3.90715 13.527 4.08442 14.1257 4.36283 14.679C4.59899 15.1494 4.90986 15.587 5.2996 15.9493C5.7116 16.3366 6.21512 16.6312 6.76043 16.8025C7.26006 16.96 7.79015 17.0181 8.31377 16.9962C8.80091 16.9737 9.28704 16.8782 9.73639 16.6912C10.4144 16.4136 10.9922 15.9303 11.4118 15.3458C11.9534 14.5939 12.259 13.6989 12.3791 12.7929C12.5377 11.6105 12.3647 10.3778 11.831 9.3C11.592 8.82351 11.2831 8.3761 10.8943 8.0029C10.4766 7.59029 9.96207 7.26924 9.39895 7.0804C8.87733 6.90387 8.31808 6.84628 7.7686 6.88542Z"
            fill="#0050FF"
        />
        <path
            d="M18 12C18 7.58172 21.7924 4 26.4706 4H41.5294C46.2076 4 50 7.58172 50 12V12C50 16.4183 46.2076 20 41.5294 20H26.4706C21.7924 20 18 16.4183 18 12V12Z"
            fill="#D73241"
        />
        <path
            d="M23.043 15.5039V9.12305H24.2559V10.1367H24.3496C24.6602 9.42773 25.293 9 26.2539 9C27.6777 9 28.4629 9.85547 28.4629 11.373V15.5039H27.2031V11.6895C27.2031 10.6641 26.7578 10.1543 25.8262 10.1543C24.8945 10.1543 24.3027 10.7754 24.3027 11.7715V15.5039H23.043Z"
            fill="white"
        />
        <path
            d="M32.8574 10.0723C31.9258 10.0723 31.2754 10.7285 31.2051 11.7246H34.4277C34.3984 10.7227 33.7891 10.0723 32.8574 10.0723ZM34.4219 13.7812H35.6348C35.3477 14.9238 34.3281 15.627 32.8691 15.627C31.041 15.627 29.9219 14.373 29.9219 12.334C29.9219 10.2949 31.0645 9 32.8633 9C34.6387 9 35.7109 10.2129 35.7109 12.2168V12.6562H31.2051V12.7266C31.2461 13.8457 31.8965 14.5547 32.9043 14.5547C33.666 14.5547 34.1875 14.2793 34.4219 13.7812Z"
            fill="white"
        />
        <path
            d="M45.4844 9.12305L43.7324 15.5039H42.4258L41.1074 10.8047H41.0078L39.6953 15.5039H38.4004L36.6426 9.12305H37.9199L39.0625 13.9922H39.1562L40.4688 9.12305H41.6758L42.9883 13.9922H43.0879L44.2246 9.12305H45.4844Z"
            fill="white"
        />
    </svg>
);

const themesMap: {
    [skinName in KnownSkinName]: {themeConfig: ThemeConfig; text: string; icon: React.ReactNode};
} = {
    Movistar: {
        text: 'Movistar',
        themeConfig: Movistar,
        icon: <MovistarLogo size={24} />,
    },
    Vivo: {
        text: 'Vivo',
        themeConfig: Vivo,
        icon: <VivoLogo size={24} />,
    },
    'Vivo-new': {
        text: 'Vivo new',
        themeConfig: Vivo_New,
        icon: <VivoNewLogo />,
    },
    O2: {
        text: 'O2',
        themeConfig: O2,
        icon: <O2Logo size={24} />,
    },
    'O2-new': {
        text: 'O2 new',
        themeConfig: O2_New,
        icon: <O2NewLogo />,
    },
    Telefonica: {
        text: 'Telefónica',
        themeConfig: Telefonica,
        icon: <TelefonicaLogo size={24} />,
    },
    Blau: {
        text: 'Blau',
        themeConfig: Blau,
        icon: <BlauLogo size={24} />,
    },
    Tu: {
        text: 'Tu',
        themeConfig: Tu,
        icon: <TuLogo size={24} />,
    },
};

type PreviewToolsControlsProps = {
    os: 'android' | 'ios' | 'desktop';
    onOsChange: (newOs: 'android' | 'ios' | 'desktop') => void;
    skinName: KnownSkinName;
    onSkinNameChange: (newSkinName: KnownSkinName) => void;
    colorScheme: ColorScheme;
    onColorSchemeChange: (newColorScheme: ColorScheme) => void;
    onEditStoryPress: () => void;
    showPlatformSelector: boolean;
};

const PreviewToolsControls = React.forwardRef<HTMLDivElement, PreviewToolsControlsProps>(
    (
        {
            os,
            onOsChange,
            showPlatformSelector,
            skinName,
            onSkinNameChange,
            colorScheme,
            onColorSchemeChange,
            onEditStoryPress,
        },
        ref
    ) => {
        const {isMobile} = useScreenSize();
        const systemColorScheme = 'light';
        const alternativeColorScheme = 'dark';

        if (isMobile) {
            return (
                <div className={styles.controls} ref={ref}>
                    <Select
                        label="Select skin"
                        name="theme"
                        options={Object.entries(themesMap).map(([skinName, {text}]) => ({
                            value: skinName,
                            text,
                        }))}
                        value={skinName}
                        onChangeValue={onSkinNameChange as (value: string) => void}
                    />
                    <Inline space={0} alignItems="center">
                        {showPlatformSelector && (
                            <ToggleIconButton
                                checkedProps={{
                                    Icon: IconAppleOn as React.FC<IconProps>,
                                    'aria-label': 'Change platform to android',
                                }}
                                uncheckedProps={{
                                    Icon: IconAppleOff as React.FC<IconProps>,
                                    'aria-label': 'Change platform to iOS',
                                }}
                                checked={os === 'ios'}
                                onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                            />
                        )}
                        <ToggleIconButton
                            checkedProps={{
                                Icon: IconSun as React.FC<IconProps>,
                                'aria-label': 'Switch to light mode',
                            }}
                            uncheckedProps={{
                                Icon: IconMoon as React.FC<IconProps>,
                                'aria-label': 'Switch to dark mode',
                            }}
                            checked={colorScheme === alternativeColorScheme}
                            onChange={(checked) => {
                                if (checked) {
                                    onColorSchemeChange(alternativeColorScheme);
                                } else {
                                    onColorSchemeChange(systemColorScheme);
                                }
                            }}
                        />
                        <IconButton
                            bleedRight
                            aria-label="Edit in Playroom"
                            Icon={IconCode as React.FC<IconProps>}
                            onPress={onEditStoryPress}
                        />
                    </Inline>
                </div>
            );
        } else {
            return (
                <div className={styles.controls} ref={ref}>
                    <div className={styles.tabs}>
                        <Tabs
                            tabs={Object.values(themesMap).map(({icon}) => ({text: '', icon}))}
                            selectedIndex={Object.keys(themesMap).indexOf(skinName)}
                            onChange={(index) => {
                                onSkinNameChange((Object.keys(themesMap) as Array<KnownSkinName>)[index]);
                            }}
                        />
                    </div>
                    <div className={styles.flexSpacer} />
                    <Inline space={8} alignItems="center" fullWidth>
                        {showPlatformSelector && (
                            <ToggleIconButton
                                checkedProps={{
                                    Icon: IconAppleOn as React.FC<IconProps>,
                                    'aria-label': 'Change platform to android',
                                }}
                                uncheckedProps={{
                                    Icon: IconAppleOff as React.FC<IconProps>,
                                    'aria-label': 'Change platform to iOS',
                                }}
                                checked={os === 'ios'}
                                onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                            />
                        )}
                        <ToggleIconButton
                            checkedProps={{
                                Icon: IconSun as React.FC<IconProps>,
                                'aria-label': 'Change color scheme',
                            }}
                            uncheckedProps={{
                                Icon: IconMoon as React.FC<IconProps>,
                                'aria-label': 'Change color scheme',
                            }}
                            checked={colorScheme === alternativeColorScheme}
                            onChange={(checked) => {
                                if (checked) {
                                    onColorSchemeChange(alternativeColorScheme);
                                } else {
                                    onColorSchemeChange(systemColorScheme);
                                }
                            }}
                        />
                        <IconButton
                            bleedRight
                            aria-label="Edit in Playroom"
                            Icon={IconCode as React.FC<IconProps>}
                            onPress={onEditStoryPress}
                        />
                    </Inline>
                </div>
            );
        }
    }
);

type PreviewToolsProps = {
    floating?: boolean;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    showPlatformSelector?: boolean;
    showColorSchemeSelector?: boolean;
    forceMobile?: boolean;
    forceDesktop?: boolean;
    hide?: boolean;
    children: React.ReactNode;
};

const FLOATING_CONTROLS_ENTER_DURATION = 300;

export const PreviewTools = ({
    children,
    floating,
    position = 'top-right',
    showPlatformSelector = false,
    forceMobile = false,
    forceDesktop = false,
    hide,
}: PreviewToolsProps): JSX.Element => {
    const {
        skinName: initialSkinName,
        platformOverrides: {platform: initialOs = 'android'},
    } = useTheme();
    const [skinName, setSkinName] = React.useState<KnownSkinName>(initialSkinName as KnownSkinName);
    const [os, setOs] = React.useState<'android' | 'ios' | 'desktop'>(initialOs);
    const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
    const overrideTheme = useOverrideTheme();

    const [showControls, setShowControls] = React.useState(false);
    const controlsRef = React.useRef<HTMLDivElement | null>(null);
    const floatingButtonRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const selectedThemeConfig = themesMap[skinName].themeConfig;
        if (forceMobile) {
            document.location.pathname = document.location.pathname.replace(
                /playroom(-mobile|-desktop)?/,
                'playroom-mobile'
            );
        }
        if (forceDesktop) {
            document.location.pathname = document.location.pathname.replace(
                /playroom(-mobile|-desktop)?/,
                'playroom-desktop'
            );
        }
        if (!forceMobile && !forceDesktop) {
            document.location.pathname = document.location.pathname.replace(
                /playroom(-mobile|-desktop)?/,
                'playroom'
            );
        }
        overrideTheme({
            ...selectedThemeConfig,
            colorScheme,
            platformOverrides: {platform: os},
        });
    }, [overrideTheme, os, skinName, forceMobile, colorScheme, forceDesktop]);

    const editStory = () => {
        if (window.location.href.includes('/preview')) {
            window.open(window.location.href.replace('/preview', ''));
        }
    };

    const theme: ThemeConfig = React.useMemo(() => {
        return {
            ...themesMap[skinName].themeConfig,
            platformOverrides: {platform: os},
            // Dont override mediaqueries for PreviewToolsControls, to avoid using Select instead of Tabs in desktop
            enableTabFocus: false,
            colorScheme: 'light',
        };
    }, [os, skinName]);

    const controls = (
        <ThemeContextProvider theme={theme} as="div">
            <PreviewToolsControls
                ref={controlsRef}
                skinName={skinName}
                onSkinNameChange={setSkinName}
                os={os}
                onOsChange={setOs}
                showPlatformSelector={showPlatformSelector}
                onEditStoryPress={editStory}
                onColorSchemeChange={setColorScheme}
                colorScheme={colorScheme}
            />
        </ThemeContextProvider>
    );
    if (hide) {
        return <>{children}</>;
    }
    if (floating) {
        return (
            <>
                {children}

                <CSSTransition
                    in={showControls}
                    nodeRef={controlsRef}
                    timeout={FLOATING_CONTROLS_ENTER_DURATION}
                    classNames={styles.controlsTransitionClasses}
                    mountOnEnter
                    unmountOnExit
                >
                    {(state) => (
                        <Overlay
                            onPress={() => {
                                if (state === 'entered') {
                                    setShowControls(false);
                                }
                            }}
                        >
                            {controls}
                        </Overlay>
                    )}
                </CSSTransition>

                <CSSTransition
                    in={!showControls}
                    nodeRef={floatingButtonRef}
                    timeout={FLOATING_CONTROLS_ENTER_DURATION}
                    classNames={
                        position.startsWith('bottom')
                            ? styles.floatingButtonBottomTransitionClasses
                            : styles.floatingButtonTopTransitionClasses
                    }
                    mountOnEnter
                    unmountOnExit
                >
                    {(state) => (
                        <div
                            className={styles.floattingButton}
                            ref={floatingButtonRef}
                            style={{
                                top: position.startsWith('top') ? 0 : undefined,
                                bottom: position.startsWith('bottom') ? 0 : undefined,
                                right: position.endsWith('right') ? 0 : undefined,
                                left: position.endsWith('left') ? 0 : undefined,
                            }}
                        >
                            <Touchable
                                style={{width: 56, height: 56}}
                                aria-label="settings"
                                onPress={() => {
                                    if (state === 'entered') {
                                        setShowControls(true);
                                    }
                                }}
                            >
                                <div className={styles.floattingButtonBackground}>
                                    <Circle
                                        backgroundColor={skinVars.colors.backgroundContainer}
                                        size={40}
                                        border
                                    >
                                        <IconSettingsRegular
                                            className={styles.floatingButtonIcon}
                                            size={24}
                                            color={skinVars.colors.neutralHigh}
                                        />
                                    </Circle>
                                </div>
                            </Touchable>
                        </div>
                    )}
                </CSSTransition>
            </>
        );
    } else {
        return (
            <>
                {controls}
                <div className={styles.controlsHeight} />
                {children}
            </>
        );
    }
};
