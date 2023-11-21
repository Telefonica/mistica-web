import * as React from 'react';
import {
    Select,
    IconButton,
    IconSettingsRegular,
    Overlay,
    useTheme,
    useScreenSize,
    Tabs,
    Checkbox,
    ThemeContextProvider,
    skinVars,
    MovistarLogo,
    VivoLogo,
    O2Logo,
    TelefonicaLogo,
    BlauLogo,
    Inline,
    Circle,
} from '../../src';
import {Movistar, Vivo, O2, Telefonica, Blau, Vivo_New} from '../themes';
import {useOverrideTheme} from '../frame-component';
import IconSun from '../icons/icon-sun';
import IconMoon from '../icons/icon-moon';
import IconAppleOn from '../icons/icon-apple-on';
import IconAppleOff from '../icons/icon-apple-off';
import IconCode from '../icons/icon-code';
import * as styles from '../preview-tools.css';
import {CSSTransition} from 'react-transition-group';

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

type PlayroomSkinName = Exclude<KnownSkinName, 'O2-classic'>;

const themesMap: {
    [skinName in PlayroomSkinName]: {themeConfig: ThemeConfig; text: string; icon: React.ReactNode};
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
};

type PreviewToolsControlsProps = {
    os: 'android' | 'ios' | 'desktop';
    onOsChange: (newOs: 'android' | 'ios' | 'desktop') => void;
    skinName: PlayroomSkinName;
    onSkinNameChange: (newSkinName: PlayroomSkinName) => void;
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
                    <Inline space={16} alignItems="center">
                        {showPlatformSelector && (
                            <Checkbox
                                name="iOS"
                                aria-label="Change platform to iOS"
                                checked={os === 'ios'}
                                onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                                render={({checked}) =>
                                    checked ? <IconAppleOn size={24} /> : <IconAppleOff size={24} />
                                }
                            />
                        )}
                        <Checkbox
                            aria-label="Change color scheme"
                            name="colorScheme"
                            checked={colorScheme === alternativeColorScheme}
                            onChange={(checked) => {
                                if (checked) {
                                    onColorSchemeChange(alternativeColorScheme);
                                } else {
                                    onColorSchemeChange(systemColorScheme);
                                }
                            }}
                            render={({checked}) => (checked ? <IconSun size={24} /> : <IconMoon size={24} />)}
                        />
                        <IconButton aria-label="Edit in Playroom" size={24} onPress={onEditStoryPress}>
                            <IconCode size={24} color={skinVars.colors.neutralHigh} />
                        </IconButton>
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
                                onSkinNameChange((Object.keys(themesMap) as Array<PlayroomSkinName>)[index]);
                            }}
                        />
                    </div>
                    <div className={styles.flexSpacer} />
                    <Inline space={32} alignItems="center" fullWidth>
                        {showPlatformSelector && (
                            <Checkbox
                                name="iOS"
                                checked={os === 'ios'}
                                onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                                render={({checked}) => (checked ? <IconAppleOn /> : <IconAppleOff />)}
                            />
                        )}
                        <Checkbox
                            name="colorScheme"
                            checked={colorScheme === alternativeColorScheme}
                            onChange={(checked) => {
                                if (checked) {
                                    onColorSchemeChange(alternativeColorScheme);
                                } else {
                                    onColorSchemeChange(systemColorScheme);
                                }
                            }}
                            render={({checked}) => (checked ? <IconSun /> : <IconMoon />)}
                        />

                        <IconButton aria-label="Edit in Playroom" size={24} onPress={onEditStoryPress}>
                            <IconCode size={24} color={skinVars.colors.neutralHigh} />
                        </IconButton>
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
    const [skinName, setSkinName] = React.useState<PlayroomSkinName>(initialSkinName as PlayroomSkinName);
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
                    <Overlay onPress={() => setShowControls(false)}>{controls}</Overlay>
                </CSSTransition>

                <CSSTransition
                    in={!showControls}
                    nodeRef={floatingButtonRef}
                    timeout={FLOATING_CONTROLS_ENTER_DURATION}
                    classNames={
                        position.startsWith('top')
                            ? styles.floatingButtonTopTransitionClasses
                            : styles.floatingButtonBottomTransitionClasses
                    }
                    mountOnEnter
                    unmountOnExit
                >
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
                        <IconButton size={56} aria-label="settings" onPress={() => setShowControls(true)}>
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
                        </IconButton>
                    </div>
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
