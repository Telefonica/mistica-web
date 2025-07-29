'use client';
import * as React from 'react';
import {useSetOverscrollColor} from './overscroll-color-context';
import {ThemeVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import ResponsiveLayout from './responsive-layout';
import {Text2, Text4} from './text';
import Stack from './stack';
import * as styles from './loading-screen.css';
import Spinner from './spinner';
import classnames from 'classnames';
import {Logo} from './logo';
import ScreenReaderOnly from './screen-reader-only';
import {useTheme} from './hooks';
import {VIVO_NEW_SKIN} from './skins/constants';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';

const BackgroundColor = ({isInverse}: {isInverse: boolean}) => {
    const css = `body {background:${isInverse ? vars.colors.backgroundBrand : vars.colors.background}}`;
    return <style>{css}</style>;
};

type TextProps = ExclusifyUnion<
    | {
          title?: string;
          description?: string;
      }
    | {
          texts: ReadonlyArray<{
              title?: string;
              description?: string;
              duration?: number;
          }>;
      }
>;

type LoadingScreenTextsProps = {
    animateText?: boolean;
    isLoading?: boolean;
    onClose?: () => void;
    texts: ReadonlyArray<{
        title?: string;
        description?: string;
        duration?: number;
    }>;
};

const LoadingScreenTexts = ({animateText, isLoading, onClose, texts}: LoadingScreenTextsProps) => {
    const [currentTextsIndex, setCurrentTextsIndex] = React.useState(0);
    const [isClosing, setIsClosing] = React.useState(false);

    const showNextText = React.useCallback(() => {
        setCurrentTextsIndex((currentTextsIndex + 1) % texts.length);
        setIsClosing(false);
    }, [currentTextsIndex, texts.length]);

    React.useEffect(() => {
        if (!isLoading) {
            return;
        }

        if (texts.length === 1) {
            return;
        }

        const timeout = setTimeout(() => {
            if (animateText) {
                setIsClosing(true);
            } else {
                showNextText();
            }
        }, texts[currentTextsIndex].duration ?? 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [animateText, currentTextsIndex, isClosing, isLoading, showNextText, texts]);

    const handleOutTransitionEnd = () => {
        if (!isLoading) {
            onClose?.();
            return;
        }
        if (!isClosing) {
            return;
        }

        showNextText();
    };

    const {title: currentTitle, description: currentDescription} = texts[currentTextsIndex % texts.length];

    return (
        <ResponsiveLayout>
            <div
                // changing the key triggers the css animation for next texts
                key={currentTextsIndex}
                className={classnames(styles.loadingScreenText, {
                    [styles.loadingScreenTextAnimatedOut]: animateText && (!isLoading || isClosing),
                })}
                onTransitionEnd={handleOutTransitionEnd}
            >
                <Stack space={8}>
                    {currentTitle && (
                        <div className={animateText ? styles.loadingScreenTextAnimated : undefined}>
                            <Text4 textAlign="center" regular as="h1">
                                {currentTitle}
                            </Text4>
                        </div>
                    )}
                    {currentDescription && (
                        <div
                            className={animateText ? styles.loadingScreenTextAnimated : undefined}
                            style={{animationDelay: '200ms'}}
                        >
                            <Text2 textAlign="center" regular as="p" color={vars.colors.textSecondary}>
                                {currentDescription}
                            </Text2>
                        </div>
                    )}
                </Stack>
            </div>
        </ResponsiveLayout>
    );
};

type Props = {
    isInverse?: boolean;
    isLoading?: boolean;
    animateText?: boolean;
    animateBackground?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
} & TextProps;

const BaseLoadingScreen = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            isInverse,
            children,
            isLoading = true,
            animateText,
            animateBackground,
            onClose,
            dataAttributes,
            title,
            description,
            texts = [{title, description}],
        },
        ref
    ) => {
        const [inAnimationEnd, setInAnimationEnd] = React.useState(false);

        // just in case the animationend event is not fired
        React.useEffect(() => {
            if (!isLoading) {
                return;
            }
            const timeout = setTimeout(() => {
                setInAnimationEnd(true);
            }, styles.inOutAnimationMs);
            return () => {
                clearTimeout(timeout);
            };
        }, [isLoading]);

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
            }, styles.inOutAnimationMs);
            return () => {
                clearTimeout(timeout);
            };
        }, [animateBackground, animateText, handleTransitionEnd, isLoading, onClose]);

        const centerContent = !children;

        useSetOverscrollColor(isInverse ? {topColor: vars.colors.backgroundBrandTop} : {});

        return (
            <ThemeVariant isInverse={isInverse}>
                <div
                    ref={ref}
                    {...getPrefixedDataAttributes(dataAttributes)}
                    className={classnames(
                        styles.loadingScreen,
                        styles.screenBackground[isInverse ? 'inverse' : 'default'],
                        {
                            [styles.screenBackgroundFadeOut]: !isLoading && animateBackground,
                            [styles.screenBackgroundAnimated]: animateBackground,
                        }
                    )}
                    style={{
                        justifyContent: centerContent ? 'center' : 'space-between',
                    }}
                    onAnimationEnd={() => {
                        setInAnimationEnd(true);
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {children ? (
                        <div className={styles.loadingScreenChildren}>{children}</div>
                    ) : (
                        <Spinner delay="0s" size={32} color={isInverse ? vars.colors.inverse : undefined} />
                    )}
                    <LoadingScreenTexts
                        animateText={animateText}
                        isLoading={isLoading}
                        texts={texts}
                        onClose={handleTransitionEnd}
                    />
                    {!centerContent && <div style={{height: 104}} />}
                </div>
                {/* needed for overscroll. TODO: review the case for brands with gradient like O2 */}
                {isLoading && inAnimationEnd && <BackgroundColor isInverse={!!isInverse} />}
            </ThemeVariant>
        );
    }
);

