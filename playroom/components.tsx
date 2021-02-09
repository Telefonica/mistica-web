import * as React from 'react';
import {
    Select,
    ThemeConfig,
    createUseStyles,
    IconButton,
    IconSettingsRegular,
    IconCodeFilled,
    Overlay,
    useTheme,
    SkinName,
    useScreenSize,
    Tabs,
    Checkbox,
} from '../src';
import {Movistar, Vivo, O2, O2_Classic} from './themes';
import {useOverrideTheme} from './frame-component';

export * from '../src';

const useStyles = createUseStyles((theme) => ({
    controls: {
        background: 'white',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2,
        display: 'flex',
        '& *': {outline: 'none'},
    },
    flexSpacer: {
        flex: 1,
    },
    mobileControls: {
        alignItems: 'center',
        paddingRight: 8,
        gap: '8px',
        '& > :last-child': {flexShrink: 0},
    },
    desktopControls: {
        borderBottom: `1px solid ${theme.colors.divider}`,
        height: 57,
    },
    tabs: {
        flexBasis: 448,
        whiteSpace: 'nowrap',
    },
    desktopControlItem: {
        padding: '0 16px 2px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        borderLeft: `1px solid ${theme.colors.divider}`,
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    floattingButton: {
        position: 'fixed',
        zIndex: 1,
        top: ({position}) => (position.startsWith('top') ? 0 : 'initial'),
        bottom: ({position}) => (position.startsWith('bottom') ? 0 : 'initial'),
        right: ({position}) => (position.endsWith('right') ? 0 : 'initial'),
        left: ({position}) => (position.endsWith('left') ? 0 : 'initial'),
        opacity: 0.3,
        '& *': {outline: 'none'},
        '&:hover': {
            opacity: 1,
            transform: 'rotateZ(30deg)',
        },
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    },
    floattingButtonBackground: {
        borderRadius: '50%',
        background: 'white',
        display: 'inline-block',
        width: 32,
        height: 32,
    },
}));

type PreviewToolsProps = {
    floating?: boolean;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    showPlatformSelector?: boolean;
    forceMobile?: boolean;
};

const themesMap: {[skinName in SkinName]: {themeConfig: ThemeConfig; text: string}} = {
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
    'O2-classic': {
        text: 'O2 (classic)',
        themeConfig: O2_Classic,
    },
};

export const PreviewTools: React.FC<PreviewToolsProps> = ({
    children,
    floating,
    position = 'top-right',
    showPlatformSelector = false,
    forceMobile = false,
}) => {
    const {
        skinName: initialSkinName,
        platformOverrides: {platform: initialOs = 'android'},
        colors,
    } = useTheme();
    const {isMobile} = useScreenSize();
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [skinName, setSkinName] = React.useState<SkinName>(initialSkinName);
    const [os, setOs] = React.useState<'android' | 'ios' | 'desktop'>(initialOs);
    const classes = useStyles({position});

    const overrideTheme = useOverrideTheme();

    React.useEffect(() => {
        const imposibleSize = 999999;
        overrideTheme({
            ...themesMap[skinName].themeConfig,
            platformOverrides: {platform: os},
            mediaQueries: forceMobile
                ? {
                      tabletMinWidth: imposibleSize,
                      desktopMinWidth: imposibleSize,
                      largeDesktopMinWidth: imposibleSize,
                      desktopOrTabletMinHeight: imposibleSize,
                  }
                : undefined,
        });
    }, [overrideTheme, os, skinName, forceMobile]);

    const editStory = () => {
        if (window.location.href.includes('/preview')) {
            window.open(window.location.href.replace('/preview', ''));
        }
    };

    const controls = isMobile ? (
        <div className={`${classes.controls} ${classes.mobileControls}`}>
            <Select
                label="Select brand"
                name="theme"
                options={Object.entries(themesMap).map(([skinName, {text}]) => ({value: skinName, text}))}
                value={skinName}
                onChangeValue={setSkinName as any}
            />
            {showPlatformSelector && (
                <Checkbox
                    name="iOS"
                    checked={os === 'ios'}
                    onChange={(checked) => setOs(checked ? 'ios' : 'android')}
                    render={(checkboxElement) => (
                        <div className={classes.checkbox}>{checkboxElement} iOS</div>
                    )}
                />
            )}
            <IconButton label="Edit in Playroom" size={32} onPress={editStory}>
                <IconCodeFilled size={32} color={colors.iconSecondary} />
            </IconButton>
        </div>
    ) : (
        <div className={`${classes.controls} ${classes.desktopControls}`}>
            <div className={classes.tabs}>
                <Tabs
                    tabs={Object.values(themesMap).map(({text}) => ({text}))}
                    selectedIndex={Object.keys(themesMap).indexOf(skinName)}
                    onChange={(index) => {
                        setSkinName((Object.keys(themesMap) as Array<SkinName>)[index]);
                    }}
                />
            </div>
            <div className={classes.flexSpacer} />
            {showPlatformSelector && (
                <div className={classes.desktopControlItem}>
                    <Checkbox
                        name="iOS"
                        checked={os === 'ios'}
                        onChange={(checked) => setOs(checked ? 'ios' : 'android')}
                        render={(checkboxElement) => (
                            <div className={classes.checkbox}>{checkboxElement} iOS</div>
                        )}
                    />
                </div>
            )}
            <div className={classes.desktopControlItem}>
                <IconButton label="Edit in Playroom" size={32} onPress={editStory}>
                    <IconCodeFilled size={32} color={colors.iconSecondary} />
                </IconButton>
            </div>
        </div>
    );

    if (floating) {
        return (
            <>
                {children}
                {showOverlay ? (
                    <Overlay onPress={() => setShowOverlay(false)}>{controls}</Overlay>
                ) : (
                    <div className={classes.floattingButton}>
                        <IconButton size={56} label="settings" onPress={() => setShowOverlay(true)}>
                            <div className={classes.floattingButtonBackground}>
                                <IconSettingsRegular size={32} />
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
