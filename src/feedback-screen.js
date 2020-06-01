// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme, useScreenSize, useWindowHeight} from './hooks';
import {ThemeVariant} from './theme-variant-context';
import ButtonFixedFooterLayout, {getFooterHeight} from './button-fixed-footer-layout';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import {TopDistanceContext} from './fixed-to-top';
import OverscrollColor from './overscroll-color-context';
import Feedback from './feedback';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        minHeight: ({visibleAreaHeight}) => `calc(${visibleAreaHeight}px - env(safe-area-inset-bottom))`,
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
        height: ({visibleAreaHeight}) => `calc(${visibleAreaHeight}px - env(safe-area-inset-bottom) + 2px)`,
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

type Props = {
    title: string,
    primaryButton: React.Element<typeof ButtonPrimary>,
    secondaryButton?: React.Element<typeof ButtonSecondary>,
    link?: React.Element<typeof ButtonLink>,
    description?: string | Array<string>,
    children?: React.Node,
};

type FeedbackProps = {
    ...Props,
    feedbackType: FeedbackType,
};

const FeedbackScreen = (props: FeedbackProps) => {
    const {title, description, feedbackType, children, primaryButton, secondaryButton, link} = props;
    const theme = useTheme();
    const windowHeight = useWindowHeight();
    const {isMobile} = useScreenSize();
    const topDistance = React.useContext(TopDistanceContext);
    const footerHeight = getFooterHeight(link, secondaryButton, isMobile);
    const isInverse = feedbackType === FEEDBACK_SUCCESS && isMobile;
    const classes = useStyles({
        isInverse,
        visibleAreaHeight: isMobile ? windowHeight - topDistance - footerHeight : 0,
        footerHeight,
    });

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
                        <Feedback type={feedbackType} title={title} description={description}>
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

export const SuccessFeedbackScreen = (props: Props): React.Node => (
    <FeedbackScreen feedbackType={FEEDBACK_SUCCESS} {...props} />
);
export const ErrorFeedbackScreen = (props: Props): React.Node => (
    <FeedbackScreen feedbackType={FEEDBACK_ERROR} {...props} />
);
export const InfoFeedbackScreen = (props: Props): React.Node => (
    <FeedbackScreen feedbackType={FEEDBACK_INFO} {...props} />
);
