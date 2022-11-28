import {assignInlineVars} from '@vanilla-extract/dynamic';
import classNames from 'classnames';
import * as React from 'react';
import {useIsomorphicLayoutEffect} from '../hooks';
import * as styles from './aspect-ratio-support.css';

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

    const aspectRatio = withCssAspectRatio ? props.aspectRatio : undefined;

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
            className: classNames(props.className, styles.container, {
                [styles.containerWithWrapper]: needsWrapper,
            }),
            style: {
                ...(needsWrapper
                    ? {
                          position: aspectRatio ? 'absolute' : 'static',
                          ...props.style,
                          width: '100%',
                      }
                    : {
                          ...props.style,
                          width: !isNaN(Number(width)) ? Number(width) : width,
                          height: !isNaN(Number(height)) ? Number(height) : height,
                      }),
                ...assignInlineVars({
                    [styles.vars.aspectRatio]: aspectRatio ? String(aspectRatio) : 'unset',
                }),
            },
        },
        props.children
    );

    if (needsWrapper) {
        const paddingTop = (() => {
            if (!aspectRatio) {
                return 0;
            }
            if (props.width && typeof props.width === 'string' && props.width.endsWith('%')) {
                return `${Number(props.width.replace('%', '')) / aspectRatio}%`;
            }
            return `${100 / aspectRatio}%`;
        })();

        return (
            <div style={{width, height, paddingTop}} className={styles.wrapper}>
                {container}
            </div>
        );
    } else {
        return container;
    }
};
