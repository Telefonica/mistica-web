import * as React from 'react';
import classnames from 'classnames';
import {SkeletonRectangle} from './skeletons';
import {AspectRatioElement} from './utils/aspect-ratio-support';
import {getPrefixedDataAttributes} from './utils/dom';
import {useIsInverseVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {VIVO_SKIN} from './skins/constants';
import {sprinkles} from './sprinkles.css';
import * as styles from './image.css';
import {vars} from './skins/skin-contract.css';
import {combineRefs} from './utils/common';

import type {DataAttributes} from './utils/types';

/**
 * This context is used internally to disable/enable the border radius. This is useful for example
 * when using the Image component inside a Card or Hero inside a Slideshow
 */
const MediaBorderRadiusContext = React.createContext(true);

export const useMediaBorderRadius = (): boolean => React.useContext(MediaBorderRadiusContext);

export const MediaBorderRadiusProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: boolean;
}): JSX.Element => (
    <MediaBorderRadiusContext.Provider value={value}>{children}</MediaBorderRadiusContext.Provider>
);

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
    noBorderRadius?: boolean;
};

export const ImageError: React.FC<ImageErrorProps> = ({noBorderRadius}) => {
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
                borderRadius: noBorderRadius ? undefined : vars.borderRadii.container,
            }}
        >
            {skinName === VIVO_SKIN ? (
                <VivoLogo style={{width: '10%', minWidth: 24, maxWidth: 48}} />
            ) : (
                // We cannot use IconImageRegular because we want to avoid the usage of width and height props to allow this icon to be responsive
                <svg
                    viewBox="0 0 24 24"
                    role="presentation"
                    style={{width: '10%', minWidth: 24, maxWidth: 48}}
                >
                    <path
                        fill={isInverse ? vars.colors.inverse : vars.colors.neutralMedium}
                        d="M20.25 4.622c.832 0 1.591.664 1.591 1.393v11.98c0 .728-.76 1.392-1.591 1.392H3.746c-.863 0-1.591-.639-1.591-1.392V6.015c0-.754.728-1.393 1.59-1.393H20.25zm0 13.558c.193 0 .367-.146.39-.207l-.003-11.956a.555.555 0 00-.384-.182H3.746c-.21 0-.364.132-.387.19v11.973c.014.044.171.182.387.182H20.25zM6.152 9.068c0 .554.451 1.005 1.003 1.005a1.006 1.006 0 000-2.01c-.552 0-1.003.45-1.003 1.005zm1.003 2.215a2.216 2.216 0 010-4.43c1.218 0 2.207.993 2.207 2.215a2.213 2.213 0 01-2.207 2.215zm12.42 1.337l-3.18-2.44a.605.605 0 00-.742.005l-3.636 2.9-.879-.83a.6.6 0 00-.798-.025l-5.168 4.317a.607.607 0 00.386 1.07.59.59 0 00.384-.14l4.759-3.975 3.308 3.123c.241.23.625.221.852-.025a.605.605 0 00-.026-.854l-1.932-1.824 3.131-2.496 2.807 2.154a.603.603 0 00.846-.112.609.609 0 00-.112-.848z"
                    />
                </svg>
            )}
        </div>
    );
};

export type AspectRatio = '1:1' | '16:9' | '7:10' | '4:3';

export const RATIO = {
    '1:1': 1,
    '16:9': 16 / 9,
    '7:10': 7 / 10,
    '4:3': 4 / 3,
};

export type ImageProps = {
    src: string;
    /** defaults to 100% when no width and no height are given */
    width?: string | number;
    height?: string | number;
    /** defaults to 1:1, if both width and height are given, aspectRatio is ignored. To use original image proportions, set aspectRatio to 0  */
    aspectRatio?: AspectRatio | number;
    /** defaults to empty string */
    alt?: string;
    children?: void;
    dataAttributes?: DataAttributes;
    noBorderRadius?: boolean;
    onError?: () => void;
    onLoad?: () => void;
    loadingFallback?: boolean;
    errorFallback?: boolean;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    (
        {
            aspectRatio = '1:1',
            alt = '',
            dataAttributes,
            noBorderRadius,
            src,
            onError,
            onLoad,
            loadingFallback = true,
            errorFallback = true,
            ...props
        },
        ref
    ) => {
        const imageRef = React.useRef<HTMLImageElement>();
        const borderRadiusContext = useMediaBorderRadius();
        const noBorderSetting = noBorderRadius ?? !borderRadiusContext;
        const [isError, setIsError] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(true);
        const [hideLoadingFallback, setHideLoadingFallback] = React.useState(false);

        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];

        const withLoadingFallback = loadingFallback && !!(ratio !== 0 || (props.width && props.height));
        const withErrorFallback = errorFallback && !!(ratio !== 0 || (props.width && props.height));

        const onLoadHandler = React.useCallback(() => {
            setIsError(false);
            setIsLoading(false);
            setTimeout(() => {
                setHideLoadingFallback(true);
            }, styles.FADE_IN_DURATION_MS);

            onLoad?.();
        }, [onLoad]);

        const img = (
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/309
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    ...(isLoading && withLoadingFallback ? {opacity: 0} : {opacity: 1}),
                }}
                ref={combineRefs(imageRef, ref)}
                src={src}
                className={classnames(
                    styles.image,
                    sprinkles({
                        position: ratio !== 0 ? 'absolute' : 'static',
                        borderRadius: noBorderSetting ? undefined : vars.borderRadii.container,
                    })
                )}
                alt={alt}
                onError={() => {
                    setIsError(true);
                    setIsLoading(false);
                    setHideLoadingFallback(true);
                    onError?.();
                }}
                onLoad={onLoadHandler}
            />
        );

        React.useEffect(() => {
            // Needed because there is some race condition with SSR and onLoad events
            // https://github.com/facebook/react/issues/15446
            if (imageRef.current?.complete) {
                onLoadHandler();
            }
        }, [onLoadHandler]);

        return (
            <AspectRatioElement
                style={{position: 'relative'}}
                aspectRatio={ratio}
                width={props.width}
                height={props.height}
            >
                {withLoadingFallback && !hideLoadingFallback && (
                    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                        <SkeletonRectangle
                            width={props.width}
                            height={props.height}
                            noBorderRadius={noBorderSetting}
                        />
                    </div>
                )}
                {isError && withErrorFallback && (
                    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                        <ImageError noBorderRadius={noBorderSetting} />
                    </div>
                )}
                {!isError && img}
            </AspectRatioElement>
        );
    }
);

export default Image;
