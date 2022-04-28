import * as React from 'react';
import {createUseStyles} from './jss';
import {useSupportsAspectRatio} from './utils/aspect-ratio-support';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

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

        '@supports (aspect-ratio: 1 / 1)': {
            borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 4),
            aspectRatio: ({aspectRatio}) => aspectRatio ?? 'unset',
        },
        '$wrapper &': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        },
    },
    wrapper: {
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 4),
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
        paddingTop: ({aspectRatio, width}) => {
            if (!aspectRatio) {
                return 'initial';
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
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({aspectRatio = '1:1', alt = '', dataAttributes, noBorderRadius, src, ...props}, ref) => {
        const supportsAspectRatio = useSupportsAspectRatio();
        const noBorderRadiusContext = useDisableBorderRadius();
        const noBorderSetting = noBorderRadius ?? noBorderRadiusContext;

        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];
        // if width or height are numeric, we can calculate the other with the ratio without css.
        // if aspect ratio is 0, we use the original image proportions
        const withCssAspectRatio =
            typeof props.width !== 'number' && typeof props.height !== 'number' && ratio !== 0;

        const classes = useStyles({
            noBorderRadius: noBorderSetting,
            aspectRatio: withCssAspectRatio ? ratio : undefined,
            width: props.width,
        });

        let width: number | string | undefined = props.width;
        let height = props.height;

        if (props.width !== undefined && props.height !== undefined) {
            width = props.width;
            height = props.height;
        } else if (typeof props.width === 'number') {
            height = props.width / ratio;
        } else if (typeof props.height === 'number') {
            width = props.height * ratio;
        } else {
            width = props.width || '100%';
        }

        const needsWrapper = withCssAspectRatio && !supportsAspectRatio;

        const img = (
            <img
                {...getPrefixedDataAttributes(dataAttributes)}
                ref={ref}
                src={src}
                className={classes.image}
                alt={alt}
                {...(!needsWrapper ? {width, height} : {})}
            />
        );

        if (needsWrapper) {
            return (
                <div style={{width, height}} className={classes.wrapper}>
                    {img}
                </div>
            );
        } else {
            return img;
        }
    }
);

export default Image;
