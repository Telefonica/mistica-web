import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight, useIsomorphicLayoutEffect} from './hooks';
import {ThemeVariant} from './theme-variant-context';
import ButtonFixedFooterLayout, {getFooterHeight} from './button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import {TopDistanceContext} from './fixed-to-top';
import OverscrollColor from './overscroll-color-context';
import Feedback from './feedback';
import {VIVO_SKIN} from './colors';
import IcnSuccess from './icons/icon-success';
import IcnError from './icons/icon-error';
import IcnInfo from './icons/icon-info';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        [theme.mq.mobile]: {
            minHeight: ({visibleAreaHeight}) => `calc(${visibleAreaHeight} - env(safe-area-inset-bottom))`,
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
}));

const FEEDBACK_SUCCESS: 'success' = 'success';
const FEEDBACK_ERROR: 'error' = 'error';
const FEEDBACK_INFO: 'info' = 'info';

type FeedbackType = typeof FEEDBACK_SUCCESS | typeof FEEDBACK_ERROR | typeof FEEDBACK_INFO;

const feedbackToIconComponent = {
    [FEEDBACK_SUCCESS]: IcnSuccess,
    [FEEDBACK_ERROR]: IcnError,
    [FEEDBACK_INFO]: IcnInfo,
};

interface FeedbackProps {
    title: string;
    primaryButton: React.ReactElement<typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<typeof ButtonSecondary>;
    link?: React.ReactElement<typeof ButtonLink>;
    description?: string | Array<string>;
    children?: React.ReactNode;
}

interface FeedbackScreenProps extends FeedbackProps {
    feedbackType: FeedbackType;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
    title,
    description,
    feedbackType,
    children,
    primaryButton,
    secondaryButton,
    link,
}) => {
    const theme = useTheme();
    const windowHeight = useWindowHeight();
    const {isMobile} = useScreenSize();
    const topDistance = React.useContext(TopDistanceContext);
    const footerHeight = getFooterHeight(isMobile, link, secondaryButton);
    const isInverse = feedbackType === FEEDBACK_SUCCESS && isMobile;
    const [isServerSide, setIsServerSide] = React.useState(true);
    const hasNotIcon = theme.skin === VIVO_SKIN && feedbackType !== FEEDBACK_SUCCESS;
    const hasIcon = !hasNotIcon;
    const Icon = feedbackToIconComponent[feedbackType];

    const visibleAreaHeightPx = `${windowHeight - topDistance - footerHeight}px`;
    const classes = useStyles({
        isInverse,
        visibleAreaHeight: isServerSide ? '100vh' : visibleAreaHeightPx,
        footerHeight,
    });

    // This trick along with the 100vh measure allows us to perform a first meaningful render on the server side.
    // We can't use vh on client side because it causes problems with iOS (as sometimes the height is calculated as
    // if there were no OS buttons on bottom): https://bugs.webkit.org/show_bug.cgi?id=141832
    useIsomorphicLayoutEffect(() => {
        setIsServerSide(false);
    }, []);

    const content = (
        <>
            <div className={classes.footer}>
                <ButtonFixedFooterLayout
                    button={primaryButton}
                    secondaryButton={secondaryButton}
                    link={link}
                    footerBgColor={isInverse ? theme.colors.backgroundSpecialBottom : undefined}
                    containerBgColor={isInverse ? theme.colors.overscrollColorTop : undefined}
                >
                    <div className={classes.container}>
                        <Feedback
                            title={title}
                            description={description}
                            animateText={feedbackType !== FEEDBACK_INFO}
                            hapticFeedback={feedbackType !== FEEDBACK_INFO ? feedbackType : undefined}
                            {...(hasIcon && {icon: <Icon />})}
                        >
                            {children}
                        </Feedback>
                    </div>
                </ButtonFixedFooterLayout>
            </div>
            {isMobile && <div className={classes.backgroundDiv} />}
        </>
    );

    return (
        <ThemeVariant isInverse={isInverse}>
            {isInverse && <OverscrollColor />}
            {content}
        </ThemeVariant>
    );
};

export const SuccessFeedbackScreen: React.FC<FeedbackProps> = (props) => (
    <FeedbackScreen feedbackType={FEEDBACK_SUCCESS} {...props} />
);
export const ErrorFeedbackScreen: React.FC<FeedbackProps> = (props) => (
    <FeedbackScreen feedbackType={FEEDBACK_ERROR} {...props} />
);
export const InfoFeedbackScreen: React.FC<FeedbackProps> = (props) => (
    <FeedbackScreen feedbackType={FEEDBACK_INFO} {...props} />
);
