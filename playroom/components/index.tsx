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
    MovistarNewLogo,
    VivoLogo,
    TelefonicaLogo,
    BlauLogo,
    Inline,
    Circle,
    Touchable,
    IconButton,
    ToggleIconButton,
    Portal,
    O2NewLogo,
    EsimflagLogo,
} from '../../src';
import {Movistar_New, Telefonica, Blau, Vivo_New, O2_New, Esimflag} from '../themes';
import {useOverrideTheme} from '../frame-component';
import IconSun from '../icons/icon-sun';
import IconMoon from '../icons/icon-moon';
import IconAppleOn from '../icons/icon-apple-on';
import IconAppleOff from '../icons/icon-apple-off';
import IconCode from '../icons/icon-code';
import * as styles from '../preview-tools.css';
import {CSSTransition} from 'react-transition-group';

import type {ThemeConfig, ColorScheme, KnownSkinName, IconProps} from '../../src';

export * from '../../src';
export * from '../../src/community';
export {default as Loader} from './loader';
export {default as Animation} from './animation';

type ValidSkinName = Exclude<KnownSkinName, 'O2' | 'Vivo' | 'Movistar' | 'Tu'>;

const themesMap: {
    [skinName in ValidSkinName]: {
        themeConfig: ThemeConfig;
        text: string;
        Icon: (props: IconProps) => JSX.Element;
    };
} = {
    'Movistar-new': {
        text: 'Movistar',
        themeConfig: Movistar_New,
        Icon: () => <MovistarNewLogo size={24} />,
    },
    'Vivo-new': {
        text: 'Vivo',
        themeConfig: Vivo_New,
        Icon: () => <VivoLogo size={24} />,
    },
    'O2-new': {
        text: 'O2',
        themeConfig: O2_New,
        Icon: () => <O2NewLogo size={24} />,
    },
    Telefonica: {
        text: 'Telefónica',
        themeConfig: Telefonica,
        Icon: () => <TelefonicaLogo size={24} />,
    },
    Blau: {
        text: 'Blau',
        themeConfig: Blau,
        Icon: () => <BlauLogo size={24} />,
    },
    Esimflag: {
        text: 'Esimflag',
        themeConfig: Esimflag,
        Icon: () => <EsimflagLogo size={24} />,
    },
};

type PreviewToolsControlsProps = {
    os: 'android' | 'ios' | 'desktop';
    onOsChange: (newOs: 'android' | 'ios' | 'desktop') => void;
    skinName: ValidSkinName;
    onSkinNameChange: (newSkinName: ValidSkinName) => void;
    colorScheme: ColorScheme;
    onColorSchemeChange: (newColorScheme: ColorScheme) => void;
    onEditStoryPress: () => void;
    showPlatformSelector: boolean;
    forceTabs?: boolean;
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
            forceTabs,
        },
        ref
    ) => {
        const {isMobile} = useScreenSize();
        const systemColorScheme = 'light';
        const alternativeColorScheme = 'dark';

        if (isMobile && !forceTabs) {
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
                                    Icon: IconAppleOn as (props: IconProps) => JSX.Element,
                                    'aria-label': 'Change platform to android',
                                }}
                                uncheckedProps={{
                                    Icon: IconAppleOff as (props: IconProps) => JSX.Element,
                                    'aria-label': 'Change platform to iOS',
                                }}
                                checked={os === 'ios'}
                                onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                            />
                        )}
                        <ToggleIconButton
                            checkedProps={{
                                Icon: IconSun as (props: IconProps) => JSX.Element,
                                'aria-label': 'Switch to light mode',
                            }}
                            uncheckedProps={{
                                Icon: IconMoon as (props: IconProps) => JSX.Element,
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
                            Icon={IconCode as (props: IconProps) => JSX.Element}
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
                            tabs={Object.values(themesMap).map(({Icon}) => ({text: '', Icon}))}
                            selectedIndex={Object.keys(themesMap).indexOf(skinName)}
                            onChange={(index) => {
                                onSkinNameChange((Object.keys(themesMap) as Array<ValidSkinName>)[index]);
                            }}
                        />
                    </div>
                    <div className={styles.flexSpacer} />
                    <Inline space={8} alignItems="center" fullWidth>
                        {showPlatformSelector && (
                            <ToggleIconButton
                                checkedProps={{
                                    Icon: IconAppleOn as (props: IconProps) => JSX.Element,
                                    'aria-label': 'Change platform to android',
                                }}
                                uncheckedProps={{
                                    Icon: IconAppleOff as (props: IconProps) => JSX.Element,
                                    'aria-label': 'Change platform to iOS',
                                }}
                                checked={os === 'ios'}
                                onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                            />
                        )}
                        <ToggleIconButton
                            checkedProps={{
                                Icon: IconSun as (props: IconProps) => JSX.Element,
                                'aria-label': 'Change color scheme',
                            }}
                            uncheckedProps={{
                                Icon: IconMoon as (props: IconProps) => JSX.Element,
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
                            Icon={IconCode as (props: IconProps) => JSX.Element}
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
    forceTabs?: boolean;
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
    forceTabs = false,
    hide,
}: PreviewToolsProps): JSX.Element => {
    const {
        skinName: initialSkinName,
        platformOverrides: {platform: initialOs = 'android'},
    } = useTheme();
    const [skinName, setSkinName] = React.useState<ValidSkinName>(initialSkinName as ValidSkinName);
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
            dimensions: {
                headerMobileHeight: 'mistica',
            },
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
                forceTabs={forceTabs}
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
                <Portal>
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
                </Portal>
            </>
        );
    } else {
        return (
            <>
                <Portal>{controls}</Portal>
                <div className={styles.controlsHeight} />
                {children}
            </>
        );
    }
};
