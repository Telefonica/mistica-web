import * as React from 'react';
import {createUseStyles} from './jss';
import {getPrefixedDataAttributes} from './utils/dom';
import {DataAttributes} from './utils/types';

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
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 4),
        display: 'block',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: ({aspectRatio}) => aspectRatio ?? 'unset',
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
    url?: undefined;
    /** defaults to 100% when no width and no height are given */
    width?: number;
    height?: number;
    /** defaults to 1:1, if both width and height are given, aspectRatio is ignored */
    aspectRatio?: AspectRatio;
    /** defaults to empty string */
    alt?: string;
    children?: void;
    dataAttributes?: DataAttributes;
};

/** @deprecated */
type DeprecatedImageProps = {
    url: string;
    src?: undefined;
    width?: number;
    height?: number;
    /** defaults to 1:1, if both width and height are given, aspectRatio is ignored */
    aspectRatio?: AspectRatio;
    /** defaults to empty string */
    alt?: string;
    children?: void;
    dataAttributes?: DataAttributes;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps | DeprecatedImageProps>(
    ({aspectRatio = '1:1', alt = '', dataAttributes, ...props}, ref) => {
        const noBorderRadius = useDisableBorderRadius();
        const classes = useStyles({
            noBorderRadius,
            aspectRatio: !props.width && !props.height ? RATIO[aspectRatio] : undefined,
        });
        const url = props.src || props.url;

        let width: number | string | undefined = props.width;
        let height = props.height;

        if (props.width !== undefined && props.height !== undefined) {
            width = props.width;
            height = props.height;
        } else if (props.width !== undefined) {
            height = props.width / RATIO[aspectRatio];
        } else if (props.height !== undefined) {
            width = props.height * RATIO[aspectRatio];
        } else {
            width = '100%';
        }

        return (
            <img
                {...getPrefixedDataAttributes(dataAttributes)}
                ref={ref}
                src={url}
                className={classes.image}
                alt={alt}
                width={width}
                height={height}
            />
        );
    }
);

export default Image;
