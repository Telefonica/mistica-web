'use client';
import * as React from 'react';
import classnames from 'classnames';
import {SkeletonAnimation} from './skeletons';
import {AspectRatioContainer} from './utils/aspect-ratio-support';
import {getPrefixedDataAttributes} from './utils/dom';
import {useIsInverseVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {VIVO_SKIN, VIVO_NEW_SKIN} from './skins/constants';
import * as styles from './image.css';
import {vars} from './skins/skin-contract.css';
import {combineRefs} from './utils/common';
import SkeletonBase from './skeleton-base';
import {isServerSide} from './utils/environment';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';

type VivoLogoProps = {
    style?: React.CSSProperties;
};

const VivoLogo = ({style}: VivoLogoProps) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={style}>
            <path
                d="M24.021 35.7235C24.8145 35.7694 25.0467 36.1913 25.3157 36.5138C25.586 36.8362 29.515 41.551 29.7823 41.8569C30.0475 42.1662 30.7822 42.7329 31.5901 42.8405C32.3967 42.9473 33.282 42.7842 33.8484 42.3748C34.4135 41.965 35.1313 41.4073 35.3833 41.0356C35.6337 40.6638 36.061 40.1302 35.9823 39.2534C35.9028 38.3783 35.7112 37.9204 35.0268 37.1691C34.3433 36.4185 30.2992 31.6657 29.5382 30.7537C29.5382 30.7537 28.8467 29.9423 28.9469 28.7956C29.0476 27.6468 29.567 27.1343 30.6608 26.8487C31.7534 26.5647 36.0267 25.5306 36.0267 25.5306C36.0267 25.5306 38.4728 24.3723 37.9182 22.0776L37.5997 20.904C37.5997 20.904 37.0672 18.2264 33.5519 19.0556C30.0344 19.8869 28.0803 20.377 28.0803 20.377C28.0803 20.377 26.9602 20.4838 26.7999 19.744C26.6417 19.0038 26.8494 18.6218 27.3443 18.4156C27.8387 18.209 30.9611 16.7175 31.3617 12.6853C31.7652 8.65158 28.3882 5.06573 24.0091 5.08104C19.6288 5.0976 16.4594 8.39988 16.4725 11.8185C16.4856 15.2387 18.7033 17.5144 20.4079 18.3638C21.3752 18.8453 21.0656 19.7122 21.0656 19.7122C21.0656 19.7122 20.8334 20.5554 19.8153 20.3311C18.7972 20.1025 13.8657 18.9736 13.8657 18.9736C13.8657 18.9736 10.8914 18.4226 10.1732 21.359C9.4541 24.2978 11.1261 25.4143 12.3532 25.6908C13.5798 25.9669 17.7296 26.9716 17.7296 26.9716C17.7296 26.9716 18.9643 27.581 19.0125 28.8308C19.0425 29.5697 19.0438 30.1824 18.266 31.2832C17.4894 32.3835 12.6598 38.0148 12.6598 38.0148C12.6598 38.0148 10.9997 39.9862 13.4051 41.763C15.8106 43.5401 17.1641 43.1262 18.5921 41.4889C20.0188 39.852 22.8383 36.4243 22.8383 36.4243C22.8383 36.4243 23.2275 35.6788 24.021 35.7235Z"
                stroke={vars.colors.brand}
                strokeWidth="2"
            />
        </svg>
    );
};

type ImageErrorProps = {
    withIcon?: boolean;
    borderRadius?: string | number;
    className?: string;
    border?: boolean;
};

