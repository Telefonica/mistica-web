import * as React from 'react';
import {
    Select,
    Overlay,
    useTheme,
    useDensity,
    useScreenSize,
    Tabs,
    ThemeContextProvider,
    skinVars,
    MovistarLogo,
    VivoLogo,
    TelefonicaLogo,
    BlauLogo,
    Inline,
    Circle,
    Touchable,
    IconButton,
    ToggleIconButton,
    Portal,
    O2Logo,
    EsimflagLogo,
    Tooltip,
} from '../../src';
import IconSettingsRegular from '@telefonica/mistica-icons/icon-settings-regular';
import {Movistar, Telefonica, Blau, Vivo, Vivo_Evolution, O2, Esimflag} from '../themes';
import {useOverrideTheme, useOverrideDensity} from '../frame-component';
import IconSun from '../icons/icon-sun';
import IconMoon from '../icons/icon-moon';
import IconDensityCompact from '../icons/icon-density-compact';
import IconDensityCozy from '../icons/icon-density-cozy';
import IconAppleOn from '../icons/icon-apple-on';
import IconAppleOff from '../icons/icon-apple-off';
import IconCode from '../icons/icon-code';
import * as styles from '../preview-tools.css';
import {CSSTransition} from 'react-transition-group';

import type {ThemeConfig, ColorScheme, KnownSkinName, IconProps, Density} from '../../src';

export * from '../../src';
export * from '../../src/community';
// the icons are a separate package now, and Playroom needs every name in its scope
export * from '../../packages/mistica-icons/src/generated';
export {default as Loader} from './loader';
export {default as Animation} from './animation';

type ValidSkinName = KnownSkinName;

const BrandIcon = ({Logo}: {Logo: React.ComponentType<{size: number; color?: string}>}) => {
    const {isDarkMode} = useTheme();
    return <Logo size={24} color={isDarkMode ? skinVars.colors.inverse : undefined} />;
};

const themesMap: {
    [skinName in ValidSkinName]: {
        themeConfig: ThemeConfig;
        text: string;
        Icon: (props: IconProps) => JSX.Element;
    };
} = {
    Movistar: {
        text: 'Movistar',
        themeConfig: Movistar,
        Icon: () => <BrandIcon Logo={MovistarLogo} />,
    },
    Vivo: {
        text: 'Vivo',
        themeConfig: Vivo,
        Icon: () => <BrandIcon Logo={VivoLogo} />,
    },
    'Vivo-evolution': {
        text: 'Vivo Evolution',
        themeConfig: Vivo_Evolution,
        Icon: () => <BrandIcon Logo={VivoLogo} />,
    },
    O2: {
        text: 'O2',
        themeConfig: O2,
        Icon: () => <BrandIcon Logo={O2Logo} />,
    },
    Telefonica: {
        text: 'Telefónica',
        themeConfig: Telefonica,
        Icon: () => <BrandIcon Logo={TelefonicaLogo} />,
    },
    Blau: {
        text: 'Blau',
        themeConfig: Blau,
        Icon: () => <BrandIcon Logo={BlauLogo} />,
    },
    Esimflag: {
        text: 'Esimflag',
        themeConfig: Esimflag,
        Icon: () => <BrandIcon Logo={EsimflagLogo} />,
    },
};

