'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import Touchable from './touchable';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './logo.css';
import {calcInlineVars} from './logo-common';
import {applyCssVars} from './utils/css';

import type {LogoType} from './logo-common';
import type {TouchableComponentProps} from './touchable';
import type {KnownSkinName} from './skins/types';
import type {ByBreakpoint, DataAttributes} from './utils/types';

const DEFAULT_HEIGHT_PX = 48;

const MovistarLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-movistar" */
            './logo-movistar'
        )
);

const MovistarNewLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-movistar-new" */
            './logo-movistar-new'
        )
);

const VivoLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-vivo" */
            './logo-vivo'
        )
);

const O2LogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-o2" */
            './logo-o2'
        )
);

const O2NewLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-o2-new" */
            './logo-o2-new'
        )
);

const TelefonicaLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-telefonica" */
            './logo-telefonica'
        )
);

const BlauLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-blau" */
            './logo-blau'
        )
);

const TuLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-tu" */
            './logo-tu'
        )
);

const EsimflagLogoImage = React.lazy(
    () =>
        import(
            /* webpackChunkName: "logo-esimflag" */
            './logo-esimflag'
        )
);

type LogoBaseProps = {
    skinName: KnownSkinName;
    size: ByBreakpoint<number>;
    type?: LogoType;
    color?: string;
};

const LogoBase = ({size, skinName, type = 'isotype', color}: LogoBaseProps): JSX.Element => {
    const themeVariant = useThemeVariant();
    const {isDarkMode} = useTheme();
    switch (skinName) {
        case 'Movistar':
            return (
                <MovistarLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'Movistar-new':
            return (
                <MovistarNewLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'Vivo':
        case 'Vivo-new':
            return (
                <VivoLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'O2':
            return (
                <O2LogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'O2-new':
            return (
                <O2NewLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'Telefonica':
            return (
                <TelefonicaLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'Blau':
            return (
                <BlauLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'Tu':
            return (
                <TuLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        case 'Esimflag':
            return (
                <EsimflagLogoImage
                    size={size}
                    type={type}
                    isDarkMode={isDarkMode}
                    themeVariant={themeVariant}
                    color={color}
                />
            );
        default:
            return <></>;
    }
};

type LogoProps = TouchableComponentProps<{
    size?: ByBreakpoint<number>;
    type?: LogoType;
    color?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
}>;

const MaybeTouchableLogo = (
    props: TouchableComponentProps<{
        children: React.ReactElement;
        dataAttributes?: DataAttributes;
    }> & {size: ByBreakpoint<number>}
): JSX.Element => {
    const dataAttributes = getPrefixedDataAttributes(props.dataAttributes, 'Logo');

    if (props.to || props.href || props.onPress) {
        return <Touchable {...props} />; // TODO: I think this should also have a suspense wrapper
    }

    return (
        <React.Suspense
            fallback={
                <div
                    className={styles.svg}
                    style={{
                        // reserve the vertical space for the logo
                        ...applyCssVars(calcInlineVars(props.size)),
                        width: 1,
                    }}
                />
            }
        >
            <div className={styles.logoContainer} {...dataAttributes}>
                {props.children}
            </div>
        </React.Suspense>
    );
};

const LogoInternal = ({
    size = DEFAULT_HEIGHT_PX,
    type = 'isotype',
    color,
    skinName,
    ...props
}: LogoProps & {skinName: KnownSkinName}): JSX.Element => {
    return (
        <MaybeTouchableLogo size={size} {...props}>
            <LogoBase skinName={skinName} type={type} size={size} color={color} />
        </MaybeTouchableLogo>
    );
};

export const Logo = ({size, type, color, ...props}: LogoProps): JSX.Element => {
    const {skinName} = useTheme();
    return (
        <LogoInternal size={size} type={type} color={color} skinName={skinName as KnownSkinName} {...props} />
    );
};

export const MovistarLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Movistar" {...props} />
);

export const MovistarNewLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Movistar-new" {...props} />
);

export const VivoLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Vivo" {...props} />
);

export const O2Logo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="O2" {...props} />
);

export const O2NewLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="O2-new" {...props} />
);

export const TelefonicaLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Telefonica" {...props} />
);

export const BlauLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Blau" {...props} />
);

export const TuLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Tu" {...props} />
);

export const EsimflagLogo = ({size, type, color, ...props}: LogoProps): JSX.Element => (
    <LogoInternal size={size} type={type} color={color} skinName="Esimflag" {...props} />
);
