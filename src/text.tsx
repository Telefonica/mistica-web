import * as React from 'react';
import classnames from 'classnames';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {useIsInverseVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import * as styles from './text.css';

import type {FontWeight} from './skins/types';
import type {DataAttributes} from './utils/types';

const mapToWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
};

const lineClamp = (truncate?: boolean | number) => {
    if (truncate === true) {
        return 1;
    }
    if (truncate) {
        return truncate;
    }
    return 'initial';
};

export interface TextPresetProps {
    color?: string;
    decoration?: 'underline' | 'line-through' | 'inherit' | 'none';
    transform?: 'uppercase' | 'capitalize' | 'lowercase' | 'inherit' | 'none';
    children?: React.ReactNode;
    truncate?: boolean | number;
    wordBreak?: boolean;
    hyphens?: 'auto' | 'manual' | 'none';
    textAlign?: 'center';
    id?: string;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-level'?: number;
    dataAttributes?: DataAttributes;
    forceMobileSizes?: boolean;
    textShadow?: string;
}

interface TextProps extends TextPresetProps {
    weight?: FontWeight;
    /** in pixels, will be converted to rem in runtime */
    size?: number;
    /** in pixels, will be converted to rem in runtime */
    mobileSize?: number;
    /** in pixels, will be converted to rem in runtime */
    desktopSize?: number;
    /** in pixels, will be converted to rem in runtime */
    lineHeight?: string | number;
    /** in pixels, will be converted to rem in runtime */
    mobileLineHeight?: string | number;
    /** in pixels, will be converted to rem in runtime */
    desktopLineHeight?: string | number;
    letterSpacing?: number;

    forzeMobileSize?: never;
}

export const Text: React.FC<TextProps> = ({
    weight,
    color = vars.colors.textPrimary,
    decoration,
    truncate,
    transform,
    wordBreak = true,
    hyphens,
    as = 'span',
    children,
    size,
    mobileSize = size,
    desktopSize = size,
    lineHeight,
    mobileLineHeight = lineHeight,
    desktopLineHeight = lineHeight,
    letterSpacing,
    textAlign,
    textShadow,
    id,
    role,
    'aria-level': ariaLevel,
    dataAttributes,
}) => {
    const isInverse = useIsInverseVariant();
    const lineClampValue = lineClamp(truncate);

    const inverseColorsMap = {
        [vars.colors.textPrimary]: vars.colors.textPrimaryInverse,
        [vars.colors.textSecondary]: vars.colors.textSecondaryInverse,
        [vars.colors.textLink]: vars.colors.textLinkInverse,
    };

    if (!children && children !== 0) {
        return null;
    }
    const className = classnames(styles.text, wordBreak ? styles.withWordBreak : styles.withoutWordBreak, {
        [styles.truncateToOneLine]: truncate === 1 || truncate === true,
        [styles.truncateToMoreThanOneLine]: truncate && truncate > 1,
    });

    const sizeVars = assignInlineVars({
        [styles.vars.mobileSize]: mobileSize ? pxToRem(mobileSize) : '',
        [styles.vars.mobileLineHeight]: mobileLineHeight ? pxToRem(mobileLineHeight) : '',
        [styles.vars.desktopSize]: desktopSize ? pxToRem(desktopSize) : '',
        [styles.vars.desktopLineHeight]: desktopLineHeight ? pxToRem(desktopLineHeight) : '',
    });
    const textVars = truncate
        ? assignInlineVars({
              [styles.vars.lineClamp]: String(lineClampValue),
          })
        : {};

    return React.createElement(
        as,
        {
            className,
            id,
            role,
            'aria-level': ariaLevel,
            ...getPrefixedDataAttributes(dataAttributes),
            style: {
                ...sizeVars,
                ...textVars,
                hyphens,
                letterSpacing,
                fontWeight: weight ? mapToWeight[weight] : 'inherit',
                textTransform: transform || 'inherit',
                textDecoration: decoration ?? 'inherit',
                overflowWrap: wordBreak ? 'anywhere' : 'inherit',
                color: isInverse ? inverseColorsMap[color] ?? color : color,
                textAlign,
                textShadow,
            },
        },
        children
    );
};

interface LightProps extends TextPresetProps {
    light: boolean;
    regular?: undefined;
    medium?: undefined;
}

interface MediumProps extends TextPresetProps {
    light?: undefined;
    regular?: undefined;
    medium: boolean;
}

interface RegularProps extends TextPresetProps {
    light?: undefined;
    regular: boolean;
    medium?: undefined;
}

type RegularMediumProps = RegularProps | MediumProps;
type LightRegularMediumProps = LightProps | RegularProps | MediumProps;

const getWeight = (props: LightRegularMediumProps) => {
    if (props.light) {
        return 'light';
    }
    if (props.regular) {
        return 'regular';
    }
    if (props.medium) {
        return 'medium';
    }
    return undefined;
};

