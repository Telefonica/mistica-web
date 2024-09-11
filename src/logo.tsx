'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
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

type LogoBaseProps = {
    skinName: KnownSkinName;
    size: ByBreakpoint<number>;
    type?: LogoType;
};

const LogoBase = ({size, skinName, type = 'isotype'}: LogoBaseProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const {isDarkMode} = useTheme();
    switch (skinName) {
        case 'Movistar':
            return (
                <MovistarLogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />
            );
        case 'Vivo':
        case 'Vivo-new':
            return <VivoLogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />;
        case 'O2':
            return <O2LogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />;
        case 'O2-new':
            return <O2NewLogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />;
        case 'Telefonica':
            return (
                <TelefonicaLogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />
            );
        case 'Blau':
            return <BlauLogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />;
        case 'Tu':
            return <TuLogoImage size={size} type={type} isDarkMode={isDarkMode} isInverse={isInverse} />;
        default:
            return <></>;
    }
};

type LogoProps = TouchableComponentProps<{
    size?: ByBreakpoint<number>;
    type?: LogoType;
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
        return <Touchable {...props} />;
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

export const Logo = ({size = DEFAULT_HEIGHT_PX, type = 'isotype', ...props}: LogoProps): JSX.Element => {
    const {skinName} = useTheme();
    return (
        <MaybeTouchableLogo size={size} {...props}>
            <LogoBase skinName={skinName as KnownSkinName} type={type} size={size} />
        </MaybeTouchableLogo>
    );
};

export const MovistarLogo = ({
    size = DEFAULT_HEIGHT_PX,
    type = 'isotype',
    ...props
}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="Movistar" type={type} size={size} />
    </MaybeTouchableLogo>
);

export const VivoLogo = ({size = DEFAULT_HEIGHT_PX, type = 'isotype', ...props}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="Vivo" type={type} size={size} />
    </MaybeTouchableLogo>
);

export const O2Logo = ({size = DEFAULT_HEIGHT_PX, type = 'isotype', ...props}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="O2" type={type} size={size} />
    </MaybeTouchableLogo>
);

export const O2NewLogo = ({size = DEFAULT_HEIGHT_PX, type = 'isotype', ...props}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="O2-new" type={type} size={size} />
    </MaybeTouchableLogo>
);

export const TelefonicaLogo = ({
    size = DEFAULT_HEIGHT_PX,
    type = 'isotype',
    ...props
}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="Telefonica" type={type} size={size} />
    </MaybeTouchableLogo>
);

export const BlauLogo = ({size = DEFAULT_HEIGHT_PX, type = 'isotype', ...props}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="Blau" type={type} size={size} />
    </MaybeTouchableLogo>
);

export const TuLogo = ({size = DEFAULT_HEIGHT_PX, type = 'isotype', ...props}: LogoProps): JSX.Element => (
    <MaybeTouchableLogo size={size} {...props}>
        <LogoBase skinName="Tu" type={type} size={size} />
    </MaybeTouchableLogo>
);
