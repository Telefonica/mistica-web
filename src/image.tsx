import * as React from 'react';
import {createUseStyles} from './jss';
import {SkeletonRectangle} from './skeletons';
import {useSupportsAspectRatio} from './utils/aspect-ratio-support';
import {getPrefixedDataAttributes} from './utils/dom';

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

const useStyles = createUseStyles(() => ({
    image: {
        display: 'block',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 8),
        transition: `opacity ${FADE_IN_DURATION_MS}ms`,
        position: 'relative',
        zIndex: 1,

        '@supports (aspect-ratio: 1 / 1)': {
            aspectRatio: ({aspectRatio}) => aspectRatio ?? 'unset',
        },
        '$wrapper &': {
            borderRadius: 0, // the wrapper sets the border radius
            position: ({aspectRatio}) =>
                // when aspectRatio is 0, we want the video to use the original aspect ratio
                aspectRatio ? 'absolute' : 'static',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        },
        opacity: ({isError}) => (isError ? 0 : 1), // to hide the broken image icon
    },
    wrapper: {
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 8),
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
        paddingTop: ({aspectRatio, width}) => {
            if (!aspectRatio) {
                return 0;
            }
            if (width && typeof width === 'string' && width.endsWith('%')) {
                return `${Number(width.replace('%', '')) / aspectRatio}%`;
            }
            return `${100 / aspectRatio}%`;
        },
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
            errorFallback,
            ...props
        },
        ref
    ) => {
        const supportsAspectRatio = useSupportsAspectRatio();
        const noBorderRadiusContext = useDisableBorderRadius();
        const noBorderSetting = noBorderRadius ?? noBorderRadiusContext;
        const [isError, setIsError] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(true);
        const [hideLoadingFallback, setHideLoadingFallback] = React.useState(false);

        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];
        // if width or height are numeric, we can calculate the other with the ratio without css.
        // if aspect ratio is 0, we use the original image proportions
        const withCssAspectRatio =
            typeof props.width !== 'number' && typeof props.height !== 'number' && ratio !== 0;

        const classes = useStyles({
            noBorderRadius: noBorderSetting,
            aspectRatio: withCssAspectRatio ? ratio : undefined,
            width: props.width,
            isError,
        });

        let width: number | string | undefined = props.width;
        let height = props.height;

        if (props.width !== undefined && props.height !== undefined) {
            width = props.width;
            height = props.height;
        } else if (typeof props.width === 'number') {
            height = ratio ? props.width / ratio : undefined;
        } else if (typeof props.height === 'number') {
            width = ratio ? props.height * ratio : undefined;
        } else {
            width = props.width || '100%';
        }

        const needsWrapper = withCssAspectRatio && !supportsAspectRatio;
        const withLoadingFallback = !!loadingFallback && !!(aspectRatio || (width && height));

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
                    setIsError(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setHideLoadingFallback(true);
                    }, FADE_IN_DURATION_MS);
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
                {...(needsWrapper ? {width: '100%'} : {width, height})}
            />
        );

        return (
            <div
                style={{...(needsWrapper ? {width, height, position: 'relative'} : {position: 'relative'})}}
                className={needsWrapper ? classes.wrapper : ''}
            >
                {withLoadingFallback && !hideLoadingFallback && (
                    <div style={{position: 'absolute'}}>
                        <SkeletonRectangle aspectRatio={ratio} width={width} height={height} />
                    </div>
                )}
                {img}
            </div>
        );
    }
);

export default Image;