const getTextSizes = ({
    forceMobileSizes,
    mobileSize,
    mobileLineHeight,
    desktopSize,
    desktopLineHeight,
}: {
    forceMobileSizes?: boolean;
    mobileSize?: number;
    mobileLineHeight?: string | number;
    desktopSize?: number;
    desktopLineHeight?: string | number;
}) => {
    if (forceMobileSizes) {
        return {
            size: mobileSize,
            lineHeight: mobileLineHeight,
        };
    } else {
        return {
            mobileSize,
            mobileLineHeight,
            desktopSize,
            desktopLineHeight,
        };
    }
};

export const Text10: React.FC<TextPresetProps> = ({dataAttributes, forceMobileSizes, ...props}) => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                mobileSize: 48,
                mobileLineHeight: '56px',
                desktopSize: 64,
                desktopLineHeight: '72px',
            })}
            weight={textPresets.text10.weight}
            dataAttributes={{'component-name': 'Text10', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text9: React.FC<TextPresetProps> = ({dataAttributes, forceMobileSizes, ...props}) => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                mobileSize: 40,
                mobileLineHeight: '48px',
                desktopSize: 56,
                desktopLineHeight: '64px',
            })}
            weight={textPresets.text9.weight}
            dataAttributes={{'component-name': 'Text9', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text8: React.FC<TextPresetProps> = ({dataAttributes, forceMobileSizes, ...props}) => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                mobileSize: 32,
                mobileLineHeight: '40px',
                desktopSize: 48,
                desktopLineHeight: '56px',
            })}
            weight={textPresets.text8.weight}
            dataAttributes={{'component-name': 'Text8', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text7: React.FC<TextPresetProps> = ({dataAttributes, forceMobileSizes, ...props}) => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                mobileSize: 28,
                mobileLineHeight: '32px',
                desktopSize: 40,
                desktopLineHeight: '48px',
            })}
            weight={textPresets.text7.weight}
            dataAttributes={{'component-name': 'Text7', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text6: React.FC<TextPresetProps> = ({dataAttributes, forceMobileSizes, ...props}) => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                mobileSize: 24,
                mobileLineHeight: '32px',
                desktopSize: 32,
                desktopLineHeight: '40px',
            })}
            weight={textPresets.text6.weight}
            dataAttributes={{'component-name': 'Text6', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text5: React.FC<TextPresetProps> = ({dataAttributes, forceMobileSizes, ...props}) => {
    const {textPresets} = useTheme();
    return (
        <Text
            {...getTextSizes({
                forceMobileSizes,
                mobileSize: 20,
                mobileLineHeight: '24px',
                desktopSize: 28,
                desktopLineHeight: '32px',
            })}
            weight={textPresets.text5.weight}
            dataAttributes={{'component-name': 'Text5', ...dataAttributes}}
            {...props}
        />
    );
};

export const Text4: React.FC<LightRegularMediumProps> = ({dataAttributes, forceMobileSizes, ...props}) => (
    <Text
        {...getTextSizes({
            forceMobileSizes,
            mobileSize: 18,
            mobileLineHeight: '24px',
            desktopSize: 20,
            desktopLineHeight: '28px',
        })}
        weight={getWeight(props)}
        dataAttributes={{'component-name': 'Text4', ...dataAttributes}}
        {...props}
    />
);

export const Text3: React.FC<LightRegularMediumProps> = ({dataAttributes, forceMobileSizes, ...props}) => (
    <Text
        {...getTextSizes({
            forceMobileSizes,
            mobileSize: 16,
            mobileLineHeight: '24px',
            desktopSize: 18,
            desktopLineHeight: '24px',
        })}
        weight={getWeight(props)}
        dataAttributes={{'component-name': 'Text3', ...dataAttributes}}
        {...props}
    />
);

export const Text2: React.FC<RegularMediumProps> = ({dataAttributes, forceMobileSizes, ...props}) => (
    <Text
        {...getTextSizes({
            forceMobileSizes,
            mobileSize: 14,
            mobileLineHeight: '20px',
            desktopSize: 16,
            desktopLineHeight: '24px',
        })}
        weight={getWeight(props)}
        dataAttributes={{'component-name': 'Text2', ...dataAttributes}}
        {...props}
    />
);

export const Text1: React.FC<RegularMediumProps> = ({dataAttributes, forceMobileSizes, ...props}) => (
    <Text
        {...getTextSizes({
            forceMobileSizes,
            mobileSize: 12,
            mobileLineHeight: '16px',
            desktopSize: 14,
            desktopLineHeight: '20px',
        })}
        weight={getWeight(props)}
        dataAttributes={{'component-name': 'Text1', ...dataAttributes}}
        {...props}
    />
);

export default Text;
