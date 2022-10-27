import * as React from 'react';
import {createUseStyles} from './jss';
import {SkeletonRectangle} from './skeletons';
import {AspectRatioElement} from './utils/aspect-ratio-support';
import {getPrefixedDataAttributes} from './utils/dom';
import IconImageRegular from './generated/mistica-icons/icon-image-regular';
import {useIsInverseVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {VIVO_SKIN} from './skins/constants';

import type {DataAttributes} from './utils/types';

const FADE_IN_DURATION_MS = 300;

/**
 * This context is used internally to disable the border radius. This is useful for example
 * when using the Image component inside a Card
 */
const DisableBorderRadiusContext = React.createContext(false);

export const useDisableBorderRadius = (): boolean => React.useContext(DisableBorderRadiusContext);

export const DisableBorderRadiusProvider: React.FC = ({children}) => (
    <DisableBorderRadiusContext.Provider value>{children}</DisableBorderRadiusContext.Provider>
);

const VivoLogo = () => {
    const {colors} = useTheme();
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
                d="M24.021 35.7235C24.8145 35.7694 25.0467 36.1913 25.3157 36.5138C25.586 36.8362 29.515 41.551 29.7823 41.8569C30.0475 42.1662 30.7822 42.7329 31.5901 42.8405C32.3967 42.9473 33.282 42.7842 33.8484 42.3748C34.4135 41.965 35.1313 41.4073 35.3833 41.0356C35.6337 40.6638 36.061 40.1302 35.9823 39.2534C35.9028 38.3783 35.7112 37.9204 35.0268 37.1691C34.3433 36.4185 30.2992 31.6657 29.5382 30.7537C29.5382 30.7537 28.8467 29.9423 28.9469 28.7956C29.0476 27.6468 29.567 27.1343 30.6608 26.8487C31.7534 26.5647 36.0267 25.5306 36.0267 25.5306C36.0267 25.5306 38.4728 24.3723 37.9182 22.0776L37.5997 20.904C37.5997 20.904 37.0672 18.2264 33.5519 19.0556C30.0344 19.8869 28.0803 20.377 28.0803 20.377C28.0803 20.377 26.9602 20.4838 26.7999 19.744C26.6417 19.0038 26.8494 18.6218 27.3443 18.4156C27.8387 18.209 30.9611 16.7175 31.3617 12.6853C31.7652 8.65158 28.3882 5.06573 24.0091 5.08104C19.6288 5.0976 16.4594 8.39988 16.4725 11.8185C16.4856 15.2387 18.7033 17.5144 20.4079 18.3638C21.3752 18.8453 21.0656 19.7122 21.0656 19.7122C21.0656 19.7122 20.8334 20.5554 19.8153 20.3311C18.7972 20.1025 13.8657 18.9736 13.8657 18.9736C13.8657 18.9736 10.8914 18.4226 10.1732 21.359C9.4541 24.2978 11.1261 25.4143 12.3532 25.6908C13.5798 25.9669 17.7296 26.9716 17.7296 26.9716C17.7296 26.9716 18.9643 27.581 19.0125 28.8308C19.0425 29.5697 19.0438 30.1824 18.266 31.2832C17.4894 32.3835 12.6598 38.0148 12.6598 38.0148C12.6598 38.0148 10.9997 39.9862 13.4051 41.763C15.8106 43.5401 17.1641 43.1262 18.5921 41.4889C20.0188 39.852 22.8383 36.4243 22.8383 36.4243C22.8383 36.4243 23.2275 35.6788 24.021 35.7235Z"
                stroke={colors.brand}
                strokeWidth="2"
            />
        </svg>
    );
};

const ImageError = () => {
    const isInverse = useIsInverseVariant();
    const {colors, skinName} = useTheme();
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
                borderRadius: 8,
            }}
        >
            {skinName === VIVO_SKIN ? (
                <VivoLogo />
            ) : (
                <IconImageRegular size="" style={{width: '10%', minWidth: 24, maxWidth: 48}} />
            )}
        </div>
    );
};

const useStyles = createUseStyles(() => ({
    image: {
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 8),
        transition: `opacity ${FADE_IN_DURATION_MS}ms`,
        zIndex: 1,
    },
}));

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
    onError?: (event: React.SyntheticEvent) => void;
    onLoad?: (event: React.SyntheticEvent) => void;
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
        const noBorderRadiusContext = useDisableBorderRadius();
        const noBorderSetting = noBorderRadius ?? noBorderRadiusContext;
        const [isError, setIsError] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(true);
        const [hideLoadingFallback, setHideLoadingFallback] = React.useState(false);

        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];

        const classes = useStyles({
            noBorderRadius: noBorderSetting,
        });

        const withLoadingFallback = loadingFallback && !!(ratio !== 0 || (props.width && props.height));
        const withErrorFallback = errorFallback && !!(ratio !== 0 || (props.width && props.height));

        const img = (
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/309
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    ...(isLoading && withLoadingFallback ? {opacity: 0} : {opacity: 1}),
                }}
                ref={ref}
                src={src}
                className={classes.image}
                alt={alt}
                onError={(event) => {
                    setTimeout(() => {
                        setIsError(true);
                        setIsLoading(false);
                        setHideLoadingFallback(true);
                    }, 1000);
                    setTimeout(() => {}, FADE_IN_DURATION_MS);
                    onError?.(event);
                }}
                onLoad={(event) => {
                    setIsError(false);
                    setIsLoading(false);
                    setTimeout(() => {
                        setHideLoadingFallback(true);
                    }, FADE_IN_DURATION_MS);
                    onLoad?.(event);
                }}
            />
        );

        return (
            <AspectRatioElement
                style={{position: 'relative'}}
                aspectRatio={ratio}
                width={props.width}
                height={props.height}
            >
                {withLoadingFallback && !hideLoadingFallback && (
                    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                        <SkeletonRectangle width={props.width} height={props.height} />
                    </div>
                )}
                {isError && withErrorFallback && (
                    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                        <ImageError />
                    </div>
                )}
                {!isError && img}
            </AspectRatioElement>
        );
    }
);

export default Image;
