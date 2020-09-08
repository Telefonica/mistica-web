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

type HapticFeedback = 'error' | 'success';

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
    isInverse?: boolean;
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
    isInverse = false,
    animateText = false,
}) => {
    const theme = useTheme();
    const windowHeight = useWindowHeight();
    const {isMobile} = useScreenSize();
    const topDistance = React.useContext(TopDistanceContext);
    const footerHeight = getFooterHeight(isMobile, link, secondaryButton);
    const [isServerSide, setIsServerSide] = React.useState(true);

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

    const feedbackBasicContent = (
        <div className={classes.container}>
            <Feedback
                title={title}
                description={description}
                animateText={animateText}
                hapticFeedback={hapticFeedback}
                icon={icon}
            >
                {children}
            </Feedback>
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
                    >
                        {feedbackBasicContent}
                    </ButtonFixedFooterLayout>
                ) : (
                    feedbackBasicContent
                )}
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

export const SuccessFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const {isMobile} = useScreenSize();
    return (
        <FeedbackScreen
            {...props}
            hapticFeedback="success"
            icon={<IcnSuccess />}
            isInverse={isMobile}
            animateText
        />
    );
};
export const ErrorFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const theme = useTheme();
    const hasNotIcon = theme.skin === VIVO_SKIN;
    return (
        <FeedbackScreen
            {...props}
            hapticFeedback="error"
            icon={hasNotIcon ? undefined : <IcnError />}
            animateText
        />
    );
};
export const InfoFeedbackScreen: React.FC<FeedbackProps> = (props) => {
    const theme = useTheme();
    const hasNotIcon = theme.skin === VIVO_SKIN;
    return <FeedbackScreen {...props} icon={hasNotIcon ? undefined : <IcnInfo />} />;
};
