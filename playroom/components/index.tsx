import * as React from 'react';
import {
    Select,
    IconButton,
    IconSettingsRegular,
    IconCodeFilled,
    Overlay,
    useTheme,
    useScreenSize,
    Tabs,
    Checkbox,
    ThemeContextProvider,
    skinVars,
} from '../../src';
import {Movistar, Vivo, O2, Telefonica, Blau} from '../themes';
import {useOverrideTheme} from '../frame-component';
import IconSun from '../icons/icon-sun';
import IconMoon from '../icons/icon-moon';
import IconAppleOn from '../icons/icon-apple-on';
import IconAppleOff from '../icons/icon-apple-off';
import * as styles from '../preview-tools.css';

import type {ThemeConfig, ColorScheme, SkinName} from '../../src';

export * from '../../src';
export * from './loader';
export {default as ButtonGroup} from '../../src/button-group';

const themesMap: {[skinName: string]: {themeConfig: ThemeConfig; text: string}} = {
    Movistar: {
        text: 'Movistar',
        themeConfig: Movistar,
    },
    Vivo: {
        text: 'Vivo',
        themeConfig: Vivo,
    },
    O2: {
        text: 'O2',
        themeConfig: O2,
    },
    Telefonica: {
        text: 'Telefónica',
        themeConfig: Telefonica,
    },
    Blau: {
        text: 'Blau',
        themeConfig: Blau,
    },
};

type PreviewToolsControlsProps = {
    os: 'android' | 'ios' | 'desktop';
    onOsChange: (newOs: 'android' | 'ios' | 'desktop') => void;
    skinName: SkinName;
    onSkinNameChange: (newSkinName: SkinName) => void;
    colorScheme: ColorScheme;
    onColorSchemeChange: (newColorScheme: ColorScheme) => void;
    onEditStoryPress: () => void;
    showPlatformSelector: boolean;
};

const PreviewToolsControls: React.FC<PreviewToolsControlsProps> = ({
    os,
    onOsChange,
    showPlatformSelector,
    skinName,
    onSkinNameChange,
    colorScheme,
    onColorSchemeChange,
    onEditStoryPress,
}) => {
    const {isMobile} = useScreenSize();
    const systemColorScheme = 'light';
    const alternativeColorScheme = 'dark';

    if (isMobile) {
        return (
            <div className={`${styles.controls} ${styles.mobileControls}`}>
                <Select
                    label="Select brand"
                    name="theme"
                    options={Object.entries(themesMap).map(([skinName, {text}]) => ({value: skinName, text}))}
                    value={skinName}
                    onChangeValue={onSkinNameChange as any}
                />
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
                {showPlatformSelector && (
                    <Checkbox
                        name="iOS"
                        checked={os === 'ios'}
                        onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                        render={({checked}) => (checked ? <IconAppleOn /> : <IconAppleOff />)}
                    />
                )}
                <IconButton aria-label="Edit in Playroom" size={32} onPress={onEditStoryPress}>
                    <IconCodeFilled size={32} color={skinVars.colors.neutralHigh} />
                </IconButton>
            </div>
        );
    } else {
        return (
            <div className={`${styles.controls} ${styles.desktopControls}`}>
                <div className={styles.tabs}>
                    <Tabs
                        tabs={Object.values(themesMap).map(({text}) => ({text}))}
                        selectedIndex={Object.keys(themesMap).indexOf(skinName)}
                        onChange={(index) => {
                            onSkinNameChange((Object.keys(themesMap) as Array<SkinName>)[index]);
                        }}
                    />
                </div>
                <div className={styles.flexSpacer} />
                <div className={styles.desktopControlItem}>
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
                </div>
                {showPlatformSelector && (
                    <div className={styles.desktopControlItem}>
                        <Checkbox
                            name="iOS"
                            checked={os === 'ios'}
                            onChange={(checked) => onOsChange(checked ? 'ios' : 'android')}
                            render={({checked}) => (checked ? <IconAppleOn /> : <IconAppleOff />)}
                        />
                    </div>
                )}
                <div className={styles.desktopControlItem}>
                    <IconButton aria-label="Edit in Playroom" size={32} onPress={onEditStoryPress}>
                        <IconCodeFilled size={32} color={skinVars.colors.neutralHigh} />
                    </IconButton>
                </div>
            </div>
        );
    }
};

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
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [skinName, setSkinName] = React.useState<SkinName>(initialSkinName);
    const [os, setOs] = React.useState<'android' | 'ios' | 'desktop'>(initialOs);
    const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
    const overrideTheme = useOverrideTheme();

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
                {showOverlay ? (
                    <Overlay onPress={() => setShowOverlay(false)}>{controls}</Overlay>
                ) : (
                    <div
                        className={styles.floattingButton}
                        style={{
                            top: position.startsWith('top') ? 0 : undefined,
                            bottom: position.startsWith('bottom') ? 0 : undefined,
                            right: position.endsWith('right') ? 0 : undefined,
                            left: position.endsWith('left') ? 0 : undefined,
                        }}
                    >
                        <IconButton size={56} aria-label="settings" onPress={() => setShowOverlay(true)}>
                            <div className={styles.floattingButtonBackground}>
                                <IconSettingsRegular size={24} color={skinVars.colors.neutralHigh} />
                            </div>
                        </IconButton>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <>
                {controls}
                <div style={{height: 56}} />
                {children}
            </>
        );
    }
};
