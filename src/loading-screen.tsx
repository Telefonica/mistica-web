'use client';
import * as React from 'react';
import OverscrollColor from './overscroll-color-context';
import {ThemeVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import ResponsiveLayout from './responsive-layout';
import {Text2, Text4} from './text';
import Stack from './stack';
import * as styles from './loading-screen.css';
import Spinner from './spinner';
import classnames from 'classnames';
import {sprinkles} from './sprinkles.css';
import {Logo} from './logo';
import ScreenReaderOnly from './screen-reader-only';
import {useTheme} from './hooks';
import {VIVO_NEW_SKIN} from './skins/constants';

const BackgroundColor = ({
    isInverse,
    isLoading,
    animateBackground,
}: {
    isInverse: boolean;
    isLoading: boolean;
    animateBackground: boolean;
}): null => {
    React.useLayoutEffect(() => {
        const classes = classnames(styles.screenBackground[isInverse ? 'inverse' : 'default'], {
            [styles.screenBackgroundFadeOut]: !isLoading,
            [styles.screenBackgroundAnimated]: animateBackground,
        }).split(' ');

        document.body.classList.add(...classes);
        return () => {
            document.body.classList.remove(...classes);
        };
    }, [animateBackground, isInverse, isLoading]);

    return null;
};

type Props = {
    title?: string;
    description?: string;
    isInverse?: boolean;
    isLoading?: boolean;
    animateText?: boolean;
    animateBackground?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
};

export const LoadingScreen = ({
    isInverse,
    title,
    description,
    children,
    isLoading = true,
    animateText,
    animateBackground,
    onClose,
}: Props): JSX.Element => {
    const closeCalled = React.useRef(false);

    const handleTransitionEnd = React.useCallback(() => {
        if (!isLoading && !closeCalled.current) {
            closeCalled.current = true;
            onClose?.();
        }
    }, [isLoading, onClose]);

    React.useEffect(() => {
        if (isLoading) {
            return;
        }
        if (!animateText && !animateBackground) {
            onClose?.();
            return;
        }

        // just in case the transitionend event is not fired
        const timeout = setTimeout(() => {
            handleTransitionEnd();
        }, styles.outAnimationMs);
        return () => {
            clearTimeout(timeout);
        };
    }, [animateBackground, animateText, handleTransitionEnd, isLoading, onClose]);

    return (
        <ThemeVariant isInverse={isInverse}>
            {isInverse && <OverscrollColor />}
            <div
                className={classnames(
                    styles.loadingScreen,
                    styles.screenBackground[isInverse ? 'inverse' : 'default'],
                    {
                        [styles.screenBackgroundFadeOut]: !isLoading && animateBackground,
                        [styles.screenBackgroundAnimated]: animateBackground,
                    },
                    sprinkles({
                        justifyContent: children ? 'space-between' : 'center',
                    })
                )}
            >
                {children ? (
                    <div className={styles.loadingScreenChildren}>{children}</div>
                ) : (
                    <Spinner delay="0s" size={32} color={isInverse ? vars.colors.inverse : undefined} />
                )}
                <div
                    className={classnames(styles.loadingScreenText, {
                        [styles.loadingScreenTextAnimated]: animateText,
                        [styles.loadingScreenTextAnimatedOut]: animateText && !isLoading,
                    })}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <ResponsiveLayout>
                        <Stack space={8}>
                            <Text4 hyphens="auto" textAlign="center" regular as="h1">
                                {title}
                            </Text4>
                            <Text2 hyphens="auto" textAlign="center" regular as="p">
                                {description}
                            </Text2>
                        </Stack>
                    </ResponsiveLayout>
                </div>
                <div style={{height: 104}} />
            </div>
            <BackgroundColor
                isInverse={!!isInverse}
                isLoading={isLoading}
                animateBackground={!!animateBackground}
            />
        </ThemeVariant>
    );
};

type BrandLoadingAnimationProps = {
    isLoading?: boolean;
    onCloseStart?: () => void;
    onCloseEnd?: () => void;
};

const PulseBrandLogoAnimation = ({
    isLoading,
    onCloseStart,
    onCloseEnd,
}: BrandLoadingAnimationProps): JSX.Element => {
    const {texts} = useTheme();
    const [pulse, setPulse] = React.useState(true);

    const handleAnimationIteration = () => {
        if (!isLoading) {
            onCloseStart?.();
            setPulse(false);
            onCloseEnd?.();
        }
    };

    return (
        <div className={pulse ? styles.pulseLogo : undefined} onAnimationIteration={handleAnimationIteration}>
            <ScreenReaderOnly>
                <div>{texts.loading}</div>
            </ScreenReaderOnly>
            <Logo size={120} />
        </div>
    );
};

const VivinhoLoadingAnimation = React.lazy(() => import('./vivinho-loading-animation'));

const BrandLoadingAnimation = ({isLoading, onCloseStart, onCloseEnd}: BrandLoadingAnimationProps) => {
    const {skinName} = useTheme();

    if (skinName === VIVO_NEW_SKIN) {
        return (
            <React.Suspense fallback={null}>
                <VivinhoLoadingAnimation
                    isLoading={isLoading}
                    onCloseStart={onCloseStart}
                    onCloseEnd={onCloseEnd}
                />
            </React.Suspense>
        );
    }
    return (
        <PulseBrandLogoAnimation isLoading={isLoading} onCloseStart={onCloseStart} onCloseEnd={onCloseEnd} />
    );
};

type BrandLoadingScreenProps = {
    title?: string;
    description?: string;
    isLoading?: boolean;
    onClose?: () => void;
};

export const BrandLoadingScreen = ({
    title,
    description,
    isLoading = true,
    onClose,
}: BrandLoadingScreenProps): JSX.Element => {
    const {skinName} = useTheme();
    const [isClosing, setIsClosing] = React.useState(false);
    const logoClosedRef = React.useRef(false);
    const textClosedRef = React.useRef(false);

    const handleCloseStart = () => {
        setIsClosing(true);
    };

    const handleCloseEnd = () => {
        if (logoClosedRef.current && textClosedRef.current) {
            onClose?.();
        }
    };

    return (
        <LoadingScreen
            isInverse
            title={title}
            description={description}
            isLoading={isLoading || !isClosing}
            onClose={() => {
                textClosedRef.current = true;
                handleCloseEnd();
            }}
            animateText={skinName === VIVO_NEW_SKIN}
        >
            <BrandLoadingAnimation
                isLoading={isLoading}
                onCloseStart={handleCloseStart}
                onCloseEnd={() => {
                    logoClosedRef.current = true;
                    handleCloseEnd();
                }}
            />
        </LoadingScreen>
    );
};
