import {getPreferredColorScheme} from '@storybook/theming/dist/utils';
import * as React from 'react';
import {
    ThemeContextProvider,
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
    ButtonLink,
    Checkbox,
} from '../src';
import {Movistar, Vivo, O2, O2_Classic} from './themes';

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
        '& > :nth-child(2)': {flex: 2},
        justifyContent: 'space-between',
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
        flexBasis: 440,
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
};

export const PreviewTools: React.FC<PreviewToolsProps> = ({
    children,
    floating,
    position = 'top-right',
    showPlatformSelector = false,
}) => {
    const {
        skinName: initialSkinName,
        platformOverrides: {platform: initialOs = 'android'},
    } = useTheme();
    const {isMobile} = useScreenSize();
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [skinName, setSkinName] = React.useState<SkinName>(initialSkinName);
    const [os, setOs] = React.useState<'android' | 'ios'>(initialOs);
    const classes = useStyles({position});

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
            <IconButton size={32} onPress={editStory}>
                <IconCodeFilled size={32} />
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

            <div>{/* Este div suelto me soluciona el espacio */}</div>
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
            <div></div>
            <div className={classes.desktopControlItem}>
                <IconButton size={32} onPress={editStory}>
                    <IconCodeFilled size={32} />
                </IconButton>
            </div>
        </div>
    );

    const playroom = (
        <ThemeContextProvider theme={{...themesMap[skinName].themeConfig, platformOverrides: {platform: os}}}>
            {children}
        </ThemeContextProvider>
    );

    if (floating) {
        return (
            <>
                {playroom}
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
                {playroom}
            </>
        );
    }
};