type LoadingScreenProps = {
    isInverse?: boolean;
    isLoading?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
} & TextProps;

export const LoadingScreen = React.forwardRef<HTMLDivElement, LoadingScreenProps>((props, ref) => {
    return (
        <BaseLoadingScreen
            ref={ref}
            {...props}
            dataAttributes={{'component-name': 'LoadingScreen', ...props.dataAttributes}}
            animateBackground
        />
    );
});

type BrandLoadingAnimationProps = {
    isLoading?: boolean;
    onCloseStart?: () => void;
    onCloseEnd?: () => void;
};

const PulseBrandLogoAnimation = ({isLoading, onCloseStart, onCloseEnd}: BrandLoadingAnimationProps) => {
    const {texts, t} = useTheme();
    const [pulse, setPulse] = React.useState(true);

    const handleAnimationIteration = () => {
        if (!isLoading) {
            onCloseStart?.();
            setPulse(false);
            onCloseEnd?.();
        }
    };

    return (
        <div
            className={classnames(styles.logo, {[styles.pulseLogo]: pulse})}
            onAnimationIteration={handleAnimationIteration}
        >
            <ScreenReaderOnly>
                <div>{texts.loading || t(tokens.loading)}</div>
            </ScreenReaderOnly>
            <Logo size={128} />
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
    isLoading?: boolean;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
} & TextProps;

export const BrandLoadingScreen = React.forwardRef<HTMLDivElement, BrandLoadingScreenProps>(
    ({isLoading = true, onClose, dataAttributes, ...textProps}, ref) => {
        const {themeVariants} = useTheme();
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
            <BaseLoadingScreen
                ref={ref}
                isInverse={themeVariants.brandLoadingScreen === 'inverse'}
                {...textProps}
                isLoading={isLoading || !isClosing}
                onClose={() => {
                    textClosedRef.current = true;
                    handleCloseEnd();
                }}
                animateText
                dataAttributes={{'component-name': 'BrandLoadingScreen', ...dataAttributes}}
            >
                <BrandLoadingAnimation
                    isLoading={isLoading}
                    onCloseStart={handleCloseStart}
                    onCloseEnd={() => {
                        logoClosedRef.current = true;
                        handleCloseEnd();
                    }}
                />
            </BaseLoadingScreen>
        );
    }
);
