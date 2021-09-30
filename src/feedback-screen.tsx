import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import OverscrollColor from './overscroll-color-context';
import {VIVO_SKIN} from './skins/constants';
import IcnSuccess from './icons/icon-success';
import IconSuccessVivo from './icons/icon-success-vivo';
import IcnError from './icons/icon-error';
import IcnInfo from './icons/icon-info';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';
import {isOldChrome, isRunningAcceptanceTest} from './utils/platform';
import {Theme} from './theme';
import {Text6, Text4} from './text';
import Box from './box';
import ResponsiveLayout from './responsive-layout';
import GridLayout from './grid-layout';
import ButtonLayout from './button-layout';
import Stack from './stack';

import type {ButtonProps, ButtonLinkProps} from './button';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isOldChrome(platformOverrides) && !isRunningAcceptanceTest(platformOverrides);

const animateText =
    (platformOverrides: Theme['platformOverrides']) =>
    ({animateText}: {animateText: boolean}) =>
        animateText && areAnimationsSupported(platformOverrides)
            ? '$sweepIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards'
            : 'initial';

const initialTextOpacity =
    (platformOverrides: Theme['platformOverrides']) =>
    ({animateText}: {animateText: boolean}) =>
        animateText && areAnimationsSupported(platformOverrides) ? 0 : 1;

const useStyles = createUseStyles((theme) => ({
    container: {
        /** This value is important, it must be higher than the zIndex from movistar.es bottom navbar (25) */
        zIndex: 26,
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        '& *': {
            zIndex: 1,
        },
    },

    backgroundDiv: {
        position: 'absolute',
        bottom: ({footerHeight}) => footerHeight,
        top: 0,
        left: 0,
        right: 0,
        [theme.mq.tabletOrSmaller]: {
            // This extra height is a workaround to make sure the background div is displayed *under* the fixed footer.
            // Otherwise in some devices (Galaxy S20+) the background and the fixed footer are rendered with some distance between them
            height: ({contentHeight}) => `calc(${contentHeight} + 1px)`,
        },
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : theme.colors.background),
    },

    footer: {
        [theme.mq.desktopOrBigger]: {
            padding: '0px 32px',
        },
    },

    '@keyframes sweepIn': {
        '0%': {
            opacity: 0,
            transform: 'translate(0, 20px)',
        },
        '100%': {
            opacity: 1,
            transform: 'translate(0, 0)',
        },
    },

    innerContainer: {
        textAlign: 'left',
        padding: '64px 8px 16px',
        [theme.mq.desktopOrBigger]: {
            padding: '64px 0 32px',
        },
    },

    iconContainer: {
        marginBottom: 24,
    },

    title: {
        animation: animateText(theme.platformOverrides),
        opacity: initialTextOpacity(theme.platformOverrides),
    },

    description: {
        animation: animateText(theme.platformOverrides),
        opacity: initialTextOpacity(theme.platformOverrides),
        '& p': {
            marginTop: 0,
            marginBottom: 16,
        },
    },

    childrenContainer: {
        marginTop: 16,
        animation: animateText(theme.platformOverrides),
        opacity: initialTextOpacity(theme.platformOverrides),
    },
}));

type HapticFeedback = 'error' | 'success';

const requestVibration = (type: HapticFeedback) => {
    if (isWebViewBridgeAvailable()) {
        requestVibrationNative(type).catch(() => {});
    }
};

