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

import type {ThemeConfig, ColorScheme, SkinName} from '../../src';

export * from '../../src';
export * from '../../src/community';
export {default as Loader} from './loader';
export {default as ButtonGroup} from '../../src/button-group';

const VivoNewLogo = () => (
    <svg width="33" height="26" viewBox="0 0 33 26" fill="none">
        <path
            d="M15.6005 7.70391C15.6005 8.41692 15.3579 9.52998 14.6042 10.3152C14.3393 10.5913 14.1094 10.7574 13.9257 10.881C13.5713 11.1197 13.3149 11.2858 13.4577 11.6851C13.5979 12.0771 14.0358 11.9555 14.4498 11.858C14.5831 11.8251 17.183 11.1767 17.2157 11.1751C17.914 11.0379 18.5887 11.4981 18.7524 12.2099C18.7531 12.2127 18.9611 13.1175 18.963 13.1255C19.1279 13.8374 18.7273 14.5672 18.0457 14.7755C18.0164 14.7891 15.1754 15.5009 15.1704 15.5021C14.6308 15.6454 14.315 15.9242 14.315 16.4663C14.315 16.7087 14.4494 16.9719 14.6154 17.1902C14.6154 17.1902 17.7021 21.1762 17.7179 21.2071C18.1381 21.8041 18.031 22.6367 17.4849 23.0981C17.483 23.1001 16.7898 23.686 16.7829 23.6912C16.2379 24.153 15.4338 24.092 14.9593 23.5407C14.9347 23.519 13.0179 21.0642 12.8142 20.8038C12.6109 20.5438 12.3551 20.1474 11.9997 20.1474C11.6442 20.1474 11.3896 20.5434 11.1855 20.8038C10.9826 21.0642 9.06467 23.5194 9.04079 23.5407C8.56594 24.0916 7.76181 24.153 7.21648 23.6912C7.2107 23.686 6.51672 23.1001 6.51479 23.0981C5.96946 22.6367 5.86201 21.8041 6.28179 21.2071C6.29758 21.1762 9.38432 17.1902 9.38432 17.1902C9.54992 16.9719 9.68471 16.7087 9.68471 16.4663C9.68471 15.9242 9.3693 15.6454 8.82936 15.5021C8.82436 15.5009 5.98371 14.7891 5.95444 14.7755C5.27278 14.5672 4.87264 13.8374 5.0367 13.1255C5.03824 13.1175 5.24698 12.2127 5.24736 12.2099C5.41104 11.4981 6.08538 11.0375 6.78399 11.1751C6.81672 11.1767 9.41629 11.8251 9.54954 11.858C9.96431 11.9555 10.4018 12.0771 10.542 11.6851C10.6849 11.2862 10.4284 11.1197 10.0745 10.881C9.89037 10.7574 9.66045 10.5917 9.39549 10.3152C8.64142 9.52958 8.3988 8.41692 8.3988 7.70391C8.39957 5.65835 10.0367 4 12.0001 4C13.9634 4 15.6005 5.65835 15.6005 7.70391Z"
            fill="#660099"
        />
        <path
            d="M17.5 0.442312H27.5C30.2933 0.442312 32.5577 2.70672 32.5577 5.5C32.5577 8.29328 30.2933 10.5577 27.5 10.5577H17.5C14.7067 10.5577 12.4423 8.29328 12.4423 5.5C12.4423 2.70672 14.7067 0.442312 17.5 0.442312Z"
            fill="#D73241"
        />
        <path
            d="M16.0381 7.5V3.73689H16.7534V4.3347H16.8087C16.9918 3.91658 17.365 3.66432 17.9317 3.66432C18.7714 3.66432 19.2345 4.16884 19.2345 5.06383V7.5H18.4915V5.25043C18.4915 4.6457 18.2289 4.34507 17.6795 4.34507C17.1301 4.34507 16.781 4.71136 16.781 5.2988V7.5H16.0381ZM21.8262 4.29669C21.2767 4.29669 20.8932 4.68371 20.8517 5.27116H22.7523C22.735 4.68026 22.3756 4.29669 21.8262 4.29669ZM22.7488 6.48406H23.4641C23.2948 7.1579 22.6935 7.57257 21.8331 7.57257C20.7549 7.57257 20.0949 6.83308 20.0949 5.63054C20.0949 4.428 20.7688 3.66432 21.8296 3.66432C22.8767 3.66432 23.509 4.37962 23.509 5.56143V5.8206H20.8517V5.86206C20.8759 6.52208 21.2595 6.9402 21.8538 6.9402C22.303 6.9402 22.6106 6.77779 22.7488 6.48406ZM29.2729 3.73689L28.2397 7.5H27.4691L26.6916 4.72864H26.6329L25.8588 7.5H25.0951L24.0585 3.73689H24.8118L25.4856 6.60846H25.5409L26.3149 3.73689H27.0268L27.8008 6.60846H27.8596L28.53 3.73689H29.2729Z"
            fill="white"
        />
        <path
            d="M17.5 0.442312H27.5C30.2933 0.442312 32.5577 2.70672 32.5577 5.5C32.5577 8.29328 30.2933 10.5577 27.5 10.5577H17.5C14.7067 10.5577 12.4423 8.29328 12.4423 5.5C12.4423 2.70672 14.7067 0.442312 17.5 0.442312Z"
            stroke="#F6F6F6"
            strokeWidth="0.884625"
        />
    </svg>
);

const themesMap: {[skinName: SkinName]: {themeConfig: ThemeConfig; text: string; icon: React.ReactNode}} = {
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
            <div className={`${styles.controls} `}>
                <Select
                    label="Select skin"
                    name="theme"
                    options={Object.entries(themesMap).map(([skinName, {text}]) => ({
                        value: skinName,
                        text,
                    }))}
                    value={skinName}
                    onChangeValue={onSkinNameChange as any}
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
            <div className={`${styles.controls} ${styles.desktopControls}`}>
                <div className={styles.tabs}>
                    <Tabs
                        tabs={Object.values(themesMap).map(({icon}) => ({text: '', icon}))}
                        selectedIndex={Object.keys(themesMap).indexOf(skinName)}
                        onChange={(index) => {
                            onSkinNameChange((Object.keys(themesMap) as Array<SkinName>)[index]);
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
                                <Circle
                                    backgroundColor={skinVars.colors.backgroundContainer}
                                    size={40}
                                    border
                                >
                                    <IconSettingsRegular size={24} color={skinVars.colors.neutralHigh} />
                                </Circle>
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
