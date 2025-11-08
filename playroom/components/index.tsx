import * as React from 'react';
import {ThemeVariant} from '../../dist';
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
    IconCloseRegular,
    IconMoonRegular,
    IconSunRegular,
    IconCodeSquareRegular,
    ResponsiveLayout,
    Text2,
} from '../../src';
import {Movistar_New, Telefonica, Blau, Vivo_New, O2_New, Esimflag} from '../themes';
import {useOverrideTheme} from '../frame-component';
import IconAppleOn from '../icons/icon-apple-on';
import IconAppleOff from '../icons/icon-apple-off';
import IconPalette from '../icons/icon-palette';
import * as styles from '../preview-tools.css';
import {CSSTransition} from 'react-transition-group';

import type {ThemeConfig, ColorScheme, KnownSkinName, IconProps} from '../../src';
import type {Variant} from '../../src/theme-variant-context';

export * from '../../src';
export * from '../../src/community';
export {default as Loader} from './loader';
export {default as Animation} from './animation';

type ValidSkinName = Exclude<KnownSkinName, 'O2' | 'Vivo' | 'Movistar' | 'Tu'>;

// Shared variant configuration
type VariantOption = {
    variant: Variant;
    color: string;
    label: string;
};

const variantOptions: Array<VariantOption> = [
    {variant: 'default' as Variant, color: skinVars.colors.background, label: 'Default'},
    {variant: 'inverse' as Variant, color: skinVars.colors.backgroundBrand, label: 'Inverse'},
    {
        variant: 'alternative' as Variant,
        color: skinVars.colors.backgroundAlternative,
        label: 'Alternative',
    },
    {
        variant: 'media' as Variant,
        color: skinVars.colors.backgroundBrand,
        label: 'Media',
    },
];

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
                                Icon: IconSunRegular as (props: IconProps) => JSX.Element,
                                'aria-label': 'Switch to light mode',
                            }}
                            uncheckedProps={{
                                Icon: IconMoonRegular as (props: IconProps) => JSX.Element,
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
                            Icon={IconCodeSquareRegular as (props: IconProps) => JSX.Element}
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
                                Icon: IconSunRegular as (props: IconProps) => JSX.Element,
                                'aria-label': 'Change color scheme',
                            }}
                            uncheckedProps={{
                                Icon: IconMoonRegular as (props: IconProps) => JSX.Element,
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
                            Icon={IconCodeSquareRegular as (props: IconProps) => JSX.Element}
                            onPress={onEditStoryPress}
                        />
                    </Inline>
                </div>
            );
        }
    }
);

type ContextToggleProps = {
    onCirclePress: (index: number) => void;
    currentVariant: Variant;
};

const ContextToggle = ({onCirclePress, currentVariant}: ContextToggleProps): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = (checked: boolean) => {
        setIsOpen(checked);
    };

    const handleCirclePress = (index: number) => {
        onCirclePress(index);
    };

    // Use shared variant options

    return (
        <Portal>
            {/* Context toggle container */}
            <div className={styles.contextToggle}>
                {/* Context items */}
                <div
                    className={`${styles.contextToggleItems} ${isOpen ? styles.contextToggleItemsOpen : styles.contextToggleItemsClosed}`}
                >
                    {variantOptions.map((option, index) => {
                        const isSelected = currentVariant === option.variant;

                        // Clases de animación individual para cada elemento
                        const animationClasses = [
                            [styles.contextToggleItem0Open, styles.contextToggleItem0Closed],
                            [styles.contextToggleItem1Open, styles.contextToggleItem1Closed],
                            [styles.contextToggleItem2Open, styles.contextToggleItem2Closed],
                            [styles.contextToggleItem3Open, styles.contextToggleItem3Closed],
                        ];

                        const [openClass, closedClass] = animationClasses[index] || animationClasses[0];
                        const animationClass = isOpen ? openClass : closedClass;

                        return (
                            <Touchable
                                key={option.variant}
                                onPress={() => handleCirclePress(index)}
                                className={`${styles.contextToggleItemCircle} ${animationClass} ${isSelected ? styles.contextToggleItemCircleSelected : ''}`}
                            >
                                <Inline space={8} alignItems="center">
                                    <Circle backgroundColor={option.color} size={24} border />
                                    <Text2 medium={isSelected} color={skinVars.colors.textPrimary}>
                                        {option.label}
                                    </Text2>
                                </Inline>
                            </Touchable>
                        );
                    })}
                </div>

                {/* Toggle button */}
                <div className={styles.contextToggleButton}>
                    <ToggleIconButton
                        checkedProps={{
                            Icon: IconCloseRegular,
                            type: 'brand',
                            backgroundType: 'soft',
                            'aria-label': 'close menu',
                        }}
                        uncheckedProps={{
                            Icon: IconPalette,
                            type: 'neutral',
                            backgroundType: 'soft',
                            'aria-label': 'open menu',
                        }}
                        checked={isOpen}
                        onChange={toggleMenu}
                    />
                </div>
            </div>
        </Portal>
    );
};

type PreviewToolsProps = {
    floating?: boolean;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    showPlatformSelector?: boolean;
    showColorSchemeSelector?: boolean;
    forceMobile?: boolean;
    forceDesktop?: boolean;
    forceTabs?: boolean;
    hide?: boolean;
    showContextToggle?: boolean;
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
    showContextToggle = false,
}: PreviewToolsProps): JSX.Element => {
    const {
        skinName: initialSkinName,
        platformOverrides: {platform: initialOs = 'android'},
    } = useTheme();
    const [skinName, setSkinName] = React.useState<ValidSkinName>(initialSkinName as ValidSkinName);
    const [os, setOs] = React.useState<'android' | 'ios' | 'desktop'>(initialOs);
    const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
    const [currentVariant, setCurrentVariant] = React.useState<Variant>('default');
    const overrideTheme = useOverrideTheme();

    const handleCirclePress = (index: number) => {
        const variants: Array<Variant> = ['default', 'inverse', 'alternative', 'media'];
        const selectedVariant = variants[index];
        setCurrentVariant(selectedVariant);
        console.log(`Theme variant changed to: ${selectedVariant}`);
    };

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

    // Conditionally render ContextToggle
    const contextToggleComponent = showContextToggle ? (
        <ThemeContextProvider theme={theme} as="div">
            <ContextToggle onCirclePress={handleCirclePress} currentVariant={currentVariant} />
        </ThemeContextProvider>
    ) : null;

    if (floating) {
        return (
            <>
                <ResponsiveLayout fullWidth variant={currentVariant}>
                    {children}
                </ResponsiveLayout>
                {contextToggleComponent}
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
                {contextToggleComponent}
                <Portal>{controls}</Portal>
                <div className={styles.controlsHeight} />
                <ThemeVariant variant={currentVariant}>{children}</ThemeVariant>
            </>
        );
    }
};