const useHapticFeedback = (type?: HapticFeedback) => {
    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (type === 'success') {
            timeoutId = setTimeout(() => requestVibration('success'), 700);
        }

        if (type === 'error') {
            timeoutId = setTimeout(() => requestVibration('error'), 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [type]);
};

interface FeedbackProps {
    title: string;
    primaryButton?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    link?: React.ReactElement<ButtonLinkProps, typeof ButtonLink>;
    description?: string | Array<string>;
    children?: React.ReactNode;
    unstable_inlineInDesktop?: boolean;
}

interface FeedbackScreenProps extends FeedbackProps {
    hapticFeedback?: HapticFeedback;
    icon?: React.ReactNode;
    animateText?: boolean;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
    title,
    description,
    children,
    primaryButton,
    secondaryButton,
    link,
    hapticFeedback,
    icon,
    animateText = false,
    unstable_inlineInDesktop,
}) => {
    useHapticFeedback(hapticFeedback);
    const isInverse = useIsInverseVariant();
    const {colors} = useTheme();
    const windowHeight = useWindowHeight();
    const {isTabletOrSmaller} = useScreenSize();
    const [isServerSide, setIsServerSide] = React.useState(typeof self !== 'undefined');
    const [footerHeight, setFooterHeight] = React.useState(0);

    const contentHeightPx = `${windowHeight - footerHeight}px`;
    const classes = useStyles({
        isInverse,
        contentHeight: isServerSide ? '100vh' : contentHeightPx,
        footerHeight,
        animateText,
        primaryButton,
    });

    // This trick along with the 100vh measure allows us to perform a first meaningful render on the server side.
    // We can't use vh on client side because it causes problems with iOS (as sometimes the height is calculated as
    // if there were no OS buttons on bottom): https://bugs.webkit.org/show_bug.cgi?id=141832
    useIsomorphicLayoutEffect(() => {
        setIsServerSide(false);
    }, []);

    const normalizedDescription =
        description && Array.isArray(description)
            ? description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            : description;

    const feedbackBody = (
        <>
            {!!icon && <div className={classes.iconContainer}>{icon}</div>}
            <div className={classes.title}>
                <Text6 as="h1">{title}</Text6>
            </div>
            {normalizedDescription && (
                <Box paddingTop={16} className={classes.description}>
                    <Text4 light color={colors.textSecondary}>
                        {normalizedDescription}
                    </Text4>
                </Box>
            )}
            {children && <div className={classes.childrenContainer}>{children}</div>}
        </>
    );

    if (!isTabletOrSmaller && unstable_inlineInDesktop) {
        return (
            <Stack space={32}>
                <>{feedbackBody}</>
                <ButtonLayout link={link}>
                    {primaryButton}
                    {secondaryButton}
                </ButtonLayout>
            </Stack>
        );
    }

    const feedbackContent = (
        <div className={classes.container}>
            <ResponsiveLayout>
                <GridLayout
                    template="6+6"
                    left={<div className={classes.innerContainer}>{feedbackBody}</div>}
                    right={null}
                ></GridLayout>
            </ResponsiveLayout>
        </div>
    );

    const hasButtons = !!primaryButton || !!secondaryButton;

    return (
        <>
            {isInverse && <OverscrollColor />}
            <div style={{position: 'relative'}}>
                <div className={classes.footer}>
                    {hasButtons ? (
                        <ButtonFixedFooterLayout
                            button={primaryButton}
                            secondaryButton={secondaryButton}
                            link={link}
                            footerBgColor={isInverse ? colors.backgroundFeedbackBottom : undefined}
                            containerBgColor={isInverse ? colors.navigationBarBackground : undefined}
                            onChangeFooterHeight={setFooterHeight}
                        >
                            {feedbackContent}
                        </ButtonFixedFooterLayout>
                    ) : (
                        feedbackContent
                    )}
                </div>
                {isTabletOrSmaller && hasButtons && <div className={classes.backgroundDiv} />}
            </div>
        </>
    );
};

export const SuccessFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {isTabletOrSmaller} = useScreenSize();
    const {skinName} = useTheme();

    return (
        <ThemeVariant isInverse={isTabletOrSmaller}>
            <FeedbackScreen
                {...props}
                hapticFeedback="success"
                icon={skinName === VIVO_SKIN ? <IconSuccessVivo /> : <IcnSuccess />}
                animateText
            />
        </ThemeVariant>
    );
};
export const ErrorFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {skinName} = useTheme();
    const hasIcon = skinName !== VIVO_SKIN;
    return (
        <FeedbackScreen
            {...props}
            hapticFeedback="error"
            icon={hasIcon ? <IcnError /> : undefined}
            animateText
        />
    );
};
export const InfoFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {skinName} = useTheme();
    const hasIcon = skinName !== VIVO_SKIN;
    return <FeedbackScreen {...props} icon={hasIcon ? <IcnInfo /> : undefined} />;
};
