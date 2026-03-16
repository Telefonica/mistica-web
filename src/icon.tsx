'use client';
import * as React from 'react';
import {useThemeVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import {useIsInViewport} from './hooks';

import type {DataAttributes} from './utils/types';

const FBR_CDN_BASE_URL = 'https://preframeworkbrasilsa.telefonicabigdata.com/fb-core/assets/mistica-icons/';
const svgCache = new Map<string, string>();
const missingIconCache = new Set<string>();

export interface IconProps {
    name: string;
    size?: number | string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    dataAttributes?: DataAttributes;
}

export type IconPropsWithoutName = Omit<React.ComponentProps<typeof Icon>, 'name'>;

type ErrorFallbackIconProps = {
    className?: string;
    style?: React.CSSProperties;
    dataAttributes?: DataAttributes;
    fillColor: string;
    size: string | number;
};

interface SvgNormalizeProps {
    svgText: string;
    fillColor: string;
    size: number | string;
}

const normalizeSvg = ({svgText, fillColor, size}: SvgNormalizeProps): string => {
    const svgWithColor = svgText
        .replace(/fill="[^"]*"/g, `fill="${fillColor}"`)
        .replace(/stroke="[^"]*"/g, `stroke="${fillColor}"`);

    const svgWithFill =
        !svgWithColor.includes('fill=') && !svgWithColor.includes('stroke=')
            ? svgWithColor.replace('<svg', `<svg fill="${fillColor}"`)
            : svgWithColor;

    const svgWithSize = svgWithFill.replace(/(width|height)="[^"]*"/g, `$1="${size}"`);

    const svgWithViewBox = svgWithSize.includes('viewBox=')
        ? svgWithSize
        : svgWithSize.replace('<svg', '<svg viewBox="0 0 24 24"');

    return svgWithViewBox.includes('role=')
        ? svgWithViewBox
        : svgWithViewBox.replace('<svg', '<svg role="presentation"');
};

const ErrorFallbackIcon = ({size, className, style, fillColor, dataAttributes}: ErrorFallbackIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="presentation"
        className={className}
        style={style}
        {...dataAttributes}
    >
        <circle cx="12" cy="12" r="9" fill="none" stroke={fillColor} strokeOpacity="0.45" strokeWidth="1.5" />
        <path
            d="M8.2 15.8L15.8 8.2"
            stroke={fillColor}
            strokeOpacity="0.6"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);

const Icon = ({name, size = 16, color, className, style, dataAttributes}: IconProps): JSX.Element => {
    const [hasLoaded, setHasLoaded] = React.useState(Boolean(name && svgCache.has(name)));
    const [hasError, setHasError] = React.useState(Boolean(name && missingIconCache.has(name)));
    const componentRef = React.useRef<HTMLSpanElement>(null);
    const rawSvg = React.useRef(name ? svgCache.get(name) ?? '' : '');
    const themeVariant = useThemeVariant();
    const isInViewport = useIsInViewport(componentRef, false);

    const fillColor = React.useMemo(() => {
        if (color) return color;

        switch (themeVariant) {
            case 'brand':
            case 'media':
                return vars.colors.neutralHighBrand;
            case 'negative':
                return vars.colors.neutralHighNegative;
            default:
                return vars.colors.neutralHigh;
        }
    }, [color, themeVariant]);

    const fetchIconFromCdn = React.useCallback(
        async (abortSignal: AbortSignal) => {
            try {
                const response = await fetch(`${FBR_CDN_BASE_URL}${name}.svg`, {
                    signal: abortSignal,
                });
                if (!response.ok) throw new Error(`Icon ${name} not found`);
                const svgText = await response.text();

                rawSvg.current = svgText;
                svgCache.set(name, svgText);
                missingIconCache.delete(name);
                setHasLoaded(true);
            } catch (error: any) {
                if (error.name === 'AbortError') return;
                console.warn(`Something went wrong while fetching icon ${name}:`, error);
                missingIconCache.add(name);
                setHasError(true);
            }
        },
        [name]
    );

    React.useEffect(() => {
        const svgFromCache = name ? svgCache.get(name) : undefined;
        rawSvg.current = svgFromCache ?? '';
        setHasLoaded(Boolean(svgFromCache));
        setHasError(Boolean(name && missingIconCache.has(name)));
    }, [name]);

    React.useEffect(() => {
        if (!name || !isInViewport || hasLoaded || hasError) return;
        const abortController = new AbortController();
        fetchIconFromCdn(abortController.signal);
        return () => {
            abortController.abort();
        };
    }, [name, isInViewport, fetchIconFromCdn, hasError, hasLoaded]);

    React.useEffect(() => {
        if (!componentRef.current || !rawSvg.current) return;
        componentRef.current.innerHTML = normalizeSvg({svgText: rawSvg.current, fillColor, size});
    }, [fillColor, size, hasLoaded]);

    if (!hasLoaded && !hasError)
        return (
            <span
                ref={componentRef}
                className={className}
                style={{...style, width: size, height: size, display: 'inline-block'}}
                {...dataAttributes}
            />
        );

    if (hasError) {
        return (
            <ErrorFallbackIcon
                fillColor={fillColor}
                size={size}
                className={className}
                style={style}
                dataAttributes={dataAttributes}
            />
        );
    }

    return <span className={className} style={style} ref={componentRef} {...dataAttributes} />;
};

export default Icon;
