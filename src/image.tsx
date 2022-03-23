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
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        objectFit: 'cover',
    },
    wrapper: {
        borderRadius: ({noBorderRadius}) => (noBorderRadius ? 0 : 4),
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
        paddingTop: ({aspectRatio}) => (aspectRatio ? `${100 / aspectRatio}%` : 'initial'),
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
    /** defaults to 1:1, if both width and height are given, aspectRatio is ignored */
    aspectRatio?: AspectRatio | number;
    /** defaults to empty string */
    alt?: string;
    children?: void;
    dataAttributes?: DataAttributes;
    noBorderRadius?: boolean;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({aspectRatio = '1:1', alt = '', dataAttributes, noBorderRadius, src, ...props}, ref) => {
        const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];
        const noBorderRadiusContext = useDisableBorderRadius();
        const noBorderSetting = noBorderRadius ?? noBorderRadiusContext;
        const classes = useStyles({
            noBorderRadius: noBorderSetting,
            aspectRatio: !props.width && !props.height ? ratio : undefined,
        });

        let width: number | string | undefined = props.width;
        let height = props.height;

        if (props.width !== undefined && props.height !== undefined) {
            width = props.width;
            height = props.height;
        } else if (props.width !== undefined) {
            height = typeof props.width === 'number' ? props.width / ratio : undefined;
        } else if (props.height !== undefined) {
            width = typeof props.height === 'number' ? props.height * ratio : undefined;
        } else {
            width = '100%';
        }

        return (
            <div style={{width, height}} className={classes.wrapper}>
                <img
                    {...getPrefixedDataAttributes(dataAttributes)}
                    ref={ref}
                    src={src}
                    className={classes.image}
                    alt={alt}
                />
            </div>
        );
    }
);

export default Image;
