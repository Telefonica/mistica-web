import * as React from 'react';
import {createUseStyles} from './jss';
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
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 8),
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
    width?: string | number;
    height?: string | number;
    /** defaults to 1:1, if both width and height are given, aspectRatio is ignored */
    aspectRatio?: AspectRatio | number;
    /** defaults to empty string */
    alt?: string;
    children?: void;
    dataAttributes?: DataAttributes;
    noBorderRadius?: boolean;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({aspectRatio = '1:1', alt = '', dataAttributes, noBorderRadius, ...props}, ref) => {
        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];
        const noBorderRadiusContext = useDisableBorderRadius();
        const noBorderSetting = noBorderRadius ?? noBorderRadiusContext;
        const classes = useStyles({
            noBorderRadius: noBorderSetting,
            aspectRatio: !props.width && !props.height ? ratio : undefined,
        });
        const url = props.src || props.url;

        let width: number | string | undefined = props.width;
        let height = props.height;

        if (props.width !== undefined && props.height !== undefined) {
            width = props.width;
            height = props.height;
        } else if (props.width !== undefined) {
            height = typeof props.width === 'number' ? props.width / ratio : `calc(${props.width} / ratio)`;
        } else if (props.height !== undefined) {
            width = typeof props.height === 'number' ? props.height * ratio : `calc(${props.height} * ratio)`;
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
