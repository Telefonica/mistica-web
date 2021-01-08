import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import {TopDistanceContext} from './fixed-to-top';
import OverscrollColor from './overscroll-color-context';
import {VIVO_SKIN} from './skins/constants';
import IcnSuccess from './icons/icon-success';
import IcnError from './icons/icon-error';
import IcnInfo from './icons/icon-info';
import {
    isWebViewBridgeAvailable,
    requestVibration as requestVibrationNative,
} from '@tef-novum/webview-bridge';
import {isOldChrome, isRunningAcceptanceTest} from './utils/platform';
import {Theme} from './theme';
import {Box, Text3, Text5} from '.';

const areAnimationsSupported = (platformOverrides: Theme['platformOverrides']) =>
    !isOldChrome(platformOverrides) && !isRunningAcceptanceTest(platformOverrides);

const animateText = (platformOverrides: Theme['platformOverrides']) => ({
    animateText,
}: {
    animateText: boolean;
}) =>
    animateText && areAnimationsSupported(platformOverrides)
        ? '$sweepIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards'
        : 'initial';

const initialTextOpacity = (platformOverrides: Theme['platformOverrides']) => ({
    animateText,
}: {
    animateText: boolean;
}) => (animateText && areAnimationsSupported(platformOverrides) ? 0 : 1);

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        [theme.mq.mobile]: {
            minHeight: ({visibleAreaHeight, primaryButton}) =>
                primaryButton ? `calc(${visibleAreaHeight} - env(safe-area-inset-bottom))` : 'unset',
        },
        '& *': {
            zIndex: 1,
        },
    },

    backgroundDiv: {
        position: 'fixed',
        // There is a weird line between the background and the footer if we dont subtract 1 px
        bottom: ({footerHeight}) => `calc(${footerHeight}px + env(safe-area-inset-bottom) - 1px)`,
        left: 0,
        // There is a weird line between the background and the header if we dont add 2 px
        [theme.mq.mobile]: {
            height: ({visibleAreaHeight}) => `calc(${visibleAreaHeight} - env(safe-area-inset-bottom) + 2px)`,
        },
        width: '100%',
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundSpecial1 : theme.colors.background),
    },

    footer: {
        [theme.mq.tabletOrBigger]: {
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
        padding: '64px 24px 16px',
    },

    iconContainer: {
        marginBottom: 24,
    },

    title: {
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimarySpecial : theme.colors.textPrimary),
        animation: animateText(theme.platformOverrides),
        opacity: initialTextOpacity(theme.platformOverrides),
    },

    description: {
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimarySpecial : theme.colors.textSecondary),
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

    [theme.mq.tabletOrBigger]: {
        innerContainer: {
            padding: '64px 16px 16px',
        },
        description: {
            maxWidth: 456,
        },
        title: {
            maxWidth: 344,
        },
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
    primaryButton?: React.ReactElement<typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<typeof ButtonSecondary>;
    link?: React.ReactElement<typeof ButtonLink>;
    description?: string | Array<string>;
    children?: React.ReactNode;
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
}) => {
    useHapticFeedback(hapticFeedback);
    const isInverse = useIsInverseVariant();
    const theme = useTheme();
    const windowHeight = useWindowHeight();
    const {isMobile} = useScreenSize();
    const topDistance = React.useContext(TopDistanceContext);
    const [isServerSide, setIsServerSide] = React.useState(true);
    const [footerHeight, setFooterHeight] = React.useState(0);

    const visibleAreaHeightPx = `${windowHeight - topDistance - footerHeight}px`;
    const classes = useStyles({
        isInverse,
        visibleAreaHeight: isServerSide ? '100vh' : visibleAreaHeightPx,
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

    const feedbackBasicContent = (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                {!!icon && <div className={classes.iconContainer}>{icon}</div>}
                <Text3>
                    <span className={classes.title}>{title}</span>
                </Text3>
                {normalizedDescription && (
                    <Box paddingTop={16}>
                        <Text5 light>
                            <span className={classes.description}>{normalizedDescription}</span>
                        </Text5>
                    </Box>
                )}
                {children && <div className={classes.childrenContainer}>{children}</div>}
            </div>
        </div>
    );

    const content = (
        <>
            <div className={classes.footer}>
                {primaryButton ? (
                    <ButtonFixedFooterLayout
                        button={primaryButton}
                        secondaryButton={secondaryButton}
                        link={link}
                        footerBgColor={isInverse ? theme.colors.backgroundSpecialBottom : undefined}
                        containerBgColor={isInverse ? theme.colors.overscrollColorTop : undefined}
                        onChangeFooterHeight={setFooterHeight}
                    >
                        {feedbackBasicContent}
                    </ButtonFixedFooterLayout>
                ) : (
                    feedbackBasicContent
                )}
            </div>
            {isMobile && primaryButton && <div className={classes.backgroundDiv} />}
        </>
    );

    return (
        <ThemeVariant isInverse={isInverse}>
            {isInverse && <OverscrollColor />}
            {content}
        </ThemeVariant>
    );
};

export const SuccessFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {isMobile} = useScreenSize();
    return (
        <ThemeVariant isInverse={isMobile}>
            <FeedbackScreen {...props} hapticFeedback="success" icon={<IcnSuccess />} animateText />
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
