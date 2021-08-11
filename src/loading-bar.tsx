import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Portal} from './portal';
import {createUseStyles} from './jss';

const TRANSITION_DURATION_MS = 400;

const useStyles = createUseStyles((theme) => ({
    portal: {
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
    },

    progressContainer: {
        height: 4,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.colors.loadingBarBackground,
    },

    progress: {
        position: 'absolute',
        left: '-55%',
        height: '100%',
        width: '100%',
        animation: '$progressIndicator 1.2s ease-out infinite',
        animationDelay: TRANSITION_DURATION_MS,
        backgroundColor: theme.colors.loadingBar,
    },

    innerProgress: {
        height: '100%',
        transform: 'scaleX(0.1)',
        animation: '$innerProgressIndicator 1.2s ease-out infinite',
        animationDelay: TRANSITION_DURATION_MS,
    },

    enter: {
        transition: `${TRANSITION_DURATION_MS}ms ease-out`,
        transform: 'translateY(-4px)',
    },

    enterActive: {
        transform: 'translateY(0)',
    },

    exit: {
        transform: 'translateY(0)',
        transition: `${TRANSITION_DURATION_MS}ms ease-out`,
    },

    exitActive: {
        transform: 'translateY(-4px)',
    },

    '@keyframes progressIndicator': {
        '0%': {
            transform: 'translateX(0%)',
        },
        '100%': {
            transform: 'translateX(150%)',
        },
    },

    '@keyframes innerProgressIndicator': {
        '0%': {
            transform: 'scaleX(0.1)',
        },
        '20%': {
            transform: 'scaleX(0.35)',
        },
        '50%': {
            transform: 'scaleX(0.7)',
        },
        '100%': {
            transform: 'scaleX(0.8)',
        },
    },
}));

type Props = {visible: boolean; children?: void};

const LoadingBar: React.FC<Props> = ({visible}) => {
    const classes = useStyles();

    return (
        <CSSTransition
            in={visible}
            timeout={TRANSITION_DURATION_MS}
            classNames={{
                enter: classes.enter,
                enterActive: classes.enterActive,
                exit: classes.exit,
                exitActive: classes.exitActive,
            }}
            unmountOnExit
        >
            <Portal className={classes.portal}>
                <div className={classes.progressContainer}>
                    <div className={classes.progress}>
                        <div className={classes.innerProgress} />
                    </div>
                </div>
            </Portal>
        </CSSTransition>
    );
};

export default LoadingBar;