export const ImageError = React.forwardRef<HTMLDivElement, ImageErrorProps>(
    ({borderRadius, withIcon = true, border, className}, ref) => {
        const isInverse = useIsInverseVariant();
        const {skinName} = useTheme();
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isInverse
                        ? vars.colors.backgroundSkeletonInverse
                        : vars.colors.backgroundSkeleton,
                    boxSizing: 'border-box',
                    border: border ? `1px solid ${vars.colors.borderLow}` : 'none',
                    borderRadius,
                }}
                ref={ref}
                className={className}
            >
                {withIcon ? (
                    skinName === VIVO_SKIN ? (
                        <VivoLogo style={{width: '10%', minWidth: 24, maxWidth: 48}} />
                    ) : skinName === VIVO_NEW_SKIN ? (
                        <svg
                            viewBox="0 0 24 24"
                            role="presentation"
                            style={{width: '10%', minWidth: 24, maxWidth: 48}}
                        >
                            <path
                                d="M5.60044 14.585C5.49637 14.585 5.3983 14.5458 5.32396 14.4744L4.73612 13.9003C4.72555 13.8898 4.71068 13.8837 4.69552 13.8837C4.68037 13.8837 4.66579 13.8895 4.65493 13.9L4.06852 14.4698C3.99418 14.5411 3.89611 14.5806 3.79203 14.5806C3.68796 14.5806 3.59018 14.5411 3.5167 14.4698C3.36545 14.3226 3.36517 14.0833 3.5167 13.9361L4.10454 13.365C4.12656 13.3435 4.12656 13.3087 4.10454 13.2872L3.5167 12.7161C3.36517 12.5689 3.36517 12.3296 3.5167 12.1824C3.59047 12.1111 3.68796 12.0716 3.79203 12.0716C3.89611 12.0716 3.99389 12.1111 4.06737 12.1824L4.65407 12.7525C4.66493 12.763 4.67951 12.7687 4.69467 12.7687C4.70982 12.7687 4.7244 12.763 4.73527 12.7525L5.32511 12.1794C5.39859 12.108 5.49637 12.0686 5.60044 12.0686C5.70451 12.0686 5.80229 12.108 5.87577 12.1794C6.02731 12.3266 6.02731 12.5659 5.87577 12.7131L5.28479 13.2872C5.26278 13.3087 5.26278 13.3435 5.28479 13.365L5.87577 13.9391C6.02674 14.0858 6.02674 14.3256 5.87606 14.4739C5.80258 14.5456 5.70451 14.585 5.60044 14.585Z"
                                fill={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                            />
                            <path
                                d="M13.0142 10.7496C12.953 10.7471 12.8819 10.7471 12.8132 10.7521H12.7598C12.2257 10.7571 10.2337 10.9373 10.2337 13.3694C10.2337 15.8061 12.2431 15.9965 12.7775 16.004H12.8638C12.8913 16.004 12.9193 16.0034 12.9465 16.0026C12.9725 16.0021 12.9979 16.0015 13.0214 16.0015C13.5326 15.9916 15.5677 15.8039 15.5677 13.3818C15.5683 10.9646 13.5357 10.762 13.0142 10.7496ZM13.0042 14.9461L12.8644 14.9485H12.7958C11.3282 14.9262 11.3282 13.7525 11.3282 13.3669C11.3282 12.9837 11.3282 11.8147 12.7729 11.8026H12.8161C12.8747 11.8026 12.9356 11.8026 12.9891 11.8051C14.4773 11.8395 14.4773 13.0011 14.4773 13.3818C14.477 13.7631 14.4761 14.9191 13.0042 14.9461Z"
                                fill={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                            />
                            <path
                                d="M21.9997 17.2968H21.9971V9.45494C21.9971 8.78512 21.7301 8.39233 21.5062 8.17981C21.1062 7.80217 20.6039 7.76579 20.4609 7.75559L20.454 7.75506C20.4397 7.75398 20.4298 7.75324 20.4249 7.75228L15.6707 7.74732L14.9331 6.52152C14.7398 6.20012 14.3813 6 13.9996 6H12.0179C11.6033 6 11.2319 6.22493 11.0487 6.58575L10.4611 7.74732C8.26329 7.74732 6.43945 7.7498 5.96626 7.75228C5.21574 7.75476 4.79373 8.04391 4.56986 8.28372C4.10439 8.79036 4.16043 9.43537 4.16529 9.45274L4.16872 10.7C3.54515 10.7764 3.04937 10.9895 2.69141 11.3373C2.23395 11.7819 2.00208 12.4443 2.00208 13.3063C2.00208 14.1677 2.23395 14.8298 2.69141 15.2741C3.05252 15.6247 3.55372 15.8383 4.18502 15.913L4.18845 17.3119C4.23162 18.723 5.25176 18.9975 5.67148 18.9975L20.4275 19C21.005 19 21.3584 18.7627 21.552 18.5626C22.038 18.0628 22.0048 17.3412 21.9997 17.2968ZM2.78205 13.306C2.78205 12.6444 2.93301 12.1758 3.24408 11.8737C3.55516 11.5713 4.03692 11.4242 4.71739 11.4242H4.72254C5.39786 11.4242 5.87763 11.57 6.1887 11.8704C6.50263 12.1734 6.65474 12.6431 6.65417 13.3063C6.65417 13.9673 6.50292 14.4353 6.19184 14.7374C5.88077 15.0395 5.39844 15.1864 4.71768 15.1864C4.03749 15.1864 3.55544 15.0395 3.24465 14.7374C2.93301 14.435 2.78205 13.967 2.78205 13.306ZM20.7534 17.8428C20.7102 17.8872 20.6287 17.9468 20.4277 17.9514L5.65633 17.949L5.65394 17.9485L5.65244 17.9483L5.64947 17.9479C5.59908 17.9415 5.29865 17.9037 5.27978 17.3015L5.27607 15.9089C5.8782 15.8328 6.36168 15.628 6.71678 15.2959C7.19311 14.8504 7.43471 14.1809 7.43471 13.3057C7.43471 12.4305 7.19311 11.7607 6.71678 11.315C6.35796 10.9793 5.86848 10.7734 5.25805 10.6992L5.25434 9.40064C5.25176 9.39816 5.23918 9.15091 5.38414 8.99296C5.49107 8.87443 5.6895 8.81489 5.97169 8.81269C6.4703 8.80773 8.45667 8.80773 10.8019 8.80773C11.0103 8.80773 11.2016 8.69168 11.2931 8.51113L12.0182 7.05793L13.987 7.05297L14.885 8.54311C14.9817 8.70381 15.1624 8.80497 15.3582 8.80497L20.4355 8.80745C20.438 8.80745 20.6187 8.81737 20.7408 8.93342C20.8503 9.03486 20.9035 9.21017 20.9035 9.45494L20.9061 17.3312C20.9109 17.388 20.8984 17.6921 20.7534 17.8428Z"
                                fill={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                            />
                        </svg>
                    ) : (
                        // We cannot use IconImageRegular because we want to avoid the usage of width and height props to allow this icon to be responsive
                        <svg
                            viewBox="0 0 24 24"
                            role="presentation"
                            style={{width: '10%', minWidth: 24, maxWidth: 48}}
                            fill={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                        >
                            <path d="M2.46967 2.46967C2.76256 2.17678 3.23732 2.17678 3.53022 2.46967L21.5302 20.4697C21.8231 20.7626 21.8231 21.2373 21.5302 21.5302C21.2373 21.8231 20.7626 21.8231 20.4697 21.5302L19.1581 20.2187C18.616 20.5617 17.9846 20.7499 17.333 20.7499H6.66694C5.76081 20.7499 4.89166 20.3897 4.25092 19.749C3.61018 19.1082 3.24996 18.2391 3.24994 17.333V6.66694C3.24994 6.01504 3.43605 5.3821 3.77924 4.83979L2.46967 3.53022C2.17678 3.23732 2.17678 2.76256 2.46967 2.46967ZM4.88862 5.94916C4.79743 6.17503 4.74994 6.41868 4.74994 6.66694V10.538C5.10458 10.3537 5.48775 10.25 5.88862 10.2499C6.57746 10.25 7.21716 10.5495 7.74213 11.0546C7.74693 11.0593 7.75211 11.0645 7.75678 11.0693L15.8134 19.2499H17.333C17.5808 19.2499 17.8232 19.2002 18.0488 19.1093L4.88862 5.94916ZM5.88862 11.7499C5.65687 11.75 5.37569 11.8475 5.07612 12.1357C4.98165 12.2266 4.86823 12.2837 4.74994 12.3154V17.333C4.74996 17.8413 4.95204 18.329 5.31147 18.6884C5.67091 19.0478 6.15863 19.2499 6.66694 19.2499H13.7089L6.69135 12.1259C6.39555 11.8453 6.11774 11.75 5.88862 11.7499Z" />
                            <path d="M17.333 3.24994C18.2391 3.24996 19.1082 3.61018 19.749 4.25092C20.3897 4.89166 20.7499 5.76081 20.7499 6.66694V14.9999C20.7499 15.4141 20.4141 15.7499 19.9999 15.7499C19.5857 15.7499 19.25 15.4141 19.2499 14.9999V6.66694C19.2499 6.15863 19.0478 5.67091 18.6884 5.31147C18.329 4.95204 17.8413 4.74996 17.333 4.74994H8.99994C8.58575 4.74994 8.24997 4.41413 8.24994 3.99994C8.24994 3.58573 8.58573 3.24994 8.99994 3.24994H17.333Z" />
                            <path d="M15.4999 6.99994C16.3283 6.99997 16.9999 7.67154 16.9999 8.49994C16.9999 9.32833 16.3283 9.99991 15.4999 9.99994C14.6715 9.99994 14 9.32834 13.9999 8.49994C13.9999 7.67152 14.6715 6.99994 15.4999 6.99994Z" />
                        </svg>
                    )
                ) : undefined}
            </div>
        );
    }
);

export type AspectRatio = '1:1' | '16:9' | '7:10' | '4:3' | undefined;

export const RATIO = {
    '1:1': 1,
    '16:9': 16 / 9,
    '7:10': 7 / 10,
    '4:3': 4 / 3,
};

type CommonImageProps = {
    src: string;
    srcSet?: string;
    /** defaults to empty string */
    alt?: string;
    children?: void;
    dataAttributes?: DataAttributes;
    noBorderRadius?: boolean;
    onError?: () => void;
    onLoad?: () => void;
    loadingFallback?: boolean;
    errorFallback?: boolean;
    border?: boolean;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none';
    objectPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | string;
};

type RectangularImageProps = {
    /** defaults to 0 (original image proportions). If both width and height are given, aspectRatio is ignored.  */
    aspectRatio?: AspectRatio | number;
    /** defaults to 100% when no width and no height are given */
    width?: string | number;
    height?: string | number;
    noBorderRadius?: boolean;
};

type CircularImageProps = {
    circular?: boolean;
} & ExclusifyUnion<
    | {
          width?: string | number;
      }
    | {
          height?: string | number;
      }
>;

type ImageProps = CommonImageProps & ExclusifyUnion<RectangularImageProps | CircularImageProps>;

export const ImageContent = React.forwardRef<HTMLImageElement, ImageProps>(
    (
        {
            aspectRatio = 0,
            alt = '',
            dataAttributes,
            noBorderRadius,
            src,
            srcSet,
            onError,
            onLoad,
            loadingFallback = true,
            errorFallback = true,
            objectFit,
            objectPosition,
            ...props
        },
        ref
    ) => {
        const imageId = React.useId();
        const imageRef = React.useRef<HTMLImageElement>();
        const borderRadiusStyle = props.circular
            ? styles.circularBorderRadius
            : noBorderRadius
              ? styles.withoutBorderRadius
              : noBorderRadius === false // explicitly set to false, so we set border radius
                ? styles.withBorderRadius
                : styles.defaultBorderRadius; // === undefined, use the default border radius (or the setting set by parent component, like cards or slideshow)
        const [isError, setIsError] = React.useState(!src);
        const [hideLoadingFallback, setHideLoadingFallback] = React.useState(false);

        const ratio =
            props.width && props.height
                ? undefined
                : props.circular
                  ? 1
                  : typeof aspectRatio === 'number'
                    ? aspectRatio
                    : RATIO[aspectRatio];

        const hasOnlyHeight = !!props.height && !props.width && ratio === 0 && !props.circular;
        const hasOnlyWidth = !!props.width && !props.height && ratio === 0 && !props.circular;
        const effectiveObjectFit = objectFit ?? (hasOnlyHeight || hasOnlyWidth ? 'contain' : 'cover'); // 'contain' is used for single-dimension cases (only width or only height) to ensure the image fits within the given dimension without cropping.

        const withLoadingFallback = loadingFallback && !!(ratio !== 0 || (props.width && props.height));
        const withErrorFallback = errorFallback && !!(ratio !== 0 || (props.width && props.height));

        const onLoadHandler = React.useCallback(() => {
            setIsError(false);
            if (imageRef.current) {
                imageRef.current.style.opacity = '1';
            }
            setTimeout(() => {
                setHideLoadingFallback(true);
            }, styles.FADE_IN_DURATION_MS);

            onLoad?.();
        }, [onLoad]);

        React.useEffect(() => {
            setIsError(!src);
            setHideLoadingFallback(false);
        }, [src]);

        React.useEffect(() => {
            // Needed because there is some race condition with SSR and onLoad events
            // load event could be fired before the component is hydrated and mounted client side
            // https://github.com/facebook/react/issues/15446
            if (imageRef.current?.complete) {
                onLoadHandler();
            }
        }, [onLoadHandler]);

        const isLoading =
            isServerSide() || !(document.getElementById(imageId) as HTMLImageElement | null)?.complete;

        const img = (
            <>
                {/* https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/309 */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <img
                    // There is small hydration mismatch that we dont care about. (I think this is caused by te inline SSR script below)
                    // Warning: Prop `style` did not match. Server: "opacity: 1;" Client: "opacity:1"
                    suppressHydrationWarning
                    id={imageId}
                    style={{
                        opacity: isLoading && withLoadingFallback ? 0 : 1,
                        position: ratio !== 0 ? 'absolute' : 'static',
                        objectFit: effectiveObjectFit,
                        objectPosition,
                    }}
                    ref={combineRefs(imageRef, ref)}
                    src={src}
                    srcSet={srcSet}
                    className={classnames(borderRadiusStyle, styles.image, {
                        [styles.imageWithBorder]: props.border,
                    })}
                    alt={alt}
                    onError={() => {
                        setIsError(true);
                        setHideLoadingFallback(true);
                        onError?.();
                    }}
                    onLoad={onLoadHandler}
                    // Sometimes Safari doesn't render images completely
                    // https://stackoverflow.com/questions/58323768/ios-safari-images-not-rendering-fully-cut-off
                    // https://www.tunetheweb.com/blog/what-does-the-image-decoding-attribute-actually-do/
                    decoding="async"
                />
                {/* When using SSR, we render a small script that makes the img visible as soon as it finishes loading, without waiting for React client hydrate. */}
                {/* Note that this <script> does nothing when rendering client side (the browser only execute scripts injected inside <head>), it's only executed when the browser receives the SSRed html */}
                {withLoadingFallback && (
                    <script
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: `document.getElementById("${imageId}").addEventListener('load', (e) => e.target.style.opacity = "1")`,
                        }}
                    />
                )}
            </>
        );

        return (
            <>
                {withLoadingFallback && !hideLoadingFallback && (
                    <div
                        style={{position: 'absolute', width: '100%', height: '100%', overflow: 'hidden'}}
                        className={borderRadiusStyle}
                    >
                        <SkeletonAnimation height={props.height ?? '100%'} width={props.width ?? '100%'}>
                            <SkeletonBase height="100%" width="100%" noBorderRadius />
                        </SkeletonAnimation>
                    </div>
                )}
                {isError && withErrorFallback && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <ImageError border={props.border} className={borderRadiusStyle} />
                    </div>
                )}
                {!isError && img}
            </>
        );
    }
);

const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
    const ratio =
        props.width && props.height
            ? undefined
            : props.circular
              ? 1
              : typeof props.aspectRatio === 'number' || !props.aspectRatio
                ? props.aspectRatio ?? 0
                : RATIO[props.aspectRatio];

    return (
        <AspectRatioContainer
            style={{position: 'relative'}}
            aspectRatio={ratio}
            width={props.width}
            height={props.height}
            dataAttributes={getPrefixedDataAttributes(props.dataAttributes, 'Image')}
            // @ts-expect-error forceNonCssAspectRatio is intentionally not included in the props type and should only be used for testing purposes
            forceNonCssAspectRatio={(props as any).forceNonCssAspectRatio}
        >
            <ImageContent {...props} ref={ref} />
        </AspectRatioContainer>
    );
});

export default Image;