type PreviewToolsControlsProps = {
    os: 'android' | 'ios' | 'desktop';
    onOsChange: (newOs: 'android' | 'ios' | 'desktop') => void;
    skinName: ValidSkinName;
    onSkinNameChange: (newSkinName: ValidSkinName) => void;
    colorScheme: ColorScheme;
    onColorSchemeChange: (newColorScheme: ColorScheme) => void;
    density: Density;
    onDensityChange: (newDensity: Density) => void;
    onEditStoryPress: () => void;
    showPlatformSelector: boolean;
    forceTabs?: boolean;
    showColorSchemeToggle: boolean;
    showDensityToggle: boolean;
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
            density,
            onDensityChange,
            onEditStoryPress,
            forceTabs,
            showColorSchemeToggle,
            showDensityToggle,
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
                            <Tooltip
                                target={
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
                                }
                                description={os === 'ios' ? 'Change to Android' : 'Change to iOS'}
                            />
                        )}
                        {showDensityToggle && (
                            <Tooltip
                                target={
                                    <ToggleIconButton
                                        checkedProps={{
                                            Icon: IconDensityCozy as (props: IconProps) => JSX.Element,
                                            'aria-label': 'Switch to compact density',
                                        }}
                                        uncheckedProps={{
                                            Icon: IconDensityCompact as (props: IconProps) => JSX.Element,
                                            'aria-label': 'Switch to cozy density',
                                        }}
                                        checked={density === 'compact'}
                                        onChange={(checked) => onDensityChange(checked ? 'compact' : 'cozy')}
                                    />
                                }
                                description={
                                    density === 'compact'
                                        ? 'Change to cozy density'
                                        : 'Change to compact density'
                                }
                            />
                        )}
                        {showColorSchemeToggle && (
                            <Tooltip
                                target={
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
                                }
                                description={
                                    colorScheme === alternativeColorScheme
                                        ? 'Change to light mode'
                                        : 'Change to dark mode'
                                }
                            />
                        )}
                        <Tooltip
                            target={
                                <IconButton
                                    bleedRight
                                    aria-label="Edit in Playroom"
                                    Icon={IconCode as (props: IconProps) => JSX.Element}
                                    onPress={onEditStoryPress}
                                />
                            }
                            description="Edit in Playroom"
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
                            <Tooltip
                                target={
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
                                }
                                description={os === 'ios' ? 'Change to Android' : 'Change to iOS'}
                            />
                        )}
                        {showDensityToggle && (
                            <Tooltip
                                target={
                                    <ToggleIconButton
                                        checkedProps={{
                                            Icon: IconDensityCozy as (props: IconProps) => JSX.Element,
                                            'aria-label': 'Switch to compact density',
                                        }}
                                        uncheckedProps={{
                                            Icon: IconDensityCompact as (props: IconProps) => JSX.Element,
                                            'aria-label': 'Switch to cozy density',
                                        }}
                                        checked={density === 'compact'}
                                        onChange={(checked) => onDensityChange(checked ? 'compact' : 'cozy')}
                                    />
                                }
                                description={
                                    density === 'compact'
                                        ? 'Change to cozy density'
                                        : 'Change to compact density'
                                }
                            />
                        )}

                        {showColorSchemeToggle && (
                            <Tooltip
                                target={
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
                                }
                                description={
                                    colorScheme === alternativeColorScheme
                                        ? 'Change to light mode'
                                        : 'Change to dark mode'
                                }
                            />
                        )}

                        <Tooltip
                            target={
                                <IconButton
                                    bleedRight
                                    aria-label="Edit in Playroom"
                                    Icon={IconCode as (props: IconProps) => JSX.Element}
                                    onPress={onEditStoryPress}
                                />
                            }
                            description="Edit in Playroom"
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
    hideColorScheme?: boolean;
    hideDensity?: boolean;
    forceMobile?: boolean;
    forceDesktop?: boolean;
    forceTabs?: boolean;
    forceColorScheme?: 'auto' | ColorScheme;
    forceDensity?: 'auto' | Density;
    hide?: boolean;
    showBorder?: boolean;
    children: React.ReactNode;
};

const FLOATING_CONTROLS_ENTER_DURATION = 300;

const PreviewToolsComponent = ({
    children,
    floating,
    position = 'top-right',
    showPlatformSelector = false,
    hideColorScheme = false,
    hideDensity = false,
    forceMobile = false,
    forceDesktop = false,
    forceTabs = false,
    forceColorScheme = 'auto',
    forceDensity = 'auto',
    hide,
    showBorder = false,
}: PreviewToolsProps): JSX.Element => {
    const {
        skinName: initialSkinName,
        platformOverrides: {platform: initialOs = 'android'},
    } = useTheme();
    const [skinName, setSkinName] = React.useState<ValidSkinName>(initialSkinName as ValidSkinName);
    const [os, setOs] = React.useState<'android' | 'ios' | 'desktop'>(initialOs);
    const [selectedColorScheme, setColorScheme] = React.useState<ColorScheme>('light');
    const [selectedDensity, setDensity] = React.useState<Density>(useDensity());
    const colorScheme = forceColorScheme === 'auto' ? selectedColorScheme : forceColorScheme;
    const density = forceDensity === 'auto' ? selectedDensity : forceDensity;
    const overrideTheme = useOverrideTheme();
    const overrideDensity = useOverrideDensity();

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

    React.useEffect(() => {
        overrideDensity(density);
    }, [overrideDensity, density]);

    const editStory = () => {
        try {
            const href =
                window.parent && window.parent !== window
                    ? window.parent.location.href
                    : window.location.href;
            if (href.includes('/preview')) {
                window.open(href.replace('/preview', ''), '_blank');
            }
        } catch {
            if (window.location.href.includes('/preview')) {
                window.open(window.location.href.replace('/preview', ''));
            }
        }
    };

    const theme: ThemeConfig = React.useMemo(() => {
        return {
            ...themesMap[skinName].themeConfig,
            platformOverrides: {platform: os},
            // Don't override media queries for PreviewToolsControls, to avoid using Select instead of Tabs in desktop
            colorScheme,
            dimensions: {
                headerMobileHeight: 'mistica',
            },
        };
    }, [colorScheme, os, skinName]);

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
                density={density}
                onDensityChange={setDensity}
                forceTabs={forceTabs}
                showColorSchemeToggle={!hideColorScheme && forceColorScheme === 'auto'}
                showDensityToggle={!hideDensity && forceDensity === 'auto'}
            />
        </ThemeContextProvider>
    );

    const border = showBorder ? <div className={styles.previewBorder} /> : undefined;

    if (hide) {
        return (
            <>
                <Portal>{border}</Portal>
                {children}
            </>
        );
    }
    if (floating) {
        return (
            <>
                {children}
                <Portal>
                    {border}
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
                <Portal>
                    {border}
                    {controls}
                </Portal>
                <div className={styles.controlsHeight} />
                {children}
            </>
        );
    }
};

export const PreviewTools = (props: PreviewToolsProps): JSX.Element | null => {
    const {skinName} = useTheme();
    if (!(skinName in themesMap)) {
        return null;
    }
    return <PreviewToolsComponent {...props} />;
};
