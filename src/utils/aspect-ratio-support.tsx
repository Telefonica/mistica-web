import * as React from 'react';
import {useIsomorphicLayoutEffect} from '../hooks';
import {createUseStyles} from '../jss';

const AspectRatioSupport = React.createContext<boolean>(true);

type Props = {
    children: React.ReactNode;
};

export const AspectRatioSupportProvider: React.FC<Props> = ({children}) => {
    // In SSR (and in first client side render) we assume the browser will support it
    const [isSupported, setIsSupported] = React.useState(true);

    useIsomorphicLayoutEffect(() => {
        try {
            if (!CSS.supports('aspect-ratio', '1 / 1')) {
                setIsSupported(false);
            }
        } catch (e) {
            // CSS.support is not available in old browsers, in that case we asume aspect-ratio is not supported
            setIsSupported(false);
        }
    }, []);

    return <AspectRatioSupport.Provider value={isSupported}>{children}</AspectRatioSupport.Provider>;
};

export const useSupportsAspectRatio = (): boolean => React.useContext(AspectRatioSupport);

const useAspectRatioStyles = createUseStyles(() => ({
    container: {
        '@supports (aspect-ratio: 1 / 1)': {
            aspectRatio: ({aspectRatio}) => aspectRatio ?? 'unset',
        },
        '$wrapper &': {
            position: ({aspectRatio}) => (aspectRatio ? 'absolute' : 'static'),
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        },
    },

    wrapper: {
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

type AspectRatioElementProps = {
    width?: number | string;
    height?: number | string;
    aspectRatio: number;
    children: React.ReactNode;
    as?: React.ComponentType<any> | string;
    style?: React.CSSProperties;
    className?: string;
};

export const AspectRatioElement = (props: AspectRatioElementProps): JSX.Element => {
    const supportsAspectRatio = useSupportsAspectRatio();
    // if width or height are numeric, we can calculate the other with the ratio without css.
    // if aspect ratio is 0, we use the original image proportions
    const withCssAspectRatio =
        typeof props.width !== 'number' && typeof props.height !== 'number' && props.aspectRatio !== 0;

    const classes = useAspectRatioStyles({
        aspectRatio: withCssAspectRatio ? props.aspectRatio : undefined,
        width: props.width,
    });

    let width: number | string | undefined = props.width;
    let height = props.height;

    if (props.width !== undefined && props.height !== undefined) {
        width = props.width;
        height = props.height;
    } else if (typeof props.width === 'number') {
        height = props.aspectRatio !== 0 ? props.width / props.aspectRatio : undefined;
    } else if (typeof props.height === 'number') {
        width = props.aspectRatio !== 0 ? props.height * props.aspectRatio : undefined;
    } else {
        width = props.width || '100%';
    }

    const needsWrapper = withCssAspectRatio && !supportsAspectRatio;

    const container = React.createElement(
        props.as ?? 'div',
        {
            className: props.className ? `${props.className} ${classes.container}` : classes.container,
            style: {
                ...(needsWrapper ? {...props.style, width: '100%'} : {...props.style, width, height}),
            },
        },
        props.children
    );

    if (needsWrapper) {
        return (
            <div style={{width, height}} className={classes.wrapper}>
                {container}
            </div>
        );
    } else {
        return container;
    }
};
