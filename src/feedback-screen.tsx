import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ButtonFixedFooterLayout from './button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
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
import {getAnimateSweepInProps} from './utils/animation';

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
        '& *': {
            zIndex: 1,
        },
    },

    backgroundDiv: {
        position: 'fixed',
        bottom: ({footerHeight}) => footerHeight,
        marginBottom: -1, // workaround, whithout this an horizontal line appears at the bottom
        left: 0,
        right: 0,
        [theme.mq.mobile]: {
            height: ({contentHeight}) => contentHeight,
        },
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

    iconColor: {
        stroke: (isInverse) => (isInverse ? theme.colors.background : theme.colors.buttonPrimaryBackground),
        fill: (isInverse) => (isInverse ? theme.colors.background : theme.colors.buttonPrimaryBackground),
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
    const {skinName, platformOverrides} = useTheme();

    const IconSuccessVivo: React.FC = () => {
        const isInverse = useIsInverseVariant();
        const classes = useStyles(isInverse);

        return (
            <svg role="presentation" width={64} height={64} viewBox="0 0 64 64" style={{marginLeft: -17}}>
                <g transform="translate(17, 10)" className={classes.iconColor}>
                    <path
                        fillRule="nonzero"
                        d="M14.8832276,0 C10.2293915,0.0191737965 6.86229932,3.79747692 6.87644677,7.70928648 C6.89025737,11.6228714 9.24614399,14.2258918 11.0573539,15.1980743 C12.084728,15.7491434 11.7559683,16.7408548 11.7559683,16.7408548 C11.7559683,16.7408548 11.5093985,17.7055808 10.4274557,17.44922 C9.3458498,17.1875332 4.10725261,15.8961425 4.10725261,15.8961425 C4.10725261,15.8961425 0.947319469,15.2651826 0.18436791,18.6252129 C-0.579931024,21.9873736 1.196584,23.2652716 2.5001701,23.5816393 C3.80375621,23.8972968 8.2116962,25.0470144 8.2116962,25.0470144 C8.2116962,25.0470144 9.52370341,25.7443725 9.57490369,27.1742406 C9.60656702,28.0203732 9.60825124,28.7209269 8.78163618,29.9800062 C7.95670533,31.2394406 2.82589821,37.6825463 2.82589821,37.6825463 C2.82589821,37.6825463 1.06218326,39.9379529 3.61781834,41.9710855 C6.17345343,44.0045731 7.61110343,43.5309094 9.12824861,41.6575584 C10.6440464,39.7845626 13.6392629,35.862456 13.6392629,35.862456 C13.6392629,35.862456 14.0525704,35.0099322 14.8956908,35.0610623 C15.7388112,35.1136127 15.985381,35.5961532 16.2710247,35.9650713 C16.5580157,36.3339893 20.7318492,41.7285725 21.0164823,42.0786718 C21.297747,42.4326769 22.0782145,43.0806802 22.9364929,43.2042447 C23.7937607,43.3263889 24.7338922,43.1396219 25.3358324,42.6712841 C25.9360883,42.2022363 26.698703,41.5641749 26.9664939,41.1388007 C27.2326007,40.7134265 27.6863295,40.1034157 27.6027922,39.0996319 C27.5182443,38.0986887 27.3144537,37.574605 26.5878813,36.7149798 C25.8613089,35.8564198 21.565538,30.4178079 20.7567756,29.3742563 C20.7567756,29.3742563 20.022119,28.4461025 20.1285616,27.1341177 C20.2353412,25.8192924 20.7874284,25.2334264 21.9495401,24.9067617 C23.1099675,24.5815173 27.6499503,23.3980679 27.6499503,23.3980679 C27.6499503,23.3980679 30.2487014,22.0733006 29.6595614,19.4472006 L29.3210332,18.1046798 C29.3210332,18.1046798 28.7551353,15.0407782 25.0208833,15.989526 C21.2835996,16.9411144 19.2079671,17.5014154 19.2079671,17.5014154 C19.2079671,17.5014154 18.0185711,17.6235596 17.8477912,16.777427 C17.6797061,15.9302293 17.9003389,15.4934928 18.4258155,15.257016 C18.9516289,15.0208942 22.2685313,13.3144263 22.6939652,8.70064277 C23.121757,4.09538091 19.5505374,0 14.9128698,0 L14.8832276,0"
                        {...getAnimateSweepInProps('0.2s', platformOverrides)}
                    />
                </g>
            </svg>
        );
    };

    return (
        <ThemeVariant isInverse={isMobile}>
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
